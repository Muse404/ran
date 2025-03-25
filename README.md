# 林小然个人网站 (RAN Portfolio Website)

## 技术规范 (Technical Specifications)

### 前端技术栈 (Frontend Stack)
- HTML5
- Tailwind CSS 3.0+ (通过CDN引入)
- Font Awesome 图标库 (通过CDN引入)
- 原生JavaScript

### 特性 (Features)
- 响应式设计，适配各种屏幕尺寸
- 深色/浅色模式切换，默认跟随系统设置
- 平滑滚动和过渡效果
- 内容区块加载时的淡入动画
- 图片懒加载
- 移动设备友好的导航菜单

### 结构 (Structure)
网站使用统一的HTML结构和Tailwind CSS类，确保所有页面保持一致的样式和功能。

```website/
├── index.html          # 首页/作品集页面
├── about.html          # 关于页面
├── contact.html        # 联系页面
├── services.html       # 服务页面
├── template.html       # 页面模板
├── css/                # CSS文件目录
│   ├── style.css       # 主样式文件（已不再使用，保留兼容）
│   └── reset.css       # 重置样式（已不再使用，保留兼容）
├── js/                 # JavaScript文件目录
│   └── script.js       # 主脚本文件（已不再使用，保留兼容）
├── img/                # 图片资源目录
└── project/            # 项目详情页目录
    └── detail/         # 项目详细内容
        ├── zhaox-solar.html      # 朝昔节气视觉
        ├── memory-2022.html      # 你的万象记忆2022
        ├── mixc-life.html        # 万象生活商业对外视觉
        └── ...                   # 其他项目详情页
```

## 开发指南 (Development Guide)

### 添加新页面 (Adding New Pages)
1. 复制 `template.html` 文件并重命名
2. 更新 `<title>` 标签和页面内容
3. 保持相同的头部、尾部和脚本结构

### 修改现有页面 (Modifying Existing Pages)
1. 保持统一的HTML结构和Tailwind CSS类
2. 确保深色/浅色模式适配
3. 图片添加 `loading="lazy"` 和 `class="lazy-load"` 属性以启用懒加载
4. 所有链接保持一致的过渡和交互样式

## 浏览器兼容性 (Browser Compatibility)
- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- 移动浏览器 (iOS Safari, Android Chrome)

## W3C标准合规 (W3C Standards Compliance)
所有页面均符合W3C HTML5和CSS3标准，无错误和警告。

## 数据管理 (Data Management)

项目数据采用集中化管理方式，通过以下方法实现：

1. **JSON 数据存储**: 所有项目数据存储在 `data/projects.json` 文件中，包括项目的 ID、标题、描述和配置信息。

2. **JavaScript 数据加载**: 使用 `js/projects.js` 从 JSON 文件加载数据，并提供回退方案以防加载失败。

3. **动态内容生成**: 
   - 首页的项目网格通过 JavaScript 动态生成
   - 项目详情页中的"查看更多项目"部分由 JavaScript 动态生成

### 数据文件结构

projects.json 文件结构示例：
```json
{
  "projects": [
    {
      "id": "project-id",
      "title": "项目完整标题",
      "shortTitle": "项目短标题",
      "description": "项目描述文本",
      "thumbnail": "portfolio-1.jpg",
      "featured": true
    },
    // 更多项目...
  ]
}
```

### 添加或修改项目

1. 编辑 `data/projects.json` 文件，添加或修改项目数据
2. 确保添加所需的图片资源到 `img/portfolio/` 目录
3. 创建相应的项目详情页面在 `project/detail/` 目录

### 优势

- **集中管理**: 所有项目数据在一处维护
- **一致性**: 确保整个网站的项目信息一致
- **可扩展性**: 轻松添加新项目或修改现有项目
- **性能**: 减少 HTML 文件大小，提高加载速度

## CORS Issues Resolution

To fix CORS errors and Content-Security-Policy issues in the project:

1. Modified `js/projects.js` to use hardcoded project data instead of fetching from JSON file
2. Created a custom server (`server.py`) with CORS headers:
   - Allows cross-origin requests
   - Handles OPTIONS requests properly
   - Sets proper cache control headers
3. Fixed Content-Security-Policy issues:
   - Added CSP headers directly in server response (HTTP headers)
   - Removed CSP meta tags from HTML files
   - Properly implemented frame-ancestors directive (which cannot be set via meta tags)

To run the project with CORS and proper CSP support:
```
python server.py
```

Then access the site at `http://localhost:8000`