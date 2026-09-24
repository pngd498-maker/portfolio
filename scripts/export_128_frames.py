import cv2
import numpy as np
import os
import json

def export_128_frames():
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
    
    # 128 Continuous Frames with ~2.81° spacing:
    # 1. 0..31: RIGHT (0 deg) -> DOWN-RIGHT (45 deg) -> DOWN (90 deg)
    s1 = [int(x) for x in np.linspace(140, 186, 32, endpoint=False)]
    
    # 2. 32..63: DOWN (90 deg) -> DOWN-LEFT (135 deg) -> LEFT (180 deg)
    s2_a = [int(x) for x in np.linspace(186, 203, 8, endpoint=False)]
    s2_b = [int(x) for x in np.linspace(22, 64, 24, endpoint=False)]
    s2 = s2_a + s2_b
    
    # 3. 64..95: LEFT (180 deg) -> UP-LEFT (225 deg) -> UP (270 deg)
    s3 = [int(x) for x in np.linspace(64, 106, 32, endpoint=False)]
    
    # 4. 96..127: UP (270 deg) -> UP-RIGHT (315 deg) -> RIGHT (360/0 deg)
    s4 = [int(x) for x in np.linspace(106, 140, 32, endpoint=False)]
    
    indices = s1 + s2 + s3 + s4
    assert len(indices) == 128, f"Expected 128, got {len(indices)}"
    
    def clean_frame(frame):
        cleaned = frame.copy()
        r = cleaned[:, :, 2]
        g = cleaned[:, :, 1]
        b = cleaned[:, :, 0]
        # Red background mask
        is_bg = (r > 185) & (g < 45) & (b < 45)
        cleaned[is_bg] = target_bg
        # Erase watermark region
        cleaned[1120:1260, 560:710] = target_bg
        return cleaned

    print("Cleaning and exporting 128 high-quality WebP frames...")
    metadata_frames = []
    
    for i, src_idx in enumerate(indices):
        processed = clean_frame(raw_frames[src_idx])
        cv2.imwrite(f"{frames_dir}/{i}.webp", processed, [cv2.IMWRITE_WEBP_QUALITY, 90])
        cv2.imwrite(f"{frames_dir}/frame_{i}.webp", processed, [cv2.IMWRITE_WEBP_QUALITY, 90])
        
        angle_deg = (i * 360.0) / 128.0
        metadata_frames.append({
            "index": i,
            "angle_deg": round(angle_deg, 2),
            "source_video_frame": src_idx,
            "filename": f"{i}.webp"
        })
    
    # Also save center neutral frame
    center = clean_frame(raw_frames[22])
    cv2.imwrite(f"{frames_dir}/center.webp", center, [cv2.IMWRITE_WEBP_QUALITY, 94])
    cv2.imwrite("public/center.webp", center, [cv2.IMWRITE_WEBP_QUALITY, 94])
    
    metadata = {
        "total_frames": 128,
        "degrees_per_frame": 360.0 / 128.0,
        "background_hex": "#ea110b",
        "background_rgb": [234, 17, 11],
        "face_center": {
            "x_ratio": 0.517,
            "y_ratio": 0.125
        },
        "frames": metadata_frames
    }
    
    with open(f"{frames_dir}/metadata.json", "w") as f:
        json.dump(metadata, f, indent=2)
        
    print("Exported 128 frames successfully!")

if __name__ == "__main__":
    export_128_frames()
