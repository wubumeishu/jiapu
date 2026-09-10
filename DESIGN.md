# DESIGN.md — 中国姓氏家谱·网络祭祖平台

```yaml
version: alpha
name: Heritage Genealogy Platform
description: 东方传统文化 × 数字化平台 × 现代高级 Web。雅致、克制、温润、庄重、文化感、可信、高级、留白。
colors:
  primary: "#8D6E63"
  primary-dark: "#3E2723"
  primary-light: "#C9A961"
  secondary: "#5C4033"
  neutral: "#F9F7F2"
  neutral-soft: "#F5F0E8"
  border: "#E0D6C8"
  text: "#333333"
  text-secondary: "#6B5B4F"
  text-muted: "#8B7355"
  female-bg: "#FCE4EC"
  male-bg: "#E8F5E9"
  white: "#FFFFFF"
  black: "#2C1810"
typography:
  font-serif:
    family: "Noto Serif SC, STSong, SimSun, serif"
    weight: 400-700
  font-sans:
    family: "Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif"
    weight: 400-500
  h1:
    family: "{typography.font-serif.family}"
    size: "48px"
    weight: 700
    color: "{colors.primary-dark}"
  h2:
    family: "{typography.font-serif.family}"
    size: "24px"
    weight: 600
  body:
    family: "{typography.font-sans.family}"
    size: "16px"
    weight: 400
    line-height: 1.6
  caption:
    size: "14px"
    color: "{colors.text-secondary}"
spacing:
  unit: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  xxxl: 60px
shapes:
  radius-sm: 4px
  radius-md: 8px
  radius-lg: 12px
  radius-full: 50%
components:
  button-primary:
    background: "{colors.primary}"
    color: "{colors.white}"
    height: 56px
    padding: "0 32px"
    radius: "{shapes.radius-sm}"
    font-size: "1rem"
  input-search:
    height: 56px
    width: "480px"
    padding: "0 20px"
    radius: "{shapes.radius-md}"
    border: "1px solid {colors.border}"
    background: "{colors.white}"
  card-stat:
    width: "240px"
    height: "100px"
    radius: "{shapes.radius-lg}"
    padding: 20px
    shadow: "0 4px 12px rgba(0,0,0,0.05)"
  icon-box:
    width: "56px"
    height: "56px"
    radius: 12px
    background: "#F0E6D3"
    color: "{colors.secondary}"
  surname-card:
    width: "60px"
    height: "60px"
    radius: 4px
    background: "#F9F5EF"
    border: "1px solid #E0D5C5"
    font-size: "1.5rem"
```

## Overview

雅致克制的新中式设计语言。以宣纸白为底，古铜棕为主色，淡金点缀。水墨山水作为视觉资产，传承脉络为内容核心。追求"温润如纸，庄重如墨"的文化质感。

## Colors

- **Primary (#8D6E63):** 古铜棕，核心交互色
- **Primary Dark (#3E2723):** 深褐墨色，标题与重要文字
- **Primary Light (#C9A961):** 淡金，强调与装饰
- **Neutral (#F9F7F2):** 宣纸白，页面主背景
- **Neutral Soft (#F5F0E8):** 浅米色，辅助背景

## Typography

- **Serif (Noto Serif SC):** 标题、引语、文化感强调
- **Sans (Noto Sans SC):** 正文、按钮、表单、UI 文本
- H1: 48px，书法风格，深褐色
- H2: 24px，宋体风格
- Body: 16px，行高 1.6

## Layout

- 最大宽度: 1200px，居中
- Header: 64px 高度
- Hero: 480px 高度
- 区块间距: 60px
- 左右边距: 40px

## Components

- **按钮**: 56px 高，圆角 4px，古铜棕背景
- **搜索框**: 480×56px，白色背景，浅棕边框
- **统计卡**: 240×100px，左图标右文字横排
- **特色卡**: 图标 56×56px，方形圆角 12px
- **姓氏卡**: 60×60px，圆角 4px

## Do's and Don'ts

✓ 使用水墨元素作为装饰背景
✓ 保持页面整体温润的纸张质感
✓ 标题使用宋体/楷体风格字体
✓ 图标使用线性风格，统一棕色系

✗ 不使用几何抽象图形作为主视觉
✗ 不使用科技蓝/紫色调
✗ 不使用高大上营销话术
✗ 不添加不必要的动画效果
