const state = {
  language: 'en',
  menu: [],
  cart: [],
  preference: {
    dine: null,
    timing: null,
    timeSlot: null,
    confirmedAt: null
  },
  users: [],
  selectedUserId: '',
  userHistory: [],
  customization: {
    product: null,
    quantity: 1,
    selections: {}
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

const translations = {};

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
const languageSelectorLabel = document.getElementById('language-selector-label');
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
const customizationModal = document.getElementById('customization-modal');
const customizationCard = document.getElementById('customization-card');
const customizationClose = document.getElementById('customization-close');
const customizationEyebrow = document.getElementById('customization-eyebrow');
const customizationTitle = document.getElementById('customization-title');
const customizationDescription = document.getElementById('customization-description');
const customizationPrice = document.getElementById('customization-price');
const customizationOptions = document.getElementById('customization-options');
const customizationError = document.getElementById('customization-error');
const customizationSubmit = document.getElementById('customization-submit');
const customizationQuantityLabel = document.getElementById('customization-quantity-label');
const customizationQuantityValue = document.getElementById('customization-quantity-value');
const customizationQuantityDecrease = document.getElementById('customization-quantity-decrease');
const customizationQuantityIncrease = document.getElementById('customization-quantity-increase');
const customizationBackdrop = document.getElementById('customization-backdrop');
const heroEyebrow = document.getElementById('hero-eyebrow');
const heroHeading = document.getElementById('hero-heading');
const heroLead = document.getElementById('hero-lead');
const heroHours = document.getElementById('hero-hours');
const heroSalesTitle = document.getElementById('hero-sales-title');
const menuHeading = document.getElementById('menu-heading');
const cartHeading = document.getElementById('cart-heading');
const guestDetailsHeading = document.getElementById('guest-details-heading');
const labelName = document.getElementById('label-name');
const labelContact = document.getElementById('label-contact');
const paymentHeading = document.getElementById('payment-heading');
const ledgerHeading = document.getElementById('ledger-heading');
const accountPanel = document.getElementById('account-panel');
const accountHelper = document.getElementById('account-helper');
const accountSelect = document.getElementById('account-select');
const accountStatus = document.getElementById('account-status');
const accountLoyalty = document.getElementById('account-loyalty');
const accountLoyaltyTitle = document.getElementById('account-loyalty-title');
const accountLoyaltyProgress = document.getElementById('account-loyalty-progress');
const accountLoyaltyEligible = document.getElementById('account-loyalty-eligible');
const accountHistory = document.getElementById('account-history');
const accountHistoryTitle = document.getElementById('account-history-title');
const accountHistoryList = document.getElementById('account-history-list');
const accountHistoryEmpty = document.getElementById('account-history-empty');
const usernameAccountForm = document.getElementById('username-account-form');
const emailAccountForm = document.getElementById('email-account-form');
const accountFeedback = document.getElementById('account-feedback');
const accountHeading = document.getElementById('account-heading');
const accountSelectLabel = document.getElementById('account-select-label');
const accountCreateUsername = document.getElementById('account-create-username');
const accountUsernameLabel = document.getElementById('account-username-label');
const accountPasswordLabel = document.getElementById('account-password-label');
const accountCreateEmail = document.getElementById('account-create-email');
const accountEmailLabel = document.getElementById('account-email-label');
const accountPasskeyLabel = document.getElementById('account-passkey-label');
const accountPasskeyPublicLabel = document.getElementById('account-passkey-public-label');
const accountUsernameSubmit = document.getElementById('account-username-submit');
const accountEmailSubmit = document.getElementById('account-email-submit');
const preferenceEyebrow = document.getElementById('preference-eyebrow');
const preferenceHeading = document.getElementById('preference-heading');
const preferenceDineLabel = document.getElementById('preference-dine-label');
const preferenceTimingLabel = document.getElementById('preference-timing-label');
const preferenceEatIn = document.getElementById('preference-eat-in');
const preferenceTakeOut = document.getElementById('preference-take-out');
const preferenceNow = document.getElementById('preference-now');
const preferenceLater = document.getElementById('preference-later');
const preferenceLaterNote = document.getElementById('preference-later-note');
const preferenceSummaryDineText = document.getElementById('preference-summary-dine');
const preferenceSummaryTimeText = document.getElementById('preference-summary-time');

(async function init() {
  yearEl.textContent = new Date().getFullYear();
  await ensureTranslations('en');
  await applyLanguage('en', { skipMenu: true, skipSales: true });
  bindFormEvents();
  bindAccountEvents();
  initializeLanguageSelector();
  initializePreferenceOverlay();
  initializeCustomizationModal();
  renderCart();
  renderPaymentFields('applePay');
  await Promise.all([loadMenu(), refreshSales(), loadUsers()]);
})();

function bindFormEvents() {
  orderForm?.addEventListener('change', (event) => {
    if (event.target.name === 'payment') {
      renderPaymentFields(event.target.value);
    }
  });

  orderForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!state.cart.length) return;

    submitButton.disabled = true;
    formStatus.textContent = '';

    const payload = buildOrderPayload();

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.issues?.join(', ') || error.message || t('orderSubmitError'));
      }
      const data = await response.json();
      state.cart = [];
      renderCart();
      await refreshSales();
      if (state.selectedUserId) {
        await fetchUserHistory(state.selectedUserId);
      }
      formStatus.textContent = `${t('orderSubmitSuccess')} (#${data.id})`;
    } catch (error) {
      console.error(error);
      formStatus.textContent = error.message || t('orderSubmitError');
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
  preferenceSummary?.addEventListener('click', () => openPreferenceOverlay());
}

