const http = require('http');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const ROOT = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const DATA_DIR = path.join(ROOT, 'data');
const MENU_FILE = path.join(DATA_DIR, 'menu.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const LEDGER_FILE = path.join(DATA_DIR, 'sales-ledger.json');
const ATTEMPTS_FILE = path.join(DATA_DIR, 'order-attempts.json');

const SUPPORTED_LANGUAGES = ['en', 'fr'];
const DINE_OPTIONS = ['eatIn', 'takeOut'];
const TIMING_OPTIONS = ['now', 'later'];

bootstrapDataFiles();

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/api/')) {
    handleApi(req, res);
    return;
  }

  serveStatic(req, res);
});

server.listen(PORT, HOST, () => {
  console.log(`Parisian cafe ordering server running on http://${HOST}:${PORT}`);
});

function handleApi(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'GET' && url.pathname === '/api/menu') {
    const lang = normaliseLanguage(url.searchParams.get('lang'));
    const items = getMenuForLanguage(lang);
    return sendJson(res, 200, {
      language: lang,
      supportedLanguages: SUPPORTED_LANGUAGES,
      updatedAt: new Date().toISOString(),
      items
    });
  }

  if (req.method === 'GET' && url.pathname === '/api/orders') {
    const limitParam = Number(url.searchParams.get('limit'));
    const orders = readJson(ORDERS_FILE).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    const limited = Number.isFinite(limitParam) && limitParam > 0 ? orders.slice(0, limitParam) : orders;
    return sendJson(
      res,
      200,
      limited.map((order) => sanitiseOrderForResponse(order))
    );
  }

  if (req.method === 'GET' && url.pathname.startsWith('/api/orders/')) {
    const orderId = url.pathname.split('/').pop();
    const orders = readJson(ORDERS_FILE);
    const order = orders.find((entry) => entry.id === orderId);
    if (!order) {
      return sendJson(res, 404, { message: 'Order not found.' });
    }
    return sendJson(res, 200, sanitiseOrderForResponse(order));
  }

  if (req.method === 'POST' && url.pathname === '/api/orders') {
    return collectBody(req)
      .then((body) => {
        let payload;
        try {
          payload = JSON.parse(body || '{}');
        } catch (error) {
          return sendJson(res, 400, { message: 'Invalid JSON payload.' });
        }

        const validation = validateOrder(payload);
        if (!validation.valid) {
          return sendJson(res, 400, { message: 'Invalid order data.', issues: validation.issues });
        }

        const order = persistOrder(payload);
        return sendJson(res, 201, order);
      })
      .catch((err) => {
        console.error('Failed to save order', err);
        return sendJson(res, 500, { message: 'Unable to process order right now.' });
      });
  }

  if (req.method === 'POST' && url.pathname === '/api/order-attempts') {
    return collectBody(req)
      .then((body) => {
        let payload;
        try {
          payload = JSON.parse(body || '{}');
        } catch (error) {
          return sendJson(res, 400, { message: 'Invalid JSON payload.' });
        }

        const preferenceIssues = validatePreferencePayload(payload.preference);
        if (preferenceIssues.length) {
          return sendJson(res, 400, { message: 'Invalid preference.', issues: preferenceIssues });
        }

        const attempt = persistOrderAttempt(payload);
        return sendJson(res, 201, attempt);
      })
      .catch((err) => {
        console.error('Failed to record order attempt', err);
        return sendJson(res, 500, { message: 'Unable to record attempt.' });
      });
  }

  if (req.method === 'GET' && url.pathname === '/api/sales') {
    const ledger = readJson(LEDGER_FILE);
    return sendJson(res, 200, ledger);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Not found' }));
}

function serveStatic(req, res) {
  const urlPath = req.url === '/' ? '/index.html' : req.url;
  const safePath = path.normalize(urlPath).replace(/^\.\.(?=\/|$)/, '');
  const filePath = path.join(PUBLIC_DIR, safePath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(err.code === 'ENOENT' ? 404 : 500);
      res.end(err.code === 'ENOENT' ? 'Not found' : 'Server error');
      return;
    }

    res.writeHead(200, { 'Content-Type': getMimeType(filePath) });
    res.end(data);
  });
}

