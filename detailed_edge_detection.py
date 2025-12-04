import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

# Load the reference image
img_path = r"c:\Users\Lenskart\Downloads\Topcon - GUI Simulator\TopConApplication.png"
img = cv2.imread(img_path)
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
height, width = img.shape[:2]

print(f"Image dimensions: {width}x{height}\n")

# Convert to grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Apply edge detection
edges = cv2.Canny(gray, 50, 150, apertureSize=3)

# Save pure edge detection (black and white)
edge_output = r"c:\Users\Lenskart\Downloads\Topcon - GUI Simulator\TopConApplication_EDGES_BW.png"
cv2.imwrite(edge_output, edges)
print(f"Black & White Edge Detection saved: {edge_output}\n")

# Now create annotated version
pil_img = Image.fromarray(img_rgb)
draw = ImageDraw.Draw(pil_img)

try:
    font_large = ImageFont.truetype("arialbd.ttf", 18)
    font_medium = ImageFont.truetype("arial.ttf", 14)
    font_small = ImageFont.truetype("arial.ttf", 11)
except:
    font_large = font_medium = font_small = ImageFont.load_default()

print("=== OCR-STYLE TEXT DETECTION ===\n")

# Use morphological operations to find text regions
kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
dilated = cv2.dilate(edges, kernel, iterations=2)

