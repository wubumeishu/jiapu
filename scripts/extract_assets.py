"""
Extract design assets from the design spec sheet
"""
from PIL import Image
import os

# Input file
input_path = r"C:/Users/Administrator/AppData/Roaming/Hermes/composer-images/composer_2026-09-07_17-38-32-457_19662c.png"
output_dir = r"H:/project/china-family-platform/frontend/public/assets/design"

os.makedirs(output_dir, exist_ok=True)

# Open the image
img = Image.open(input_path)
print(f"Image size: {img.size}")

# Asset extraction based on visual analysis
assets = {
    "hero-bg": (0, 0, 768, 512),  # 首页背景图 - 左上
    "surname-frame": (768, 0, 1068, 300),  # 姓氏外圈设计
    "surname-zhang": (1068, 0, 1368, 300),  # 姓氏设计示例
    "map-bg": (0, 512, 768, 1024),  # 家谱背景图(中国地图)
    "icons": (768, 512, 1100, 800),  # 图标素材区域
    "typography": (0, 1024, 800, 1200),  # 文字素材
    "seals": (800, 1024, 1000, 1224),  # 印章图案
    "decorations": (1000, 1024, 1536, 1224),  # 装饰元素
}

for name, bbox in assets.items():
    try:
        # Adjust coordinates based on actual image
        left, top, right, bottom = bbox
        if right > img.width:
            right = img.width
        if bottom > img.height:
            bottom = img.height
        if left >= right or top >= bottom:
            continue
            
        crop = img.crop((left, top, right, bottom))
        output_path = os.path.join(output_dir, f"{name}.png")
        crop.save(output_path)
        print(f"✓ Extracted: {name} ({crop.size})")
    except Exception as e:
        print(f"✗ Failed {name}: {e}")

print(f"\nAssets saved to: {output_dir}")
