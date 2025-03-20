// Mobile menu functionality
const iconMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');
const wrapper = document.querySelector('.wrapper');

if (iconMenu) {
  iconMenu.addEventListener('click', function() {
    document.body.classList.toggle('menu-open');
    iconMenu.classList.toggle('active');
    wrapper.classList.toggle('lock');
  });
}

// Close menu when clicking on menu items
const menuLinks = document.querySelectorAll('.menu__link');
menuLinks.forEach(link => {
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

// Theme switcher functionality
const themeSwitcher = document.querySelector('.theme-switcher');
const themeIcon = document.querySelector('.theme-icon');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

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

function updateThemeIcon(theme) {
  themeIcon.src = theme === 'dark' ? 
    'img/portfolio/moon-icon.svg' : 
    'img/portfolio/sun-icon.svg';
}

// Handle system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
  const newTheme = e.matches ? 'dark' : 'light';
  if (!localStorage.getItem('theme')) {
    document.body.classList.toggle('light-theme', newTheme === 'light');
    updateThemeIcon(newTheme);
  }
});

// Portfolio image loading optimization
const portfolioImages = document.querySelectorAll('.portfolio__item img');
portfolioImages.forEach(img => {
  img.loading = 'lazy';
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

const spollerButtons = document.querySelectorAll("[data-spoller] .spollers-faq__button");

spollerButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const currentItem = button.closest("[data-spoller]");
    const content = currentItem.querySelector(".spollers-faq__text");

    const parent = currentItem.parentNode;
    const isOneSpoller = parent.hasAttribute("data-one-spoller");

    if (isOneSpoller) {
      const allItems = parent.querySelectorAll("[data-spoller]");
      allItems.forEach((item) => {
        if (item !== currentItem) {
          const otherContent = item.querySelector(".spollers-faq__text");
          item.classList.remove("active");
          otherContent.style.maxHeight = null;
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
  });
});