function getMimeType(filePath) {
  const ext = path.extname(filePath);
  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.js':
      return 'application/javascript; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.svg':
      return 'image/svg+xml';
    default:
      return 'application/octet-stream';
  }
}

function bootstrapDataFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(MENU_FILE)) {
    throw new Error('Menu file missing. Please seed data/menu.json.');
  }

  if (!fs.existsSync(ORDERS_FILE)) {
    writeJson(ORDERS_FILE, []);
  }

  if (!fs.existsSync(LEDGER_FILE)) {
    writeJson(LEDGER_FILE, {
      totalRevenue: 0,
      totalOrders: 0,
      currency: 'EUR',
      paymentBreakdown: {
        applePay: 0,
        creditCard: 0,
        paypal: 0
      },
      lastTwentyOrders: []
    });
  }

  if (!fs.existsSync(ATTEMPTS_FILE)) {
    writeJson(ATTEMPTS_FILE, []);
  }
}

function normaliseLanguage(lang) {
  if (!lang) return 'en';
  return SUPPORTED_LANGUAGES.includes(lang.toLowerCase()) ? lang.toLowerCase() : 'en';
}

function getMenuForLanguage(lang) {
  const menu = readJson(MENU_FILE);
  return menu.map((item) => {
    const translation = item.translations[lang] || item.translations.en;
    return {
      id: item.id,
      sku: item.sku,
      price: item.price,
      image: item.image,
      category: item.category,
      tags: item.tags,
      name: translation.name,
      description: translation.description,
      composition: translation.composition,
      allergens: translation.allergens,
      language: lang
    };
  });
}

function validateOrder(order) {
  const issues = [];

  if (!order.customerName || order.customerName.trim().length < 2) {
    issues.push('Customer name is required.');
  }

  if (!Array.isArray(order.items) || order.items.length === 0) {
    issues.push('At least one menu item must be included.');
  }

  const allowedMethods = ['applePay', 'creditCard', 'paypal'];
  if (!order.payment || !allowedMethods.includes(order.payment.method)) {
    issues.push('A valid payment method is required.');
  }

  const menu = readJson(MENU_FILE);
  const menuIds = new Set(menu.map((item) => item.id));

  if (Array.isArray(order.items)) {
    order.items.forEach((item, index) => {
      if (!menuIds.has(item.menuItemId)) {
        issues.push(`Item at position ${index + 1} is invalid.`);
      }
      if (typeof item.quantity !== 'number' || item.quantity <= 0) {
        issues.push(`Quantity for item ${index + 1} must be a positive number.`);
      }
    });
  }

  issues.push(...validatePreferencePayload(order.preference));

  return { valid: issues.length === 0, issues };
}

function validatePreferencePayload(preference) {
  const issues = [];
  if (!preference || typeof preference !== 'object') {
    issues.push('Service preference is required.');
    return issues;
  }
  if (!DINE_OPTIONS.includes(preference.dine)) {
    issues.push('Dining preference must be eat-in or take-out.');
  }
  if (!TIMING_OPTIONS.includes(preference.timing)) {
    issues.push('Timing preference must be now or later.');
  }
  if (preference.timing === 'later') {
    if (!preference.timeSlot) {
      issues.push('A time slot is required for later pick-ups.');
    } else if (Number.isNaN(Date.parse(preference.timeSlot))) {
      issues.push('Scheduled time must be a valid timestamp.');
    }
  }
  return issues;
}

