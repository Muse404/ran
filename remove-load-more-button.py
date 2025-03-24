import os
import re

def remove_load_more_buttons():
    detail_dir = 'project/detail'
    files = [f for f in os.listdir(detail_dir) if f.endswith('.html')]
    removed_count = 0
    
    for file_name in files:
        file_path = os.path.join(detail_dir, file_name)
        
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # 查找并移除Load More按钮
        updated_content = re.sub(
            r'<button id="load-more-projects" class="related-projects__load-more">Load More</button>\s*',
            '',
            content
        )
        
        if updated_content != content:
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(updated_content)
            removed_count += 1
            print(f"Removed 'Load More' button from {file_name}")
    
    print(f"Total files updated: {removed_count}")

if __name__ == "__main__":
    remove_load_more_buttons()
    print("All 'Load More' buttons have been removed!") 