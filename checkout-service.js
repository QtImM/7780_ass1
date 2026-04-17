function parseCheckoutCart(rawCart) {
  if (!rawCart) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawCart);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((item) => ({
        productName: typeof item.productName === 'string' ? item.productName.trim() : '',
        quantity: Number(item.quantity),
        productPrice: Number(item.productPrice)
      }))
      .filter((item) => item.productName && Number.isFinite(item.quantity) && item.quantity > 0
        && Number.isFinite(item.productPrice) && item.productPrice >= 0);
  } catch (_error) {
    return [];
  }
}

function buildCheckoutTableRows(cartItems, orderDate) {
  return cartItems.map((item) => ({
    order_date: orderDate,
    product_name: item.productName,
    cart_qty: item.quantity,
    cart_price: item.productPrice,
    amount: item.quantity * item.productPrice
  }));
}

module.exports = {
  parseCheckoutCart,
  buildCheckoutTableRows
};
