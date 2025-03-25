#!/bin/bash

# Find all project detail HTML files
files=$(find project/detail -name "*.html" -type f)

# Loop through each file
for file in $files; do
  # Skip memory-2022.html as we've already updated it
  if [[ "$file" != "project/detail/memory-2022.html" ]]; then
    # Replace the related-projects section
    sed -i '' '/<section class="related-projects"/,/<\/section>/c\
      <!-- Related Projects Section -->\
      <section class="related-projects">\
        <div class="related-projects__container">\
          <div class="related-projects__header">\
            <h2 class="related-projects__title">More Projects</h2>\
            <div class="related-projects__navigation">\
              <button class="related-projects__button related-projects__button--prev" aria-label="Previous project">\
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\
                  <path d="M10 12L6 8L10 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\
                </svg>\
              </button>\
              <button class="related-projects__button related-projects__button--next" aria-label="Next project">\
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\
                  <path d="M6 4L10 8L6 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\
                </svg>\
              </button>\
            </div>\
          </div>\
          <div class="related-projects__slider">\
            <!-- Projects will be dynamically loaded from projects.js -->\
          </div>\
        </div>\
      </section>\
' "$file"
    echo "Updated $file"
  fi
done

echo "All files updated successfully!"