function bindAccountEvents() {
  accountSelect?.addEventListener('change', async (event) => {
    state.selectedUserId = event.target.value || '';
    updateAccountSummary();
    if (state.selectedUserId) {
      await fetchUserHistory(state.selectedUserId);
    } else {
      state.userHistory = [];
      renderAccountHistory();
    }
  });

  usernameAccountForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(usernameAccountForm);
    const username = formData.get('username')?.toString().trim();
    const password = formData.get('password')?.toString();
    const issues = [];
    if (!username || username.length < 6) {
      issues.push(t('accountUsernameTooShort'));
    }
    if (!password || password.length < 8) {
      issues.push(t('accountPasswordTooShort'));
    }
    if (issues.length) {
      accountFeedback.textContent = `${t('accountErrors')} ${issues.join(' ')}`;
      return;
    }
    await submitAccountForm('/api/users/username', {
      username,
      password
    });
    usernameAccountForm.reset();
  });

  emailAccountForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(emailAccountForm);
    const email = formData.get('email')?.toString().trim();
    const passkeyLabelValue = formData.get('passkeyLabel')?.toString().trim();
    const passkeyPublicKey = formData.get('passkeyPublicKey')?.toString().trim();
    const issues = [];
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      issues.push(t('accountEmailRequired'));
    }
    if (!passkeyLabelValue) {
      issues.push(t('accountPasskeyRequired'));
    }
    if (!passkeyPublicKey) {
      issues.push(t('accountPasskeyRequired'));
    }
    if (issues.length) {
      accountFeedback.textContent = `${t('accountErrors')} ${issues.join(' ')}`;
      return;
    }
    await submitAccountForm('/api/users/email-passkey', {
      email,
      passkeyLabel: passkeyLabelValue,
      passkeyPublicKey
    });
    emailAccountForm.reset();
  });
}

async function submitAccountForm(endpoint, payload) {
  try {
    accountFeedback.textContent = '';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.issues?.join(', ') || error.message || t('accountErrors'));
    }
    accountFeedback.textContent = t('accountSuccess');
    await loadUsers();
  } catch (error) {
    accountFeedback.textContent = error.message || t('accountErrors');
  }
}

async function ensureTranslations(lang) {
  if (translations[lang]) return translations[lang];
  const response = await fetch(`/locales/${lang}.json`);
  if (!response.ok) {
    throw new Error(`Missing locale: ${lang}`);
  }
  const data = await response.json();
  translations[lang] = data;
  return data;
}

async function applyLanguage(lang, options = {}) {
  await ensureTranslations('en');
  const nextLang = languages.find((entry) => entry.code === lang && entry.available)
    ? lang
    : 'en';
  await ensureTranslations(nextLang);
  state.language = nextLang;
  document.documentElement.lang = nextLang;
  updateStaticCopy();
  renderLanguageOptions();
  updateLanguageBadge();
  renderCart();
  renderPaymentFields(orderForm.payment.value);
  updatePreferenceSummary();
  if (!options.skipMenu) {
    await loadMenu();
  }
  if (!options.skipSales) {
    await refreshSales();
  }
}

function t(key, replacements = {}) {
  const pack = translations[state.language] || {};
  let template = pack[key];
  if (template === undefined && state.language !== 'en') {
    template = translations.en?.[key];
  }
  if (typeof template !== 'string') {
    return template || '';
  }
  return template.replace(/\{(\w+)\}/g, (_, token) => (replacements[token] ?? `{${token}}`));
}

