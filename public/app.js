const state = {
  language: 'en',
  menu: [],
  cart: [],
  preference: {
    dine: null,
    timing: null,
    timeSlot: null,
    confirmedAt: null
  }
};

const languages = [
  {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    keywords: ['english', 'anglais', 'inglés', 'inglês', 'en', 'uk', 'us'],
    available: true
  },
  {
    code: 'fr',
    label: 'French',
    nativeLabel: 'Français',
    keywords: ['french', 'francais', 'français', 'fr', 'françois'],
    available: true
  },
  {
    code: 'es',
    label: 'Spanish',
    nativeLabel: 'Español',
    keywords: ['spanish', 'espanol', 'español', 'castellano', 'es'],
    available: false
  },
  {
    code: 'de',
    label: 'German',
    nativeLabel: 'Deutsch',
    keywords: ['german', 'deutsch', 'allemand', 'de'],
    available: false
  },
  {
    code: 'it',
    label: 'Italian',
    nativeLabel: 'Italiano',
    keywords: ['italian', 'italiano', 'italien', 'it'],
    available: false
  },
  {
    code: 'pt',
    label: 'Portuguese',
    nativeLabel: 'Português',
    keywords: ['portuguese', 'portugues', 'português', 'portugais', 'pt', 'brazilian'],
    available: false
  },
  {
    code: 'ar',
    label: 'Arabic',
    nativeLabel: 'العربية',
    keywords: ['arabic', 'arabe', 'العربية', 'ar'],
    available: false
  },
  {
    code: 'hi',
    label: 'Hindi',
    nativeLabel: 'हिंदी',
    keywords: ['hindi', 'हिंदी', 'india', 'hin'],
    available: false
  },
  {
    code: 'zh',
    label: 'Mandarin Chinese',
    nativeLabel: '中文 · 普通话',
    keywords: ['mandarin', 'chinese', '中文', '普通话', 'zhongwen', 'putonghua', 'guoyu', '國語', '国语'],
    available: false
  },
  {
    code: 'ja',
    label: 'Japanese',
    nativeLabel: '日本語',
    keywords: ['japanese', '日本語', 'nihongo', 'jp'],
    available: false
  },
  {
    code: 'ko',
    label: 'Korean',
    nativeLabel: '한국어',
    keywords: ['korean', '한국어', 'hangugo', 'kr'],
    available: false
  },
  {
    code: 'ru',
    label: 'Russian',
    nativeLabel: 'русский',
    keywords: ['russian', 'русский', 'russe', 'ru'],
    available: false
  }
];

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
    goToPayment: 'Go to payment',
    languageLabel: 'Language',
    languageSearchPlaceholder: 'Search a language or keyword',
    languageSearchLabel: 'Search languages',
    languageHelper: 'Fully translated today: English & French. More coming soon.',
    languageNoResults: 'No languages match that search.',
    languageLive: 'Available now',
    languageComingSoon: 'Coming soon'
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
    goToPayment: 'Aller au paiement',
    preferenceEyebrow: 'Planifier votre visite',
    preferenceHeading: 'Comment pouvons-nous préparer votre commande ?',
    dineLabel: 'Où souhaitez-vous la déguster ?',
    timingLabel: 'Quand souhaitez-vous être servi ?',
    eatIn: 'Sur place',
    takeOut: 'À emporter',
    now: 'Maintenant',
    later: 'Plus tard',
    laterNote: 'Les commandes plus tard ne sont pas garanties.',
    goOrder: 'Commencer ma commande',
    languageLabel: 'Langue',
    languageSearchPlaceholder: 'Rechercher une langue ou un mot-clé',
    languageSearchLabel: 'Rechercher des langues',
    languageHelper: 'Anglais et français sont prêts aujourd’hui. D’autres langues arrivent.',
    languageNoResults: 'Aucune langue ne correspond à votre recherche.',
    languageLive: 'Disponible',
    languageComingSoon: 'Bientôt disponible'
  }
};

