# Checkout Page And Team Table Design

## Goal

Make the checkout experience look like a real page inside the Pro-Fit Bakehouse site while keeping the existing checkout behavior and PayPal flow unchanged.

At the same time, restyle the student information tables on the home and product pages so they feel intentional, match the project palette, and still satisfy the assignment requirement for `table border="2"`.

## Scope

This design covers:

- `index.js`
- `cycle3/index.js`
- `comp7780_home.html`
- `comp7780_product.html`

This design does not change:

- cart insertion logic
- checkout query logic
- PayPal integration logic
- student table data values

## Checkout Page Design

### Current Problem

The current checkout page is a plain server-rendered HTML response with default browser styles. It does not visually match the rest of the bakery site.

### Target Design

The checkout page should look like a full site page, not a utility screen.

- Add the same visual language used across the bakery site:
  - warm cream background
  - bakery brand colors
  - fixed navigation/header treatment
  - refined typography using the same font family choices
  - structured content sections with rounded cards
- Keep the checkout page simple and stable by rendering everything from the existing server route.
- Present the checkout data in a styled summary card with:
  - page heading
  - customer name
  - order table
  - total due
  - PayPal action area
- Keep the page readable on desktop and mobile.

### Layout Direction

Use a lightweight page shell:

- top navigation/brand area matching the existing site
- compact hero-style intro area for the checkout page
- central checkout summary card
- footer matching the site

The page should feel like a continuation of the product page flow.

## Team Table Design

### Current Problem

The current student information tables are functionally correct but visually raw. Their white background and default cell appearance feel disconnected from the site design.

### Target Design

Restyle the existing tables while keeping `border="2"` in place.

- Use a warm background closer to the site cream palette.
- Use golden or brown text drawn from the project palette.
- Make the table feel integrated with the footer instead of pasted in.
- Improve header emphasis and spacing.
- Preserve clear readability.

### Styling Rules

- Keep the table markup requirement intact:
  - still use table layout
  - still use `border="2"`
- Add class-based styling instead of repeating large inline style strings where practical.
- Use colors already established in the project such as:
  - bakery gold/yellow accents
  - warm brown typography
  - cream-toned backgrounds

## Verification

After implementation, verify:

- checkout still loads from `/check_out`
- total due and PayPal button still render
- checkout page visually matches the home/product pages
- student information tables on both pages still use table structure with `border="2"`
- the table background and text styling now align with the site palette
