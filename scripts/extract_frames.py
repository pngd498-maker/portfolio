import cv2
import numpy as np
import os
import json

def extract_character_frames():
    video_path = "public/character.mp4"
    frames_dir = "public/frames"
    os.makedirs(frames_dir, exist_ok=True)
    
    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    
    print(f"Loading video: {video_path}")
    print(f"Dimensions: {w}x{h}, FPS: {fps}, Total Frames: {total_frames}")
    
    raw_frames = []
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        raw_frames.append(frame)
    cap.release()
    
    # 1. Determine exact background color
    # Sample background corners across multiple frames
    sample_pixels = []
    for f_idx in [0, 20, 60, 100, 140, 180, 220]:
        fr = raw_frames[f_idx]
        sample_pixels.append(fr[0:40, 0:40])
        sample_pixels.append(fr[0:40, -40:])
        sample_pixels.append(fr[-40:, 0:40])
    
    stacked = np.concatenate([s.reshape(-1, 3) for s in sample_pixels], axis=0)
    median_bgr = np.median(stacked, axis=0).astype(int)
    bg_rgb = [int(median_bgr[2]), int(median_bgr[1]), int(median_bgr[0])]
    bg_hex = f"#{bg_rgb[0]:02x}{bg_rgb[1]:02x}{bg_rgb[2]:02x}"
    
    print(f"\n[Background Detection]")
    print(f"  Detected BGR: {median_bgr.tolist()}")
    print(f"  Detected RGB: {bg_rgb}")
    print(f"  Detected HEX: {bg_hex}")
    
    target_bg = np.array(median_bgr, dtype=np.uint8)
    
    # 2. Key Frame Compass Identification
    # 8 Compass directions + CENTER:
    compass_frames = {
        "RIGHT": {"index": 0, "angle_deg": 0.0, "source_frame": 138},
        "DOWN_RIGHT": {"index": 8, "angle_deg": 45.0, "source_frame": 176},
        "DOWN": {"index": 16, "angle_deg": 90.0, "source_frame": 181},
        "DOWN_LEFT": {"index": 24, "angle_deg": 135.0, "source_frame": 98},
        "LEFT": {"index": 32, "angle_deg": 180.0, "source_frame": 62},
        "UP_LEFT": {"index": 40, "angle_deg": 225.0, "source_frame": 3},
        "UP": {"index": 48, "angle_deg": 270.0, "source_frame": 116},
        "UP_RIGHT": {"index": 56, "angle_deg": 315.0, "source_frame": 124},
        "CENTER": {"index": "center", "angle_deg": None, "source_frame": 22}
    }
    
    # Build 64 trajectory frame indices
    s1 = [int(x) for x in np.linspace(138, 175, 8, endpoint=False)]
    s2 = [int(x) for x in np.linspace(175, 182, 8, endpoint=False)]
    s3 = [182, 103, 102, 101, 100, 99, 98, 97]
    s4 = [96, 95, 94, 92, 85, 75, 68, 62]
    s5 = [62, 56, 50, 42, 6, 5, 4, 3]
    s6 = [3, 2, 1, 0, 0, 116, 117, 118]
    s7 = [int(x) for x in np.linspace(118, 126, 8, endpoint=False)]
    s8 = [int(x) for x in np.linspace(126, 138, 8, endpoint=False)]
    
    frame_indices = s1 + s2 + s3 + s4 + s5 + s6 + s7 + s8
    assert len(frame_indices) == 64, f"Expected 64 frames, got {len(frame_indices)}"
    
    print("\n[Compass Anchors & Trajectory]")
    for k, v in compass_frames.items():
        print(f"  {k:12s}: Frame {v['source_frame']} (Trajectory Index: {v['index']})")
        
    def process_and_clean_frame(frame):
        # 1. Background cleanup for pure seamless color
        cleaned = frame.copy()
        r_ch = cleaned[:, :, 2]
        g_ch = cleaned[:, :, 1]
        b_ch = cleaned[:, :, 0]
        
        # Red background mask
        is_bg = (r_ch > 185) & (g_ch < 45) & (b_ch < 45)
        cleaned[is_bg] = target_bg
        
        # 2. Remove bottom right AI generator watermark (x > 560, y > 1100)
        cleaned[1120:1260, 560:710] = target_bg
        return cleaned

    # 3. Export 64 frames
    print(f"\n[Exporting 64 WebP frames to {frames_dir}]...")
    metadata_frames = []
    
    for i, src_idx in enumerate(frame_indices):
        frame = raw_frames[src_idx]
        processed = process_and_clean_frame(frame)
        
        # Save as both frame_0.webp and 0.webp for maximum compatibility
        fname_numbered = f"{frames_dir}/{i}.webp"
        fname_prefixed = f"{frames_dir}/frame_{i}.webp"
        cv2.imwrite(fname_numbered, processed, [cv2.IMWRITE_WEBP_QUALITY, 92])
        cv2.imwrite(fname_prefixed, processed, [cv2.IMWRITE_WEBP_QUALITY, 92])
        
        angle_deg = (i * 360.0) / 64.0
        metadata_frames.append({
            "index": i,
            "angle_deg": round(angle_deg, 2),
            "source_video_frame": src_idx,
            "filename": f"{i}.webp"
        })
    
    # 4. Export center neutral frame
    center_frame = raw_frames[compass_frames["CENTER"]["source_frame"]]
    processed_center = process_and_clean_frame(center_frame)
    cv2.imwrite(f"{frames_dir}/center.webp", processed_center, [cv2.IMWRITE_WEBP_QUALITY, 94])
    cv2.imwrite("public/center.webp", processed_center, [cv2.IMWRITE_WEBP_QUALITY, 94])
    print(f"Saved center frame to {frames_dir}/center.webp and public/center.webp")
    
    # 5. Save metadata.json
    metadata = {
        "total_frames": 64,
        "degrees_per_frame": 360.0 / 64.0,
        "background_hex": bg_hex,
        "background_rgb": bg_rgb,
        "face_center": {
            "x_ratio": 0.517, # 372 / 720
            "y_ratio": 0.125  # 160 / 1280 (around eyes/bridge)
        },
        "compass_anchors": compass_frames,
        "frames": metadata_frames
    }
    
    with open(f"{frames_dir}/metadata.json", "w") as f:
        json.dump(metadata, f, indent=2)
    print(f"Saved metadata to {frames_dir}/metadata.json")
    print("\nPre-extraction successfully completed!")

if __name__ == "__main__":
    extract_character_frames()