# Find contours
contours, hierarchy = cv2.findContours(dilated, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

# Group contours by regions
text_regions = []
for contour in contours:
    x, y, w, h = cv2.boundingRect(contour)
    area = w * h
    aspect_ratio = w / h if h > 0 else 0
    
    # Filter for text-like regions
    if 10 < w < 200 and 10 < h < 80 and area > 100:
        text_regions.append({
            'x': x, 'y': y, 'w': w, 'h': h,
            'center_x': x + w//2,
            'center_y': y + h//2,
            'aspect_ratio': aspect_ratio
        })

print(f"Found {len(text_regions)} potential text regions\n")

# Manual annotation based on typical layout
# These are approximate coordinates - will be refined based on edge detection

annotations = []

# REFRACTION TABLE PARAMETERS (Left column labels)
params_x = 130  # Approximate S,C,A,ADD column
param_labels = [
    {'label': 'S', 'approx_y': 160, 'color': (255, 255, 0)},
    {'label': 'C', 'approx_y': 220, 'color': (255, 200, 0)},
    {'label': 'A', 'approx_y': 280, 'color': (255, 150, 0)},
    {'label': 'ADD', 'approx_y': 340, 'color': (255, 100, 0)}
]

print("=== PARAMETER LABELS (S, C, A, ADD) ===")
for param in param_labels:
    # Find nearest text region
    nearest = None
    min_dist = float('inf')
    for region in text_regions:
        if abs(region['center_x'] - params_x) < 50:
            dist = abs(region['center_y'] - param['approx_y'])
            if dist < min_dist and dist < 40:
                min_dist = dist
                nearest = region
    
    if nearest:
        x, y, w, h = nearest['x'], nearest['y'], nearest['w'], nearest['h']
        draw.rectangle([x-2, y-2, x+w+2, y+h+2], outline=param['color'], width=3)
        draw.text((x+w+10, y), param['label'], fill=param['color'], font=font_large)
        print(f"{param['label']}: x={x}, y={y}, w={w}, h={h}")
        annotations.append({'type': 'param_label', 'label': param['label'], 'bbox': (x,y,w,h)})
    else:
        print(f"{param['label']}: NOT FOUND (expected near y={param['approx_y']})")

print("\n=== RIGHT EYE VALUES (R column) ===")
# Right eye column (leftmost numeric values)
r_col_x = 60
for i, param in enumerate(param_labels):
    y_center = param['approx_y']
    nearest = None
    min_dist = float('inf')
    for region in text_regions:
        if abs(region['center_x'] - r_col_x) < 40:
            dist = abs(region['center_y'] - y_center)
            if dist < min_dist and dist < 40:
                min_dist = dist
                nearest = region
    
    if nearest:
        x, y, w, h = nearest['x'], nearest['y'], nearest['w'], nearest['h']
        draw.rectangle([x-2, y-2, x+w+2, y+h+2], outline=(255, 100, 150), width=3)
        draw.text((x-35, y), 'R', fill=(255, 100, 150), font=font_small)
        print(f"R-{param['label']}: x={x}, y={y}, w={w}, h={h}")
        annotations.append({'type': 'right_value', 'param': param['label'], 'bbox': (x,y,w,h)})

print("\n=== LEFT EYE VALUES (L column) ===")
# Left eye column (rightmost numeric values in table)
l_col_x = 240
for i, param in enumerate(param_labels):
    y_center = param['approx_y']
    nearest = None
    min_dist = float('inf')
    for region in text_regions:
        if abs(region['center_x'] - l_col_x) < 40:
            dist = abs(region['center_y'] - y_center)
            if dist < min_dist and dist < 40:
                min_dist = dist
                nearest = region
    
    if nearest:
        x, y, w, h = nearest['x'], nearest['y'], nearest['w'], nearest['h']
        draw.rectangle([x-2, y-2, x+w+2, y+h+2], outline=(150, 100, 255), width=3)
        draw.text((x+w+10, y), 'L', fill=(150, 100, 255), font=font_small)
        print(f"L-{param['label']}: x={x}, y={y}, w={w}, h={h}")
        annotations.append({'type': 'left_value', 'param': param['label'], 'bbox': (x,y,w,h)})

print("\n=== PD (PUPILLARY DISTANCE) ===")
# PD is in the middle panel
pd_x = 360
pd_y = 220
nearest = None
min_dist = float('inf')
for region in text_regions:
    if 320 < region['center_x'] < 420:
        dist = abs(region['center_y'] - pd_y)
        if dist < min_dist and dist < 60:
            min_dist = dist
            nearest = region

if nearest:
    x, y, w, h = nearest['x'], nearest['y'], nearest['w'], nearest['h']
    draw.rectangle([x-5, y-5, x+w+5, y+h+5], outline=(0, 255, 255), width=4)
    draw.text((x, y-25), 'PD', fill=(0, 255, 255), font=font_large)
    print(f"PD: x={x}, y={y}, w={w}, h={h}")
    annotations.append({'type': 'pd', 'bbox': (x,y,w,h)})

print("\n=== OCCLUSION BUTTONS ===")
# Occlusion buttons are circular, detect circles
circles = cv2.HoughCircles(gray, cv2.HOUGH_GRADIENT, dp=1, minDist=50,
                           param1=100, param2=30, minRadius=20, maxRadius=50)

if circles is not None:
    circles = np.uint16(np.around(circles))
    occlusion_circles = []
    
    for circle in circles[0, :]:
        cx, cy, r = circle
        # Filter for middle panel area
        if 300 < cx < 450:
            occlusion_circles.append((cx, cy, r))
            draw.ellipse([cx-r, cy-r, cx+r, cy+r], outline=(255, 0, 255), width=4)
            
            # Determine if top or bottom occlusion
            if cy < 200:
                label = 'OCCL-L'
            else:
                label = 'OCCL-R'
            draw.text((cx+r+10, cy-10), label, fill=(255, 0, 255), font=font_medium)
            print(f"{label}: center=({cx}, {cy}), radius={r}")
            annotations.append({'type': 'occlusion', 'label': label, 'center': (cx,cy), 'radius': r})

print("\n=== MODE BUTTONS (R, BINO, L) ===")
# Mode buttons in right panel
mode_buttons_x = 500
mode_positions = [
    {'label': 'R', 'y': 140},
    {'label': 'BINO', 'y': 200},
    {'label': 'L', 'y': 260}
]

for mode in mode_positions:
    # Look for rectangular regions in right panel
    candidates = [r for r in text_regions if 450 < r['center_x'] < 600 
                  and abs(r['center_y'] - mode['y']) < 40]
    
    if candidates:
        # Get the largest region
        nearest = max(candidates, key=lambda r: r['w'] * r['h'])
        x, y, w, h = nearest['x'], nearest['y'], nearest['w'], nearest['h']
        
        # Expand to button size
        x -= 10
        w += 20
        h = 35
        
        draw.rectangle([x, y, x+w, y+h], outline=(128, 0, 255), width=3)
        draw.text((x-30, y+5), mode['label'], fill=(128, 0, 255), font=font_medium)
        print(f"{mode['label']}: x={x}, y={y}, w={w}, h={h}")
        annotations.append({'type': 'mode_button', 'label': mode['label'], 'bbox': (x,y,w,h)})

print("\n=== CHART BUTTONS (1,2,3,4,5) ===")
# Chart buttons at bottom
charts_y = 500
chart_start_x = 50

for i in range(1, 6):
    chart_x = chart_start_x + (i-1) * 120
    
    # Find text regions near this position
    candidates = [r for r in text_regions if abs(r['center_x'] - chart_x) < 80 
                  and abs(r['center_y'] - charts_y) < 40]
    
    if candidates:
        nearest = min(candidates, key=lambda r: abs(r['center_x'] - chart_x))
        x, y, w, h = nearest['x'], nearest['y'], nearest['w'], nearest['h']
        
        # Expand to button size
        x -= 10
        w += 20
        h = 30
        
        draw.rectangle([x, y, x+w, y+h], outline=(255, 165, 0), width=3)
        draw.text((x, y-20), f'Chart {i}', fill=(255, 165, 0), font=font_medium)
        print(f"Chart {i}: x={x}, y={y}, w={w}, h={h}")
        annotations.append({'type': 'chart_button', 'label': f'Chart{i}', 'bbox': (x,y,w,h)})
    else:
        print(f"Chart {i}: NOT FOUND (expected near x={chart_x})")

# Add legend
legend_y = 20
draw.text((10, legend_y), "Legend:", fill=(255, 255, 255), font=font_medium)
draw.text((10, legend_y+20), "Yellow = S,C,A,ADD", fill=(255, 255, 0), font=font_small)
draw.text((10, legend_y+35), "Pink = Right Eye Values", fill=(255, 100, 150), font=font_small)
draw.text((10, legend_y+50), "Purple = Left Eye Values", fill=(150, 100, 255), font=font_small)
draw.text((10, legend_y+65), "Cyan = PD", fill=(0, 255, 255), font=font_small)
draw.text((10, legend_y+80), "Magenta = Occlusion", fill=(255, 0, 255), font=font_small)
draw.text((10, legend_y+95), "Purple = Mode Buttons", fill=(128, 0, 255), font=font_small)
draw.text((10, legend_y+110), "Orange = Charts", fill=(255, 165, 0), font=font_small)

# Save annotated image
annotated_output = r"c:\Users\Lenskart\Downloads\Topcon - GUI Simulator\TopConApplication_ANNOTATED.png"
pil_img.save(annotated_output)

print(f"\n=== ANNOTATED IMAGE SAVED ===")
print(f"Location: {annotated_output}")
print(f"\nTotal annotations: {len(annotations)}")
print("\nYou can now use these bounding boxes for precise CSS positioning!")
