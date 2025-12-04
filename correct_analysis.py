import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

# Load the reference image
img_path = r"c:\Users\Lenskart\Downloads\Topcon - GUI Simulator\TopConApplication.png"
img = cv2.imread(img_path)
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
height, width = img.shape[:2]

print(f"Image dimensions: {width}x{height}\n")

# Create PIL image for drawing
pil_img = Image.fromarray(img_rgb)
draw = ImageDraw.Draw(pil_img)

try:
    font_large = ImageFont.truetype("arial.ttf", 24)
    font_medium = ImageFont.truetype("arial.ttf", 16)
    font_small = ImageFont.truetype("arial.ttf", 12)
except:
    font_large = font_medium = font_small = ImageFont.load_default()

# Manual analysis by examining the actual image structure
# Let's sample colors at various points to understand the layout

def sample_area(x, y, size=20):
    """Sample color from an area"""
    x, y = int(x), int(y)
    if 0 <= x < width-size and 0 <= y < height-size:
        region = img_rgb[y:y+size, x:x+size]
        avg = region.mean(axis=0).mean(axis=0)
        return tuple(map(int, avg))
    return (0, 0, 0)

print("=== SAMPLING LAYOUT ===\n")

# Sample at different positions to find boundaries
sample_points = [
    (50, 50, "Top-left area"),
    (width//2, 50, "Top-center"),
    (width-50, 50, "Top-right"),
    (100, 200, "Left middle area"),
    (width//2, 200, "Center middle"),
    (width-100, 200, "Right middle"),
    (100, 400, "Left lower area"),
    (width//2, 500, "Center lower"),
]

for x, y, label in sample_points:
    color = sample_area(x, y)
    print(f"{label} ({x}, {y}): RGB{color}")

print("\n=== EDGE DETECTION ANALYSIS ===\n")

# Better edge detection
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
edges = cv2.Canny(gray, 100, 200)

# Find strong contours
contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Filter and sort by area
major_contours = []
for contour in contours:
    area = cv2.contourArea(contour)
    if area > 10000:  # Only major sections
        x, y, w, h = cv2.boundingRect(contour)
        major_contours.append({'x': x, 'y': y, 'w': w, 'h': h, 'area': area})

major_contours.sort(key=lambda c: c['area'], reverse=True)

print(f"Found {len(major_contours)} major regions:\n")
for i, c in enumerate(major_contours[:10]):
    print(f"Region {i+1}: x={c['x']}, y={c['y']}, w={c['w']}, h={c['h']}, area={c['area']}")

print("\n=== MANUAL BOUNDARY DETECTION ===\n")

# Scan horizontally to find color changes (vertical boundaries)
def find_vertical_boundaries(y_pos, threshold=30):
    """Find vertical boundaries by scanning a horizontal line"""
    boundaries = []
    line = img_rgb[y_pos, :]
    
    for x in range(1, len(line)-1):
        diff = np.abs(line[x].astype(int) - line[x-1].astype(int)).sum()
        if diff > threshold:
            boundaries.append(x)
    
    # Merge nearby boundaries
    merged = []
    for b in boundaries:
        if not merged or b - merged[-1] > 20:
            merged.append(b)
    
    return merged

# Scan at different heights
scan_heights = [100, 200, 300, 450]
all_boundaries = []

for y in scan_heights:
    boundaries = find_vertical_boundaries(y)
    all_boundaries.extend(boundaries)
    print(f"Vertical boundaries at y={y}: {boundaries}")

# Find most common boundaries
from collections import Counter
boundary_freq = Counter(all_boundaries)
common_boundaries = [b for b, count in boundary_freq.most_common(10) if count >= 2]
common_boundaries.sort()

print(f"\nCommon vertical boundaries: {common_boundaries}\n")

# Find horizontal boundaries by scanning vertically
def find_horizontal_boundaries(x_pos, threshold=30):
    """Find horizontal boundaries by scanning a vertical line"""
    boundaries = []
    line = img_rgb[:, x_pos]
    
    for y in range(1, len(line)-1):
        diff = np.abs(line[y].astype(int) - line[y-1].astype(int)).sum()
        if diff > threshold:
            boundaries.append(y)
    
    # Merge nearby boundaries
    merged = []
    for b in boundaries:
        if not merged or b - merged[-1] > 20:
            merged.append(b)
    
    return merged

# Scan at different x positions
scan_positions = [100, width//2, width-100]
all_h_boundaries = []

for x in scan_positions:
    boundaries = find_horizontal_boundaries(x)
    all_h_boundaries.extend(boundaries)
    print(f"Horizontal boundaries at x={x}: {boundaries}")

h_boundary_freq = Counter(all_h_boundaries)
common_h_boundaries = [b for b, count in h_boundary_freq.most_common(10) if count >= 2]
common_h_boundaries.sort()

print(f"\nCommon horizontal boundaries: {common_h_boundaries}\n")

# Draw the detected boundaries
for x in common_boundaries:
    draw.line([(x, 0), (x, height)], fill=(255, 0, 0), width=3)

for y in common_h_boundaries:
    draw.line([(0, y), (width, y)], fill=(0, 255, 0), width=3)

# Add labels for detected sections
if len(common_boundaries) >= 2 and len(common_h_boundaries) >= 2:
    # Assume 3-column layout with header
    print("=== DETECTED LAYOUT ===\n")
    
    header_bottom = common_h_boundaries[0] if common_h_boundaries else 80
    main_bottom = common_h_boundaries[-1] if len(common_h_boundaries) > 1 else height - 100
    
    print(f"Header: 0 to {header_bottom}")
    print(f"Main content: {header_bottom} to {main_bottom}")
    
    if len(common_boundaries) >= 2:
        col1_end = common_boundaries[0]
        col2_end = common_boundaries[1] if len(common_boundaries) > 1 else width
        
        print(f"\nColumn 1 (Refraction): 0 to {col1_end}")
        print(f"Column 2 (Controls): {col1_end} to {col2_end}")
        print(f"Column 3 (Mode): {col2_end} to {width}")
        
        # Draw section labels
        draw.text((col1_end//2, header_bottom + 20), "REFRACTION TABLE", 
                 fill=(255, 0, 0), font=font_large)
        draw.text((col1_end + (col2_end-col1_end)//2, header_bottom + 20), "CONTROLS", 
                 fill=(0, 255, 0), font=font_large)
        draw.text((col2_end + (width-col2_end)//2, header_bottom + 20), "MODE", 
                 fill=(0, 0, 255), font=font_large)

# Save the corrected skeleton
output_path = r"c:\Users\Lenskart\Downloads\Topcon - GUI Simulator\TopConApplication_CORRECTED.png"
pil_img.save(output_path)

print(f"\n=== CORRECTED SKELETON SAVED ===")
print(f"Location: {output_path}")
print("\nRed lines = Vertical boundaries")
print("Green lines = Horizontal boundaries")
