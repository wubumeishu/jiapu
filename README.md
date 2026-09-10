# 中国姓氏家谱 · 网络祭祖平台

数字家族记忆平台，支持姓氏文化展示与家谱树可视化。

## 项目结构

```
china-family-platform/
├── frontend/          # Vue3 + Vite 前端
│   ├── src/
│   │   ├── components/   # Vue组件
│   │   ├── pages/        # 页面组件
│   │   ├── data/         # Mock数据
│   │   └── utils/        # 工具函数
│   └── public/         # 静态资源
├── backend/          # FastAPI 后端（后续开发）
├── docs/             # 设计文档
└── design/           # 设计参考图
```

## 技术栈

- **前端**: Vue3 + TypeScript + Vite
- **后端**: FastAPI (Python)
- **数据库**: PostgreSQL (后续)

## 开发启动

### 前端开发服务器

```bash
cd frontend
npm install
npm run dev
```

访问 http://localhost:5177

### 启动脚本

- Windows: `start-dev.bat`
- Linux/Mac: `start-dev.sh`

## 功能模块

### P01 - 首页
- 水墨山水背景 Hero Section
- 热门姓氏 11×3 网格（33个姓氏）
- 平台统计数据
- 平台特色功能展示

### P02 - 姓氏详情页
- 姓氏徽章与简介
- Tab 导航（起源、迁徙、名人、家谱）
- 迁徙地图（SVG Mock）
- 相关家谱列表

### 家谱树组件
- 6代陈氏测试数据（31人）
- 展开/折叠交互
- 拖拽平移
- 滚轮缩放
- 响应式布局

## 设计规范

参见 `docs/DESIGN.md` 和 `docs/VISUAL_MASTER_SPEC.md`

## 开发规范

- 视觉优先，像素级复刻设计图
- 本地优先（LOCAL-FIRST）
- 垂直切片开发
- KANBAN 项目管理
- 中文回复，可爱风格 (◕‿◕)

## License

Private Project