function tp(key, count) {
  const pack = translations[state.language]?.[key] || translations.en?.[key];
  if (!pack || typeof pack !== 'object') {
    return t(key, { count });
  }
  let template = pack.plural || '';
  if (count === 0 && pack.zero) {
    template = pack.zero;
  } else if (count === 1 && pack.singular) {
    template = pack.singular;
  }
  return template.replace(/\{(\w+)\}/g, (_, token) => {
    if (token === 'count') return count;
    return `{${token}}`;
  });
}

function updateStaticCopy() {
  if (heroEyebrow) heroEyebrow.textContent = t('heroEyebrow');
  if (heroHeading) heroHeading.textContent = t('heroHeading');
  if (heroLead) heroLead.textContent = t('heroLead');
  if (heroHours) heroHours.textContent = t('heroHours');
  if (heroSalesTitle) heroSalesTitle.textContent = t('heroSalesSnapshot');
  if (menuHeading) menuHeading.textContent = t('menu');
  if (cartHeading) cartHeading.textContent = t('cart');
  if (guestDetailsHeading) guestDetailsHeading.textContent = t('guestDetails');
  if (labelName) labelName.textContent = t('name');
  if (labelContact) labelContact.textContent = t('contact');
  if (paymentHeading) paymentHeading.textContent = t('payment');
  if (ledgerHeading) ledgerHeading.textContent = t('ledgerHeading');
  if (languageHelper) languageHelper.textContent = t('languageHelper');
  if (languageEmpty) languageEmpty.textContent = t('languageNoResults');
  if (languageSearchLabel) languageSearchLabel.textContent = t('languageSearchLabel');
  if (languageSearchInput) languageSearchInput.placeholder = t('languageSearchPlaceholder');
  if (languageSelectorLabel) languageSelectorLabel.textContent = t('languageLabel');
  if (languageHint) languageHint.textContent = t('languageLabel');
  if (accountHeading) accountHeading.textContent = t('accountHeading');
  if (accountHelper) accountHelper.textContent = t('accountHelper');
  if (accountSelectLabel) accountSelectLabel.textContent = t('accountSelectLabel');
  if (accountCreateUsername) accountCreateUsername.textContent = t('accountCreateUsername');
  if (accountUsernameLabel) accountUsernameLabel.textContent = t('accountUsernameLabel');
  if (accountPasswordLabel) accountPasswordLabel.textContent = t('accountPasswordLabel');
  if (accountUsernameSubmit) accountUsernameSubmit.textContent = t('accountRegister');
  if (accountCreateEmail) accountCreateEmail.textContent = t('accountCreateEmail');
  if (accountEmailLabel) accountEmailLabel.textContent = t('accountEmailLabel');
  if (accountPasskeyLabel) accountPasskeyLabel.textContent = t('accountPasskeyLabel');
  if (accountPasskeyPublicLabel) accountPasskeyPublicLabel.textContent = t('accountPasskeyPublicKeyLabel');
  if (accountEmailSubmit) accountEmailSubmit.textContent = t('accountRegister');
  if (accountLoyaltyTitle) accountLoyaltyTitle.textContent = t('accountLoyalty');
  if (accountHistoryTitle) accountHistoryTitle.textContent = t('accountOrderHistoryTitle');
  if (accountHistoryEmpty) accountHistoryEmpty.textContent = t('accountOrderHistoryEmpty');
  if (preferenceEyebrow) preferenceEyebrow.textContent = t('preferenceEyebrow');
  if (preferenceHeading) preferenceHeading.textContent = t('preferenceHeading');
  if (preferenceDineLabel) preferenceDineLabel.textContent = t('dineLabel');
  if (preferenceTimingLabel) preferenceTimingLabel.textContent = t('timingLabel');
  if (preferenceEatIn) preferenceEatIn.textContent = t('eatIn');
  if (preferenceTakeOut) preferenceTakeOut.textContent = t('takeOut');
  if (preferenceNow) preferenceNow.textContent = t('now');
  if (preferenceLater) preferenceLater.textContent = t('later');
  if (preferenceLaterNote) preferenceLaterNote.textContent = t('laterNote');
  if (preferenceSummaryTitle) preferenceSummaryTitle.textContent = t('summaryTitle');
  if (preferenceSummaryChange) preferenceSummaryChange.textContent = t('summaryChange');
  if (preferenceCTA) preferenceCTA.textContent = t('goOrder');
  renderUserOptions();
  updateAccountSummary();
  updatePreferenceCopy();
  updateCustomizationCopy();
}

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

