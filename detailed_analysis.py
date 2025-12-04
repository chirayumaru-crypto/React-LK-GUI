import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import json

# Load the reference image
img_path = r"c:\Users\Lenskart\Downloads\Topcon - GUI Simulator\TopConApplication.png"
img = cv2.imread(img_path)
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
height, width = img.shape[:2]

# Create PIL image for drawing
pil_img = Image.fromarray(img_rgb)
draw = ImageDraw.Draw(pil_img)

try:
    font_large = ImageFont.truetype("arial.ttf", 20)
    font_medium = ImageFont.truetype("arial.ttf", 14)
    font_small = ImageFont.truetype("arial.ttf", 11)
except:
    font_large = font_medium = font_small = ImageFont.load_default()

print("=== DETAILED LAYOUT SKELETON ===\n")
print(f"Reference Image: {width}x{height} pixels\n")

# Detect table structure in the left panel
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
edges = cv2.Canny(gray, 30, 100)

# Use Hough Line Transform to detect horizontal and vertical lines
lines = cv2.HoughLinesP(edges, 1, np.pi/180, threshold=100, minLineLength=50, maxLineGap=10)

horizontal_lines = []
vertical_lines = []

if lines is not None:
    for line in lines:
        x1, y1, x2, y2 = line[0]
        angle = np.abs(np.arctan2(y2 - y1, x2 - x1) * 180 / np.pi)
        
        if angle < 10 or angle > 170:  # Horizontal
            horizontal_lines.append((x1, y1, x2, y2))
        elif 80 < angle < 100:  # Vertical
            vertical_lines.append((x1, y1, x2, y2))

print(f"Detected {len(horizontal_lines)} horizontal lines")
print(f"Detected {len(vertical_lines)} vertical lines\n")

# Color sampling for accurate color detection
def sample_color(x, y, size=5):
    x, y = int(x), int(y)
    if 0 <= x < width - size and 0 <= y < height - size:
        region = img_rgb[y:y+size, x:x+size]
        return tuple(map(int, region.mean(axis=0).mean(axis=0)))
    return (128, 128, 128)

# Define key sections based on visual analysis
sections = {
    'header': {'x': 10, 'y': 10, 'w': width - 20, 'h': 60, 'color': (255, 0, 0)},
    'refraction_table': {'x': 20, 'y': 80, 'w': 690, 'h': 280, 'color': (255, 0, 0)},
    'controls': {'x': 730, 'y': 80, 'w': 150, 'h': 280, 'color': (0, 255, 0)},
    'mode_panel': {'x': 900, 'y': 80, 'w': 150, 'h': 280, 'color': (0, 0, 255)},
    'charts': {'x': 20, 'y': 380, 'w': width - 40, 'h': 350, 'color': (255, 165, 0)}
}

print("=== KEY SECTIONS ===\n")

