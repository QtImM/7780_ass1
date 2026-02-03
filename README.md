# Pro-Fit Bakehouse

A responsive, static website for **Pro-Fit Bakehouse** — an artisan bakery brand focused on high-protein, low-sugar bread and pastries.

**Slogan:** *High Protein. Low Sugar. Real Bread.*

---

## Live Demo

- **Homepage:** [https://qtimm.github.io/7780_ass1/](https://qtimm.github.io/7780_ass1/) (redirects to homepage)
- **Direct homepage:** [https://qtimm.github.io/7780_ass1/homepage.test/index.html](https://qtimm.github.io/7780_ass1/homepage.test/index.html)
- **Full menu / product page:** [https://qtimm.github.io/7780_ass1/comp7780_product.html](https://qtimm.github.io/7780_ass1/comp7780_product.html)

---

## Features

- **Homepage**
  - Hero carousel with brand imagery
  - About section, contact section, menu highlights
  - “TO OUR MENU” button linking to the full product page
  - Navigation: Home, About, Contact

- **Product / Menu page**
  - Full menu listing (e.g. Artisan Protein Bread, Pistachio Protein Shake, Portuguese Egg Tarts)
  - Add to cart with optional drink customizations (toppings, milk) via modal
  - Cart persisted across pages using `localStorage`

- **Shopping cart**
  - Badge on nav icon showing **total item quantity**
  - Slide-out cart panel with list of items
  - Per-item **+ / −** quantity controls; minus at quantity 1 removes the item
  - Cart contents kept when switching between homepage and menu page

- **Technical**
  - Static HTML/CSS/JS, no build step
  - Responsive layout, mobile-friendly nav
  - Root `index.html` redirects to homepage so the repo root URL does not 404

---

## Project structure

```
7780_ass1/
├── index.html              # Root redirect → homepage.test/index.html
├── comp7780_product.html   # Full menu & cart page
├── homepage.test/
│   ├── index.html          # Homepage
│   ├── index.css           # Styles
│   ├── script.js           # Carousel, nav, cart (homepage)
│   └── image/              # Page 1 & Page 2 assets
└── README.md
```

---

## Run locally

1. Clone the repo:
   ```bash
   git clone https://github.com/QtImM/7780_ass1.git
   cd 7780_ass1
   ```

2. Serve the folder with any static server (e.g. Python):
   ```bash
   python -m http.server 5500
   ```

3. Open in browser:
   - Homepage: [http://localhost:5500/homepage.test/index.html](http://localhost:5500/homepage.test/index.html)
   - Menu: [http://localhost:5500/comp7780_product.html](http://localhost:5500/comp7780_product.html)
   - Root (redirect): [http://localhost:5500/](http://localhost:5500/)

---

## License

For course / assignment use (COMP7780). All rights reserved.
