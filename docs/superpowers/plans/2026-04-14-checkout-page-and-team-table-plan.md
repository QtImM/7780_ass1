# Checkout Page And Team Table Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the checkout experience into a full in-site page and upgrade the student information tables on the home and product pages while preserving all current checkout and PayPal behavior.

**Architecture:** Keep the backend route structure unchanged and only replace the HTML/CSS returned by the checkout route. Update the footer tables in the two static pages with shared visual styling that preserves `border="2"` and the existing data.

**Tech Stack:** Node.js, Express, server-rendered HTML strings, static HTML, CSS

---

### Task 1: Team Table Styling

**Files:**
- Modify: `comp7780_home.html`
- Modify: `comp7780_product.html`

- [ ] Step 1: Add a reusable class for the student information tables in both pages.
- [ ] Step 2: Replace the current inline white table styling with warmer project-aligned table styling.
- [ ] Step 3: Keep `border="2"` and all member rows unchanged.
- [ ] Step 4: Check that the tables still read clearly in the dark footer.

### Task 2: Checkout Page Shell

**Files:**
- Modify: `index.js`
- Modify: `cycle3/index.js`

- [ ] Step 1: Replace the plain checkout HTML with a full branded page shell.
- [ ] Step 2: Add site-consistent navigation/header branding and footer styling inside the server-rendered response.
- [ ] Step 3: Wrap the checkout summary, table, total, and PayPal area in structured cards/sections.
- [ ] Step 4: Preserve all existing checkout data rendering and PayPal behavior.

### Task 3: Verification

**Files:**
- Modify: `index.js`
- Modify: `cycle3/index.js`
- Modify: `comp7780_home.html`
- Modify: `comp7780_product.html`

- [ ] Step 1: Review both static pages to confirm the student information tables are visually consistent.
- [ ] Step 2: Load `/health` to confirm the server remains healthy after the changes.
- [ ] Step 3: Load `/check_out?f_check_out_username=timcheckout` to confirm the checkout page still renders correctly.
- [ ] Step 4: Confirm the rendered checkout page still shows total due and the PayPal container.
