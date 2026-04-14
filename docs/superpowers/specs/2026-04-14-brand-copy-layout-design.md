# Brand Copy And Layout Design

## Goal

Refine the storefront copy and page structure so the site reads like a real bakery brand rather than an assignment handoff, while still preserving the required `company information` content for the assignment.

The unified brand name will be `Green World - Pro-Fit Bakehouse`.

## Scope

This design covers:

- `comp7780_home.html`
- `comp7780_product.html`

This design does not change:

- checkout/cart behavior
- database behavior
- PayPal flow
- footer member table requirement

## Home Page Design

### Current Problem

The homepage currently presents `COMPANY INFORMATION` and `OUR STORY` as two separate sections with overlapping content. This makes the page feel repetitive and less like a real bakery website.

### Target Design

The homepage will use a single brand-introduction section.

- Remove the standalone `COMPANY INFORMATION` section near the top of the page.
- Keep the existing image-and-text introduction block.
- Rename that block to `COMPANY INFORMATION`.
- Merge factual company details and brand story into one coherent narrative.
- Update the heading and paragraph copy so it sounds like a real bakery brand while still clearly stating the company identity and offering.

### Copy Direction

The merged section should communicate:

- Green World as the company identity
- Pro-Fit Bakehouse as the bakery brand
- Hong Kong origin and opening date
- bakery focus on high-protein and lower-sugar products
- positioning around everyday enjoyment, quality ingredients, and wellness

The tone should feel warm, credible, and customer-facing rather than technical.

## Product Page Design

### Current Problem

The product page opening reads like assignment documentation and is visually separated too strongly from the product listing below it.

### Target Design

The product page will keep a short company-introduction area, but it should feel like a menu landing header rather than a requirement label.

- Keep the top section labeled `COMPANY INFORMATION`.
- Change the title from `Green World / Pro-Fit Bakehouse Product Page` to a natural brand/menu heading.
- Replace the explanatory sentence about product information and checkout flow with customer-facing copy.
- Reduce the visual break between the intro area and the products section so the page flows naturally into the menu content.

### Copy Direction

The top section should introduce the menu as a curated bakery selection, emphasizing:

- freshly baked pastries
- protein-forward and lower-sugar choices
- handcrafted drinks and treats
- ordering for pickup or simple online purchase

## Brand Rules

- Use `Green World - Pro-Fit Bakehouse` as the primary brand wording when introducing the store.
- Avoid wording that sounds like assignment instructions, system notes, or feature checklists.
- Keep `COMPANY INFORMATION` wording where it helps satisfy the assignment requirement.

## Validation

After implementation, verify:

- homepage no longer has duplicate company-story sections
- homepage still clearly contains company information
- product page intro reads like real store copy
- product page intro transitions naturally into product listings
- no existing navigation or ordering behavior is broken
