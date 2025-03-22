// Mobile menu functionality no longer needed - using horizontal layout
document.addEventListener('DOMContentLoaded', function() {
  // Responsive portfolio grid
  const portfolioGrid = document.querySelector('.portfolio__grid');
  const portfolioContainer = document.querySelector('.portfolio__container');
  
  if (portfolioGrid && portfolioContainer) {
    // Get all portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio__item');
    
    // Initial setup
    adjustPortfolioGrid();
    
    // Adjust on window resize
    window.addEventListener('resize', adjustPortfolioGrid);
    
    function adjustPortfolioGrid() {
      const windowWidth = window.innerWidth;
      
      if (windowWidth <= 576) {
        // Mobile - 1 column
        portfolioGrid.style.gridTemplateColumns = '1fr';
        portfolioGrid.style.gap = '1rem';
        portfolioGrid.style.padding = '1rem 0.5rem';
        portfolioContainer.style.padding = '0 0.75rem';
        
        // Adjust portfolio items for mobile
        portfolioItems.forEach(item => {
          const overlay = item.querySelector('.portfolio__overlay');
          const title = item.querySelector('.portfolio__title');
          
          if (title) {
            title.style.fontSize = '1.25rem';
          }
        });
      } else if (windowWidth <= 992) {
        // Tablet - 2 columns
        portfolioGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        portfolioGrid.style.gap = '0.75rem';
        portfolioGrid.style.padding = '1.5rem 0';
        portfolioContainer.style.padding = '0 1rem';
        
        // Reset portfolio items
        portfolioItems.forEach(item => {
          const title = item.querySelector('.portfolio__title');
          
          if (title) {
            title.style.fontSize = '1rem';
          }
        });
      } else if (windowWidth <= 1200) {
        // Small desktop - 3 columns
        portfolioGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        portfolioGrid.style.gap = '0.5rem';
        portfolioGrid.style.padding = '2rem 0';
        portfolioContainer.style.padding = '0 1.5rem';
        
        // Reset portfolio items
        portfolioItems.forEach(item => {
          const title = item.querySelector('.portfolio__title');
          
          if (title) {
            title.style.fontSize = '1rem';
          }
        });
      } else {
        // Large desktop - 4 columns
        portfolioGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
        portfolioGrid.style.gap = '0.25rem';
        portfolioGrid.style.padding = '2rem 0';
        portfolioContainer.style.padding = '0 0.938rem';
        
        // Reset portfolio items
        portfolioItems.forEach(item => {
          const title = item.querySelector('.portfolio__title');
          
          if (title) {
            title.style.fontSize = '1rem';
          }
        });
      }
    }
  }

  // Media protection - prevent downloading and unauthorized use
  applyMediaProtection();
});

// Back to top button functionality
const backToTopButton = document.querySelector('.back-to-top');

if (backToTopButton) {
  backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Show/hide back to top button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopButton.style.opacity = '1';
    } else {
      backToTopButton.style.opacity = '0';
    }
  });
}

/**
 * Apply protection measures to all images and videos on the page
 * - Prevents right-click downloads
 * - Disables drag-and-drop 
 * - Adds watermark class for CSS protection
 * - Uses CSS pointer-events to prevent saving
 */
function applyMediaProtection() {
  // 1. Prevent right-click context menu on media elements
  document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
      e.preventDefault();
      return false;
    }
  });

  // 2. Disable drag-and-drop for all media elements
  const allImages = document.querySelectorAll('img');
  const allVideos = document.querySelectorAll('video');

  // Process images
  allImages.forEach(img => {
    // Prevent dragging
    img.setAttribute('draggable', 'false');
    // Add protect class for CSS
    img.classList.add('protected-media');
    // Disable saving image
    img.addEventListener('mousedown', function(e) {
      if (e.button === 2) { // Right click
        e.preventDefault();
      }
    });
  });

  // Process videos
  allVideos.forEach(video => {
    // Prevent dragging
    video.setAttribute('draggable', 'false');
    // Add protect class for CSS
    video.classList.add('protected-media');
    // Disable controls by default to prevent download button
    if (!video.hasAttribute('controls')) {
      video.setAttribute('controlslist', 'nodownload');
    }
    // Add event listener to prevent right-click
    video.addEventListener('mousedown', function(e) {
      if (e.button === 2) { // Right click
        e.preventDefault();
      }
    });
  });

  // 3. Disable keyboard shortcuts commonly used for saving media
  document.addEventListener('keydown', function(e) {
    // Ctrl+S, Ctrl+U, Ctrl+Shift+I, F12
    if (
      (e.ctrlKey && (e.key === 's' || e.key === 'S' || e.key === 'u' || e.key === 'U')) ||
      (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I')) ||
      e.key === 'F12'
    ) {
      e.preventDefault();
      return false;
    }
  });

  // 4. Add protection wrapper div over videos when played (extra protection)
  allVideos.forEach(video => {
    if (!video.hasAttribute('controls')) {
      // For videos without controls, add overlay protection
      const parent = video.parentElement;
      
      // Create protection overlay that still allows clicking to play/pause
      video.addEventListener('play', function() {
        if (!parent.querySelector('.video-protection-overlay')) {
          const overlay = document.createElement('div');
          overlay.className = 'video-protection-overlay';
          overlay.addEventListener('click', function() {
            if (video.paused) {
              video.play();
            } else {
              video.pause();
            }
          });
          parent.appendChild(overlay);
        }
      });
    }
  });
} 