function renderLanguageOptions() {
  if (!languageOptions) return;
  languageOptions.innerHTML = '';
  const query = languageSearchInput?.value.trim().toLowerCase();
  const matches = languages.filter((lang) => {
    if (!query) return true;
    return lang.keywords.some((keyword) => keyword.includes(query));
  });

  if (!matches.length) {
    languageEmpty.hidden = false;
    return;
  }
  languageEmpty.hidden = true;

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
        lang.available ? t('languageLive') : t('languageComingSoon')
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

function updateLanguageBadge() {
  const current = languages.find((lang) => lang.code === state.language);
  if (languageCurrentLabel && current) {
    languageCurrentLabel.textContent = current.label;
  }
  if (languageCurrentCode) {
    languageCurrentCode.textContent = (current?.code || state.language).toUpperCase();
  }
  if (languageHint) {
    languageHint.textContent = t('languageLabel');
  }
}

function toggleLanguagePanel(show) {
  if (!languagePanel || !languageToggleButton) return;
  languagePanel.hidden = !show;
  languageToggleButton.setAttribute('aria-expanded', show ? 'true' : 'false');
}

function selectLanguage(code) {
  toggleLanguagePanel(false);
  if (state.language === code) return;
  applyLanguage(code);
}

async function loadMenu() {
  if (menuGrid) {
    menuGrid.innerHTML = `<p>${t('menuLoading')}</p>`;
  }
  try {
    const response = await fetch(`/api/menu?lang=${state.language}`);
    const data = await response.json();
    state.menu = data.items.map((item) => ({
      ...item,
      customizations: Array.isArray(item.customizations) ? item.customizations : []
    }));
    renderMenu();
  } catch (error) {
    console.error(error);
    if (menuGrid) {
      menuGrid.innerHTML = `<p>${t('menuError')}</p>`;
    }
  }
}

function renderMenu() {
  if (!menuGrid) return;
  menuGrid.innerHTML = '';
  state.menu.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'menu-card';
    const hasCustomizations = Array.isArray(item.customizations) && item.customizations.length > 0;
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
        <p><strong>${t('compositionLabel')}:</strong> ${item.composition}</p>
        <p><strong>${t('allergensLabel')}:</strong> ${item.allergens?.join(', ') || t('noAllergens')}</p>
        <div class="menu-card__tags">
          ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <button type="button" data-id="${item.id}">${
          hasCustomizations ? t('customizeButton') : t('addToOrder')
        }</button>
      </div>
    `;
    card.querySelector('button').addEventListener('click', () => {
      if (hasCustomizations) {
        openCustomizationModal(item);
      } else {
        addProductToCart(item);
      }
    });
    menuGrid.appendChild(card);
  });
}

function addProductToCart(product, quantity = 1, customizations = []) {
  const hasCustomizations = Array.isArray(customizations) && customizations.length > 0;
  if (!hasCustomizations) {
    const existing = state.cart.find(
      (entry) => entry.productId === product.id && entry.customizations.length === 0
    );
    if (existing) {
      existing.quantity += quantity;
      renderCart();
      return;
    }
  }
  state.cart.push({
    key: crypto?.randomUUID?.() || `${product.id}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    productId: product.id,
    name: product.name,
    basePrice: product.price,
    unitPrice: calculateCustomizationUnitPrice(product, customizations),
    quantity,
    customizations: customizations || []
  });
  renderCart();
}

function removeFromCart(key) {
  state.cart = state.cart.filter((item) => item.key !== key);
  renderCart();
}

