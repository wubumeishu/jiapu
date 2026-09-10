# ASSET INTEGRATION PATTERN

> 当用户提供真实视觉素材时的集成模式

---

## 触发条件

用户说：
- "我现在准备了一些素材"
- "用这些图片"
- "这是背景图"
- 提供 @image 或 @folder 引用

## 工作模式：ASSET INTEGRATION MODE

**核心原则**：
1. **不要重新绘制素材** — 用真实图片而非SVG/CSS模拟
2. **不要自行生成替代素材** — 等用户提供
3. **不要修改原始素材** — 派生文件另存

---

## 阶段一：素材扫描（先于任何代码修改）

### 1.1 创建目录结构
```
assets/
├── common/           # 通用素材
├── home/
│   ├── backgrounds/  # Hero背景图
│   ├── icons/        # 功能图标
│   ├── decorations/  # 装饰元素
│   └── brand/        # 品牌Logo
└── placeholders/     # 备用占位符
```

### 1.2 扫描现有素材
```bash
find . -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.webp" -o -name "*.svg" \) | head -50
```

### 1.3 识别每个素材
| 属性 | 方法 |
|------|------|
| 文件类型 | `file` 命令或Python PIL |
| 尺寸 | Python PIL: `Image.open().size` |
| 透明背景 | 检查alpha通道 |
| 宽高比 | 尺寸计算 |
| 用途 | vision_analyze 描述内容 |

---

## 阶段二：素材清单

**创建文档**: `docs/ASSET_MANIFEST.md`

**格式**：
```markdown
| 文件路径 | 类型 | 尺寸 | 透明 | 状态 | 用途 |
|----------|------|------|------|------|------|
| home/backgrounds/hero-bg.png | PNG | 1942×809 | 否 | ✅ 已集成 | Hero背景 |
| home/decorations/bottom-decor.png | PNG | 1536×300 | 否 | ⏳ 待集成 | Footer装饰 |
```

---

## 阶段三：素材与设计图映射

**创建文档**: `docs/P01_ASSET_MAPPING.md`

**格式**：
```markdown
### Hero背景图
**设计图区域**: design/01-user-web.png 顶部Hero区域
**对应素材**: home/backgrounds/hero-bg.png

| 属性 | 设计图 | 当前素材 | 状态 |
|------|--------|----------|------|
| 风格 | 水墨山水 | 水墨山水 | ✅ 匹配 |
| CSS实现 | object-fit: cover | 同左 | ✅ 实现 |
| Hero高度 | ~650px | 650px | ✅ 匹配 |
```

---

## 阶段四：素材集成

### 4.1 复制素材到正确位置
```bash
# 用户提供的素材放在 public/assets/ 对应目录
cp "用户提供的图片" "frontend/public/assets/home/backgrounds/hero-bg.png"
```

### 4.2 更新组件引用
```vue
<!-- 不要写绝对路径 -->
<img src="/assets/home/backgrounds/hero-bg.png" />

<!-- 正确的CSS配置 -->
<style scoped>
.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;      /* 全屏覆盖 */
  object-position: center; /* 居中对齐 */
}
</style>
```

### 4.3 清理废弃文件
```bash
# 删除测试图、临时图
rm -f assets/home/hero-test-*.png
rm -f assets/home/*.webp  # 如果是旧版压缩文件
```

---

## 禁止事项

❌ **不要** 用SVG模拟已有素材
❌ **不要** 用CSS渐变冒充图片
❌ **不要** 自行生成替代素材
❌ **不要** 直接覆盖原始素材文件
❌ **不要** 在集成前修改页面布局

---

## 检查清单

- [ ] 素材目录结构已创建
- [ ] 所有素材已识别并记录
- [ ] ASSET_MANIFEST.md 已创建
- [ ] 素材与设计图已映射
- [ ] 组件引用已更新
- [ ] 废弃文件已清理
- [ ] npm run build 通过
- [ ] 浏览器访问验证

---

## 用户需提供的素材清单（示例）

**统计图标** (4个)
- 家谱数量图标
- 姓氏数量图标
- 用户数量图标
- 祭祖记录图标

**特色图标** (4个)
- 姓氏起源图标
- 家谱树图标
- 网络祭祀图标
- 家族社区图标

**品牌Logo**
- SVG或PNG透明背景

---

## 待确认

- [ ] bottom-decor.png 集成位置
- [ ] 图标素材提供
- [ ] Logo素材提供

---

**状态**: ASSET INTEGRATION MODE ACTIVE
**下一步**: 等待用户提供新素材
