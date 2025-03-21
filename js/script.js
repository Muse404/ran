// Mobile menu functionality
const iconMenu = document.querySelector('.icon-menu');
const navigation = document.querySelector('.header__navigation');
const wrapper = document.querySelector('.wrapper');

if (iconMenu && navigation) {
  iconMenu.addEventListener('click', function() {
    document.body.classList.toggle('menu-open');
    iconMenu.classList.toggle('active');
    wrapper.classList.toggle('lock');
  });
}

// Close menu when clicking on menu items
const navLinks = document.querySelectorAll('.header__nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    if (document.body.classList.contains('menu-open')) {
      document.body.classList.remove('menu-open');
      iconMenu.classList.remove('active');
      wrapper.classList.remove('lock');
    }
  });
});

// Back to top button functionality
const backToTopButton = document.querySelector('.back-to-top');

if (backToTopButton) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });

  backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Theme switcher functionality
const themeSwitcher = document.querySelector('.theme-switcher');
const themeIcon = document.querySelector('.theme-icon');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

if (themeSwitcher && themeIcon) {
  // Check for saved theme preference or use system preference
  const currentTheme = localStorage.getItem('theme') || 
                      (prefersDarkScheme.matches ? 'dark' : 'light');

  // Apply the current theme
  document.body.classList.toggle('light-theme', currentTheme === 'light');
  updateThemeIcon(currentTheme);

  themeSwitcher.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  // Handle system theme changes
  prefersDarkScheme.addEventListener('change', (e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    if (!localStorage.getItem('theme')) {
      document.body.classList.toggle('light-theme', newTheme === 'light');
      updateThemeIcon(newTheme);
    }
  });
}

function updateThemeIcon(theme) {
  const themeIcon = document.querySelector('.theme-icon');
  if (themeIcon) {
    // Check if image exists before setting src
    const sunIconPath = 'img/portfolio/sun-icon.svg';
    const moonIconPath = 'img/portfolio/moon-icon.svg';

    // Create test image
    const testImage = new Image();
    testImage.onload = function() {
      themeIcon.src = theme === 'dark' ? moonIconPath : sunIconPath;
    };
    testImage.onerror = function() {
      console.warn(`Theme icon not found: ${theme === 'dark' ? moonIconPath : sunIconPath}`);
      // Fallback to what we have
      themeIcon.src = moonIconPath;
    };
    
    // Test if the file exists
    testImage.src = theme === 'dark' ? moonIconPath : sunIconPath;
  }
}

// Portfolio image loading optimization
const portfolioImages = document.querySelectorAll('.portfolio__item img');
portfolioImages.forEach(img => {
  if (!img.hasAttribute('loading')) {
    img.loading = 'lazy';
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  });
});

// FAQ accordions functionality
const spollerButtons = document.querySelectorAll("[data-spoller] .spollers-faq__button");

spollerButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const currentItem = button.closest("[data-spoller]");
    const content = currentItem.querySelector(".spollers-faq__text");

    if (currentItem && content) {
      const parent = currentItem.parentNode;
      const isOneSpoller = parent && parent.hasAttribute("data-one-spoller");

      if (isOneSpoller) {
        const allItems = parent.querySelectorAll("[data-spoller]");
        allItems.forEach((item) => {
          if (item !== currentItem) {
            const otherContent = item.querySelector(".spollers-faq__text");
            if (otherContent) {
              item.classList.remove("active");
              otherContent.style.maxHeight = null;
            }
          }
        });
      }

      if (currentItem.classList.contains("active")) {
        currentItem.classList.remove("active");
        content.style.maxHeight = null;
      } else {
        currentItem.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    }
  });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.classList.toggle('light-theme', savedTheme === 'light');
    updateThemeIcon(savedTheme);
  }

  // Add active class to current page link
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.header__nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if ((currentPage === '' || currentPage === 'index.html') && href === 'index.html') {
      link.classList.add('header__nav-link_active');
    } else if (href === currentPage) {
      link.classList.add('header__nav-link_active');
    }
  });
});
