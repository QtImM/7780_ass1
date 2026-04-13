# Demo Steps (Assignment 2)

## 1) Start services

```bash
npm install
npm start
```

Open:

- http://localhost:3000/comp7780_home.html
- http://localhost:3000/comp7780_product.html

## 2) Place order demo

1. Open `comp7780_product.html`.
2. Add at least one product into cart.
3. Click `Checkout`.
4. Enter a username when prompted.
5. System submits cart records to `/cart` and redirects to `/check_out`.

## 3) PayPal demo (sandbox)

1. Set sandbox client id before start:

```bash
PAYPAL_CLIENT_ID=<your_paypal_sandbox_client_id>
npm start
```

2. On checkout page, click PayPal button and complete sandbox payment.
3. Verify success text appears: `Payment completed by ...`.

## 4) Key requirement mapping

- `R2`: Home page includes heading/company info/footing.
- `R3`: Product page includes heading/company info/product info/footing.
- `R4`: PayPal checkout button and callback message.
- `R5`: Users can place orders from product page.
- `R6`: Student info table in footer with `border="2"`.
