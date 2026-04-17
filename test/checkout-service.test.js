const test = require('node:test');
const assert = require('node:assert/strict');

const {
  parseCheckoutCart,
  buildCheckoutTableRows
} = require('../checkout-service');

test('parseCheckoutCart returns only valid cart items from checkout payload', () => {
  const items = parseCheckoutCart(JSON.stringify([
    { productName: 'Protein Tart', quantity: 2, productPrice: 8.75 },
    { productName: '', quantity: 1, productPrice: 10 },
    { productName: 'Bad Qty', quantity: 0, productPrice: 5 }
  ]));

  assert.deepEqual(items, [
    { productName: 'Protein Tart', quantity: 2, productPrice: 8.75 }
  ]);
});

test('parseCheckoutCart returns an empty list for invalid payloads', () => {
  assert.deepEqual(parseCheckoutCart('not-json'), []);
  assert.deepEqual(parseCheckoutCart(JSON.stringify({ productName: 'x' })), []);
});

test('buildCheckoutTableRows converts cart items into checkout rows without database reads', () => {
  const rows = buildCheckoutTableRows([
    { productName: 'Protein Tart', quantity: 2, productPrice: 8.75 }
  ], '2026-04-17');

  assert.deepEqual(rows, [
    {
      order_date: '2026-04-17',
      product_name: 'Protein Tart',
      cart_qty: 2,
      cart_price: 8.75,
      amount: 17.5
    }
  ]);
});
