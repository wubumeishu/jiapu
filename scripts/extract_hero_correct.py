"""
Correctly extract hero background from design spec
The design spec shows:
- Item 1 (hero bg): top-left area, approximately 0-768px wide, 0-512px tall
- The full image is 1536x1024
- Hero bg should be the landscape painting portion
"""
from PIL import Image
import os

input_path = r"C:/Users/Administrator/AppData/Roaming/Hermes/composer-images/composer_2026-09-07_17-38-32-457_19662c.png"
output_dir = r"H:/project/china-family-platform/frontend/public/assets/home"

img = Image.open(input_path)
print(f"Original image size: {img.size}")

# Based on visual analysis, the hero background is the first item in the top-left
# Let's try different crop regions to find the landscape painting
# The design shows it as a wide landscape format

# Try extracting the top portion which should be the landscape
# Based on the grid layout, item 1 appears to be roughly:
# Left: 0, Top: 0, Right: ~768, Bottom: ~500

# More precise extraction based on the visual layout
hero_regions = [
    (0, 0, 768, 512),    # Top-left quadrant
    (0, 0, 1024, 400),   # Wider top portion
    (0, 50, 768, 450),   # Adjusted for margins
]

for i, bbox in enumerate(hero_regions):
    left, top, right, bottom = bbox
    if right > img.width:
        right = img.width
    if bottom > img.height:
        bottom = img.height
    
    crop = img.crop((left, top, right, bottom))
    output_path = os.path.join(output_dir, f"hero-test-{i}.png")
    crop.save(output_path)
    print(f"Test {i}: {crop.size} -> {output_path}")

# Also extract the full top section as one piece
full_top = img.crop((0, 0, 1536, 512))
output_path_full = os.path.join(output_dir, "hero-bg-top-full.png")
full_top.save(output_path_full)
print(f"Full top: {full_top.size} -> {output_path_full}")

print(f"\nSaved to: {output_dir}")
