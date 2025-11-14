# Café du Canal — Paris ordering system

A lightweight, self-hosted online ordering experience for a Parisian café. It exposes a JSON-based menu, multilingual guest UI, simulated payment capture (Apple Pay, credit card, PayPal) and a persistent sales ledger that mirrors a back-office account management database.

## Features

- **Menu database** — Menu items live in `data/menu.json` with pricing, imagery, composition, allergens, and EN/FR translations.
- **Multilingual storefront** — Customers toggle between English and French copy at any time.
- **Cart + ordering flow** — Guests can review allergen info, add dishes, and submit payment details.
- **Payments** — Supports three capture methods with field-level validation; details are sanitized on the server before storage.
- **Sales ledger** — Every order is written to `data/orders.json` plus a `sales-ledger.json` summary so the café can reconcile web orders with other channels.
- **Mobile-optimised UI** — A sticky toolbar keeps totals and shortcuts within thumb's reach on phones without affecting the desktop layout.
- **Order API** — `/api/orders` exposes the captured orders (with masked contact info) so back-office tools can review or reconcile submissions.

## Getting started

1. **Install dependencies** — The project is intentionally dependency-free to simplify deployment with the stock Node.js runtime.
2. **Seed the menu** — Update `data/menu.json` with your dishes. Each entry supports unlimited languages.
3. **Run the server**

   ```bash
   npm start
   ```

   The site becomes available at `http://localhost:3000`.

4. **Place a test order** — Add items, select a payment method, and submit. The order will be appended to `data/orders.json` and the dashboard tiles refresh automatically.

## Configuration

Environment variables:

| Variable | Description | Default |
| --- | --- | --- |
| `PORT` | Port for the HTTP server | `3000` |

Data files:

- `data/menu.json` — source of truth for menu content (committed).
- `data/orders.json` — runtime order log (git-ignored).
- `data/sales-ledger.json` — aggregate totals for finance (git-ignored).

## API overview

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/menu?lang=en` | Returns the multilingual menu payload used by the storefront. |
| `POST` | `/api/orders` | Accepts a cart payload, sanitises payment details, and stores the order. |
| `GET` | `/api/orders?limit=20` | Returns the most recent orders with masked contact data. |
| `GET` | `/api/orders/{id}` | Retrieves a single order from the ledger. |
| `GET` | `/api/sales` | Returns aggregate revenue, order count, and payment mix. |

## Extending

- Hook `/api/orders` into a real PSP (Stripe, Adyen, etc.) where payment tokens can be verified.
- Connect `/api/sales` to your POS/ERP via nightly syncs.
- Swap the JSON files for a relational database once scale requires it.

## Tech stack

- Node.js built-in `http` server (no Express dependency).
- Vanilla HTML/CSS/JS for the storefront UI.
- JSON files for persistence while bootstrapping the café's digital operations.
