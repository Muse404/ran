document.querySelector(".icon-menu").addEventListener("click", function (event) {
  event.preventDefault();
  document.body.classList.toggle("menu-open");
});

// Theme switcher functionality
const themeSwitcher = document.querySelector(".theme-switcher");
const themeIcon = document.querySelector(".theme-icon");
let isDarkTheme = true; // Start with dark theme by default

if (themeSwitcher) {
  themeSwitcher.addEventListener("click", function() {
    isDarkTheme = !isDarkTheme;
    
    if (isDarkTheme) {
      document.body.style.backgroundColor = "#000000";
      document.body.style.color = "#ffffff";
      document.querySelector(".header").style.backgroundColor = "#000000";
    } else {
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#000000";
      document.querySelector(".header").style.backgroundColor = "#ffffff";
    }
    
    // Update menu links color
    const menuLinks = document.querySelectorAll(".menu__link:not(.menu__link_active)");
    menuLinks.forEach(link => {
      link.style.color = isDarkTheme ? "#ffffff" : "#000000";
    });
    
    // Could add animation or icon swap here
  });
}

// Back to top button functionality
const backToTopButton = document.querySelector(".back-to-top");

if (backToTopButton) {
  backToTopButton.addEventListener("click", function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
  
  // Show/hide button based on scroll position
  window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
      backToTopButton.style.opacity = "1";
    } else {
      backToTopButton.style.opacity = "0";
    }
  });
  
  // Initialize button state
  backToTopButton.style.opacity = window.scrollY > 300 ? "1" : "0";
  backToTopButton.style.transition = "opacity 0.3s ease";
}

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