for name, section in sections.items():
    x, y, w, h = section['x'], section['y'], section['w'], section['h']
    color = section['color']
    
    # Draw rectangle
    draw.rectangle([x, y, x + w, y + h], outline=color, width=5)
    
    # Draw label with background
    label = name.replace('_', ' ').upper()
    bbox = draw.textbbox((x + 10, y - 25), label, font=font_large)
    draw.rectangle(bbox, fill=(255, 255, 255))
    draw.text((x + 10, y - 25), label, fill=color, font=font_large)
    
    # Sample color
    sampled = sample_color(x + w//2, y + h//2)
    
    print(f"{name.upper()}:")
    print(f"  Position: x={x}, y={y}")
    print(f"  Size: {w}x{h} pixels")
    print(f"  Sampled RGB: {sampled}")
    print()

# Detailed refraction table analysis
print("=== REFRACTION TABLE DETAILS ===\n")

# Table structure (approximate from visual inspection)
table_x, table_y = 20, 80
col_widths = [120, 100, 120, 100, 120]  # R, S, L, C, A columns approximately
row_height = 60
num_rows = 4  # S, C, A, ADD

# Draw grid overlay
current_x = table_x
for i, w in enumerate(col_widths):
    # Draw vertical line
    draw.line([(current_x, table_y), (current_x, table_y + row_height * (num_rows + 1))], 
              fill=(255, 255, 0), width=3)
    current_x += w

draw.line([(current_x, table_y), (current_x, table_y + row_height * (num_rows + 1))], 
          fill=(255, 255, 0), width=3)

# Draw horizontal lines
current_y = table_y
for i in range(num_rows + 2):  # Header + 4 rows + footer
    draw.line([(table_x, current_y), (table_x + sum(col_widths), current_y)], 
              fill=(255, 255, 0), width=3)
    current_y += row_height

print(f"Table Grid: {len(col_widths)} columns × {num_rows} data rows")
print(f"Column widths: {col_widths}")
print(f"Row height: ~{row_height}px")
print()

# Sample colors from each table region
print("Table Cell Colors:")
# Right eye cells (column 0)
r_color = sample_color(table_x + 60, table_y + row_height + 30)
print(f"  Right Eye Cells: RGB{r_color}")

# Left eye cells (column 2)
l_color = sample_color(table_x + col_widths[0] + col_widths[1] + 60, table_y + row_height + 30)
print(f"  Left Eye Cells: RGB{l_color}")

# S label (should be yellow)
s_color = sample_color(table_x + col_widths[0] + 50, table_y + row_height + 30)
print(f"  S Label: RGB{s_color}")

print()

# Controls analysis
print("=== CONTROLS PANEL ===\n")
controls_x, controls_y = 730, 80

# Draw markers for occlusion buttons
button_y = controls_y + 50
draw.ellipse([controls_x + 20, button_y, controls_x + 70, button_y + 50], 
             outline=(255, 0, 255), width=4)
draw.text((controls_x + 25, button_y + 55), "OCCL-L", fill=(255, 0, 255), font=font_small)

button_y = controls_y + 180
draw.ellipse([controls_x + 20, button_y, controls_x + 70, button_y + 50], 
             outline=(255, 0, 255), width=4)
draw.text((controls_x + 25, button_y + 55), "OCCL-R", fill=(255, 0, 255), font=font_small)

# PD box
pd_y = controls_y + 110
draw.rectangle([controls_x + 10, pd_y, controls_x + 140, pd_y + 60], 
               outline=(0, 255, 255), width=4)
draw.text((controls_x + 45, pd_y - 20), "PD", fill=(0, 255, 255), font=font_medium)

print("Detected elements:")
print("  - Top Occlusion Button (Left Eye)")
print("  - PD Display Box (center)")
print("  - Bottom Occlusion Button (Right Eye)")
print()

# Mode panel analysis  
print("=== MODE PANEL ===\n")
mode_x, mode_y = 900, 80

# Mode buttons
for i, mode in enumerate(['BINO', 'MONO R', 'MONO L']):
    btn_y = mode_y + 10 + i * 60
    draw.rectangle([mode_x + 10, btn_y, mode_x + 140, btn_y + 45], 
                   outline=(128, 0, 255), width=3)
    draw.text((mode_x + 15, btn_y + 5), mode, fill=(128, 0, 255), font=font_small)

print("Mode buttons:")
print("  - BINO")
print("  - MONO R")
print("  - MONO L")
print()

# Visual indicator
visual_y = mode_y + 200
draw.rectangle([mode_x + 10, visual_y, mode_x + 140, visual_y + 70], 
               outline=(255, 128, 0), width=4)
draw.text((mode_x + 25, visual_y - 20), "VISUAL", fill=(255, 128, 0), font=font_medium)

print("Visual indicator box with R/G labels")
print()

# Add dimension markers
# Width markers
draw.line([(20, height - 30), (710, height - 30)], fill=(255, 0, 0), width=2)
draw.text((350, height - 50), f"{690}px", fill=(255, 0, 0), font=font_medium)

draw.line([(730, height - 30), (880, height - 30)], fill=(0, 255, 0), width=2)
draw.text((790, height - 50), f"{150}px", fill=(0, 255, 0), font=font_medium)

draw.line([(900, height - 30), (1050, height - 30)], fill=(0, 0, 255), width=2)
draw.text((960, height - 50), f"{150}px", fill=(0, 0, 255), font=font_medium)

# Save the marked image
output_path = r"c:\Users\Lenskart\Downloads\Topcon - GUI Simulator\TopConApplication_SKELETON.png"
pil_img.save(output_path)

print(f"=== SKELETON IMAGE SAVED ===")
print(f"Location: {output_path}")
print()

# Generate CSS grid template based on measurements
total_width = 690 + 20 + 150 + 20 + 150  # columns + gaps
col1_fr = round(690 / total_width, 2)
col2_fr = round(150 / total_width, 2)
col3_fr = round(150 / total_width, 2)

print("=== RECOMMENDED CSS GRID ===")
print(f"grid-template-columns: {col1_fr}fr {col2_fr}fr {col3_fr}fr;")
print(f"gap: 20px;")
print()

print("=== COLOR PALETTE ===")
print(f"Background: RGB(231, 230, 231) → #E7E6E7")
print(f"Right Eye: RGB{r_color} → #{r_color[0]:02x}{r_color[1]:02x}{r_color[2]:02x}")
print(f"Left Eye: RGB{l_color} → #{l_color[0]:02x}{l_color[1]:02x}{l_color[2]:02x}")
print(f"S Label: RGB{s_color} → #{s_color[0]:02x}{s_color[1]:02x}{s_color[2]:02x}")