function persistOrder(orderPayload) {
  const menu = readJson(MENU_FILE);
  const menuMap = new Map(menu.map((item) => [item.id, item]));
  const ledger = readJson(LEDGER_FILE);
  const orders = readJson(ORDERS_FILE);

  const language = normaliseLanguage(orderPayload.language);

  const items = orderPayload.items.map((entry) => {
    const menuItem = menuMap.get(entry.menuItemId);
    return {
      menuItemId: menuItem.id,
      sku: menuItem.sku,
      name: menuItem.translations[language]?.name || menuItem.translations.en.name,
      quantity: entry.quantity,
      notes: entry.notes || '',
      unitPrice: menuItem.price,
      total: Number((menuItem.price * entry.quantity).toFixed(2))
    };
  });

  const orderTotal = items.reduce((sum, item) => sum + item.total, 0);
  const paymentMethod = orderPayload.payment.method;
  const maskedPayment = sanitisePayment(orderPayload.payment);
  const preference = normalisePreference(orderPayload.preference);

  const newOrder = {
    id: randomUUID(),
    customerName: orderPayload.customerName.trim(),
    contact: orderPayload.contact || {},
    language,
    preference,
    items,
    totals: {
      currency: 'EUR',
      grandTotal: Number(orderTotal.toFixed(2))
    },
    payment: {
      method: paymentMethod,
      status: 'authorised',
      details: maskedPayment
    },
    fulfillment: {
      status: 'queued',
      channel: 'web'
    },
    createdAt: new Date().toISOString()
  };

  orders.push(newOrder);
  writeJson(ORDERS_FILE, orders);

  ledger.totalOrders += 1;
  ledger.totalRevenue = Number((ledger.totalRevenue + newOrder.totals.grandTotal).toFixed(2));
  ledger.paymentBreakdown[paymentMethod] += newOrder.totals.grandTotal;
  ledger.paymentBreakdown[paymentMethod] = Number(ledger.paymentBreakdown[paymentMethod].toFixed(2));
  ledger.lastTwentyOrders.unshift({
    orderId: newOrder.id,
    total: newOrder.totals.grandTotal,
    method: paymentMethod,
    createdAt: newOrder.createdAt
  });
  ledger.lastTwentyOrders = ledger.lastTwentyOrders.slice(0, 20);
  writeJson(LEDGER_FILE, ledger);

  return newOrder;
}

function persistOrderAttempt(payload) {
  const attempts = readJson(ATTEMPTS_FILE);
  const attempt = {
    id: randomUUID(),
    language: normaliseLanguage(payload.language),
    preference: normalisePreference(payload.preference),
    createdAt: new Date().toISOString()
  };
  attempts.push(attempt);
  const trimmed = attempts.slice(-500);
  writeJson(ATTEMPTS_FILE, trimmed);
  return attempt;
}

function normalisePreference(preference = {}) {
  const dine = DINE_OPTIONS.includes(preference.dine) ? preference.dine : 'eatIn';
  const timing = TIMING_OPTIONS.includes(preference.timing) ? preference.timing : 'now';
  const timeSlotValid =
    timing === 'later' && preference.timeSlot && !Number.isNaN(Date.parse(preference.timeSlot));
  const confirmedAt =
    preference.confirmedAt && !Number.isNaN(Date.parse(preference.confirmedAt))
      ? new Date(preference.confirmedAt).toISOString()
      : new Date().toISOString();

  return {
    dine,
    timing,
    timeSlot: timeSlotValid ? new Date(preference.timeSlot).toISOString() : null,
    confirmedAt
  };
}

function sanitisePayment(payment) {
  if (!payment || typeof payment !== 'object') {
    return {};
  }

  if (payment.method === 'creditCard') {
    const last4 = payment.details?.cardNumber?.slice(-4) || '****';
    return {
      brand: payment.details?.brand || 'card',
      last4,
      cardholder: payment.details?.cardholder || '***'
    };
  }

  if (payment.method === 'paypal') {
    return { account: maskEmail(payment.details?.account) };
  }

  if (payment.method === 'applePay') {
    return { deviceAccount: payment.details?.deviceAccount || 'apple-pay-token' };
  }

  return {};
}

function maskEmail(email = '') {
  if (!email.includes('@')) return 'hidden';
  const [user, domain] = email.split('@');
  const visible = user.slice(0, 2);
  return `${visible}***@${domain}`;
}

function maskContact(contact = '') {
  if (!contact) return '';
  if (contact.includes('@')) {
    return maskEmail(contact);
  }
  if (contact.length <= 4) {
    return '*'.repeat(contact.length);
  }
  return `${contact.slice(0, 2)}***${contact.slice(-2)}`;
}

function sanitiseOrderForResponse(order) {
  return {
    ...order,
    contact: typeof order.contact === 'string' ? maskContact(order.contact) : order.contact,
    payment: {
      method: order.payment?.method,
      status: order.payment?.status,
      details: order.payment?.details || {}
    }
  };
}

function readJson(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function collectBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 1e6) {
        req.connection.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}