dictionary.en.preferenceEyebrow = 'Plan your visit';
dictionary.en.preferenceHeading = 'How can we prepare your order?';
dictionary.en.dineLabel = 'Where will you enjoy it?';
dictionary.en.timingLabel = 'When should we prepare it?';
dictionary.en.eatIn = 'Eat in';
dictionary.en.takeOut = 'Take out';
dictionary.en.now = 'Now';
dictionary.en.later = 'Later';
dictionary.en.laterNote = 'Later pick-ups are not guaranteed.';
dictionary.en.goOrder = 'Start order';
dictionary.en.timeLabel = 'Choose a time today';
dictionary.en.timeHint = 'Pick a 15-minute slot after the current time.';
dictionary.en.timeUnavailable = 'No slots remain today.';
dictionary.en.timeRequired = 'Please pick a time to continue.';
dictionary.en.summaryTitle = 'Service preference';
dictionary.en.summaryChange = 'Change';
dictionary.en.summaryNow = 'Serve now';
dictionary.en.summaryLaterPending = 'Later today';
dictionary.en.summaryLaterAt = (time) => `Ready later at ${time}`;
dictionary.en.summaryEatIn = 'Eat in';
dictionary.en.summaryTakeOut = 'Take away';

dictionary.fr.timeLabel = 'Choisissez une heure aujourd’hui';
dictionary.fr.timeHint = 'Sélectionnez un créneau de 15 minutes après l’heure actuelle.';
dictionary.fr.timeUnavailable = 'Plus de créneaux disponibles aujourd’hui.';
dictionary.fr.timeRequired = 'Veuillez choisir un horaire pour continuer.';
dictionary.fr.summaryTitle = 'Préférence de service';
dictionary.fr.summaryChange = 'Modifier';
dictionary.fr.summaryNow = 'Servir maintenant';
dictionary.fr.summaryLaterPending = 'Plus tard aujourd’hui';
dictionary.fr.summaryLaterAt = (time) => `Prêt pour ${time}`;
dictionary.fr.summaryEatIn = 'Sur place';
dictionary.fr.summaryTakeOut = 'À emporter';

const menuGrid = document.getElementById('menu-grid');
const cartContainer = document.getElementById('cart');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const orderForm = document.getElementById('order-form');
const submitButton = document.getElementById('submit-order');
const formStatus = document.getElementById('form-status');
const paymentDetails = document.getElementById('payment-details');
const languageToggleButton = document.getElementById('language-toggle-button');
const languagePanel = document.getElementById('language-panel');
const languageSearchInput = document.getElementById('language-search');
const languageOptions = document.getElementById('language-options');
const languageHelper = document.getElementById('language-helper');
const languageEmpty = document.getElementById('language-empty');
const languageHint = document.getElementById('language-current-hint');
const languageCurrentLabel = document.getElementById('language-current-label');
const languageCurrentCode = document.getElementById('language-current-code');
const languageSearchLabel = document.getElementById('language-search-label');
const languageSwitcher = document.getElementById('language-switcher');
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
const preferenceOverlay = document.getElementById('preference-overlay');
const preferenceCTA = document.getElementById('preference-cta');
const laterWarning = document.getElementById('later-warning');
const timeSlotGroup = document.getElementById('preference-time-group');
const timeSlotList = document.getElementById('time-slot-options');
const timeSlotEmpty = document.getElementById('time-slot-empty');
const timeSlotError = document.getElementById('time-slot-error');
const timeSlotEmptyText = document.getElementById('time-slot-empty-text');
const timeSlotErrorText = document.getElementById('time-slot-error-text');
const timeSlotLabel = document.getElementById('preference-time-label');
const timeSlotHint = document.getElementById('preference-time-hint');
const preferenceSummary = document.getElementById('preference-summary');
const preferenceSummaryTitle = document.getElementById('preference-summary-title');
const preferenceSummaryDine = document.getElementById('preference-summary-dine');
const preferenceSummaryTime = document.getElementById('preference-summary-time');
const preferenceSummaryChange = document.getElementById('preference-summary-change');

yearEl.textContent = new Date().getFullYear();

initializeLanguageSelector();
initializePreferenceOverlay();

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

preferenceSummaryChange?.addEventListener('click', (event) => {
  event.stopPropagation();
  openPreferenceOverlay();
});

preferenceSummary?.addEventListener('click', () => {
  openPreferenceOverlay();
});

function initializeLanguageSelector() {
  if (!languageToggleButton) return;
  updateLanguageBadge();
  renderLanguageOptions();
  languageToggleButton.addEventListener('click', () => {
    const expanded = languageToggleButton.getAttribute('aria-expanded') === 'true';
    toggleLanguagePanel(!expanded);
  });
  languageSearchInput?.addEventListener('input', () => renderLanguageOptions());
  document.addEventListener('click', (event) => {
    if (!languageSwitcher?.contains(event.target)) {
      toggleLanguagePanel(false);
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      toggleLanguagePanel(false);
    }
  });
}

