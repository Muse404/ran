#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

print("Updating index.html with empty portfolio grid structure...")

# Define the updated portfolio grid HTML content (empty container structure)
UPDATED_PORTFOLIO_GRID_HTML = """
          <div class="portfolio__grid">
            <!-- Projects will be dynamically loaded from projects.js -->
          </div>
"""

# Read the index.html file
with open("index.html", "r", encoding="utf-8") as file:
    content = file.read()

# Replace the existing portfolio grid with the updated one
pattern = re.compile(r'(<div class="portfolio__grid">.*?</div>\s*</div>\s*</div>)', re.DOTALL)
updated_content = pattern.sub(f'<div class="portfolio__grid">\n            <!-- Projects will be dynamically loaded from projects.js -->\n          </div>\n        </div>\n      </section>', content)

# Write the modified content back to the file
with open("index.html", "w", encoding="utf-8") as file:
    file.write(updated_content)

print("Done! Index.html updated with empty portfolio grid structure.") 