# Brand Copy And Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Merge the homepage company/about content into one stronger brand section and rewrite the product page intro so both pages feel like a real bakery storefront under the `Green World - Pro-Fit Bakehouse` brand.

**Architecture:** Keep the existing HTML structure where possible and make focused edits inside the two page templates. Remove the duplicate standalone company block on the homepage, rewrite copy in both pages, and soften the visual break above the product list by adjusting only product-page-local layout styles.

**Tech Stack:** Static HTML, shared CSS, inline page-level CSS

---

### Task 1: Home Page Brand Section

**Files:**
- Modify: `comp7780_home.html`

- [ ] Step 1: Remove the standalone top `COMPANY INFORMATION` section from the homepage.
- [ ] Step 2: Rename the image-and-text intro block label from `OUR STORY` to `COMPANY INFORMATION`.
- [ ] Step 3: Rewrite the heading and body copy so it combines factual company information with warm brand storytelling under `Green World - Pro-Fit Bakehouse`.
- [ ] Step 4: Preserve the existing feature list and storefront image.

### Task 2: Product Page Intro And Flow

**Files:**
- Modify: `comp7780_product.html`

- [ ] Step 1: Rewrite the product page hero heading to sound like a real bakery menu landing section.
- [ ] Step 2: Replace the current assignment-style body text with customer-facing bakery copy.
- [ ] Step 3: Reduce the visual separation between the intro and the products section using page-local spacing changes only.
- [ ] Step 4: Keep the `COMPANY INFORMATION` label so the requirement remains clearly satisfied.

### Task 3: Verification

**Files:**
- Modify: `comp7780_home.html`
- Modify: `comp7780_product.html`

- [ ] Step 1: Review both files for consistent `Green World - Pro-Fit Bakehouse` brand wording.
- [ ] Step 2: Check that the homepage no longer repeats company-story content across two separate sections.
- [ ] Step 3: Check that the product page intro naturally leads into the menu area without a large divider feel.
- [ ] Step 4: Inspect `git diff` to confirm only the intended branding, copy, and spacing edits were made.
