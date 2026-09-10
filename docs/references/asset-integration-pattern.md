# Asset Integration Pattern

> 当用户提供真实视觉素材时的集成模式

## 核心原则

1. **不要重新绘制素材** — 用真实图片而非SVG/CSS模拟
2. **不要自行生成替代素材** — 等用户提供
3. **不要修改原始素材** — 派生文件另存

## 四阶段工作流

### Phase 1: 素材扫描
- 创建标准目录结构 `assets/home/{backgrounds,icons,decorations,brand}`
- 扫描所有图片文件
- 识别尺寸、类型、透明背景

### Phase 2: 素材清单
- 创建 `docs/ASSET_MANIFEST.md`
- 记录每个素材的状态和用途

### Phase 3: 素材映射
- 创建 `docs/P01_ASSET_MAPPING.md`
- 映射设计图区域到实际素材
- 记录CSS实现方案

### Phase 4: 素材集成
- 复制素材到正确位置
- 更新组件引用路径
- 清理废弃文件
- 构建验证

## 禁止事项

- ❌ 用SVG模拟已有素材
- ❌ 用CSS渐变冒充图片
- ❌ 自行生成替代素材
- ❌ 直接覆盖原始素材

## 输出文件

- `docs/ASSET_MANIFEST.md` — 素材清单
- `docs/P01_ASSET_MAPPING.md` — 素材与设计图映射
- `frontend/public/assets/home/backgrounds/` — 背景图
- `frontend/public/assets/home/icons/` — 功能图标
- `frontend/public/assets/home/decorations/` — 装饰元素
