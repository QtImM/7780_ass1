/**
 * Pro-Fit Bakehouse - Interactive JavaScript
 * Handles carousel, navigation, scroll effects, form interactions, and shopping cart
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initCarousel();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initSmoothScroll();
  initContactForm();
  initVideoAutoplay();
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

  if (!navbar) return;

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
  const navLinksLeft = document.getElementById('navLinksLeft');
  const navLinksRight = document.getElementById('navLinksRight');

  if (!toggle || (!navLinksLeft && !navLinksRight)) return;

  const allLinks = document.querySelectorAll('.nav-link');

  toggle.addEventListener('click', () => {
    if (navLinksLeft) navLinksLeft.classList.toggle('active');
    if (navLinksRight) navLinksRight.classList.toggle('active');
    toggle.classList.toggle('active');
  });

  // Close menu on link click
  allLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinksLeft) navLinksLeft.classList.remove('active');
      if (navLinksRight) navLinksRight.classList.remove('active');
      toggle.classList.remove('active');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    const isClickInside = toggle.contains(e.target) ||
      (navLinksLeft && navLinksLeft.contains(e.target)) ||
      (navLinksRight && navLinksRight.contains(e.target));

    if (!isClickInside) {
      if (navLinksLeft) navLinksLeft.classList.remove('active');
      if (navLinksRight) navLinksRight.classList.remove('active');
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

/**
 * Video Auto-play on Scroll
 */
function initVideoAutoplay() {
  const video = document.getElementById('promoVideo');
  const container = video?.closest('.video-container');
  const muteBtn = document.getElementById('videoMuteBtn');

  if (!video || !container) return;

  // Set initial preferences
  video.volume = 0.5; // Increased volume for better audibility
  video.muted = false; // Start by trying to play unmuted

  const updateMuteUI = () => {
    if (muteBtn) {
      if (video.muted) {
        muteBtn.classList.add('muted');
      } else {
        muteBtn.classList.remove('muted');
      }
    }
  };

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Every time it comes into view, try playing with current mute setting
        video.play().catch(error => {
          // If unmuted playback is blocked, fallback to muted
          if (!video.muted) {
            console.log("Auto-play with sound blocked, falling back to muted auto-play");
            video.muted = true;
            updateMuteUI();
            video.play().catch(e => console.error("Still blocked even muted:", e));
          }
        });
        container.classList.add('playing');
      } else {
        video.pause();
        container.classList.remove('playing');
      }
    });
  }, options);

  observer.observe(video);

  // Mute Button Handler
  if (muteBtn) {
    muteBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Don't trigger the container click
      video.muted = !video.muted;
      updateMuteUI();

      if (!video.muted && video.paused) {
        video.play();
        container.classList.add('playing');
      }
    });
  }

  // Container click: Play/Pause
  container.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      container.classList.add('playing');
    } else {
      video.pause();
      container.classList.remove('playing');
    }
  });

  // Sync UI initially
  updateMuteUI();
}
