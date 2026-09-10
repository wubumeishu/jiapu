"""
Extract proper hero background from design spec
The hero bg is in the top-left area showing the landscape painting
"""
from PIL import Image
import os

input_path = r"C:/Users/Administrator/AppData/Roaming/Hermes/composer-images/composer_2026-09-07_17-38-32-457_19662c.png"
output_dir = r"H:/project/china-family-platform/frontend/public/assets/home"

img = Image.open(input_path)
print(f"Original: {img.size}")

# The hero background (item 1) is in the top-left portion
# Based on visual analysis, it's roughly the first quadrant
# Let's use a wider crop to capture the full landscape
hero_crop = img.crop((0, 0, 768, 480))
output_path = os.path.join(output_dir, "hero-bg.png")
hero_crop.save(output_path, quality=95)
print(f"✓ Hero background: {hero_crop.size} -> {output_path} ({os.path.getsize(output_path)} bytes)")

# Also create WebP version for web
webp_path = os.path.join(output_dir, "hero-bg.webp")
hero_crop.save(webp_path, format="WEBP", quality=85)
print(f"✓ WebP version: {webp_path} ({os.path.getsize(webp_path)} bytes)")

print("\nDone!")