function renderCart() {
  if (!cartContainer) return;
  cartContainer.innerHTML = '';
  if (!state.cart.length) {
    cartContainer.innerHTML = `<p>${t('emptyCart')}</p>`;
    cartCount.textContent = tp('cartItems', 0);
    cartTotal.textContent = formatCurrency(0);
    submitButton.disabled = true;
    updateMobileToolbar(0, 0);
    return;
  }

  state.cart.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'cart-item';
    const customizations = item.customizations?.length
      ? `<ul class="cart-item__mods">${item.customizations
          .map(
            (section) =>
              `<li><strong>${section.label}:</strong> ${section.options
                .map((option) => option.label)
                .join(', ')}</li>`
          )
          .join('')}</ul>`
      : '';
    row.innerHTML = `
      <div>
        <div class="cart-item__info">
          <div>
            <strong>${item.name}</strong>
            ${customizations}
          </div>
          <div class="cart-item__actions">
            <div class="quantity-control quantity-control--small">
              <button type="button" data-action="decrease" data-key="${item.key}" aria-label="${t(
                'cartDecrease'
              )}">−</button>
              <span>${item.quantity}</span>
              <button type="button" data-action="increase" data-key="${item.key}" aria-label="${t(
                'cartIncrease'
              )}">+</button>
            </div>
            <button type="button" class="cart-item__remove" data-action="remove" data-key="${item.key}" aria-label="${t(
              'cartRemove'
            )}">✕</button>
          </div>
        </div>
        <div class="cart-item__price">${formatCurrency(item.unitPrice * item.quantity)}</div>
      </div>
    `;
    row.querySelectorAll('[data-action]').forEach((button) => {
      const action = button.getAttribute('data-action');
      const key = button.getAttribute('data-key');
      if (action === 'remove') {
        button.addEventListener('click', () => removeFromCart(key));
      } else if (action === 'increase') {
        button.addEventListener('click', () => changeCartQuantity(key, 1));
      } else if (action === 'decrease') {
        button.addEventListener('click', () => changeCartQuantity(key, -1));
      }
    });
    cartContainer.appendChild(row);
  });

  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  cartCount.textContent = tp('cartItems', totalItems);
  cartTotal.textContent = formatCurrency(totalPrice);
  submitButton.disabled = false;
  updateMobileToolbar(totalItems, totalPrice);
}

function changeCartQuantity(key, delta) {
  const item = state.cart.find((entry) => entry.key === key);
  if (!item) return;
  const next = item.quantity + delta;
  if (next <= 0) {
    removeFromCart(key);
  } else {
    item.quantity = next;
    renderCart();
  }
}

function updateMobileToolbar(count, total) {
  if (!mobileToolbar) return;
  mobileToolbarLabel.textContent = tp('cartItems', count);
  mobileToolbarHint.textContent = t('viewCart');
  mobileToolbarTotal.textContent = formatCurrency(total);
  mobileToolbar.classList.toggle('mobile-toolbar--hidden', count === 0);
  if (mobileCartToggle) {
    mobileCartToggle.disabled = count === 0;
  }
  if (mobileCheckoutButton) {
    mobileCheckoutButton.textContent = t('goToPayment');
    mobileCheckoutButton.disabled = count === 0;
  }
}

function buildOrderPayload() {
  const formData = new FormData(orderForm);
  const paymentMethod = formData.get('payment');
  const paymentDetailsPayload = buildPaymentDetails(paymentMethod, formData);
  const preference = getPreferencePayload();
  return {
    userId: state.selectedUserId || null,
    customerName: formData.get('customerName')?.toString().trim(),
    contact: formData.get('contact'),
    language: state.language,
    items: state.cart.map((item) => ({
      menuItemId: item.productId,
      quantity: item.quantity,
      customizations: item.customizations.map((section) => ({
        id: section.id,
        options: section.options.map((option) => option.id)
      }))
    })),
    preference,
    payment: {
      method: paymentMethod,
      details: paymentDetailsPayload
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

function renderPaymentFields(method = 'applePay') {
  if (!paymentDetails) return;
  let markup = '';
  if (method === 'creditCard') {
    markup = `
      <label>
        ${t('paymentCardholder')}
        <input type="text" name="cardholder" required />
      </label>
      <label>
        ${t('paymentCardNumber')}
        <input type="text" name="cardNumber" inputmode="numeric" required />
      </label>
      <label>
        ${t('paymentExpiry')}
        <input type="text" name="cardExpiry" placeholder="MM/AA" required />
      </label>
      <label>
        ${t('paymentBrand')}
        <input type="text" name="cardBrand" />
      </label>
    `;
  } else if (method === 'paypal') {
    markup = `
      <label>
        ${t('paymentPaypal')}
        <input type="email" name="paypalAccount" placeholder="you@example.com" required />
      </label>
    `;
  } else {
    markup = `
      <p>${t('paymentAppleNote')}</p>
      <input type="hidden" name="appleDevice" value="web-device" />
    `;
  }
  paymentDetails.innerHTML = markup;
}

function updatePreferenceSummary() {
  if (!preferenceSummary) return;
  if (!state.preference.dine || !state.preference.timing) {
    preferenceSummary.hidden = true;
    return;
  }
  preferenceSummary.hidden = false;
  const dineText = state.preference.dine === 'takeOut' ? t('summaryTakeOut') : t('summaryEatIn');
  let timeText;
  if (state.preference.timing === 'later') {
    timeText = state.preference.timeSlot
      ? t('summaryLaterAt', { time: formatSlotForDisplay(state.preference.timeSlot) })
      : t('summaryLaterPending');
  } else {
    timeText = t('summaryNow');
  }
  if (preferenceSummaryDineText) {
    preferenceSummaryDineText.textContent = dineText;
  }
  if (preferenceSummaryTimeText) {
    preferenceSummaryTimeText.textContent = timeText;
  }
}

function updatePreferenceCopy() {
  if (!preferenceOverlay) return;
  const labels = {
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
      el.textContent = t(key);
    }
  });
  if (preferenceCTA) {
    preferenceCTA.textContent = t('goOrder');
  }
  if (preferenceSummaryTitle) {
    preferenceSummaryTitle.textContent = t('summaryTitle');
  }
  if (preferenceSummaryChange) {
    preferenceSummaryChange.textContent = t('summaryChange');
  }
  if (state.preference.timing === 'later') {
    renderTimeSlots();
  }
}

function initializeCustomizationModal() {
  if (!customizationModal) return;
  customizationSubmit?.addEventListener('click', handleCustomizationSubmit);
  customizationClose?.addEventListener('click', closeCustomizationModal);
  customizationBackdrop?.addEventListener('click', closeCustomizationModal);
  customizationQuantityDecrease?.addEventListener('click', () => changeCustomizationQuantity(-1));
  customizationQuantityIncrease?.addEventListener('click', () => changeCustomizationQuantity(1));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && customizationModal.classList.contains('is-visible')) {
      closeCustomizationModal();
    }
  });
}

