import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      menu: 'Menu',
      checkout: 'Checkout',
      dashboard: 'Dashboard',
      addToCart: 'Add to cart',
      customize: 'Customize',
      cart: 'Cart',
      emptyCart: 'Your cart is empty',
      total: 'Total',
      payNow: 'Pay now',
      language: 'Language',
      welcome: 'Discover seasonal beverages and pastries, available in-store or for pickup.',
      adminHeadline: 'Manage live orders and update your multilingual menu',
    },
  },
  fr: {
    translation: {
      menu: 'Menu',
      checkout: 'Paiement',
      dashboard: 'Tableau de bord',
      addToCart: 'Ajouter au panier',
      customize: 'Personnaliser',
      cart: 'Panier',
      emptyCart: 'Votre panier est vide',
      total: 'Total',
      payNow: 'Payer maintenant',
      language: 'Langue',
      welcome: 'Découvrez des boissons et pâtisseries de saison, disponibles en magasin ou à emporter.',
      adminHeadline: 'Gérez les commandes en direct et mettez à jour votre menu multilingue',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
