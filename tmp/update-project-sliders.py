#!/usr/bin/env python3
"""
Script to update all project detail pages with the improved slider.
"""
import os
import re
import glob

# Define project IDs and their corresponding titles from portfolio__title
PROJECT_TITLES = {
    "one-point": "一点万象产品视觉",
    "good-domain": "良域产品视觉",
    "cloud-node": "云结产品视觉",
    "e-space": "e-space 官网视觉",
    "one-point-marketing": "一点万象 商业营销设计",
    "zhaox-product": "朝昔 产品视觉",
    "wandering-2023": "万象漫游记2023 年度账单",
    "mixc-life": "万象生活 商业对外视觉",
    "zhaox-property": "朝昔 物业营销设计",
    "cr-mixc": "CR MIXC LIFESTYLE 主视觉",
    "zhaox-solar": "朝昔 节气视觉",
    "hello-zhaox": "你好朝昔 全国推广",
    "memory-2022": "你的万象记忆 2022",
    "one-point-7th": "一点万象 7周年",
    "icon-design": "ICON 及情感化设计",
    "edu-course": "教育产品 课程设计"
}

# Define project IDs and their corresponding file paths
PROJECT_IDS = [
    "one-point", "good-domain", "cloud-node", "e-space", "one-point-marketing",
    "zhaox-product", "wandering-2023", "mixc-life", "zhaox-property", "cr-mixc",
    "zhaox-solar", "hello-zhaox", "memory-2022", "one-point-7th", "icon-design",
    "edu-course"
]

# Load templates
with open("tmp/related-projects-template.html", "r") as f:
    slider_template = f.read()

with open("tmp/slider-script-template.html", "r") as f:
    script_template = f.read()

with open("tmp/project-items.html", "r") as f:
    all_project_items = f.read()

# Process each project detail page
for project_id in PROJECT_IDS:
    file_path = f"project/detail/{project_id}.html"
    print(f"Processing {file_path}...")
    
    if not os.path.exists(file_path):
        print(f"  Warning: File {file_path} does not exist, skipping.")
        continue
    
    with open(file_path, "r") as f:
        content = f.read()
    
    # Create the current project item HTML with the current class
    current_project_html = f"""<div class="related-projects__item related-projects__item--current">
  <img src="../../img/portfolio/portfolio-{PROJECT_IDS.index(project_id) + 1}.jpg" alt="{PROJECT_TITLES[project_id]}" class="related-projects__image protected-media">
  <div class="related-projects__overlay related-projects__overlay--visible">
    <h3 class="related-projects__name">{PROJECT_TITLES[project_id]}</h3>
    <span class="related-projects__current-label">Current</span>
  </div>
</div>"""
    
    # Replace the file extension for image files with .webp for specific projects
    if project_id in ["zhaox-property", "cr-mixc"]:
        current_project_html = current_project_html.replace('.jpg', '.webp')
    
    # Prepare the project items - all items except the current one which will be inserted separately
    project_items = all_project_items
    
    # Find the pattern for the current project's link tag
    pattern = fr'<a href="{project_id}\.html" class="related-projects__item">.*?</a>'
    
    # Remove the current project's link from all items
    project_items = re.sub(pattern, '', project_items, flags=re.DOTALL)
    
    # Find a suitable position to insert the current project item
    # We'll insert it after the project item that comes before it in the ID list
    current_idx = PROJECT_IDS.index(project_id)
    if current_idx > 0:
        before_project_id = PROJECT_IDS[current_idx - 1]
        before_pattern = fr'<a href="{before_project_id}\.html" class="related-projects__item">.*?</a>'
        # Insert current project after the previous one
        project_items = re.sub(before_pattern, lambda m: m.group(0) + '\n' + current_project_html, project_items, flags=re.DOTALL)
    else:
        # If it's the first project, insert at the beginning
        project_items = current_project_html + '\n' + project_items
    
    # Replace the related projects section in the template
    slider_content = slider_template.replace('<!-- PROJECT_ITEMS will be replaced with the actual project items -->', project_items)
    
    # Create pattern to match and replace the entire related projects section
    related_pattern = r'<!-- Related Projects Section -->.*?<section class="related-projects">.*?</section>.*?(?=<a href="#" class="back-to-top"|</main>)'
    
    # Check if the pattern exists in the content
    if re.search(related_pattern, content, re.DOTALL):
        # Replace the existing related projects section
        updated_content = re.sub(related_pattern, slider_content, content, flags=re.DOTALL)
    else:
        # If the pattern doesn't exist, add the slider before </main>
        updated_content = content.replace('</main>', f'{slider_content}\n    </main>')
    
    # First remove any duplicate slider script comments and scripts
    updated_content = re.sub(r'<!-- Add script for slider navigation buttons -->\s*', '', updated_content)
    
    # Remove any existing slider scripts
    existing_script_pattern = r'<script>\s*document\.addEventListener\(\'DOMContentLoaded\', function\(\) \{\s*const relatedSlider = document\.querySelector\(\'\.related-projects__slider\'\);.*?</script>'
    updated_content = re.sub(existing_script_pattern, '', updated_content, flags=re.DOTALL)
    
    # Fix any remaining inconsistent alt attributes for current project items
    if project_id == 'zhaox-solar':
        updated_content = re.sub(
            r'<div class="related-projects__item related-projects__item--current">\s*<img src="../../img/portfolio/portfolio-\d+\.jpg" alt="zhaox-solar"',
            f'<div class="related-projects__item related-projects__item--current">\n  <img src="../../img/portfolio/portfolio-11.jpg" alt="{PROJECT_TITLES[project_id]}"',
            updated_content
        )
    
    # Fix any remaining inconsistent alt attributes for edu-course
    updated_content = re.sub(
        r'<a href="edu-course\.html" class="related-projects__item">\s*<img src="../../img/portfolio/portfolio-\d+\.jpg" alt="一点万象 教育课程"',
        '<a href="edu-course.html" class="related-projects__item">\n  <img src="../../img/portfolio/portfolio-16.jpg" alt="教育产品 课程设计"',
        updated_content
    )
    
    # Then update the regular script tags with our custom script
    script_pattern = r'<script src="../../js/projects\.js">.*?</script>\s*<script src="../../js/script\.js">.*?</script>'
    
    # Replace the script tags with our custom script
    if re.search(script_pattern, updated_content, re.DOTALL):
        updated_content = re.sub(script_pattern, script_template, updated_content, flags=re.DOTALL)
    else:
        # If the pattern doesn't exist, add our script before </body>
        updated_content = updated_content.replace('</body>', f'{script_template}\n</body>')
    
    # Write the updated content back to the file
    with open(file_path, "w") as f:
        f.write(updated_content)
    
    print(f"  Updated {file_path} successfully.")

print("All project detail pages have been updated!") 