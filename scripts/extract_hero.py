"""
Extract optimal hero background from design spec
"""
from PIL import Image
import os

input_path = r"C:/Users/Administrator/AppData/Roaming/Hermes/composer-images/composer_2026-09-07_17-38-32-457_19662c.png"
output_dir = r"H:/project/china-family-platform/frontend/public/assets/home"

img = Image.open(input_path)
print(f"Original image: {img.size}")

# Extract hero background - top portion showing the landscape
# Based on visual analysis, the hero background should be the landscape area
hero_crop = img.crop((0, 0, 1536, 600))
output_path = os.path.join(output_dir, "hero-bg-full.png")
hero_crop.save(output_path, quality=90)
print(f"✓ Hero background: {hero_crop.size} -> {output_path}")

# Also create a compressed version
hero_compressed = img.crop((0, 0, 1536, 600))
output_compressed = os.path.join(output_dir, "hero-bg-compressed.webp")
hero_compressed.save(output_compressed, format="WEBP", quality=85)
print(f"✓ Hero compressed (WebP): {hero_compressed.size} -> {output_compressed}")

# Extract bottom decoration strip
bottom_crop = img.crop((0, 900, 1536, 1024))
output_path_bottom = os.path.join(output_dir, "bottom-decor.png")
bottom_crop.save(output_path_bottom)
print(f"✓ Bottom decoration: {bottom_crop.size} -> {output_path_bottom}")

print(f"\nAssets saved to: {output_dir}")
