import os
import re

def update_section_title():
    detail_dir = 'project/detail'
    files = [f for f in os.listdir(detail_dir) if f.endswith('.html')]
    updated_count = 0
    
    for file_name in files:
        file_path = os.path.join(detail_dir, file_name)
        
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # 替换标题
        updated_content = re.sub(
            r'<h2 class="related-projects__title">查看更多项目</h2>',
            r'<h2 class="related-projects__title">More Project</h2>',
            content
        )
        
        if updated_content != content:
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(updated_content)
            updated_count += 1
            print(f"Updated {file_name}")
    
    print(f"Total updated files: {updated_count}")

if __name__ == "__main__":
    update_section_title()
    print("Section title update complete!") 