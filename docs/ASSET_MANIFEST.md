# P01 素材清单 (ASSET MANIFEST)

> 生成时间: 2026-09-08  
> 项目: 中国姓氏家谱·网络祭祖平台 P01首页

---

## 一、素材目录结构

```
frontend/public/assets/
├── common/                (通用素材)
├── home/
│   ├── backgrounds/       ← Hero背景图
│   │   └── hero-bg.png    ✅ APPROVED
│   ├── icons/             ← 统计/特色图标 (待用户提供)
│   ├── decorations/       ← 装饰元素
│   │   └── bottom-decor.png ⏳ 待集成
│   └── brand/             ← 品牌Logo (待用户提供)
└── placeholders/          (占位符备用)
```

---

## 二、已确认素材清单

### 2.1 Hero背景图 (APPROVED)

| 属性 | 值 |
|------|------|
| **Asset ID** | HOME-HERO-BG-001 |
| **文件名** | hero-bg.png |
| **路径** | `frontend/public/assets/home/backgrounds/hero-bg.png` |
| **类型** | PNG |
| **尺寸** | 1942 × 809 px |
| **宽高比** | 2.4:1 (横版宽幅) |
| **透明背景** | 否 |
| **文件大小** | 2.5 MB |
| **状态** | ✅ APPROVED |
| **来源** | 用户提供 |
| **用途** | P01 首页 Hero 背景 |

### 2.2 底部装饰图 (PENDING)

| 属性 | 值 |
|------|------|
| **文件名** | bottom-decor.png |
| **路径** | `frontend/public/assets/home/decorations/bottom-decor.png` |
| **类型** | PNG |
| **尺寸** | 1536 × 300 px |
| **宽高比** | 5.1:1 (超宽幅) |
| **透明背景** | 否 |
| **文件大小** | 207 KB |
| **状态** | ⏳ 待确认集成位置 |
| **用途** | Footer上方装饰分隔 |

---

## 三、Hero实现规范

### 3.1 构图分析

**hero-bg.png (1942×809) 画面内容:**

| 区域 | 内容 |
|------|------|
| **左侧** | 层峦叠嶂、松树、亭台楼阁、瀑布 |
| **中央** | 开阔江面、扁舟、远山、天空留白 |
| **右侧** | 山崖、古典楼阁、岩石、秋树 |
| **天空** | 淡橙色太阳、飞鸟、云雾 |

**最佳标题位置**: 画面中上部天空留白区（约垂直35-40%处）

### 3.2 CSS实现规范

```css
/* Hero容器 */
.hero {
  position: relative;
  width: 100%;
  min-height: 600px;
  overflow: hidden;
}

/* 背景图片 */
.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 35%; /* 保留上方天空区域 */
}

/* 内容层 */
.hero-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 600px;
  padding: 40px 20px;
}
```

### 3.3 禁止事项

- ❌ 不要重新生成SVG山水
- ❌ 不要使用CSS绘制山水
- ❌ 不要使用抽象几何背景
- ❌ 不要对hero-bg.png进行覆盖修改
- ❌ 不要在图片上叠加厚重的文字阴影
- ❌ 不要使用大面积白色/深色遮罩

### 3.4 允许事项

- ✅ 使用 `object-fit: cover` + `object-position` 调整显示区域
- ✅ 使用极轻的 `text-shadow` 增强文字可读性
- ✅ 生成派生文件（压缩、WebP等）但不覆盖原文件

---

## 四、响应式策略

### 4.1 桌面端 (≥768px)

- **Hero高度**: `min-height: 600px`
- **object-position**: `center 35%` - 保留天空和远山
- **核心视觉**: 中央江面 + 远山 + 天空

### 4.2 移动端 (<768px)

- **Hero高度**: `min-height: 450px`
- **object-position**: `center 40%` - 更侧重中央水面和远山
- **搜索框**: 垂直堆叠布局
- **允许裁切**: 左右两侧建筑可适当裁切

---

## 五、待提供素材

### 5.1 高优先级 (🔴)

| 素材类型 | 数量 | 建议尺寸 | 用途 |
|----------|------|----------|------|
| 统计图标 | 4个 | 48×48px 或 64×64px | 数据统计区 |
| 特色图标 | 4个 | 56×56px | 平台特色区 |

### 5.2 中优先级 (🟡)

| 素材类型 | 数量 | 建议格式 | 用途 |
|----------|------|----------|------|
| 品牌Logo | 1个 | SVG/PNG透明 | Header导航 |
| 姓氏标签背景 | 33个 | PNG透明 | 热门姓氏卡片 |

### 5.3 低优先级 (🟢)

| 素材类型 | 用途 |
|----------|------|
| 装饰祥云/仙鹤 | Hero点缀 |
| 边框/分隔线素材 | 页面装饰 |

---

## 六、集成状态

### 6.1 已完成

- [x] 创建素材目录结构
- [x] 整理 hero-bg.png 到 backgrounds/
- [x] 更新 HeroSection.vue 引用
- [x] Hero实现符合设计图构图原则
- [x] 清理废弃测试文件
- [x] 构建验证通过

### 6.2 待完成

- [ ] 确认 bottom-decor.png 集成位置
- [ ] 等待用户提供统计图标素材
- [ ] 等待用户提供特色图标素材
- [ ] 等待用户提供品牌Logo

---

## 七、访问地址

```
http://localhost:5175/
```

---

**素材清单状态**: ✅ hero-bg.png已集成，等待新素材
