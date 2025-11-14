# Café du Canal — Paris ordering system

A lightweight, self-hosted online ordering experience for a Parisian café. It exposes a JSON-based menu, multilingual guest UI, simulated payment capture (Apple Pay, credit card, PayPal) and a persistent sales ledger that mirrors a back-office account management database.

## Features

- **Menu database** — Items now live in `data/products.json` with pricing, imagery, and metadata, while `data/product-translations.json` acts as a translation table (similar to `products`/`product_translations` rows in a relational database).
- **Multilingual storefront** — Customers toggle between English and French copy at any time.
- **Cart + ordering flow** — Guests can review allergen info, add dishes, and submit payment details.
- **Payments** — Supports three capture methods with field-level validation; details are sanitized on the server before storage.
- **Sales ledger** — Every order is written to `data/orders.json` plus a `sales-ledger.json` summary so the café can reconcile web orders with other channels.
- **Mobile-optimised UI** — A sticky toolbar keeps totals and shortcuts within thumb's reach on phones without affecting the desktop layout.
- **Order API** — `/api/orders` exposes the captured orders (with masked contact info) so back-office tools can review or reconcile submissions.
- **Account + loyalty tracking** — Guests can create username/password or email+passkey accounts, attach orders to a user, review history, and track “buy 10 drinks, get 1 free” progress.

## Getting started

1. **Install dependencies** — The project is intentionally dependency-free to simplify deployment with the stock Node.js runtime.
2. **Seed the menu** — Update `data/products.json` with your dishes, and add matching copy to `data/product-translations.json`. Each product can expose unlimited languages.
3. **Run the server**

   ```bash
   npm start
   ```

   The site becomes available at `http://localhost:3000`.

4. **Place a test order** — Add items, select a payment method, and submit. The order will be appended to `data/orders.json` and the dashboard tiles refresh automatically.

### Local data + languages

The storefront ships with fully translated English/French copy plus placeholder entries for other languages. To wire in your own locale data end-to-end:

1. **Menu translations** — Add or edit products in `data/products.json` and place every localized string inside `data/product-translations.json` (one object per `productId`/`language`). Any field that is missing will automatically fall back to English when `/api/menu` is requested.
2. **Expose the locale via the API** — Update `SUPPORTED_LANGUAGES` inside `src/server.js` so `/api/menu?lang=xx` accepts your new code. Restart `npm start` after editing so the server reloads the list.
3. **Surface the language in the UI**
   - Add an entry to the `languages` array in `public/app.js` with the language `code`, the English/native labels, and any fuzzy `keywords` you want the selector to match (e.g., `['mandarin', 'chinese', '中文']`). Set `available: true` when the locale is ready.
   - Create a JSON file under `public/locales/<lang>.json` that mirrors the keys in `public/locales/en.json` so every interface string (menu headings, onboarding copy, loyalty helper text, etc.) can be translated outside of the JavaScript bundle.
4. **Verify locally** — Restart the dev server, open the floating language switcher, search using one of the keywords you configured, and confirm the storefront reloads `/api/menu` with the new `lang` parameter while UI strings swap to your translation file.

Because the search is keyword-driven you can include multiple aliases per language (e.g., `['español', 'spanish', 'castellano']`) to make it easy for guests to find their preferred locale. Additional languages can be added offline on your Mac and synced to production when ready—the JSON files are the single source of truth for both content and UI copy.

## Configuration

Environment variables:

| Variable | Description | Default |
| --- | --- | --- |
| `PORT` | Port for the HTTP server | `3000` |

Data files:

- `data/products.json` — product catalogue with pricing and media (committed).
- `data/product-translations.json` — translation table that holds names, descriptions, and allergen text (committed).
- `data/users.json` — registered users plus loyalty counters (committed placeholder; runtime writes).
- `data/orders.json` — runtime order log (git-ignored).
- `data/sales-ledger.json` — aggregate totals for finance (git-ignored).
- `data/order-attempts.json` — dine/timing selections captured before checkout (git-ignored).

## API overview

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/menu?lang=en` | Returns the multilingual menu payload used by the storefront. |
| `POST` | `/api/orders` | Accepts a cart payload, sanitises payment details, and stores the order (optionally linking to a user). |
| `GET` | `/api/orders?limit=20` | Returns the most recent orders with masked contact data. |
| `GET` | `/api/orders/{id}` | Retrieves a single order from the ledger. |
| `POST` | `/api/order-attempts` | Records dine/timing selections from the welcome overlay for funnel analysis. |
| `GET` | `/api/users` | Lists registered users plus loyalty counters (password/passkey details stay server-side). |
| `POST` | `/api/users/username` | Creates a username/password account (usernames require ≥6 characters). |
| `POST` | `/api/users/email-passkey` | Creates an email-only account that stores a passkey reference. |
| `GET` | `/api/users/{id}/orders` | Returns the order history tied to a specific user for loyalty tracking. |
| `GET` | `/api/sales` | Returns aggregate revenue, order count, and payment mix. |

## Extending

- Hook `/api/orders` into a real PSP (Stripe, Adyen, etc.) where payment tokens can be verified.
- Connect `/api/sales` to your POS/ERP via nightly syncs.
- Swap the JSON files for a relational database once scale requires it.

## Tech stack

- Node.js built-in `http` server (no Express dependency).
- Vanilla HTML/CSS/JS for the storefront UI.
- JSON files for persistence while bootstrapping the café's digital operations.
