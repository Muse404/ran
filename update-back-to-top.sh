#!/bin/bash

# Script to update back-to-top SVG implementation across all project detail pages
# This replaces the img tag with an inline SVG for better responsive control

SVG_REPLACEMENT='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n          <path d="M9 16.5V1.5M9 1.5L1.5 9M9 1.5L16.5 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n        </svg>'

# Escape the SVG replacement for sed
ESCAPED_SVG=$(echo "$SVG_REPLACEMENT" | sed 's/\//\\\//g')

# Find all HTML files in project/detail directory
find project/detail -name "*.html" | while read -r file; do
  echo "Updating $file"
  
  # Replace the img tag with the SVG
  sed -i '' "s/<img src=\"..\/..\/img\/portfolio\/back-to-top.svg\" alt=\"Back to [Tt]op\">/$ESCAPED_SVG/" "$file"
done

echo "Back-to-top SVG update completed!" 