function toggleLanguagePanel(shouldOpen) {
  if (!languagePanel) return;
  const openState = typeof shouldOpen === 'boolean' ? shouldOpen : languagePanel.hasAttribute('hidden');
  if (openState) {
    languagePanel.hidden = false;
    languageToggleButton?.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => {
      languageSearchInput?.focus();
    });
  } else {
    languagePanel.hidden = true;
    languageToggleButton?.setAttribute('aria-expanded', 'false');
    if (languageSearchInput) {
      languageSearchInput.value = '';
    }
    renderLanguageOptions();
  }
}

function renderLanguageOptions() {
  if (!languageOptions) return;
  const query = normalizeSearch(languageSearchInput?.value || '');
  const matches = languages.filter((lang) => {
    if (!query) return true;
    return lang.keywords.some((keyword) => normalizeSearch(keyword).includes(query));
  });

  languageOptions.innerHTML = '';

  if (!matches.length) {
    if (languageEmpty) {
      languageEmpty.hidden = false;
      languageEmpty.textContent = dictionary[state.language].languageNoResults;
    }
    return;
  }

  if (languageEmpty) {
    languageEmpty.hidden = true;
  }

  matches.forEach((lang) => {
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'language-option';
    option.setAttribute('role', 'option');
    option.setAttribute('aria-selected', lang.code === state.language);
    option.innerHTML = `
      <span>
        <span class="language-option__name">${lang.label}</span>
        <span class="language-option__native">${lang.nativeLabel}</span>
      </span>
      <span class="language-option__status">${
        lang.available ? dictionary[state.language].languageLive : dictionary[state.language].languageComingSoon
      }</span>
    `;

    if (lang.code === state.language) {
      option.classList.add('is-active');
    }

    if (!lang.available) {
      option.classList.add('language-option--disabled');
      option.disabled = true;
      option.setAttribute('aria-disabled', 'true');
    } else {
      option.addEventListener('click', () => {
        selectLanguage(lang.code);
      });
    }

    languageOptions.appendChild(option);
  });
}

function selectLanguage(code) {
  if (state.language === code) {
    toggleLanguagePanel(false);
    return;
  }
  state.language = code;
  updateLanguageBadge();
  updateCopy();
  loadMenu();
  refreshSales();
  toggleLanguagePanel(false);
}

function updateLanguageBadge() {
  const current = languages.find((lang) => lang.code === state.language);
  if (languageCurrentLabel && current) {
    languageCurrentLabel.textContent = current.label;
  }
  if (languageCurrentCode) {
    languageCurrentCode.textContent = (current?.code || state.language).toUpperCase();
  }
  if (languageHint) {
    languageHint.textContent = dictionary[state.language].languageLabel;
  }
}