function openCustomizationModal(product) {
  state.customization.product = product;
  state.customization.quantity = 1;
  state.customization.selections = {};
  renderCustomizationModal();
  customizationModal.classList.add('is-visible');
  customizationModal.removeAttribute('aria-hidden');
}

function closeCustomizationModal() {
  if (!customizationModal) return;
  customizationModal.classList.remove('is-visible');
  customizationModal.setAttribute('aria-hidden', 'true');
  state.customization.product = null;
  state.customization.selections = {};
  state.customization.quantity = 1;
}

function renderCustomizationModal() {
  if (!customizationModal || !state.customization.product) return;
  const product = state.customization.product;
  if (customizationEyebrow) customizationEyebrow.textContent = t('customizeEyebrow');
  if (customizationTitle) customizationTitle.textContent = t('customizeHeading', { item: product.name });
  if (customizationDescription) customizationDescription.textContent = product.description || '';
  const selections = getCustomizationSelections(product);
  const previewPrice = calculateCustomizationUnitPrice(product, selections);
  if (customizationPrice) {
    customizationPrice.textContent = t('customizePrice', { price: formatCurrency(previewPrice) });
  }
  if (customizationQuantityLabel) customizationQuantityLabel.textContent = t('customizeQuantity');
  if (customizationQuantityValue) customizationQuantityValue.textContent = state.customization.quantity;
  if (customizationSubmit) customizationSubmit.textContent = t('customizeSubmit');
  if (customizationError) customizationError.textContent = '';
  renderCustomizationOptions(product);
}

function renderCustomizationOptions(product) {
  if (!customizationOptions) return;
  customizationOptions.innerHTML = '';
  const sections = Array.isArray(product.customizations) ? product.customizations : [];
  if (!sections.length) {
    customizationOptions.innerHTML = `<p>${t('customizeNoOptions')}</p>`;
    return;
  }
  sections.forEach((section) => {
    const wrapper = document.createElement('section');
    wrapper.className = 'customization-section';
    const selectedIds = state.customization.selections[section.id] || [];
    wrapper.innerHTML = `
      <div class="customization-section__heading">
        <p>${section.label}</p>
        <span>${section.required ? t('customizeRequired') : t('customizeOptional')}</span>
      </div>
      ${section.helper ? `<p class="customization-section__helper">${section.helper}</p>` : ''}
      <div class="customization-options" role="group"></div>
    `;
    const optionsContainer = wrapper.querySelector('.customization-options');
    (section.options || []).forEach((option) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'customization-option';
      if (selectedIds.includes(option.id)) {
        button.classList.add('is-selected');
      }
      button.innerHTML = `
        <span>${option.label}</span>
        <span>${formatPriceDelta(option.priceDelta)}</span>
      `;
      button.addEventListener('click', () => toggleCustomizationOption(section, option));
      optionsContainer?.appendChild(button);
    });
    customizationOptions.appendChild(wrapper);
  });
}

