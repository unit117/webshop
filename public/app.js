const state = {
  language: 'en',
  menu: [],
  cart: []
};

const dictionary = {
  en: {
    menu: 'Menu',
    cart: 'Your selection',
    name: 'Name',
    contact: 'Contact (email or phone)',
    payment: 'Payment',
    placeOrder: 'Place order',
    emptyCart: 'Select an item to begin your order.',
    cartItems: (count) => `${count} item${count === 1 ? '' : 's'}`,
    ledgerEmpty: 'No orders yet.',
    ordersRecorded: (count) => `${count} order${count === 1 ? '' : 's'} recorded`,
    viewCart: 'View cart',
    goToPayment: 'Go to payment'
  },
  fr: {
    menu: 'Carte',
    cart: 'Votre sélection',
    name: 'Nom',
    contact: 'Contact (email ou téléphone)',
    payment: 'Paiement',
    placeOrder: 'Passer la commande',
    emptyCart: 'Choisissez un produit pour commencer votre commande.',
    cartItems: (count) => `${count} article${count > 1 ? 's' : ''}`,
    ledgerEmpty: 'Aucune commande pour le moment.',
    ordersRecorded: (count) => `${count} commande${count > 1 ? 's' : ''} enregistrée${count > 1 ? 's' : ''}`,
    viewCart: 'Voir le panier',
    goToPayment: 'Aller au paiement'
  }
};

const menuGrid = document.getElementById('menu-grid');
const cartContainer = document.getElementById('cart');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const orderForm = document.getElementById('order-form');
const submitButton = document.getElementById('submit-order');
const formStatus = document.getElementById('form-status');
const paymentDetails = document.getElementById('payment-details');
const languageToggle = document.getElementById('language-toggle');
const paymentBreakdownEl = document.getElementById('payment-breakdown');
const salesTotal = document.getElementById('sales-total');
const salesMeta = document.getElementById('sales-meta');
const ledgerContainer = document.getElementById('ledger');
const yearEl = document.getElementById('year');
const mobileToolbar = document.getElementById('mobile-toolbar');
const mobileCartToggle = document.getElementById('mobile-cart-toggle');
const mobileCheckoutButton = document.getElementById('mobile-checkout');
const mobileToolbarLabel = document.getElementById('mobile-toolbar-label');
const mobileToolbarHint = document.getElementById('mobile-toolbar-hint');
const mobileToolbarTotal = document.getElementById('mobile-toolbar-total');

yearEl.textContent = new Date().getFullYear();

languageToggle.addEventListener('click', () => {
  state.language = state.language === 'en' ? 'fr' : 'en';
  updateCopy();
  loadMenu();
  refreshSales();
});

orderForm.addEventListener('change', (event) => {
  if (event.target.name === 'payment') {
    renderPaymentFields(event.target.value);
  }
});

orderForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!state.cart.length) return;

  submitButton.disabled = true;
  formStatus.textContent = state.language === 'fr' ? 'Envoi de la commande…' : 'Sending order…';

  const payload = buildOrderPayload();

  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.issues?.join(', ') || error.message || 'Unknown error');
    }

    const data = await response.json();
    state.cart = [];
    renderCart();
    await refreshSales();
    formStatus.textContent =
      state.language === 'fr'
        ? `Commande ${data.id} confirmée. Préparation en cours.`
        : `Order ${data.id} confirmed. We are preparing it now.`;
  } catch (error) {
    console.error(error);
    formStatus.textContent = error.message;
  } finally {
    submitButton.disabled = !state.cart.length;
  }
});