function normalizeSearch(value) {
  if (!value) return '';
  return value
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

function buildOrderPayload() {
  const formData = new FormData(orderForm);
  const paymentMethod = formData.get('payment');
  const paymentDetails = buildPaymentDetails(paymentMethod, formData);
  const preference = getPreferencePayload();

  return {
    customerName: formData.get('customerName')?.trim(),
    contact: formData.get('contact'),
    language: state.language,
    items: state.cart.map((item) => ({
      menuItemId: item.id,
      quantity: item.quantity
    })),
    preference,
    payment: {
      method: paymentMethod,
      details: paymentDetails
    }
  };
}

function getPreferencePayload() {
  const dine = state.preference.dine || 'eatIn';
  const timing = state.preference.timing || 'now';
  const confirmedAt = state.preference.confirmedAt || new Date().toISOString();

  return {
    dine,
    timing,
    timeSlot: timing === 'later' ? state.preference.timeSlot : null,
    confirmedAt
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
  if (languageSearchInput) {
    languageSearchInput.placeholder = dictionary[state.language].languageSearchPlaceholder;
  }
  if (languageSearchLabel) {
    languageSearchLabel.textContent = dictionary[state.language].languageSearchLabel;
  }
  if (languageHelper) {
    languageHelper.textContent = dictionary[state.language].languageHelper;
  }
  if (languageEmpty) {
    languageEmpty.textContent = dictionary[state.language].languageNoResults;
  }
  updateLanguageBadge();
  renderLanguageOptions();
  document.documentElement.setAttribute('lang', state.language === 'fr' ? 'fr' : 'en');
  renderCart();
  renderPaymentFields(orderForm.payment.value);
  updatePreferenceCopy();
}

function updatePreferenceSummary() {
  if (!preferenceSummary) return;
  if (!state.preference.dine || !state.preference.timing) {
    preferenceSummary.hidden = true;
    return;
  }
  preferenceSummary.hidden = false;
  if (preferenceSummaryTitle) {
    preferenceSummaryTitle.textContent = dictionary[state.language].summaryTitle;
  }
  if (preferenceSummaryChange) {
    preferenceSummaryChange.textContent = dictionary[state.language].summaryChange;
  }
  const dineText =
    state.preference.dine === 'takeOut'
      ? dictionary[state.language].summaryTakeOut
      : dictionary[state.language].summaryEatIn;
  let timeText;
  if (state.preference.timing === 'later') {
    timeText = state.preference.timeSlot
      ? dictionary[state.language].summaryLaterAt(formatSlotForDisplay(state.preference.timeSlot))
      : dictionary[state.language].summaryLaterPending;
  } else {
    timeText = dictionary[state.language].summaryNow;
  }
  if (preferenceSummaryDine) {
    preferenceSummaryDine.textContent = dineText;
  }
  if (preferenceSummaryTime) {
    preferenceSummaryTime.textContent = timeText;
  }
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

function updatePreferenceCopy() {
  if (!preferenceOverlay) return;
  const labels = {
    'preference-eyebrow': 'preferenceEyebrow',
    'preference-heading': 'preferenceHeading',
    'preference-dine-label': 'dineLabel',
    'preference-timing-label': 'timingLabel',
    'preference-eat-in': 'eatIn',
    'preference-take-out': 'takeOut',
    'preference-now': 'now',
    'preference-later': 'later',
    'preference-later-note': 'laterNote',
    'preference-time-label': 'timeLabel',
    'preference-time-hint': 'timeHint',
    'time-slot-empty-text': 'timeUnavailable',
    'time-slot-error-text': 'timeRequired'
  };
  Object.entries(labels).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = dictionary[state.language][key];
    }
  });
  if (preferenceCTA) {
    preferenceCTA.textContent = dictionary[state.language].goOrder;
  }
  if (preferenceSummaryTitle) {
    preferenceSummaryTitle.textContent = dictionary[state.language].summaryTitle;
  }
  if (preferenceSummaryChange) {
    preferenceSummaryChange.textContent = dictionary[state.language].summaryChange;
  }
  if (state.preference.timing === 'later') {
    renderTimeSlots();
  }
  updatePreferenceSummary();
}

function initializePreferenceOverlay() {
  if (!preferenceOverlay) return;
  const optionButtons = preferenceOverlay.querySelectorAll('.preference-option');
  optionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const group = button.dataset.preferenceGroup;
      const value = button.dataset.preferenceValue;
      setPreferenceValue(group, value, button);
    });
  });

  preferenceCTA?.addEventListener('click', () => {
    if (!state.preference.dine) {
      selectDefaultPreference('dine', 'eatIn');
    }
    if (!state.preference.timing) {
      selectDefaultPreference('timing', 'now');
    }
    if (state.preference.timing === 'later' && !state.preference.timeSlot) {
      showTimeSlotError(true);
      timeSlotGroup?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    showTimeSlotError(false);
    state.preference.confirmedAt = new Date().toISOString();
    closePreferenceOverlay();
    updatePreferenceSummary();
    recordPreferenceAttempt();
  });
}

function selectDefaultPreference(group, value) {
  const option = preferenceOverlay?.querySelector(
    `.preference-option[data-preference-group="${group}"][data-preference-value="${value}"]`
  );
  setPreferenceValue(group, value, option);
}

function setPreferenceValue(group, value, button) {
  state.preference[group] = value;
  const options = preferenceOverlay?.querySelectorAll(
    `.preference-option[data-preference-group="${group}"]`
  );
  options?.forEach((option) => {
    const isSelected = button ? option === button : option.dataset.preferenceValue === value;
    option.classList.toggle('is-selected', isSelected);
  });
  if (group === 'timing') {
    handleTimingSelection(value);
  }
}

