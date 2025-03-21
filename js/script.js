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