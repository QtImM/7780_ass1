/**
 * Pro-Fit Bakehouse - Interactive JavaScript
 * Handles carousel, navigation, scroll effects, form interactions, and shopping cart
 */

// Shopping Cart State
let cart = [];

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initCarousel();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initSmoothScroll();
  initContactForm();
  initCart();
});

/**
 * Hero Carousel
 */
function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  let currentSlide = 0;
  let autoplayInterval;

  function showSlide(index) {
    // Handle wrap-around
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    // Update slides
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    currentSlide = index;
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Dot click handlers
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      stopAutoplay();
      startAutoplay();
    });
  });

  // Pause on hover
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopAutoplay);
    heroSection.addEventListener('mouseleave', startAutoplay);
  }

  // Start autoplay
  startAutoplay();

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      stopAutoplay();
      startAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      stopAutoplay();
      startAutoplay();
    }
  });
}

/**
 * Navbar Scroll Effect
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Update active nav link based on scroll position
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', () => {
    updateNavbar();
    updateActiveLink();
  });

  // Initial check
  updateNavbar();
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const links = navLinks.querySelectorAll('a');

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    toggle.classList.toggle('active');
  });

  // Close menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      toggle.classList.remove('active');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      toggle.classList.remove('active');
    }
  });
}

/**
 * Scroll Reveal Animation
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', checkReveal);

  // Initial check
  checkReveal();
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const navHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Contact Form Handler
 */
function initContactForm() {
  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Simple validation
      if (!data.name || !data.email || !data.message) {
        showNotification('Please fill in all fields', 'error');
        return;
      }

      // Simulate form submission
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
}

/**
 * Shopping Cart Functionality
 */
function initCart() {
  const cartToggle = document.getElementById('cartToggle');
  const cartClose = document.getElementById('cartClose');
  const cartWidget = document.getElementById('cartWidget');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');

  // Toggle cart visibility
  function openCart() {
    cartWidget.classList.add('open');
    cartOverlay.classList.add('open');
  }

  function closeCart() {
    cartWidget.classList.remove('open');
    cartOverlay.classList.remove('open');
  }

  if (cartToggle) {
    cartToggle.addEventListener('click', openCart);
  }

  if (cartClose) {
    cartClose.addEventListener('click', closeCart);
  }

  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
  }

  // Close cart with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
    }
  });

  // Add to cart functionality - Skip drink items (they use modal)
  document.querySelectorAll('.product-action:not(.drink-action)').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const card = button.closest('.product-card');
      const productId = card.dataset.productId;
      const productName = card.dataset.productName;
      const productPrice = parseFloat(card.dataset.productPrice);
      const productImage = card.dataset.productImage;

      addToCart({
        id: productId,
        productName: productName,
        productPrice: productPrice,
        productImage: productImage,
        quantity: 1,
        totalPrice: productPrice.toFixed(2),
        toppings: 'None',
        milk: 'None'
      });

      // Button animation
      button.style.transform = 'scale(0.9) rotate(90deg)';
      setTimeout(() => {
        button.style.transform = '';
      }, 300);

      showNotification(`${productName} added to cart!`, 'success');
    });
  });

  // Add item to cart
  function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1
      });
    }

    updateCartUI();
  }

  // Update cart quantity
  window.updateQuantity = function (productId, change) {
    const item = cart.find(item => item.id === productId);

    if (item) {
      item.quantity += change;

      if (item.quantity <= 0) {
        removeFromCart(productId);
      } else {
        updateCartUI();
      }
    }
  };

  // Remove item from cart
  window.removeFromCart = function (productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
  };

  // Update cart UI
  function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (totalItems > 0) {
      cartCount.classList.add('visible');
    } else {
      cartCount.classList.remove('visible');
    }

    // Update cart items display
    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    } else {
      cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          </div>
          <div class="cart-item-controls">
            <div class="cart-item-quantity">
              <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
              <span class="quantity-value">${item.quantity}</span>
              <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">Remove</button>
          </div>
        </div>
      `).join('');
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
  }

  // Checkout functionality
  const checkoutBtn = document.querySelector('.cart-checkout');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
      }

      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      showNotification(`Order placed! Total: $${total.toFixed(2)}`, 'success');
      cart = [];
      updateCartUI();
      closeCart();
    });
  }
}

/**
 * Show Notification Toast
 */
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" aria-label="Close">&times;</button>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 30px;
    padding: 16px 24px;
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#8B5A2B'};
    color: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 0.95rem;
    z-index: 9999;
    animation: notificationSlideIn 0.3s ease;
  `;

  // Add animation keyframes
  if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes notificationSlideIn {
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  // Auto remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = 'notificationSlideIn 0.3s ease reverse';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

/**
 * Parallax Effect for Hero (subtle)
 */
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-content');
  if (hero && window.scrollY < window.innerHeight) {
    const scrolled = window.scrollY;
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    hero.style.opacity = 1 - (scrolled / window.innerHeight);
  }
});