function toggleLaterWarning(isVisible) {
  if (!laterWarning) return;
  laterWarning.hidden = !isVisible;
}

function openPreferenceOverlay() {
  if (!preferenceOverlay) return;
  preferenceOverlay.classList.add('is-visible');
  preferenceOverlay.removeAttribute('aria-hidden');
  syncPreferenceSelections();
}

function closePreferenceOverlay() {
  if (!preferenceOverlay) return;
  preferenceOverlay.classList.remove('is-visible');
  preferenceOverlay.setAttribute('aria-hidden', 'true');
}

function syncPreferenceSelections() {
  if (!preferenceOverlay) return;
  ['dine', 'timing'].forEach((group) => {
    const value = state.preference[group];
    if (!value) return;
    const options = preferenceOverlay.querySelectorAll(
      `.preference-option[data-preference-group="${group}"]`
    );
    options.forEach((option) => {
      option.classList.toggle('is-selected', option.dataset.preferenceValue === value);
    });
  });
  handleTimingSelection(state.preference.timing || 'now');
}

function handleTimingSelection(value) {
  const isLater = value === 'later';
  toggleLaterWarning(isLater);
  if (isLater) {
    showTimeSlotGroup();
  } else {
    hideTimeSlotGroup();
  }
}

function showTimeSlotGroup() {
  if (!timeSlotGroup) return;
  timeSlotGroup.hidden = false;
  renderTimeSlots();
}

function hideTimeSlotGroup() {
  if (!timeSlotGroup) return;
  timeSlotGroup.hidden = true;
  state.preference.timeSlot = null;
  showTimeSlotError(false);
}

function renderTimeSlots() {
  if (!timeSlotList) return;
  const slots = generateTimeSlots();
  timeSlotList.innerHTML = '';
  if (timeSlotEmptyText) {
    timeSlotEmptyText.textContent = dictionary[state.language].timeUnavailable;
  }
  if (timeSlotErrorText) {
    timeSlotErrorText.textContent = dictionary[state.language].timeRequired;
  }
  if (timeSlotLabel) {
    timeSlotLabel.textContent = dictionary[state.language].timeLabel;
  }
  if (timeSlotHint) {
    timeSlotHint.textContent = dictionary[state.language].timeHint;
  }
  if (!slots.length) {
    if (timeSlotEmpty) {
      timeSlotEmpty.hidden = false;
    }
    state.preference.timeSlot = null;
    return;
  }
  if (timeSlotEmpty) {
    timeSlotEmpty.hidden = true;
  }
  if (state.preference.timeSlot && !slots.includes(state.preference.timeSlot)) {
    state.preference.timeSlot = null;
  }
  slots.forEach((slot) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'time-slot-option';
    button.textContent = formatSlotForDisplay(slot);
    if (state.preference.timeSlot === slot) {
      button.classList.add('is-selected');
    }
    button.addEventListener('click', () => {
      state.preference.timeSlot = slot;
      timeSlotList.querySelectorAll('button').forEach((el) => el.classList.remove('is-selected'));
      button.classList.add('is-selected');
      showTimeSlotError(false);
    });
    timeSlotList.appendChild(button);
  });
}

function generateTimeSlots() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 45, 0, 0);
  if (now > end) return [];

  const slots = [];
  const nextSlot = new Date(now);
  const remainder = nextSlot.getMinutes() % 15;
  const increment = remainder === 0 ? 15 : 15 - remainder;
  nextSlot.setMinutes(nextSlot.getMinutes() + increment, 0, 0);

  while (nextSlot <= end) {
    slots.push(new Date(nextSlot).toISOString());
    nextSlot.setMinutes(nextSlot.getMinutes() + 15);
  }

  return slots;
}

function formatSlotForDisplay(slot) {
  if (!slot) return '';
  return new Intl.DateTimeFormat(state.language === 'fr' ? 'fr-FR' : 'en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(slot));
}

function showTimeSlotError(isVisible) {
  if (!timeSlotError) return;
  timeSlotError.hidden = !isVisible;
}

function recordPreferenceAttempt() {
  const payload = {
    language: state.language,
    preference: getPreferencePayload()
  };
  fetch('/api/order-attempts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).catch((error) => {
    console.error('Unable to record order attempt', error);
  });
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
