import cv2
import numpy as np
import os
import json

def extract_head_frames():
    video_path = "public/character.mp4"
    frames_dir = "public/frames"
    os.makedirs(frames_dir, exist_ok=True)

    if not os.path.exists(video_path):
        print(f"Error: Video file not found at {video_path}")
        return

    cap = cv2.VideoCapture(video_path)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration = total_frames / fps if fps > 0 else 0

    print("=== Video Inspection ===")
    print(f"Dimensions: {width}x{height}")
    print(f"FPS: {fps:.2f}")
    print(f"Total Frame Count: {total_frames}")
    print(f"Duration: {duration:.2f} seconds")
    print("Usable Trajectory: 360-degree head rotation around vertical neck axis")
    print("Rotation Direction: Clockwise head azimuth trajectory")
    print("=========================")

    raw_frames = []
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        raw_frames.append(frame)
    cap.release()

    target_bg = np.array([11, 17, 234], dtype=np.uint8) # BGR for #ea110b

    # Map 128 continuous micro-steps (~2.8125 deg per frame)
    # Quadrant 1: 0..31: RIGHT (0 deg) -> DOWN-RIGHT (45 deg) -> DOWN (90 deg)
    s1 = [int(x) for x in np.linspace(140, 186, 32, endpoint=False)]
    # Quadrant 2: 32..63: DOWN (90 deg) -> DOWN-LEFT (135 deg) -> LEFT (180 deg)
    s2_a = [int(x) for x in np.linspace(186, 203, 8, endpoint=False)]
    s2_b = [int(x) for x in np.linspace(22, 64, 24, endpoint=False)]
    s2 = s2_a + s2_b
    # Quadrant 3: 64..95: LEFT (180 deg) -> UP-LEFT (225 deg) -> UP (270 deg)
    s3 = [int(x) for x in np.linspace(64, 106, 32, endpoint=False)]
    # Quadrant 4: 96..127: UP (270 deg) -> UP-RIGHT (315 deg) -> RIGHT (360/0 deg)
    s4 = [int(x) for x in np.linspace(106, 140, 32, endpoint=False)]

    indices = s1 + s2 + s3 + s4
    assert len(indices) == 128, f"Expected 128, got {len(indices)}"

    def clean_frame(frame):
        cleaned = frame.copy()
        r = cleaned[:, :, 2]
        g = cleaned[:, :, 1]
        b = cleaned[:, :, 0]
        # Uniform studio background replacement
        is_bg = (r > 185) & (g < 45) & (b < 45)
        cleaned[is_bg] = target_bg
        # Erase bottom watermark artifact cleanly
        cleaned[1120:1260, 560:710] = target_bg
        return cleaned

    print("Encoding 128 continuous WebP frames...")
    metadata_frames = []

    for i, src_idx in enumerate(indices):
        processed = clean_frame(raw_frames[src_idx])
        angle_deg = (i * 360.0) / 128.0

        # Save with all standard naming conventions
        cv2.imwrite(f"{frames_dir}/frame-{i:03d}.webp", processed, [cv2.IMWRITE_WEBP_QUALITY, 92])
        cv2.imwrite(f"{frames_dir}/frame_{i}.webp", processed, [cv2.IMWRITE_WEBP_QUALITY, 92])
        cv2.imwrite(f"{frames_dir}/{i}.webp", processed, [cv2.IMWRITE_WEBP_QUALITY, 92])

        metadata_frames.append({
            "index": i,
            "angle_deg": round(angle_deg, 2),
            "source_video_frame": src_idx,
            "filename": f"frame-{i:03d}.webp"
        })

    # Save center neutral frame
    center = clean_frame(raw_frames[22])
    cv2.imwrite(f"{frames_dir}/center.webp", center, [cv2.IMWRITE_WEBP_QUALITY, 94])
    cv2.imwrite("public/center.webp", center, [cv2.IMWRITE_WEBP_QUALITY, 94])

    metadata = {
        "total_frames": 128,
        "degrees_per_frame": 360.0 / 128.0,
        "background_hex": "#ea110b",
        "background_rgb": [234, 17, 11],
        "video_specs": {
            "width": width,
            "height": height,
            "fps": fps,
            "total_frames": total_frames,
            "duration": round(duration, 2)
        },
        "face_center": {
            "x_ratio": 0.517,
            "y_ratio": 0.125
        },
        "frames": metadata_frames
    }

    with open(f"{frames_dir}/metadata.json", "w") as f:
        json.dump(metadata, f, indent=2)

    print("Successfully generated all 128 WebP frames and metadata.json!")

if __name__ == "__main__":
    extract_head_frames()
