// Mobile menu functionality no longer needed - using horizontal layout
document.addEventListener('DOMContentLoaded', function() {
  // Responsive portfolio grid
  const portfolioGrid = document.querySelector('.portfolio__grid');
  const portfolioContainer = document.querySelector('.portfolio__container');
  
  if (portfolioGrid && portfolioContainer) {
    // Function to generate portfolio grid items from projects data
    function generatePortfolioGrid() {
      // Check if we have projects data
      if (window.projects && window.projects.length > 0) {
        console.log('Generating portfolio grid with', window.projects.length, 'projects');
        
        // Clear existing grid content
        portfolioGrid.innerHTML = '';
        
        // Use original order from the JSON file
        // No sorting needed as we'll use the order from the JSON data
        const projectsToDisplay = [...window.projects];
        
        // Generate portfolio items
        projectsToDisplay.forEach(project => {
          // Skip projects without required properties
          if (!project.id || !project.thumbnail || !project.title) {
            console.warn('Skipping project with missing properties:', project.id || 'unknown');
            return;
          }
          
          const portfolioItem = document.createElement('div');
          portfolioItem.className = 'portfolio__item';
          
          // Check if the project detail page exists (we assume it does)
          const detailPagePath = `project/detail/${project.id}.html`;
          
          // Prepare thumbnail path
          const thumbnailPath = `img/portfolio/${project.thumbnail}`;
          
          portfolioItem.innerHTML = `
            <a href="${detailPagePath}">
              <img src="${thumbnailPath}" alt="${project.title}" loading="lazy">
              <div class="portfolio__overlay">
                <h3 class="portfolio__title">${project.shortTitle || project.title}</h3>
              </div>
            </a>
          `;
          
          portfolioGrid.appendChild(portfolioItem);
        });
        
        // Apply media protection to new items
        const newImages = portfolioGrid.querySelectorAll('img');
        newImages.forEach(img => {
          // Add error handling for images
          img.onerror = function() {
            console.warn('Failed to load image:', img.src);
            // You could set a fallback image here if needed
            // img.src = 'img/fallback.jpg';
          };
          
          img.setAttribute('draggable', 'false');
          img.classList.add('protected-media');
          img.addEventListener('mousedown', function(e) {
            if (e.button === 2) { // Right click
              e.preventDefault();
            }
          });
        });
      } else {
        console.error('No projects data available for portfolio grid');
        // Add a message to the grid to indicate no projects are available
        portfolioGrid.innerHTML = '<div class="portfolio__empty">项目数据正在加载中...</div>';
        
        // Attempt to load projects if they haven't been loaded yet
        if (typeof window.projects === 'undefined' && typeof loadProjects === 'function') {
          console.log('Attempting to load projects manually...');
          loadProjects();
        }
      }
    }
    
    // Listen for projects loaded event to generate the grid
    document.addEventListener('projectsLoaded', function() {
      console.log('Projects loaded event received, generating grid...');
      generatePortfolioGrid();
      adjustPortfolioGrid();
    });
    
    // Also try to generate grid immediately if projects are already loaded
    if (window.projects && window.projects.length > 0) {
      console.log('Projects already loaded, generating grid immediately');
      generatePortfolioGrid();
    }
    
    // Get all portfolio items
    let portfolioItems = document.querySelectorAll('.portfolio__item');
    
    // Initial setup
    adjustPortfolioGrid();
    
    // Adjust on window resize
    window.addEventListener('resize', adjustPortfolioGrid);
    
    function adjustPortfolioGrid() {
      const windowWidth = window.innerWidth;
      // Re-query portfolio items in case they've been dynamically generated
      portfolioItems = document.querySelectorAll('.portfolio__item');
      
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
  
  // Add custom play button for specific pages
  addCustomVideoPlayButton();
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
      
      // Skip if already processed
      if (video.dataset.protectionApplied === 'true') return;
      
      // Mark this video as processed
      video.dataset.protectionApplied = 'true';
      
      // Create protection overlay that still allows clicking to play/pause
      video.addEventListener('play', function() {
        // Ensure we don't create duplicate overlays
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

/**
 * Add custom circular play button to videos on specific pages
 */
function addCustomVideoPlayButton() {
  // Check if we're on one of the target pages
  const currentPath = window.location.pathname;
  const targetPages = ['zhaox-product.html', 'edu-course.html'];
  
  // Only apply custom play button to target pages
  const isTargetPage = targetPages.some(page => currentPath.includes(page));
  if (!isTargetPage) return;
  
  const videoContainers = document.querySelectorAll('.project-detail__video');
  
  videoContainers.forEach((container, index) => {
    const video = container.querySelector('video');
    if (!video) return;
    
    // Skip if this container already has custom controls or has been processed
    if (container.querySelector('.video-custom-controls') || video.dataset.hasCustomControls === 'true') return;
    
    // Mark this video as processed to avoid duplicate event listeners
    video.dataset.hasCustomControls = 'true';
    
    // Create custom controls container
    const customControls = document.createElement('div');
    customControls.className = 'video-custom-controls';
    
    // Create play button with unique data attribute for tracking
    const playButton = document.createElement('div');
    playButton.className = 'video-play-button';
    playButton.dataset.videoIndex = index; // Add data attribute to ensure uniqueness
    playButton.innerHTML = `
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 5.5V18.5L19 12L8 5.5Z" fill="#3B3B3B" stroke="#3B3B3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    
    // Add click handler
    playButton.addEventListener('click', function() {
      if (video.paused) {
        video.play();
        this.style.opacity = '0';
        setTimeout(() => {
          this.style.display = 'none';
        }, 300);
      } else {
        video.pause();
        this.style.display = 'flex';
        this.style.opacity = '1';
      }
    });
    
    // Define named event handler functions so they can be referenced
    function handleVideoPlay() {
      playButton.style.opacity = '0';
      setTimeout(() => {
        playButton.style.display = 'none';
      }, 300);
    }
    
    function handleVideoPause() {
      playButton.style.display = 'flex';
      setTimeout(() => {
        playButton.style.opacity = '1';
      }, 10);
    }
    
    // Handle video play/pause to sync custom button state
    video.addEventListener('play', handleVideoPlay);
    video.addEventListener('pause', handleVideoPause);
    
    // Add to DOM
    customControls.appendChild(playButton);
    container.appendChild(customControls);
  });
}

// Related projects slider functionality
document.addEventListener('DOMContentLoaded', function() {
  const relatedSlider = document.querySelector('.related-projects__slider');
  const prevButton = document.querySelector('.related-projects__button--prev');
  const nextButton = document.querySelector('.related-projects__button--next');
  const relatedProjectsContainer = document.querySelector('.related-projects');
  
  if (relatedSlider && prevButton && nextButton) {
    // 获取当前项目ID函数
    function getCurrentProjectId() {
      const currentPath = window.location.pathname;
      console.log('Current path:', currentPath);
      
      // Extract the project ID more robustly
      let currentProjectId = '';
      const pathParts = currentPath.split('/');
      for (let i = 0; i < pathParts.length; i++) {
        if (pathParts[i] === 'detail' && i + 1 < pathParts.length) {
          currentProjectId = pathParts[i + 1].replace('.html', '');
          break;
        }
      }
      
      // If we couldn't extract the ID from the path, try a different method
      if (!currentProjectId) {
        // Use the last segment of the path as fallback
        currentProjectId = pathParts[pathParts.length - 1].replace('.html', '');
      }
      
      console.log('Current project ID:', currentProjectId);
      return currentProjectId;
    }
    
    // 准备相关项目列表，包含当前项目
    function prepareRelatedProjects() {
      if (!projects || projects.length === 0) {
        console.error('No projects data available for related projects slider');
        return [];
      }
      
      // 获取当前项目ID
      const currentProjectId = getCurrentProjectId();
      
      // 找出当前项目在数组中的索引
      const currentIndex = projects.findIndex(project => project.id === currentProjectId);
      console.log('Current project index:', currentIndex);
      
      if (currentIndex === -1) {
        console.warn('Current project not found in projects array');
        // 如果找不到当前项目，返回所有项目
        return [...projects];
      }
      
      // 创建要显示的项目数组，完整显示所有项目
      const orderedProjects = [];
      
      // 如果当前项目不是第一个，则添加上一个项目
      if (currentIndex > 0) {
        // 添加当前项目之前的所有项目
        for (let i = 0; i < currentIndex; i++) {
          orderedProjects.push(projects[i]);
        }
      }
      
      // 添加当前项目
      orderedProjects.push({
        ...projects[currentIndex],
        isCurrent: true
      });
      
      // 添加后续项目，不重复循环
      for (let i = currentIndex + 1; i < projects.length; i++) {
        orderedProjects.push(projects[i]);
      }
      
      console.log(`Prepared ${orderedProjects.length} related projects in order`);
      return orderedProjects;
    }
    
    // 加载项目到滑块
    function loadProjects() {
      // 清空滑块内容
      relatedSlider.innerHTML = '';
      
      const relatedProjects = prepareRelatedProjects();
      
      // 不再限制显示8个项目，显示全部项目
      const projectsToDisplay = relatedProjects;
      
      console.log(`Loading ${projectsToDisplay.length} projects to slider`);
      
      if (projectsToDisplay.length === 0) {
        console.warn('No projects to display');
        return;
      }
      
      // 添加项目到滑块
      projectsToDisplay.forEach((project, index) => {
        const projectItem = document.createElement('a');
        
        // 处理当前项目的样式
        if (project.isCurrent) {
          projectItem.className = 'related-projects__item related-projects__item--current';
          projectItem.removeAttribute('href');
        } else {
          projectItem.href = `../../project/detail/${project.id}.html`;
          projectItem.className = 'related-projects__item';
          
          // 第一个项目特殊标记（不是当前项目的情况）
          if (index === 0) {
            projectItem.classList.add('related-projects__item--first');
          }
          
          // 最后一个项目特殊标记
          if (index === projectsToDisplay.length - 1) {
            projectItem.classList.add('related-projects__item--last');
          }
        }
        
        // 确保图片路径正确
        let thumbnailPath = `../../img/portfolio/${project.thumbnail}`;
        
        let itemContent = `
          <img src="${thumbnailPath}" alt="${project.title}" class="related-projects__image">
          <div class="related-projects__overlay${project.isCurrent ? ' related-projects__overlay--visible' : ''}">
            <h3 class="related-projects__name">${project.shortTitle || project.title}</h3>
        `;
        
        // 如果是当前项目，添加"Current"标记
        if (project.isCurrent) {
          itemContent += `<span class="related-projects__current-label">Current</span>`;
        }
        
        itemContent += `</div>`;
        projectItem.innerHTML = itemContent;
        
        relatedSlider.appendChild(projectItem);
      });
      
      // 为图片添加保护
      applyMediaProtection();
      
      // 初始化滑块位置，将当前项目滚动到可见区域
      scrollToCurrentProject();
      
      // 初始状态下更新按钮可见性
      updateButtonVisibility();
    }
    
    // 滚动到当前项目
    function scrollToCurrentProject() {
      const currentProject = relatedSlider.querySelector('.related-projects__item--current');
      if (currentProject) {
        // 计算滚动位置，使当前项目居中显示
        const sliderWidth = relatedSlider.offsetWidth;
        const currentProjectWidth = currentProject.offsetWidth;
        const currentProjectLeft = currentProject.offsetLeft;
        
        // 如果当前项目是第一个，滚动到最左侧
        const firstItem = relatedSlider.querySelector('.related-projects__item:first-child');
        if (firstItem && firstItem.classList.contains('related-projects__item--current')) {
          relatedSlider.scrollLeft = 0;
        } else {
          // 否则居中显示当前项目
          relatedSlider.scrollLeft = currentProjectLeft - (sliderWidth / 2) + (currentProjectWidth / 2);
        }
      }
    }
    
    // 更新按钮可见性
    function updateButtonVisibility() {
      const scrollLeft = relatedSlider.scrollLeft;
      const scrollWidth = relatedSlider.scrollWidth;
      const clientWidth = relatedSlider.clientWidth;
      const maxScroll = scrollWidth - clientWidth;
      
      // 如果滑块在最左端，禁用左侧按钮而不是隐藏
      if (scrollLeft <= 10) { // 添加小容差
        prevButton.classList.add('related-projects__button--disabled');
        prevButton.disabled = true;
      } else {
        prevButton.classList.remove('related-projects__button--disabled');
        prevButton.disabled = false;
      }
      
      // 如果滑块在最右端，禁用右侧按钮而不是隐藏
      if (scrollLeft >= maxScroll - 10) { // 添加小容差
        nextButton.classList.add('related-projects__button--disabled');
        nextButton.disabled = true;
      } else {
        nextButton.classList.remove('related-projects__button--disabled');
        nextButton.disabled = false;
      }
    }
    
    // 设置滚动量（根据可见区域和项目宽度动态计算）
    const scrollAmount = () => {
      const items = relatedSlider.querySelectorAll('.related-projects__item');
      if (items.length > 0) {
        // 获取第一个项目的宽度加间隙
        const itemWidth = items[0].offsetWidth;
        const computedStyle = window.getComputedStyle(relatedSlider);
        const gap = parseInt(computedStyle.getPropertyValue('gap') || '16');
        return itemWidth + gap;
      }
      return 300; // 默认回退值
    };
    
    // 寻找最接近指定方向的下一个项目
    const findNextItem = (direction) => {
      const items = Array.from(relatedSlider.querySelectorAll('.related-projects__item'));
      const sliderRect = relatedSlider.getBoundingClientRect();
      const sliderCenter = sliderRect.left + sliderRect.width / 2;
      
      // Get the currently centered item
      let currentCenteredItem = null;
      let currentMinDistance = Infinity;
      
      for (const item of items) {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const distance = Math.abs(itemCenter - sliderCenter);
        
        if (distance < currentMinDistance) {
          currentMinDistance = distance;
          currentCenteredItem = item;
        }
      }
      
      // Find the current item's index
      const currentIndex = currentCenteredItem ? items.indexOf(currentCenteredItem) : -1;
      
      if (currentIndex === -1) {
        // Fallback to first/last item if we can't determine current
        return direction === 'right' ? items[0] : items[items.length - 1];
      }
      
      if (direction === 'right') {
        // Get next item, but handle edge case
        const nextIndex = Math.min(currentIndex + 1, items.length - 1);
        return items[nextIndex];
      } else {
        // Get previous item, but handle edge case
        const prevIndex = Math.max(currentIndex - 1, 0);
        return items[prevIndex];
      }
    };
    
    // 向左滚动（智能滚动到上一个项目）
    prevButton.addEventListener('click', function() {
      const prevItem = findNextItem('left');
      if (prevItem) {
        // 滚动到该项目
        prevItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
        
        // 确保按钮状态更新
        setTimeout(updateButtonVisibility, 500);
      }
    });
    
    // 向右滚动（智能滚动到下一个项目）
    nextButton.addEventListener('click', function() {
      const nextItem = findNextItem('right');
      if (nextItem) {
        // 滚动到该项目
        nextItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
        
        // 确保按钮状态更新
        setTimeout(updateButtonVisibility, 500);
      }
    });
    
    // 监听滚动事件来更新按钮可见性
    relatedSlider.addEventListener('scroll', updateButtonVisibility);
    
    // 初始化相关项目滑块
    function initRelatedProjectsSlider() {
      loadProjects();
      // 初始化时更新按钮状态
      updateButtonVisibility();
    }
    
    // 监听项目加载事件
    document.addEventListener('projectsLoaded', initRelatedProjectsSlider);
    
    // 如果项目已经加载，直接初始化滑块
    if (projects && projects.length > 0) {
      initRelatedProjectsSlider();
    }
    
    // 监听窗口大小变化，更新滑块和按钮可见性
    window.addEventListener('resize', function() {
      updateButtonVisibility();
      // 重新调整当前项目的滚动位置
      scrollToCurrentProject();
    });
  }
}); 