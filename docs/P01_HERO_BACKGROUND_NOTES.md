# P01 Hero 背景方案对比

## 方案一：完整显示（未采用）
- object-fit: contain
- 保持原始比例
- 无裁切

## 方案二：全屏覆盖（当前方案）✅
- Hero 高度: 480px (固定)
- object-fit: cover
- object-position: center
- 全屏填充，等比缩放

---

**访问**: http://localhost:5175/

**构建状态**: ✅ 成功
