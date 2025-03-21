#!/bin/bash

# Script to clean up unused image resources
# This script creates backups before removing anything

# Create timestamp for backup directory
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="image_backup_$TIMESTAMP"

echo "Creating backup directory: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# Backup and remove Chinese-named directories since they've been migrated to English ones
echo "Backing up Chinese-named directories..."
mkdir -p "$BACKUP_DIR/img_chinese_dirs"

# Copy Chinese-named directories to backup
cp -r "img/万象生活 商业对外视觉" "$BACKUP_DIR/img_chinese_dirs/" 2>/dev/null || echo "Directory not found"
cp -r "img/万象漫游记2023 年度账单" "$BACKUP_DIR/img_chinese_dirs/" 2>/dev/null || echo "Directory not found"
cp -r "img/朝昔 产品设计" "$BACKUP_DIR/img_chinese_dirs/" 2>/dev/null || echo "Directory not found"
cp -r "img/一点万象 商业营销设计" "$BACKUP_DIR/img_chinese_dirs/" 2>/dev/null || echo "Directory not found"
cp -r "img/e-space 官网" "$BACKUP_DIR/img_chinese_dirs/" 2>/dev/null || echo "Directory not found"
cp -r "img/朝昔 物业营销 设计" "$BACKUP_DIR/img_chinese_dirs/" 2>/dev/null || echo "Directory not found"
cp -r "img/CR MIXC LIFESTYLE 主视觉" "$BACKUP_DIR/img_chinese_dirs/" 2>/dev/null || echo "Directory not found"
cp -r "img/朝昔 节气视觉" "$BACKUP_DIR/img_chinese_dirs/" 2>/dev/null || echo "Directory not found"
cp -r "img/你好朝昔 全国推广" "$BACKUP_DIR/img_chinese_dirs/" 2>/dev/null || echo "Directory not found"
cp -r "img/你的万象记忆 2022" "$BACKUP_DIR/img_chinese_dirs/" 2>/dev/null || echo "Directory not found"
cp -r "img/一点万象 7周年" "$BACKUP_DIR/img_chinese_dirs/" 2>/dev/null || echo "Directory not found"
cp -r "img/ICON 及情感化设计" "$BACKUP_DIR/img_chinese_dirs/" 2>/dev/null || echo "Directory not found"
cp -r "img/云结 产品视觉" "$BACKUP_DIR/img_chinese_dirs/" 2>/dev/null || echo "Directory not found"
cp -r "img/教育产品 课程设计" "$BACKUP_DIR/img_chinese_dirs/" 2>/dev/null || echo "Directory not found"
cp -r "img/一点万象 产品视觉" "$BACKUP_DIR/img_chinese_dirs/" 2>/dev/null || echo "Directory not found"
cp -r "img/良域 产品视觉" "$BACKUP_DIR/img_chinese_dirs/" 2>/dev/null || echo "Directory not found"

# Backup project/detail/images directory
echo "Backing up project/detail/images directory..."
mkdir -p "$BACKUP_DIR/project_detail_images"
cp -r "project/detail/images/"* "$BACKUP_DIR/project_detail_images/" 2>/dev/null || echo "No files found"

# Now remove the Chinese-named directories
echo "Removing Chinese-named directories..."
rm -rf "img/万象生活 商业对外视觉" 2>/dev/null || echo "Directory not found or already removed"
rm -rf "img/万象漫游记2023 年度账单" 2>/dev/null || echo "Directory not found or already removed"
rm -rf "img/朝昔 产品设计" 2>/dev/null || echo "Directory not found or already removed"
rm -rf "img/一点万象 商业营销设计" 2>/dev/null || echo "Directory not found or already removed"
rm -rf "img/e-space 官网" 2>/dev/null || echo "Directory not found or already removed"
rm -rf "img/朝昔 物业营销 设计" 2>/dev/null || echo "Directory not found or already removed"
rm -rf "img/CR MIXC LIFESTYLE 主视觉" 2>/dev/null || echo "Directory not found or already removed"
rm -rf "img/朝昔 节气视觉" 2>/dev/null || echo "Directory not found or already removed"
rm -rf "img/你好朝昔 全国推广" 2>/dev/null || echo "Directory not found or already removed"
rm -rf "img/你的万象记忆 2022" 2>/dev/null || echo "Directory not found or already removed"
rm -rf "img/一点万象 7周年" 2>/dev/null || echo "Directory not found or already removed"
rm -rf "img/ICON 及情感化设计" 2>/dev/null || echo "Directory not found or already removed"
rm -rf "img/云结 产品视觉" 2>/dev/null || echo "Directory not found or already removed"
rm -rf "img/教育产品 课程设计" 2>/dev/null || echo "Directory not found or already removed"
rm -rf "img/一点万象 产品视觉" 2>/dev/null || echo "Directory not found or already removed"
rm -rf "img/良域 产品视觉" 2>/dev/null || echo "Directory not found or already removed"

# Remove project/detail/images since it's not referenced anywhere
echo "Removing project/detail/images directory..."
rm -rf "project/detail/images" 2>/dev/null || echo "Directory not found or already removed"

echo "Cleanup completed successfully!"
echo "Backups stored in: $BACKUP_DIR"
echo ""
echo "If you need to restore files, use:"
echo "cp -r $BACKUP_DIR/img_chinese_dirs/* img/"
echo "mkdir -p project/detail/images"
echo "cp -r $BACKUP_DIR/project_detail_images/* project/detail/images/" 