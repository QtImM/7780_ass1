const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || 'sb';

const dbPool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'user99',
  password: process.env.DB_PASSWORD || 'user99',
  database: process.env.DB_NAME || 'comp7780',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(express.static(__dirname));

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

app.get('/', (_req, res) => {
  res.redirect('/comp7780_home.html');
});

app.get('/comp7780_home.html', (_req, res) => {
  res.sendFile(path.join(__dirname, 'comp7780_home.html'));
});

app.get('/comp7780_product.html', (_req, res) => {
  res.sendFile(path.join(__dirname, 'comp7780_product.html'));
});

app.get('/cart', async (req, res) => {
  const username = (req.query.f_username || '').trim();
  const productName = (req.query.product_name || '').trim();
  const qty = Number(req.query.qty);
  const price = Number(req.query.price);

  if (!username || !productName || !Number.isFinite(qty) || qty <= 0 || !Number.isFinite(price) || price < 0) {
    res.status(400).json({ ok: false, message: 'Invalid cart input.' });
    return;
  }

  try {
    await dbPool.execute(
      `INSERT INTO cart (cust_username, cart_order_date, product_name, cart_qty, cart_price)
       VALUES (?, CURDATE(), ?, ?, ?)`,
      [username, productName, qty, price]
    );
    res.json({ ok: true });
  } catch (error) {
    console.error('Insert cart failed:', error.message);
    res.status(500).json({ ok: false, message: 'Database insert failed.' });
  }
});

app.get('/check_out', async (req, res) => {
  const username = (req.query.f_check_out_username || '').trim();
  if (!username) {
    res.status(400).send('Missing f_check_out_username');
    return;
  }

  try {
    const [rows] = await dbPool.execute(
      `SELECT DATE_FORMAT(cart_order_date, '%Y-%m-%d') AS order_date,
              product_name,
              cart_qty,
              cart_price
       FROM cart
       WHERE cust_username = ?
       ORDER BY cart_order_date ASC, id ASC`,
      [username]
    );

    const tableRows = rows.map((row) => {
      const amount = Number(row.cart_qty) * Number(row.cart_price);
      return {
        ...row,
        amount
      };
    });

    const totalDue = tableRows.reduce((sum, row) => sum + row.amount, 0);

    const htmlRows = tableRows.map((row) => `
      <tr>
        <td>${escapeHtml(row.order_date)}</td>
        <td>${escapeHtml(row.product_name)}</td>
        <td>${escapeHtml(row.cart_qty)}</td>
        <td>${escapeHtml(Number(row.cart_price).toFixed(2))}</td>
        <td>${escapeHtml(row.amount.toFixed(2))}</td>
      </tr>
    `).join('');

    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Checkout - Green World E-shop</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 24px; color: #333; }
    table { border-collapse: collapse; width: 100%; max-width: 900px; }
    th, td { padding: 8px 10px; text-align: left; }
    h1 { margin-bottom: 10px; }
    .total { margin-top: 16px; font-size: 20px; font-weight: bold; }
    .paypal { margin-top: 20px; max-width: 420px; }
    .empty { color: #777; }
  </style>
</head>
<body>
  <h1>Checkout Summary</h1>
  <p>Customer: <strong>${escapeHtml(username)}</strong></p>
  ${tableRows.length ? `
  <table border="2">
    <tr>
      <th>Order Date</th>
      <th>Product</th>
      <th>Qty</th>
      <th>Price</th>
      <th>Amount</th>
    </tr>
    ${htmlRows}
  </table>
  <div class="total">Total Due: HKD ${totalDue.toFixed(2)}</div>
  ` : '<p class="empty">No order records found for this username.</p>'}
  <div id="paypal-button-container" class="paypal"></div>
  <p id="payment-status"></p>
  <script src="https://www.paypal.com/sdk/js?client-id=${escapeHtml(PAYPAL_CLIENT_ID)}&currency=HKD"></script>
  <script>
    if (${tableRows.length} > 0) {
      paypal.Buttons({
        createOrder: function (_data, actions) {
          return actions.order.create({
            purchase_units: [{ amount: { value: '${totalDue.toFixed(2)}' } }]
          });
        },
        onApprove: function (_data, actions) {
          return actions.order.capture().then(function (details) {
            var message = 'Payment completed by ' + details.payer.name.given_name + '.';
            var el = document.getElementById('payment-status');
            el.textContent = message;
            el.style.color = 'green';
          });
        }
      }).render('#paypal-button-container');
    }
  </script>
</body>
</html>`);
  } catch (error) {
    console.error('Checkout query failed:', error.message);
    res.status(500).send('Database query failed during checkout.');
  }
});

app.get('/health', async (_req, res) => {
  try {
    await dbPool.query('SELECT 1');
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
