#!/bin/bash

# Find all project detail HTML files
files=$(find project/detail -name "*.html" -type f)

# Loop through each file
for file in $files; do
  echo "Processing $file"
  
  # Replace video tags with controls attribute
  sed -i '' 's/<video controls="" preload="metadata"/<video autoplay loop muted playsinline preload="metadata"/g' "$file"
  
  # Replace video tags with no attributes
  sed -i '' 's/<video src=/<video autoplay loop muted playsinline src=/g' "$file"
  
  # Replace video tags that might have autoplay but no loop/mute
  sed -i '' 's/<video autoplay="" /<video autoplay loop muted playsinline /g' "$file"
  
  # Handle any remaining video tags with controls
  sed -i '' 's/controls=""/autoplay loop muted playsinline/g' "$file"
  
  # Add additional attributes to videos that already have some attributes but might be missing others
  sed -i '' 's/autoplay="" /autoplay loop muted playsinline /g' "$file"
  
  echo "Updated $file"
done

echo "All video elements updated successfully!"
