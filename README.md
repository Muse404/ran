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