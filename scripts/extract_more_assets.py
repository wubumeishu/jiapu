"""
Extract more assets from design spec
"""
from PIL import Image
import os

input_path = r"C:/Users/Administrator/AppData/Roaming/Hermes/composer-images/composer_2026-09-07_17-38-32-457_19662c.png"
output_dir = r"H:/project/china-family-platform/frontend/public/assets/design"

img = Image.open(input_path)
print(f"Original image: {img.size}")

# Extract more assets based on visual analysis
assets = [
    # 印章 (Seals) - 4 seals in 2x2 grid
    ("seals", 800, 700, 1000, 900),
    # 装饰线条 (Decorative lines)
    ("deco-lines", 0, 850, 500, 900),
    # 底部装饰 (Bottom decoration)
    ("bottom-deco", 0, 950, 1536, 1024),
    # 文字素材 (Typography)
    ("typography", 0, 450, 600, 550),
]

for name, left, top, right, bottom in assets:
    try:
        crop = img.crop((left, top, right, bottom))
        output_path = os.path.join(output_dir, f"{name}.png")
        crop.save(output_path)
        print(f"✓ Extracted: {name} ({crop.size})")
    except Exception as e:
        print(f"✗ Failed {name}: {e}")

# Also extract individual seal characters if possible
seals_coords = [
    ("seal-jia", 820, 720, 870, 770),  # 家
    ("seal-zu", 880, 720, 930, 770),  # 族
    ("seal-chuan", 820, 780, 870, 830),  # 传
    ("seal-cheng", 880, 780, 930, 830),  # 承
]

for name, left, top, right, bottom in seals_coords:
    try:
        crop = img.crop((left, top, right, bottom))
        output_path = os.path.join(output_dir, f"{name}.png")
        crop.save(output_path)
        print(f"✓ Extracted: {name} ({crop.size})")
    except:
        pass

print(f"\nAll assets saved to: {output_dir}")
