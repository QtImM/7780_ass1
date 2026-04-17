const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');
const {
  parseCheckoutCart,
  buildCheckoutTableRows
} = require('./checkout-service');

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

function renderCheckoutPage(username, tableRows, htmlRows, totalDue) {
  const cartStorageKeyJson = JSON.stringify('profit_cart');
  const summarySection = tableRows.length ? `
    <div class="checkout-card">
      <div class="checkout-card-header">
        <span class="section-tag">ORDER SUMMARY</span>
        <h2 class="checkout-card-title">Freshly prepared for ${escapeHtml(username)}</h2>
        <p class="checkout-card-copy">Review today's order before completing secure payment. Your selected items are listed below exactly as saved from the menu.</p>
      </div>
      <div class="checkout-table-wrap">
        <table border="2" class="checkout-table">
          <tr>
            <th>Order Date</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
          ${htmlRows}
        </table>
      </div>
      <div class="checkout-summary-row">
        <div>
          <p class="summary-label">Customer</p>
          <p class="summary-value">${escapeHtml(username)}</p>
        </div>
        <div class="total-panel">
          <span class="total-label">Total Due</span>
          <span class="total-amount">HKD ${totalDue.toFixed(2)}</span>
        </div>
      </div>
      <div class="paypal-panel">
        <div>
          <p class="summary-label">Payment</p>
          <p class="paypal-copy">Use PayPal to complete your order with the bakery's sandbox checkout flow.</p>
        </div>
        <div id="paypal-button-container" class="paypal"></div>
        <p id="payment-status" class="payment-status"></p>
      </div>
    </div>
  ` : `
    <div class="checkout-card">
      <div class="checkout-card-header">
        <span class="section-tag">ORDER SUMMARY</span>
        <h2 class="checkout-card-title">No saved order was found</h2>
        <p class="checkout-card-copy">We could not find any checkout records for <strong>${escapeHtml(username)}</strong>. Add items from the menu and try again.</p>
      </div>
      <div class="empty-state">
        <p class="empty">No order records found for this username.</p>
        <a href="/comp7780_product.html" class="btn btn-primary checkout-back-link">Return to Menu</a>
      </div>
    </div>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Checkout - Pro-Fit Bakehouse</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/index.css">
  <style>
    body {
      background: var(--color-cream-light);
      color: var(--color-text);
    }
    .checkout-page {
      min-height: 100vh;
      background:
        radial-gradient(circle at top left, rgba(232, 163, 23, 0.12), transparent 32%),
        linear-gradient(180deg, #fffaf3 0%, #f8efe3 100%);
    }
    .checkout-page .nav-link,
    .checkout-page .nav-link.active,
    .checkout-page .nav-link:visited {
      color: rgb(74, 74, 74);
    }
    .checkout-page .nav-link:hover {
      color: rgb(74, 74, 74);
      opacity: 0.8;
    }
    .checkout-page .nav-icons .nav-icon-btn svg {
      color: rgb(74, 74, 74);
      stroke: rgb(74, 74, 74);
    }
    .checkout-main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 220px 24px 72px;
    }
    .checkout-hero {
      padding: 0 0 24px;
    }
    .checkout-kicker {
      display: inline-block;
      padding: 7px 14px;
      margin-bottom: 18px;
      border-radius: 999px;
      background: rgba(232, 163, 23, 0.14);
      color: #b8841a;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
    }
    .checkout-title {
      margin-bottom: 14px;
      color: #4a3b32;
    }
    .checkout-copy {
      max-width: 840px;
      font-size: 1.15rem;
      line-height: 1.8;
      color: #6d6258;
    }
    .checkout-card {
      background: rgba(255, 252, 247, 0.92);
      border: 1px solid rgba(232, 163, 23, 0.18);
      border-radius: 28px;
      box-shadow: 0 18px 50px rgba(139, 90, 43, 0.09);
      padding: 32px;
      backdrop-filter: blur(8px);
    }
    .checkout-card-header {
      margin-bottom: 24px;
    }
    .checkout-card-title {
      margin-bottom: 10px;
      color: #5a4334;
      font-size: clamp(1.8rem, 4vw, 2.6rem);
    }
    .checkout-card-copy {
      color: #6d6258;
      font-size: 1.05rem;
      line-height: 1.75;
      max-width: 880px;
    }
    .checkout-table-wrap {
      overflow-x: auto;
      margin-bottom: 22px;
    }
    .checkout-table {
      min-width: 720px;
      width: 100%;
      border-collapse: collapse;
      background: rgba(248, 239, 227, 0.95);
      color: #8b5a2b;
      border-color: rgba(184, 132, 26, 0.38);
      overflow: hidden;
    }
    .checkout-table th,
    .checkout-table td {
      padding: 16px 18px;
      border: 1px solid rgba(184, 132, 26, 0.18);
      text-align: left;
      font-size: 1rem;
    }
    .checkout-table th {
      background: rgba(232, 163, 23, 0.14);
      color: #8b5a2b;
      font-weight: 700;
      letter-spacing: 0.03em;
    }
    .checkout-table td {
      color: #6d5542;
    }
    .checkout-table tr:nth-child(even) td {
      background: rgba(255, 255, 255, 0.24);
    }
    .checkout-summary-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }
    .summary-label {
      margin: 0 0 6px;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #b8841a;
      text-transform: uppercase;
    }
    .summary-value {
      margin: 0;
      font-size: 1.3rem;
      font-weight: 600;
      color: #5a4334;
    }
    .total-panel {
      min-width: 240px;
      padding: 18px 22px;
      border-radius: 20px;
      background: linear-gradient(135deg, rgba(232, 163, 23, 0.18), rgba(245, 230, 211, 0.92));
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
    }
    .total-label {
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #8b5a2b;
      text-transform: uppercase;
    }
    .total-amount {
      font-family: var(--font-display);
      font-size: 2rem;
      color: #8b5a2b;
    }
    .paypal-panel {
      padding-top: 22px;
      border-top: 1px solid rgba(139, 90, 43, 0.12);
    }
    .paypal-copy {
      margin: 0 0 14px;
      color: #6d6258;
    }
    .paypal {
      max-width: 420px;
    }
    .payment-status {
      margin-top: 14px;
      color: #8b5a2b;
      font-weight: 600;
    }
    .checkout-back-link {
      margin-top: 20px;
      display: inline-flex;
    }
    .empty-state {
      padding: 8px 0 0;
    }
    .empty {
      color: #7b7065;
      font-size: 1rem;
    }
    @media (max-width: 768px) {
      .checkout-main {
        padding: 220px 18px 56px;
      }
      .checkout-card {
        padding: 24px 18px;
        border-radius: 22px;
      }
      .checkout-copy,
      .checkout-card-copy {
        font-size: 1rem;
      }
      .total-panel {
        width: 100%;
      }
    }
  </style>
</head>
<body class="checkout-page">
  <header id="heading">
    <nav class="navbar" id="navbar">
      <div class="navbar-top-bar">
        <div class="team-info">Team Name: Pro-Fit Team &nbsp; Team Number: 12</div>
      </div>
      <ul class="nav-links nav-links-left" id="navLinksLeft">
        <li><a href="/comp7780_home.html" class="nav-link">Home</a></li>
        <li><a href="/comp7780_product.html" class="nav-link active">Menus</a></li>
      </ul>
      <a href="/comp7780_home.html" class="navbar-logo">
        <img src="/image/Page%201/LOGO4.png" alt="Pro-Fit Bakehouse Logo">
      </a>
      <ul class="nav-links nav-links-right" id="navLinksRight">
        <li><a href="/comp7780_home.html#about" class="nav-link">About us</a></li>
        <li><a href="#team" class="nav-link">Contact</a></li>
      </ul>
      <div class="nav-icons">
        <button class="nav-icon-btn" aria-label="Search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
    </nav>
  </header>

  <main class="checkout-main">
    <section class="checkout-hero">
      <span class="checkout-kicker">CHECKOUT</span>
      <h1 class="checkout-title">Complete Your Bakehouse Order</h1>
      <p class="checkout-copy">You're one step away from checkout. Review your selected items, confirm the total, and finish payment in a page that feels like part of the same bakery experience.</p>
    </section>
    ${summarySection}
  </main>

  <footer class="footer" id="footing">
    <div class="footer-container">
      <div class="footer-section">
        <h4>Navigation</h4>
        <ul class="footer-links">
          <li><a href="/comp7780_home.html">Home</a></li>
          <li><a href="/comp7780_product.html">Menus</a></li>
          <li><a href="/comp7780_home.html#about">About Us</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Popular</h4>
        <ul class="footer-links">
          <li><a href="/comp7780_product.html">Artisan Protein Bread</a></li>
          <li><a href="/comp7780_product.html">Pistachio Protein Shake</a></li>
          <li><a href="/comp7780_product.html">Portuguese Egg Tarts</a></li>
        </ul>
      </div>
      <div class="footer-section team-section" id="team">
        <h4>Student Information</h4>
        <table border="2" cellpadding="6" cellspacing="0" class="student-info-table">
          <tr>
            <th>Name</th>
            <th>Student ID</th>
            <th>Role</th>
          </tr>
          <tr><td>Ke Linyao</td><td>25407694</td><td>Project Manager</td></tr>
          <tr><td>Xiao Manyi</td><td>25447416</td><td>Analyst</td></tr>
          <tr><td>Qin Tian</td><td>25409182</td><td>Developer</td></tr>
          <tr><td>Huo Weijia</td><td>25407651</td><td>Developer</td></tr>
          <tr><td>Zeng Yongyi</td><td>25419811</td><td>Tester</td></tr>
          <tr><td>Rao Jianan</td><td>25469606</td><td>Tester</td></tr>
        </table>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 COMP7780 Pro-Fit Bakehouse. All rights reserved. | Made with love and protein</p>
    </div>
  </footer>

  <script src="https://www.paypal.com/sdk/js?client-id=${escapeHtml(PAYPAL_CLIENT_ID)}&currency=HKD"></script>
  <script>
    (function () {
      var navbar = document.getElementById('navbar');
      function updateNavbar() {
        if (window.scrollY > 40) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
      window.addEventListener('scroll', updateNavbar);
      updateNavbar();
    }());
    if (${tableRows.length} > 0) {
      paypal.Buttons({
        createOrder: function (_data, actions) {
          return actions.order.create({
            purchase_units: [{ amount: { value: '${totalDue.toFixed(2)}' } }]
          });
        },
        onApprove: function (_data, actions) {
          return actions.order.capture().then(function (details) {
            try {
              localStorage.removeItem(${cartStorageKeyJson});
            } catch (_error) {
              // Ignore storage errors and still show payment success.
            }

            var message = 'Payment completed by ' + details.payer.name.given_name + '.';
            var el = document.getElementById('payment-status');
            el.textContent = message + ' Your shopping cart is now cleared.';
            el.style.color = '#8b5a2b';
          });
        }
      }).render('#paypal-button-container');
    }
  </script>
</body>
</html>`;
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
      `INSERT INTO cart (cust_username, cart_order_date, product_name, cart_qty, cart_price, status)
       VALUES (?, CURDATE(), ?, ?, ?, 'cart')`,
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
  const cartItems = parseCheckoutCart(req.query.cart);
  if (!username) {
    res.status(400).send('Missing f_check_out_username');
    return;
  }

  try {
    const orderDate = new Date().toISOString().slice(0, 10);
    const tableRows = buildCheckoutTableRows(cartItems, orderDate);
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

    res.send(renderCheckoutPage(username, tableRows, htmlRows, totalDue));
  } catch (error) {
    console.error('Checkout render failed:', error.message);
    res.status(500).send('Checkout page render failed.');
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
