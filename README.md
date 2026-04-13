# COMP7780 Assignment 2 - Green World E-shop

This repository follows the assignment todo and requirement documents with cycle-based delivery files and a Node.js + MySQL checkout flow.

## Implemented

- `R2` / `R3`: required pages are available:
  - `comp7780_home.html`
  - `comp7780_product.html`
- `R5`: users can place orders from product page cart.
- `R6`: footer student information uses `table border="2"` on both pages.
- `ITR1`: Node.js server implementations are included:
  - Cycle 1 HTTP server: `http_server_input_file.js`
  - Cycle 2/3 Express server: `index.js`
- `ITR2`: MySQL persistence is implemented:
  - DB connection test: `connect.js`
  - SQL init script: `sql/create_tables.sql`
- `R4`: PayPal button integrated into `/check_out` (sandbox via `PAYPAL_CLIENT_ID`).

## Structure

- `comp7780_home.html`
- `comp7780_product.html`
- `http_server_input_file.js`
- `index.js`
- `connect.js`
- `sql/create_tables.sql`
- `cycle1/` `cycle2/` `cycle3/`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Initialize MySQL:

```sql
source sql/create_tables.sql;
```

3. Optional env vars:

```bash
DB_HOST=localhost
DB_USER=user99
DB_PASSWORD=user99
DB_NAME=comp7780
PAYPAL_CLIENT_ID=sb
```

4. Test DB connection:

```bash
node connect.js
```

5. Start Express server:

```bash
npm start
```

6. Open:

- `http://localhost:3000/comp7780_home.html`
- `http://localhost:3000/comp7780_product.html`

## Cycle commands

- Cycle 1:

```bash
npm run start:cycle1
```

- Cycle 2/3:

```bash
npm start
```
