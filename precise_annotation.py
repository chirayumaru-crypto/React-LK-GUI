import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import json

# Load both the original and edge detection images
img_path = r"c:\Users\Lenskart\Downloads\Topcon - GUI Simulator\TopConApplication.png"
edges_path = r"c:\Users\Lenskart\Downloads\Topcon - GUI Simulator\TopConApplication_EDGES_BW.png"

img = cv2.imread(img_path)
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
edges = cv2.imread(edges_path, cv2.IMREAD_GRAYSCALE)
height, width = img.shape[:2]

print(f"Image dimensions: {width}x{height}\n")
print("=== ANALYZING EDGE DETECTION IMAGE ===\n")

# Create PIL image for drawing
pil_img = Image.fromarray(img_rgb)
draw = ImageDraw.Draw(pil_img)

try:
    font_large = ImageFont.truetype("arialbd.ttf", 16)
    font_medium = ImageFont.truetype("arial.ttf", 12)
    font_small = ImageFont.truetype("arial.ttf", 10)
except:
    font_large = font_medium = font_small = ImageFont.load_default()

# Find all contours from the edge image
contours, hierarchy = cv2.findContours(edges, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

# Collect all bounding boxes
all_boxes = []
for i, contour in enumerate(contours):
    x, y, w, h = cv2.boundingRect(contour)
    area = w * h
    
    # Filter reasonable sized boxes
    if w > 15 and h > 15 and area > 300 and w < 500 and h < 200:
        all_boxes.append({
            'x': x, 'y': y, 'w': w, 'h': h,
            'area': area,
            'cx': x + w//2,
            'cy': y + h//2,
            'aspect': w/h if h > 0 else 0
        })

print(f"Found {len(all_boxes)} valid bounding boxes\n")

# Sort by Y position to identify rows
all_boxes.sort(key=lambda b: (b['y'], b['x']))

# Group by Y coordinate (rows)
def group_by_y(boxes, threshold=30):
    rows = []
    current_row = []
    last_y = -1000
    
    for box in boxes:
        if abs(box['y'] - last_y) < threshold:
            current_row.append(box)
        else:
            if current_row:
                rows.append(current_row)
            current_row = [box]
            last_y = box['y']
    
    if current_row:
        rows.append(current_row)
    
    return rows

rows = group_by_y(all_boxes, threshold=25)

print(f"Grouped into {len(rows)} horizontal rows\n")

# Analyze each row
annotations = []

print("=== ROW ANALYSIS ===\n")
for i, row in enumerate(rows[:20]):  # Analyze first 20 rows
    row.sort(key=lambda b: b['x'])
    print(f"Row {i} (y≈{row[0]['y']}): {len(row)} boxes")
    
    for j, box in enumerate(row):
        print(f"  Box {j}: x={box['x']}, y={box['y']}, w={box['w']}, h={box['h']}, cx={box['cx']}")

print("\n=== IDENTIFYING KEY ELEMENTS ===\n")

# Header row (likely at top, y < 100)
header_boxes = [b for b in all_boxes if b['y'] < 100 and b['w'] > 80]
header_boxes.sort(key=lambda b: b['x'])

print(f"HEADER BOXES (y < 100, w > 80): {len(header_boxes)}")
for i, box in enumerate(header_boxes):
    draw.rectangle([box['x'], box['y'], box['x']+box['w'], box['y']+box['h']], 
                   outline=(255, 0, 0), width=3)
    draw.text((box['x'], box['y']-15), f"H{i}", fill=(255, 0, 0), font=font_medium)
    print(f"  H{i}: x={box['x']}, y={box['y']}, w={box['w']}, h={box['h']}")

# Refraction table area (y: 100-400, x: 0-700)
table_boxes = [b for b in all_boxes if 100 < b['y'] < 400 and b['x'] < 700]
table_rows = group_by_y(table_boxes, threshold=20)

print(f"\nREFRACTION TABLE ROWS: {len(table_rows)}")

# Identify table structure: expect R | S/C/A/ADD | L pattern
for row_idx, table_row in enumerate(table_rows[:10]):
    table_row.sort(key=lambda b: b['x'])
    print(f"\n  Table Row {row_idx} (y≈{table_row[0]['y']}): {len(table_row)} cells")
    
    # Expected pattern: [Right Eye] [Param Label] [Left Eye] (and potentially more columns)
    for cell_idx, cell in enumerate(table_row):
        # Determine cell type by position
        if cell['x'] < 100:
            cell_type = 'RIGHT_EYE'
            color = (255, 100, 150)  # Pink
            label = f"R{row_idx}"
        elif 100 <= cell['x'] < 200:
            cell_type = 'PARAM'
            color = (255, 255, 0)  # Yellow
            # Determine which param based on row
            param_names = ['S', 'C', 'A', 'ADD']
            label = param_names[row_idx] if row_idx < len(param_names) else f"P{row_idx}"
        elif 200 <= cell['x'] < 350:
            cell_type = 'LEFT_EYE'
            color = (150, 100, 255)  # Purple
            label = f"L{row_idx}"
        else:
            cell_type = 'OTHER'
            color = (200, 200, 200)
            label = f"O{cell_idx}"
        
        draw.rectangle([cell['x'], cell['y'], cell['x']+cell['w'], cell['y']+cell['h']], 
                      outline=color, width=2)
        draw.text((cell['x']+5, cell['y']+5), label, fill=color, font=font_small)
        
        print(f"    Cell {cell_idx} [{cell_type}]: x={cell['x']}, w={cell['w']}, h={cell['h']}")
        
        annotations.append({
            'type': cell_type.lower(),
            'label': label,
            'bbox': (cell['x'], cell['y'], cell['w'], cell['h'])
        })

# Controls panel (x: 700-850, y: 100-400)
controls_boxes = [b for b in all_boxes if 700 < b['x'] < 850 and 100 < b['y'] < 400]
print(f"\nCONTROLS PANEL: {len(controls_boxes)} boxes")

for i, box in enumerate(controls_boxes):
    # Circular boxes might be occlusion buttons
    if 0.8 < box['aspect'] < 1.2 and box['area'] > 2000:
        color = (255, 0, 255)  # Magenta for occlusion
        label = f"OCCL{i}"
    else:
        color = (0, 255, 255)  # Cyan for PD or other controls
        label = f"CTRL{i}"
    
    draw.rectangle([box['x'], box['y'], box['x']+box['w'], box['y']+box['h']], 
                  outline=color, width=3)
    draw.text((box['x'], box['y']-15), label, fill=color, font=font_small)
    print(f"  {label}: x={box['x']}, y={box['y']}, w={box['w']}, h={box['h']}, aspect={box['aspect']:.2f}")
    
    annotations.append({
        'type': 'control',
        'label': label,
        'bbox': (box['x'], box['y'], box['w'], box['h'])
    })

# Mode panel (x: 850-1068, y: 100-400)
mode_boxes = [b for b in all_boxes if 850 < b['x'] and 100 < b['y'] < 400]
print(f"\nMODE PANEL: {len(mode_boxes)} boxes")

for i, box in enumerate(mode_boxes):
    color = (128, 0, 255)  # Purple for mode buttons
    label = f"MODE{i}"
    
    draw.rectangle([box['x'], box['y'], box['x']+box['w'], box['y']+box['h']], 
                  outline=color, width=3)
    draw.text((box['x']+5, box['y']+5), label, fill=color, font=font_small)
    print(f"  {label}: x={box['x']}, y={box['y']}, w={box['w']}, h={box['h']}")
    
    annotations.append({
        'type': 'mode',
        'label': label,
        'bbox': (box['x'], box['y'], box['w'], box['h'])
    })

# Charts section (y > 400)
chart_boxes = [b for b in all_boxes if b['y'] > 400 and b['area'] > 1000]
chart_boxes.sort(key=lambda b: b['x'])

print(f"\nCHARTS SECTION: {len(chart_boxes)} boxes")
for i, box in enumerate(chart_boxes[:10]):
    color = (255, 165, 0)  # Orange for charts
    label = f"CHART{i+1}"
    
    draw.rectangle([box['x'], box['y'], box['x']+box['w'], box['y']+box['h']], 
                  outline=color, width=2)
    draw.text((box['x'], box['y']-15), label, fill=color, font=font_small)
    print(f"  {label}: x={box['x']}, y={box['y']}, w={box['w']}, h={box['h']}")
    
    annotations.append({
        'type': 'chart',
        'label': label,
        'bbox': (box['x'], box['y'], box['w'], box['h'])
    })

# Add comprehensive legend
legend_x, legend_y = width - 180, 20
draw.rectangle([legend_x-5, legend_y-5, width-5, legend_y+140], fill=(0, 0, 0), outline=(255,255,255), width=2)
draw.text((legend_x, legend_y), "LEGEND:", fill=(255, 255, 255), font=font_medium)
draw.text((legend_x, legend_y+20), "Pink = Right Eye", fill=(255, 100, 150), font=font_small)
draw.text((legend_x, legend_y+35), "Yellow = Params", fill=(255, 255, 0), font=font_small)
draw.text((legend_x, legend_y+50), "Purple = Left Eye", fill=(150, 100, 255), font=font_small)
draw.text((legend_x, legend_y+65), "Magenta = Occlusion", fill=(255, 0, 255), font=font_small)
draw.text((legend_x, legend_y+80), "Cyan = Controls", fill=(0, 255, 255), font=font_small)
draw.text((legend_x, legend_y+95), "Purple = Modes", fill=(128, 0, 255), font=font_small)
draw.text((legend_x, legend_y+110), "Orange = Charts", fill=(255, 165, 0), font=font_small)

# Save improved annotations
output_path = r"c:\Users\Lenskart\Downloads\Topcon - GUI Simulator\TopConApplication_PRECISE.png"
pil_img.save(output_path)

print(f"\n=== PRECISE ANNOTATIONS SAVED ===")
print(f"Location: {output_path}")
print(f"Total annotations: {len(annotations)}")

# Save annotation data as JSON
json_path = r"c:\Users\Lenskart\Downloads\Topcon - GUI Simulator\annotations.json"
with open(json_path, 'w') as f:
    json.dump(annotations, f, indent=2)
print(f"Annotation data: {json_path}")
