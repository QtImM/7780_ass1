# Test Checklist

Date: 2026-04-13

## Automated smoke tests (executed)

- [x] Cycle 1 HTTP server serves home page.
  - Command result: `cycle1_status=200`
  - Command result: `cycle1_contains_home=True`
- [x] Cycle 2 Express server serves root and product page.
  - Command result: `cycle2_root_status=200`
  - Command result: `cycle2_product_status=200`
  - Command result: `cycle2_product_has_checkout=True`

## Functional checks

- [x] Footer student table with `border="2"` appears on both required pages.
- [x] Product page checkout button triggers `/cart` + `/check_out` flow in frontend code.
- [ ] PayPal sandbox callback completed manually with real sandbox account.

## DB checks

- [x] SQL initialization file exists: `sql/create_tables.sql`.
- [x] DB connection tester exists: `connect.js`.
- [ ] Execute `node connect.js` against a running local MySQL instance.
