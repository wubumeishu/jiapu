# Hero 修改记录

## 当前方案 (2026-09-08)

**Hero高度**: 550px (桌面端) / 400px (移动端)
**图片显示**: object-fit: cover, object-position: center 30%

**裁切情况**:
- 1920px视口: 上下各裁切约125px
- 1440px视口: 几乎无损 (仅裁切约13px)
- 保留: 太阳、远山、江面、前景完整可见

---

## 备份文件

```
H:/project/china-family-platform/frontend/src/components/HeroSection.vue.bak
```

**原始方案**:
- Hero高度: auto (随图片)
- 图片显示: object-fit: contain (完整显示无裁切)

---

## 回退命令

如需回退到原始方案:

```bash
cp "H:/project/china-family-platform/frontend/src/components/HeroSection.vue.bak" \
   "H:/project/china-family-platform/frontend/src/components/HeroSection.vue"
cd "H:/project/china-family-platform/frontend"
npm run build
```

---

## 访问地址

```
http://localhost:5175/
```