function toggleCustomizationOption(section, option) {
  const current = state.customization.selections[section.id] || [];
  let next = [];
  if ((section.type || 'single') === 'single') {
    next = current.includes(option.id) ? [] : [option.id];
  } else {
    const exists = current.includes(option.id);
    if (exists) {
      next = current.filter((entry) => entry !== option.id);
    } else {
      if (section.max && current.length >= section.max) {
        next = current;
      } else {
        next = [...current, option.id];
      }
    }
  }
  state.customization.selections[section.id] = next;
  renderCustomizationModal();
}

function changeCustomizationQuantity(delta) {
  const next = Math.max(1, state.customization.quantity + delta);
  state.customization.quantity = next;
  if (customizationQuantityValue) customizationQuantityValue.textContent = next;
  if (state.customization.product) {
    const selections = getCustomizationSelections(state.customization.product);
    const previewPrice = calculateCustomizationUnitPrice(state.customization.product, selections);
    if (customizationPrice) {
      customizationPrice.textContent = t('customizePrice', { price: formatCurrency(previewPrice) });
    }
  }
}

function handleCustomizationSubmit() {
  const product = state.customization.product;
  if (!product) return;
  const sections = Array.isArray(product.customizations) ? product.customizations : [];
  const missingRequired = sections.some(
    (section) => section.required && !(state.customization.selections[section.id]?.length)
  );
  if (missingRequired) {
    if (customizationError) customizationError.textContent = t('customizeError');
    return;
  }
  const selectedSections = getCustomizationSelections(product);
  addProductToCart(product, state.customization.quantity, selectedSections);
  closeCustomizationModal();
}

function getCustomizationSelections(product) {
  if (!product?.customizations?.length) return [];
  return product.customizations
    .map((section) => {
      const selectedIds = state.customization.selections[section.id] || [];
      if (!selectedIds.length) return null;
      const options = section.options
        .filter((option) => selectedIds.includes(option.id))
        .map((option) => ({
          id: option.id,
          label: option.label,
          priceDelta: option.priceDelta || 0
        }));
      if (!options.length) return null;
      return {
        id: section.id,
        label: section.label,
        helper: section.helper,
        type: section.type,
        options
      };
    })
    .filter(Boolean);
}

function calculateCustomizationUnitPrice(product, selections) {
  const modifiers = Array.isArray(selections) ? selections : [];
  const additional = modifiers.reduce((sum, section) => {
    const delta = section.options?.reduce((optSum, option) => optSum + (option.priceDelta || 0), 0) || 0;
    return sum + delta;
  }, 0);
  return Number((product.price + additional).toFixed(2));
}

function formatPriceDelta(delta = 0) {
  if (!delta) {
    return t('customizeIncluded');
  }
  const sign = delta > 0 ? '+' : '-';
  return `${sign}${formatCurrency(Math.abs(delta))}`;
}

