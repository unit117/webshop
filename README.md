# WebShop Full-stack Demo

This repository contains a bilingual menu ordering experience with a Node/Express API and a Vite + React front-end. It supports menu browsing, modifier customization, cart + checkout, a staff dashboard, authentication scaffolding (password + WebAuthn passkeys), and Stripe payments with Apple Pay + card fallbacks.

## Project structure

```
webshop/
  backend/    Express API + lowdb storage
  frontend/   React client built with Vite
```

## Backend

```
cd backend
cp .env.example .env
npm install
npm run dev
```

The API exposes:
- `/api/menu`, `/api/locations` for multilingual content
- `/api/orders`, `/api/payments` for checkout
- `/api/auth/*` for password + passkey flows
- `/api/admin/*` for menu/order management (JWT protected)

Data models for locations, menu items, modifiers, users, orders, and payments are validated with [Zod](backend/src/models/schemas.js). Multilingual fields are suffixed with `_en` and `_fr`.

## Frontend

```
cd frontend
npm install
npm run dev
```

Set `VITE_STRIPE_PUBLISHABLE_KEY` to enable Apple Pay + card payments via Stripe. The checkout page uses a Payment Request button for Apple Pay and falls back to Stripe's Payment Element.

Internationalization scaffolding lives in [`frontend/src/i18n.js`](frontend/src/i18n.js) with English + French strings. Pages include:
- Customer menu + customization experience (`/`)
- Checkout with Apple Pay/card support (`/checkout`)
- Staff/admin dashboard for orders + menu editing (`/dashboard`)

## Testing builds

- `npm run dev` in `backend` launches the API at `http://localhost:4000`.
- `npm run dev` in `frontend` serves the React app at `http://localhost:5173` (proxying API calls).
- `npm run build` in `frontend` validates the production bundle.
