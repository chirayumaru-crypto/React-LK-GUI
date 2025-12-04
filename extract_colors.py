import cv2
import numpy as np
from sklearn.cluster import KMeans
from collections import Counter

def get_dominant_colors(image_path, k=10):
    img = cv2.imread(image_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = img.reshape((img.shape[0] * img.shape[1], 3))
    
    clt = KMeans(n_clusters=k)
    clt.fit(img)
    
    counts = Counter(clt.labels_)
    center_colors = clt.cluster_centers_
    
    ordered_colors = [center_colors[i] for i in counts.keys()]
    hex_colors = ['#{:02x}{:02x}{:02x}'.format(int(c[0]), int(c[1]), int(c[2])) for c in ordered_colors]
    
    return hex_colors

image_path = r"C:/Users/Lenskart/.gemini/antigravity/brain/29960c47-3571-4023-a52d-e7d07d631d72/uploaded_image_1764759284205.png"
colors = get_dominant_colors(image_path)
print("Dominant Colors:", colors)

# Specific sampling for key UI elements (approximate coordinates based on visual inspection)
# We'll just print the dominant ones for now to get the palette.