mobileCartToggle?.addEventListener('click', () => {
  document.getElementById('cart-heading')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

mobileCheckoutButton?.addEventListener('click', () => {
  orderForm?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

function buildOrderPayload() {
  const formData = new FormData(orderForm);
  const paymentMethod = formData.get('payment');
  const paymentDetails = buildPaymentDetails(paymentMethod, formData);

  return {
    customerName: formData.get('customerName')?.trim(),
    contact: formData.get('contact'),
    language: state.language,
    items: state.cart.map((item) => ({
      menuItemId: item.id,
      quantity: item.quantity
    })),
    payment: {
      method: paymentMethod,
      details: paymentDetails
    }
  };
}

function buildPaymentDetails(method, formData) {
  if (method === 'creditCard') {
    return {
      cardholder: formData.get('cardholder'),
      cardNumber: formData.get('cardNumber'),
      brand: formData.get('cardBrand'),
      expiry: formData.get('cardExpiry')
    };
  }
  if (method === 'paypal') {
    return { account: formData.get('paypalAccount') };
  }
  return { deviceAccount: formData.get('appleDevice') || 'web-session' };
}

async function loadMenu() {
  menuGrid.innerHTML = '<p>Loading menu…</p>';
  try {
    const response = await fetch(`/api/menu?lang=${state.language}`);
    const data = await response.json();
    state.menu = data.items;
    renderMenu();
  } catch (error) {
    console.error(error);
    menuGrid.innerHTML = '<p>Unable to load menu.</p>';
  }
}

function renderMenu() {
  menuGrid.innerHTML = '';
  state.menu.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'menu-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" loading="lazy" />
      <div class="menu-card__body">
        <div class="menu-card__header">
          <div>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
          </div>
          <strong>${formatCurrency(item.price)}</strong>
        </div>
        <p><strong>${translate('composition')}:</strong> ${item.composition}</p>
        <p><strong>${translate('allergens')}:</strong> ${item.allergens?.join(', ') || translate('none')}</p>
        <div class="menu-card__tags">
          ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <button type="button" data-id="${item.id}">${translate('add')}</button>
      </div>
    `;

    card.querySelector('button').addEventListener('click', () => addToCart(item));
    menuGrid.appendChild(card);
  });
}

function addToCart(item) {
  const existing = state.cart.find((entry) => entry.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ id: item.id, name: item.name, price: item.price, quantity: 1 });
  }
  renderCart();
}

function removeFromCart(id) {
  state.cart = state.cart.filter((item) => item.id !== id);
  renderCart();
}

function renderCart() {
  cartContainer.innerHTML = '';

  if (!state.cart.length) {
    cartContainer.innerHTML = `<p>${translate('emptyCart')}</p>`;
    cartCount.textContent = dictionary[state.language].cartItems(0);
    cartTotal.textContent = formatCurrency(0);
    submitButton.disabled = true;
    updateMobileToolbar(0, 0);
    return;
  }

  state.cart.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div class="cart-item__info">
        <strong>${item.name}</strong>
        <span>${dictionary[state.language].cartItems(item.quantity)}</span>
      </div>
      <div>
        <span>${formatCurrency(item.price * item.quantity)}</span>
        <button type="button" aria-label="Remove" data-id="${item.id}">✕</button>
      </div>
    `;
    row.querySelector('button').addEventListener('click', () => removeFromCart(item.id));
    cartContainer.appendChild(row);
  });

  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = dictionary[state.language].cartItems(totalItems);
  cartTotal.textContent = formatCurrency(totalPrice);
  submitButton.disabled = false;
  updateMobileToolbar(totalItems, totalPrice);
}

function updateCopy() {
  document.getElementById('menu-heading').textContent = dictionary[state.language].menu;
  document.getElementById('cart-heading').textContent = dictionary[state.language].cart;
  document.getElementById('label-name').textContent = dictionary[state.language].name;
  document.getElementById('label-contact').textContent = dictionary[state.language].contact;
  document.getElementById('payment-heading').textContent = dictionary[state.language].payment;
  submitButton.textContent = dictionary[state.language].placeOrder;
  renderCart();
  renderPaymentFields(orderForm.payment.value);
}

function updateMobileToolbar(count, total) {
  if (!mobileToolbar) return;
  mobileToolbarLabel.textContent = dictionary[state.language].cartItems(count);
  mobileToolbarHint.textContent = dictionary[state.language].viewCart;
  mobileToolbarTotal.textContent = formatCurrency(total);
  mobileToolbar.classList.toggle('mobile-toolbar--hidden', count === 0);
  if (mobileCartToggle) {
    mobileCartToggle.disabled = count === 0;
  }
  if (mobileCheckoutButton) {
    mobileCheckoutButton.textContent = dictionary[state.language].goToPayment;
    mobileCheckoutButton.disabled = count === 0;
  }
}

function translate(key) {
  const copy = {
    composition: { en: 'Composition', fr: 'Composition' },
    allergens: { en: 'Allergens', fr: 'Allergènes' },
    none: { en: 'None declared', fr: 'Aucun déclaré' },
    add: { en: 'Add to order', fr: 'Ajouter' }
  };
  return copy[key][state.language];
}

function renderPaymentFields(method = 'applePay') {
  let markup = '';
  if (method === 'creditCard') {
    markup = `
      <label>
        ${state.language === 'fr' ? 'Titulaire de la carte' : 'Cardholder'}
        <input type="text" name="cardholder" required />
      </label>
      <label>
        ${state.language === 'fr' ? 'Numéro de carte' : 'Card number'}
        <input type="text" name="cardNumber" inputmode="numeric" required />
      </label>
      <label>
        ${state.language === 'fr' ? 'Expiration' : 'Expiry'}
        <input type="text" name="cardExpiry" placeholder="MM/AA" required />
      </label>
      <label>
        ${state.language === 'fr' ? 'Réseau' : 'Brand'}
        <input type="text" name="cardBrand" />
      </label>
    `;
  } else if (method === 'paypal') {
    markup = `
      <label>
        PayPal
        <input type="email" name="paypalAccount" placeholder="you@example.com" required />
      </label>
    `;
  } else {
    markup = `
      <p>${state.language === 'fr' ? 'Apple Pay utilisera l’identifiant de votre appareil.' : 'Apple Pay will use your device account number.'}</p>
      <input type="hidden" name="appleDevice" value="web-device" />
    `;
  }
  paymentDetails.innerHTML = markup;
}

function formatCurrency(value) {
  return new Intl.NumberFormat(state.language === 'fr' ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency: 'EUR'
  }).format(value);
}

async function refreshSales() {
  try {
    const response = await fetch('/api/sales');
    const data = await response.json();
    salesTotal.textContent = formatCurrency(data.totalRevenue);
    salesMeta.textContent = dictionary[state.language].ordersRecorded(data.totalOrders);
    paymentBreakdownEl.innerHTML = Object.entries(data.paymentBreakdown)
      .map(([method, amount]) => `<span class="payment-chip">${method}: ${formatCurrency(amount)}</span>`)
      .join('');

    if (!data.lastTwentyOrders.length) {
      ledgerContainer.innerHTML = `<p>${dictionary[state.language].ledgerEmpty}</p>`;
    } else {
      ledgerContainer.innerHTML = data.lastTwentyOrders
        .map(
          (entry) => `
          <article class="ledger-card">
            <p><strong>${formatCurrency(entry.total)}</strong> · ${entry.method}</p>
            <p>${new Date(entry.createdAt).toLocaleString()}</p>
            <p class="muted">${entry.orderId}</p>
          </article>
        `
        )
        .join('');
    }
  } catch (error) {
    console.error('Unable to load sales data', error);
  }
}

updateCopy();
renderPaymentFields('applePay');
renderCart();
loadMenu();
refreshSales();
