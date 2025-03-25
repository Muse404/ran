#!/bin/bash

# This script adds media protection META tags to all project detail pages
# It updates the headers of HTML files to prevent content from being copied or downloaded

# Meta tags to add
META_TAGS='<meta name="robots" content="noindex, nofollow" />\n  <meta http-equiv="Content-Security-Policy" content="default-src '\''self'\''; img-src '\''self'\'' data: https:; media-src '\''self'\'' https:; script-src '\''self'\'' '\''unsafe-inline'\''; style-src '\''self'\'' '\''unsafe-inline'\'' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; frame-ancestors '\''none'\'';" />'

# Function to update HTML files
update_html_file() {
  local file="$1"
  echo "Updating $file..."
  
  # Create a temporary file
  local temp_file=$(mktemp)
  
  # Add META tags after the description META tag or after viewport if description doesn't exist
  awk -v meta="$META_TAGS" '
    /meta name="description"/ || /meta name="viewport"/ {
      print $0
      if (!found) {
        print meta
        found = 1
      }
      next
    }
    { print }
  ' "$file" > "$temp_file"
  
  # Replace the original file with the modified one
  mv "$temp_file" "$file"
  
  echo "✅ Updated $file"
}

# Update all project detail pages
echo "Updating project detail pages..."
find ./project/detail -name "*.html" -type f | while read -r file; do
  update_html_file "$file"
done

echo "✨ All project detail pages have been updated with media protection."
echo "Remember to refresh your browser cache to see the changes." 