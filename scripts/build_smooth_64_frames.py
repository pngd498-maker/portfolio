import cv2
import numpy as np
import os
import json

def build_smooth_64():
    video_path = "public/character.mp4"
    frames_dir = "public/frames"
    os.makedirs(frames_dir, exist_ok=True)
    
    cap = cv2.VideoCapture(video_path)
    raw_frames = []
    while True:
        ret, frame = cap.read()
        if not ret: break
        raw_frames.append(frame)
    cap.release()
    print(f"Loaded {len(raw_frames)} video frames.")
    
    target_bg = np.array([11, 17, 234], dtype=np.uint8) # BGR for #ea110b
    
    # 64 Continuous, Butter-Smooth Frame Indices:
    indices = [
        # 0..7: RIGHT (0 deg) -> DOWN-RIGHT (45 deg)
        140, 145, 150, 155, 160, 165, 170, 175,
        # 8..15: DOWN-RIGHT (45 deg) -> DOWN (90 deg)
        176, 178, 180, 182, 184, 186, 192, 201,
        # 16..23: DOWN (90 deg) -> DOWN-LEFT (135 deg)
        203, 25, 29, 33, 37, 41, 44, 47,
        # 24..31: DOWN-LEFT (135 deg) -> LEFT (180 deg)
        49, 51, 53, 55, 57, 59, 61, 63,
        # 32..39: LEFT (180 deg) -> UP-LEFT (225 deg)
        65, 68, 71, 74, 77, 80, 83, 86,
        # 40..47: UP-LEFT (225 deg) -> UP (270 deg)
        89, 92, 95, 98, 100, 102, 104, 106,
        # 48..55: UP (270 deg) -> UP-RIGHT (315 deg)
        108, 111, 114, 117, 120, 122, 124, 126,
        # 56..63: UP-RIGHT (315 deg) -> RIGHT (360/0 deg)
        128, 130, 132, 134, 136, 138, 139, 140
    ]
    
    assert len(indices) == 64, f"Must be 64 frames, got {len(indices)}"
    
    def clean_frame(frame):
        cleaned = frame.copy()
        r = cleaned[:, :, 2]
        g = cleaned[:, :, 1]
        b = cleaned[:, :, 0]
        # Red background mask
        is_bg = (r > 185) & (g < 45) & (b < 45)
        cleaned[is_bg] = target_bg
        # Remove AI watermark in bottom-right
        cleaned[1120:1260, 560:710] = target_bg
        return cleaned

    # Save 64 frames
    print("Writing 64 continuous high-res WebP frames...")
    for i, f_idx in enumerate(indices):
        processed = clean_frame(raw_frames[f_idx])
        cv2.imwrite(f"{frames_dir}/{i}.webp", processed, [cv2.IMWRITE_WEBP_QUALITY, 92])
        cv2.imwrite(f"{frames_dir}/frame_{i}.webp", processed, [cv2.IMWRITE_WEBP_QUALITY, 92])
    
    # Save center frame (neutral direct eye contact)
    center = clean_frame(raw_frames[22])
    cv2.imwrite(f"{frames_dir}/center.webp", center, [cv2.IMWRITE_WEBP_QUALITY, 94])
    cv2.imwrite("public/center.webp", center, [cv2.IMWRITE_WEBP_QUALITY, 94])
    
    # Measure MAE continuity across all 64 steps
    head_raw = [raw_frames[i][50:350, 250:470] for i in indices]
    maes = [np.mean(cv2.absdiff(head_raw[i], head_raw[(i+1)%64])) for i in range(64)]
    print(f"Max frame-to-frame diff: {max(maes):.2f}")
    print(f"Mean frame-to-frame diff: {np.mean(maes):.2f}")
    print("Complete!")

if __name__ == "__main__":
    build_smooth_64()
