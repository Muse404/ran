#!/bin/bash

# Update image paths for all project detail HTML files

# mixc-life
sed -i '' 's|../../img/万象生活 商业对外视觉/|../../img/projects/mixc-life/|g' project/detail/mixc-life.html

# wandering-2023
sed -i '' 's|../../img/万象漫游记2023 年度账单/|../../img/projects/wandering-2023/|g' project/detail/wandering-2023.html

# zhaox-product
sed -i '' 's|../../img/朝昔 产品设计/|../../img/projects/zhaox-product/|g' project/detail/zhaox-product.html

# one-point-marketing
sed -i '' 's|../../img/一点万象 商业营销设计/|../../img/projects/one-point-marketing/|g' project/detail/one-point-marketing.html

# e-space
sed -i '' 's|../../img/e-space 官网/|../../img/projects/e-space/|g' project/detail/e-space.html

# zhaox-property
sed -i '' 's|../../img/朝昔 物业营销 设计/|../../img/projects/zhaox-property/|g' project/detail/zhaox-property.html

# cr-mixc
sed -i '' 's|../../img/CR MIXC LIFESTYLE 主视觉/|../../img/projects/cr-mixc/|g' project/detail/cr-mixc.html

# zhaox-solar
sed -i '' 's|../../img/朝昔 节气视觉/|../../img/projects/zhaox-solar/|g' project/detail/zhaox-solar.html

# hello-zhaox
sed -i '' 's|../../img/你好朝昔 全国推广/|../../img/projects/hello-zhaox/|g' project/detail/hello-zhaox.html

# memory-2022
sed -i '' 's|../../img/你的万象记忆 2022/|../../img/projects/memory-2022/|g' project/detail/memory-2022.html

# one-point-7th
sed -i '' 's|../../img/一点万象 7周年/|../../img/projects/one-point-7th/|g' project/detail/one-point-7th.html

# icon-design
sed -i '' 's|../../img/ICON 及情感化设计/|../../img/projects/icon-design/|g' project/detail/icon-design.html

# cloud-node
sed -i '' 's|../../img/云结 产品视觉/|../../img/projects/cloud-node/|g' project/detail/cloud-node.html

# edu-course
sed -i '' 's|../../img/教育产品 课程设计/|../../img/projects/edu-course/|g' project/detail/edu-course.html

# one-point
sed -i '' 's|../../img/一点万象 产品视觉/|../../img/projects/one-point/|g' project/detail/one-point.html

# good-domain
sed -i '' 's|../../img/良域 产品视觉/|../../img/projects/good-domain/|g' project/detail/good-domain.html

echo "All image paths have been updated!" 