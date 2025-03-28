/**
 * Portfolio projects data
 * This file loads project data from JSON file
 */

// Initialize projects array
let projects = [];

// Function to determine the correct path to the JSON file
function getProjectsJsonPath() {
  const currentPath = window.location.pathname;
  // Check if we're in a project detail page or on the main page
  if (currentPath.includes('/project/detail/')) {
    return '../../data/projects.json';
  } else {
    return 'data/projects.json';
  }
}

// Function to load projects
function loadProjects() {
  try {
    console.log('Loading projects from hardcoded data');
    
    // Hardcoded projects data to avoid CORS issues
    projects = [
      {
        id: "one-point",
        title: "一点万象产品视觉",
        shortTitle: "一点万象产品视觉",
        description: "为商业会员提供停车、集星、权益、资讯、商品等服务的应用",
        thumbnail: "portfolio-2.jpg",
        featured: true
      },
      {
        id: "good-domain",
        title: "良域产品视觉",
        shortTitle: "良域产品视觉",
        description: "良域产品视觉设计",
        thumbnail: "portfolio-1.jpg",
        featured: true
      },
      {
        id: "cloud-node",
        title: "云结产品视觉",
        shortTitle: "云结产品视觉",
        description: "云结产品视觉设计",
        thumbnail: "portfolio-3.jpg",
        featured: true
      },
      {
        id: "e-space",
        title: "e-space 官网视觉",
        shortTitle: "e-space 官网视觉",
        description: "e-space 官网视觉设计",
        thumbnail: "portfolio-4.jpg",
        featured: true
      },
      {
        id: "one-point-marketing",
        title: "一点万象 商业营销设计",
        shortTitle: "一点万象 商业营销设计",
        description: "一点万象商业营销设计",
        thumbnail: "portfolio-5.jpg",
        featured: true
      },
      {
        id: "zhaox-product",
        title: "朝昔 产品视觉",
        shortTitle: "朝昔 产品视觉",
        description: "朝昔产品视觉设计",
        thumbnail: "portfolio-6.jpg",
        featured: false
      },
      {
        id: "wandering-2023",
        title: "万象漫游记2023 年度账单",
        shortTitle: "万象漫游记2023 年度账单",
        description: "一点万象2023年，针对用户，进行年度消费总结",
        thumbnail: "portfolio-7.jpg",
        featured: true
      },
      {
        id: "mixc-life",
        title: "万象生活 商业对外视觉",
        shortTitle: "万象生活 商业对外视觉",
        description: "万象生活商业对外视觉设计",
        thumbnail: "portfolio-8.jpg",
        featured: false
      },
      {
        id: "zhaox-property",
        title: "朝昔 物业营销设计",
        shortTitle: "朝昔 物业营销设计",
        description: "物业产品·营销设计",
        thumbnail: "portfolio-9.webp",
        featured: false
      },
      {
        id: "cr-mixc",
        title: "CR MIXC LIFESTYLE 主视觉",
        shortTitle: "CR MIXC LIFESTYLE 主视觉",
        description: "配合华润置地及华润万象生活，面对对各个大区及部门，进行华润生态或方向等多项工作宣讲的开展，进行会议、线上及线下的主视觉及相关物料设计。",
        thumbnail: "portfolio-10.webp",
        featured: false
      },
      {
        id: "zhaox-solar",
        title: "朝昔 节气视觉",
        shortTitle: "朝昔 节气视觉",
        description: "朝昔节气视觉设计",
        thumbnail: "portfolio-11.jpg",
        featured: false
      },
      {
        id: "hello-zhaox",
        title: "你好朝昔 全国推广",
        shortTitle: "你好朝昔 全国推广",
        description: "你好朝昔全国推广设计",
        thumbnail: "portfolio-12.jpg",
        featured: false
      },
      {
        id: "memory-2022",
        title: "你的万象记忆 2022",
        shortTitle: "你的万象记忆 2022",
        description: "2022年万象记忆设计",
        thumbnail: "portfolio-13.jpg",
        featured: false
      },
      {
        id: "one-point-7th",
        title: "一点万象 7周年",
        shortTitle: "一点万象 7周年",
        description: "一点万象7周年设计",
        thumbnail: "portfolio-14.jpg",
        featured: true
      },
      {
        id: "icon-design",
        title: "ICON 及情感化设计",
        shortTitle: "ICON 及情感化设计",
        description: "包含B端、C端产品系列应用图标设计及规范整合，以及情感类可视化设计等",
        thumbnail: "portfolio-15.jpg",
        featured: false
      },
      {
        id: "edu-course",
        title: "一点万象 教育课程",
        shortTitle: "一点万象 教育课程",
        description: "一点万象教育课程设计",
        thumbnail: "portfolio-16.jpg",
        featured: false
      }
    ];
    
    // Make projects globally available
    window.projects = projects;
    
    console.log('Projects loaded successfully:', projects.length);
    
    // Dispatch event when projects are loaded
    document.dispatchEvent(new CustomEvent('projectsLoaded'));
  } catch (error) {
    console.error('Error loading projects:', error);
  }
}

// Load projects when document is ready
document.addEventListener('DOMContentLoaded', loadProjects);

// Also directly run loadProjects in case DOMContentLoaded already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log('Document already loaded, executing loadProjects immediately');
  loadProjects();
} 