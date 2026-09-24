import cv2
import numpy as np
import os

cap = cv2.VideoCapture("public/character.mp4")
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
print("Total frames:", total_frames)

os.makedirs("scripts/samples", exist_ok=True)

# Sample every 6 frames (total 40 samples)
frame_idx = 0
samples = []
bg_colors = []

while True:
    ret, frame = cap.read()
    if not ret:
        break
    # Check background color at top corners (e.g. [10, 10], [10, w-10])
    h, w, _ = frame.shape
    corner_colors = [
        frame[10, 10],
        frame[10, w - 10],
        frame[h - 10, 10],
        frame[h - 10, w - 10],
    ]
    avg_corner = np.mean(corner_colors, axis=0) # BGR
    bg_colors.append(avg_corner)

    if frame_idx % 6 == 0:
        cv2.imwrite(f"scripts/samples/frame_{frame_idx:03d}.jpg", frame)
    frame_idx += 1

cap.release()

avg_bg = np.mean(bg_colors, axis=0)
b, g, r = int(avg_bg[0]), int(avg_bg[1]), int(avg_bg[2])
hex_color = f"#{r:02x}{g:02x}{b:02x}"
print(f"Average background color BGR: {avg_bg}, RGB: ({r}, {g}, {b}), HEX: {hex_color}")
