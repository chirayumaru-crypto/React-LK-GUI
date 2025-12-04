import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import json

# Load the reference image
img_path = r"c:\Users\Lenskart\Downloads\Topcon - GUI Simulator\TopConApplication.png"
img = cv2.imread(img_path)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Edge detection
edges = cv2.Canny(gray, 50, 150, apertureSize=3)

# Find contours
contours, hierarchy = cv2.findContours(edges, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

# Create visualization image
vis_img = img.copy()
pil_img = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
draw = ImageDraw.Draw(pil_img)

# Filter significant rectangular regions
regions = []
for i, contour in enumerate(contours):
    area = cv2.contourArea(contour)
    if area > 500:  # Filter small contours
        x, y, w, h = cv2.boundingRect(contour)
        aspect_ratio = w / h if h > 0 else 0
        
        # Store region info
        regions.append({
            'x': int(x),
            'y': int(y),
            'w': int(w),
            'h': int(h),
            'area': int(area),
            'aspect_ratio': round(aspect_ratio, 2)
        })
        
        # Draw rectangle on visualization
        cv2.rectangle(vis_img, (x, y), (x + w, y + h), (0, 255, 0), 2)
        
        # Add label
        label = f"{w}x{h}"
        cv2.putText(vis_img, label, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255, 0, 0), 1)

# Sort regions by position (top to bottom, left to right)
regions.sort(key=lambda r: (r['y'], r['x']))

# Detect major sections by clustering Y coordinates
y_coords = [r['y'] for r in regions]
y_clusters = []
current_cluster = []
threshold = 20

for y in sorted(set(y_coords)):
    if not current_cluster or y - current_cluster[-1] < threshold:
        current_cluster.append(y)
    else:
        y_clusters.append(current_cluster)
        current_cluster = [y]
if current_cluster:
    y_clusters.append(current_cluster)

# Identify key sections
print("=== LAYOUT ANALYSIS ===\n")
print(f"Image dimensions: {img.shape[1]}x{img.shape[0]} pixels\n")

# Detect header
header_regions = [r for r in regions if r['y'] < 80 and r['w'] > 300]
if header_regions:
    print("HEADER SECTION:")
    print(f"  Position: y={header_regions[0]['y']}, height={header_regions[0]['h']}")
    print(f"  Spans: {header_regions[0]['w']} pixels\n")

# Detect main content area (3-column layout)
main_regions = [r for r in regions if 80 < r['y'] < 400 and r['area'] > 5000]
main_regions.sort(key=lambda r: r['x'])

if len(main_regions) >= 3:
    print("MAIN CONTENT (3-COLUMN LAYOUT):")
    print(f"  Column 1 (Refraction Table): x={main_regions[0]['x']}, w={main_regions[0]['w']}, h={main_regions[0]['h']}")
    print(f"  Column 2 (Controls): x={main_regions[1]['x']}, w={main_regions[1]['w']}, h={main_regions[1]['h']}")
    print(f"  Column 3 (Mode Panel): x={main_regions[2]['x']}, w={main_regions[2]['w']}, h={main_regions[2]['h']}")
    
    # Calculate grid ratios
    total_width = main_regions[2]['x'] + main_regions[2]['w'] - main_regions[0]['x']
    col1_ratio = main_regions[0]['w'] / total_width
    col2_ratio = main_regions[1]['w'] / total_width
    col3_ratio = main_regions[2]['w'] / total_width
    print(f"  Grid ratio: {col1_ratio:.2f} : {col2_ratio:.2f} : {col3_ratio:.2f}\n")

# Detect charts section
chart_regions = [r for r in regions if r['y'] > 400 and r['area'] > 5000]
if chart_regions:
    print("CHARTS SECTION:")
    print(f"  Position: y={chart_regions[0]['y']}, height={chart_regions[0]['h']}")
    print(f"  Width: {chart_regions[0]['w']} pixels\n")

# Color analysis
print("=== COLOR ANALYSIS ===\n")

# Sample colors from key areas
def get_dominant_color(img, x, y, w, h):
    region = img[y:y+h, x:x+w]
    avg_color = region.mean(axis=0).mean(axis=0)
    return tuple(map(int, avg_color))

# Analyze background colors
bg_color = get_dominant_color(img, 10, 10, 50, 50)
print(f"Background: RGB{bg_color}")

# Draw major section markers on PIL image
try:
    font = ImageFont.truetype("arial.ttf", 16)
except:
    font = ImageFont.load_default()

# Mark main sections with labels
if len(main_regions) >= 3:
    # Column 1 - Refraction Table
    draw.rectangle([main_regions[0]['x'], main_regions[0]['y'], 
                   main_regions[0]['x'] + main_regions[0]['w'], 
                   main_regions[0]['y'] + main_regions[0]['h']], 
                   outline=(255, 0, 0), width=4)
    draw.text((main_regions[0]['x'] + 10, main_regions[0]['y'] + 10), 
              "REFRACTION TABLE", fill=(255, 0, 0), font=font)
    
    # Column 2 - Controls
    draw.rectangle([main_regions[1]['x'], main_regions[1]['y'], 
                   main_regions[1]['x'] + main_regions[1]['w'], 
                   main_regions[1]['y'] + main_regions[1]['h']], 
                   outline=(0, 255, 0), width=4)
    draw.text((main_regions[1]['x'] + 10, main_regions[1]['y'] + 10), 
              "CONTROLS", fill=(0, 255, 0), font=font)
    
    # Column 3 - Mode Panel
    draw.rectangle([main_regions[2]['x'], main_regions[2]['y'], 
                   main_regions[2]['x'] + main_regions[2]['w'], 
                   main_regions[2]['y'] + main_regions[2]['h']], 
                   outline=(0, 0, 255), width=4)
    draw.text((main_regions[2]['x'] + 10, main_regions[2]['y'] + 10), 
              "MODE PANEL", fill=(0, 0, 255), font=font)

# Save marked image
output_path = r"c:\Users\Lenskart\Downloads\Topcon - GUI Simulator\TopConApplication_MARKED.png"
pil_img.save(output_path)

print(f"\nMarked image saved to: {output_path}")

# Save layout data as JSON
layout_data = {
    'image_dimensions': {'width': img.shape[1], 'height': img.shape[0]},
    'header': header_regions[0] if header_regions else None,
    'columns': main_regions[:3] if len(main_regions) >= 3 else [],
    'charts': chart_regions[0] if chart_regions else None,
    'grid_ratios': {
        'col1': round(col1_ratio, 3) if len(main_regions) >= 3 else 0,
        'col2': round(col2_ratio, 3) if len(main_regions) >= 3 else 0,
        'col3': round(col3_ratio, 3) if len(main_regions) >= 3 else 0
    },
    'background_color': bg_color
}

with open(r"c:\Users\Lenskart\Downloads\Topcon - GUI Simulator\layout_data.json", 'w') as f:
    json.dump(layout_data, f, indent=2)

print("\nLayout data saved to: layout_data.json")
print("\n=== ANALYSIS COMPLETE ===")
