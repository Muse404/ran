import os
import re

def update_project_details():
    detail_dir = 'project/detail'
    files = [f for f in os.listdir(detail_dir) if f.endswith('.html')]
    
    for file_name in files:
        file_path = os.path.join(detail_dir, file_name)
        
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Check if projects.js is already included
        if '../../js/projects.js' in content:
            print(f"Script already included in {file_name}, skipping...")
            continue
        
        # Find the script.js reference and add projects.js before it
        updated_content = re.sub(
            r'(<script src="../../js/script.js"></script>)',
            r'<script src="../../js/projects.js"></script>\n  \1',
            content
        )
        
        if updated_content != content:
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(updated_content)
            print(f"Updated {file_name} with projects.js reference")
        else:
            print(f"Could not update {file_name}, pattern not found")

if __name__ == "__main__":
    update_project_details()
    print("Project detail pages update complete!") 