#!/bin/bash

# Navigate to the project root directory
cd "$(dirname "$0")"

# Update index.html
echo "Updating index.html..."
sed -i '' '/<button type="button" class="menu__icon icon-menu"/,/<\/button>/d' "index.html"

# Update about.html
echo "Updating about.html..."
sed -i '' '/<button type="button" class="menu__icon icon-menu"/,/<\/button>/d' "about.html"

# Update all project detail HTML files
for file in ./project/detail/*.html; do
  echo "Updating $file..."
  sed -i '' '/<button type="button" class="menu__icon icon-menu"/,/<\/button>/d' "$file"
done

echo "All header updates completed!" 