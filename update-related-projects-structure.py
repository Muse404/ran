#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import glob
import re

print("Updating project detail pages with new related projects structure...")

# Define the updated related projects HTML content (empty container structure)
UPDATED_RELATED_PROJECTS_HTML = """
      <!-- Related Projects Section -->
      <section class="related-projects">
        <div class="related-projects__container">
          <h2 class="related-projects__title">查看更多项目</h2>
          <div class="related-projects__slider">
            <!-- Projects will be dynamically loaded from projects.js -->
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
    
    # Check if the file has the related projects section
    if "related-projects" not in content:
        print(f"  - No related projects section found, skipping...")
        continue
    
    # Replace the existing related projects section with the updated one
    pattern = re.compile(r'(\s*<!-- Related Projects Section -->.*?</section>)', re.DOTALL)
    updated_content = pattern.sub(UPDATED_RELATED_PROJECTS_HTML, content)
    
    # Add projects.js script reference before the script.js reference
    if "projects.js" not in updated_content:
        updated_content = updated_content.replace(
            '<script src="../../js/script.js"></script>',
            '<script src="../../js/projects.js"></script>\n  <script src="../../js/script.js"></script>'
        )
    
    # Write the modified content back to the file
    with open(file_path, "w", encoding="utf-8") as file:
        file.write(updated_content)
    
    print(f"  - Updated related projects section.")

print("Done! All project detail pages updated with new related projects structure.") 