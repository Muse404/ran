#!/bin/bash

# Script to add related projects section to all project detail pages
echo "Adding related projects section to all project detail pages..."

# Get all project detail HTML files
PROJECT_FILES=$(find project/detail -name "*.html")

# Create the related projects HTML content in a temporary file
cat > related-projects.html << 'EOF'
      <!-- Related Projects Section -->
      <section class="related-projects">
        <div class="related-projects__container">
          <h2 class="related-projects__title">查看更多项目</h2>
          <div class="related-projects__slider">
            <a href="../../project/detail/one-point.html" class="related-projects__item">
              <img src="../../img/portfolio/portfolio-2.jpg" alt="一点万象产品视觉" class="related-projects__image">
              <div class="related-projects__overlay">
                <h3 class="related-projects__name">一点万象产品视觉</h3>
              </div>
            </a>
            
            <a href="../../project/detail/good-domain.html" class="related-projects__item">
              <img src="../../img/portfolio/portfolio-1.jpg" alt="良域产品视觉" class="related-projects__image">
              <div class="related-projects__overlay">
                <h3 class="related-projects__name">良域产品视觉</h3>
              </div>
            </a>
            
            <a href="../../project/detail/cloud-node.html" class="related-projects__item">
              <img src="../../img/portfolio/portfolio-3.jpg" alt="云结产品视觉" class="related-projects__image">
              <div class="related-projects__overlay">
                <h3 class="related-projects__name">云结产品视觉</h3>
              </div>
            </a>
            
            <a href="../../project/detail/e-space.html" class="related-projects__item">
              <img src="../../img/portfolio/portfolio-4.jpg" alt="e-space 官网视觉" class="related-projects__image">
              <div class="related-projects__overlay">
                <h3 class="related-projects__name">e-space 官网视觉</h3>
              </div>
            </a>
            
            <a href="../../project/detail/wandering-2023.html" class="related-projects__item">
              <img src="../../img/portfolio/portfolio-7.jpg" alt="万象漫游记2023 年度账单" class="related-projects__image">
              <div class="related-projects__overlay">
                <h3 class="related-projects__name">万象漫游记2023 年度账单</h3>
              </div>
            </a>
            
            <a href="../../project/detail/one-point-7th.html" class="related-projects__item">
              <img src="../../img/portfolio/portfolio-14.jpg" alt="一点万象 7周年" class="related-projects__image">
              <div class="related-projects__overlay">
                <h3 class="related-projects__name">一点万象 7周年</h3>
              </div>
            </a>
          </div>
          <button class="related-projects__button related-projects__button--prev" aria-label="Previous project">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L6 8L10 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="related-projects__button related-projects__button--next" aria-label="Next project">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4L10 8L6 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </section>
EOF

# Loop through each project file
for file in $PROJECT_FILES; do
  echo "Processing $file..."
  
  # Skip the file if it already has the related projects section
  if grep -q "related-projects" "$file"; then
    echo "  - Related projects section already exists, skipping..."
    continue
  fi
  
  # Make a backup of the original file
  cp "$file" "${file}.bak"
  
  # Insert the related projects section before the back-to-top button
  sed -i '' '/class="back-to-top"/i\
'"$(cat related-projects.html)" \
  "$file"
  
  # Check if the insertion was successful
  if grep -q "related-projects" "$file"; then
    echo "  - Added related projects section."
    rm "${file}.bak"
  else
    echo "  - Failed to add related projects section, restoring from backup..."
    mv "${file}.bak" "$file"
  fi
done

# Remove the temporary file
rm -f related-projects.html

echo "Done! Related projects section added to all project detail pages." 