function updateCustomizationCopy() {
  if (customizationEyebrow) customizationEyebrow.textContent = t('customizeEyebrow');
  if (customizationQuantityLabel) customizationQuantityLabel.textContent = t('customizeQuantity');
  if (customizationSubmit) customizationSubmit.textContent = t('customizeSubmit');
  if (customizationClose) customizationClose.setAttribute('aria-label', t('customizeClose'));
  if (state.customization.product) {
    renderCustomizationModal();
  }
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
    timeSlotEmptyText.textContent = t('timeUnavailable');
  }
  if (timeSlotErrorText) {
    timeSlotErrorText.textContent = t('timeRequired');
  }
  if (timeSlotLabel) {
    timeSlotLabel.textContent = t('timeLabel');
  }
  if (timeSlotHint) {
    timeSlotHint.textContent = t('timeHint');
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
  const midday = new Date(now);
  midday.setHours(12, 0, 0, 0);
  const startPoint = now > midday ? now : midday;
  const nextSlot = new Date(startPoint);
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
    preference: getPreferencePayload(),
    userId: state.selectedUserId || null
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
    salesMeta.textContent = tp('ordersRecorded', data.totalOrders);
    paymentBreakdownEl.innerHTML = Object.entries(data.paymentBreakdown)
      .map(([method, amount]) => `<span class="payment-chip">${formatPaymentChip(method, amount)}</span>`)
      .join('');
    if (!data.lastTwentyOrders.length) {
      ledgerContainer.innerHTML = `<p>${t('ledgerEmpty')}</p>`;
    } else {
      ledgerContainer.innerHTML = data.lastTwentyOrders
        .map(
          (entry) => `
          <article class="ledger-card">
            <p><strong>${formatCurrency(entry.total)}</strong> · ${formatPaymentMethod(entry.method)}</p>
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

function formatPaymentMethod(method) {
  const labels = {
    applePay: 'Apple Pay',
    creditCard: state.language === 'fr' ? 'Carte bancaire' : 'Credit card',
    paypal: 'PayPal'
  };
  return labels[method] || method;
}

function formatPaymentChip(method, amount) {
  return t('paymentChip', { method: formatPaymentMethod(method), amount: formatCurrency(amount) });
}

async function loadUsers() {
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    state.users = data;
    if (state.selectedUserId && !state.users.some((user) => user.id === state.selectedUserId)) {
      state.selectedUserId = '';
      state.userHistory = [];
    }
    renderUserOptions();
    updateAccountSummary();
    if (state.selectedUserId) {
      await fetchUserHistory(state.selectedUserId);
    }
  } catch (error) {
    console.error('Unable to load users', error);
  }
}

function renderUserOptions() {
  if (!accountSelect) return;
  accountSelect.innerHTML = '';
  const placeholderOption = document.createElement('option');
  placeholderOption.value = '';
  placeholderOption.textContent = t('accountSelectPlaceholder');
  accountSelect.appendChild(placeholderOption);
  state.users.forEach((user) => {
    const option = document.createElement('option');
    option.value = user.id;
    option.textContent = user.username || user.email;
    if (user.id === state.selectedUserId) {
      option.selected = true;
    }
    accountSelect.appendChild(option);
  });
}

async function fetchUserHistory(userId) {
  try {
    const response = await fetch(`/api/users/${userId}/orders`);
    if (!response.ok) {
      throw new Error('Unable to load history');
    }
    const data = await response.json();
    state.userHistory = data;
    renderAccountHistory();
  } catch (error) {
    console.error(error);
  }
}

function getSelectedUser() {
  return state.users.find((user) => user.id === state.selectedUserId);
}

function updateAccountSummary() {
  const user = getSelectedUser();
  if (!accountStatus) return;
  if (!user) {
    accountStatus.textContent = t('accountStatusNone');
    if (accountLoyalty) accountLoyalty.hidden = true;
    if (accountHistory) accountHistory.hidden = true;
    return;
  }
  const displayName = user.username || user.email;
  accountStatus.textContent = t('accountStatusActive', { name: displayName });
  renderLoyalty(user);
  renderAccountHistory();
}

function renderLoyalty(user) {
  if (!accountLoyalty) return;
  accountLoyalty.hidden = false;
  const loyalty = user.loyalty || { drinkCount: 0, nextRewardIn: 10, drinksToReward: 10 };
  const drinksToReward = loyalty.drinksToReward || 10;
  const remaining = typeof loyalty.nextRewardIn === 'number' ? loyalty.nextRewardIn : drinksToReward;
  accountLoyaltyProgress.textContent = t('accountLoyaltyProgress', {
    count: loyalty.drinkCount,
    remaining
  });
  const eligible = remaining === 0;
  accountLoyaltyEligible.hidden = !eligible;
  if (!eligible) {
    accountLoyaltyEligible.textContent = '';
  } else {
    accountLoyaltyEligible.textContent = t('accountLoyaltyEligible');
  }
}

function renderAccountHistory() {
  if (!accountHistory) return;
  const user = getSelectedUser();
  if (!user) {
    accountHistory.hidden = true;
    return;
  }
  accountHistory.hidden = false;
  if (!state.userHistory.length) {
    accountHistoryEmpty.textContent = t('accountOrderHistoryEmpty');
    accountHistoryEmpty.hidden = false;
    accountHistoryList.innerHTML = '';
    return;
  }
  accountHistoryEmpty.hidden = true;
  accountHistoryList.innerHTML = state.userHistory
    .slice()
    .reverse()
    .map((entry) => {
      const total = formatCurrency(entry.total || 0);
      const when = new Date(entry.createdAt).toLocaleString(state.language === 'fr' ? 'fr-FR' : 'en-GB');
      return `<li>${t('accountHistoryEntry', { total, createdAt: when })}</li>`;
    })
    .join('');
}
