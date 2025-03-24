#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import glob
import re

print("Adding related projects section to all project detail pages...")

# Define the related projects HTML content
RELATED_PROJECTS_HTML = """
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
"""

# Get all project detail HTML files
project_files = glob.glob("project/detail/*.html")

# Loop through each project file
for file_path in project_files:
    print(f"Processing {file_path}...")
    
    # Read the file content
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()
    
    # Skip the file if it already has the related projects section
    if "related-projects" in content:
        print(f"  - Related projects section already exists, skipping...")
        continue
    
    # Find the back-to-top button
    back_to_top_pattern = re.compile(r'(\s*<a\s+href="#"\s+class="back-to-top")')
    match = back_to_top_pattern.search(content)
    
    if not match:
        print(f"  - Could not find back-to-top button, skipping...")
        continue
    
    # Insert the related projects section before the back-to-top button
    modified_content = content[:match.start()] + RELATED_PROJECTS_HTML + content[match.start():]
    
    # Write the modified content back to the file
    with open(file_path, "w", encoding="utf-8") as file:
        file.write(modified_content)
    
    print(f"  - Added related projects section.")

print("Done! Related projects section added to all project detail pages.") 