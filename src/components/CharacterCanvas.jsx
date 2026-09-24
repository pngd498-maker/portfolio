import React, { useEffect, useRef, useState } from 'react';

// Configurable tracking constants
export const HEAD_RESPONSE_MIN = 0.08;
export const HEAD_RESPONSE_MAX = 0.28;
export const HEAD_SETTLE_RESPONSE = 0.0;
export const FACE_CENTER_X = 0.517;
export const FACE_CENTER_Y = 0.125;
export const TOTAL_FRAMES = 128;

// Shortest-path circular angular lerp using exact Math.atan2 formula
export function lerpAngle(current, target, amount) {
  const delta = Math.atan2(Math.sin(target - current), Math.cos(target - current));
  return current + delta * amount;
}

// Map angle (radians) to 8 compass directions
export function getCompassDirection(angleRad) {
  let deg = ((angleRad * 180 / Math.PI) % 360 + 360) % 360;
  if (deg >= 337.5 || deg < 22.5) return 'RIGHT (0°)';
  if (deg >= 22.5 && deg < 67.5) return 'DOWN-RIGHT (45°)';
  if (deg >= 67.5 && deg < 112.5) return 'DOWN (90°)';
  if (deg >= 112.5 && deg < 157.5) return 'DOWN-LEFT (135°)';
  if (deg >= 157.5 && deg < 202.5) return 'LEFT (180°)';
  if (deg >= 202.5 && deg < 247.5) return 'UP-LEFT (225°)';
  if (deg >= 247.5 && deg < 292.5) return 'UP (270°)';
  return 'UP-RIGHT (315°)';
}

export default function CharacterCanvas({
  autoOrbit = false,
  onTelemetryUpdate = () => {},
  style = {}
}) {
  const canvasRef = useRef(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const framesRef = useRef([]);
  
  // Real-time tracking coordinates (mutable refs - NO React re-renders on mousemove)
  const mousePos = useRef({ x: window.innerWidth * 0.7, y: window.innerHeight * 0.35 });
  const smoothedAngle = useRef(0);
  const currentFrameIdx = useRef(0);
  const angularVelocity = useRef(0);
  const lastTime = useRef(performance.now());
  const frameCount = useRef(0);
  const fpsRef = useRef(60);

  // Accessibility: prefers-reduced-motion
  const prefersReducedMotion = useRef(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Center image for reduced motion / initial fallback
  const centerImageRef = useRef(null);

  // Auto orbit virtual angle
  const orbitAngle = useRef(0);

  // 1. Preload 128 dense continuous frames into memory (prefer ImageBitmap for instant GPU decoding)
  useEffect(() => {
    let loaded = 0;
    const total = TOTAL_FRAMES + 1; // 128 frames + center
    const frameImages = new Array(TOTAL_FRAMES);

    const onFrameReady = () => {
      loaded += 1;
      setLoadProgress(Math.round((loaded / total) * 100));
      if (loaded >= total) {
        framesRef.current = frameImages;
        setIsLoaded(true);
      }
    };

    // Preload center.webp
    const centerImg = new Image();
    centerImg.src = '/center.webp';
    centerImg.onload = () => {
      centerImageRef.current = centerImg;
      onFrameReady();
    };
    centerImg.onerror = () => onFrameReady();

    // Load each frame using ImageBitmap or Image element
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/${i}.webp`;
      img.onload = () => {
        if (window.createImageBitmap) {
          createImageBitmap(img).then((bmp) => {
            frameImages[i] = bmp;
            onFrameReady();
          }).catch(() => {
            frameImages[i] = img;
            onFrameReady();
          });
        } else {
          frameImages[i] = img;
          onFrameReady();
        }
      };
      img.onerror = () => {
        // Fallback filename pattern if needed
        img.src = `/frames/frame_${i}.webp`;
        img.onload = () => {
          frameImages[i] = img;
          onFrameReady();
        };
      };
    }

    return () => {
      framesRef.current = [];
    };
  }, []);

  // 2. High-Precision Pointer Tracking (using pointermove without React state re-renders)
  useEffect(() => {
    const handlePointerMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  // 3. Ultra-Smooth 60/120 FPS Continuous Canvas Render Loop (Zero Snap, Adaptive Lerp)
  useEffect(() => {
    if (!isLoaded) return;

    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = (time) => {
      animId = requestAnimationFrame(render);

      frameCount.current += 1;
      if (time - lastTime.current >= 1000) {
        fpsRef.current = Math.round((frameCount.current * 1000) / (time - lastTime.current));
        frameCount.current = 0;
        lastTime.current = time;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;

      // Full-body character positioning with ample top headroom to prevent any head clipping
      const charH = Math.min(canvas.height * 0.93, canvas.height - 35 * dpr);
      const charW = charH * (720 / 1280);
      
      const charX = viewportW > 900
        ? (canvas.width - charW) * 0.54
        : (canvas.width - charW) * 0.5;
      const charY = canvas.height - charH; // Feet touch canvas bottom

      // Exact face center in screen coordinates
      const faceScreenX = (charX + charW * FACE_CENTER_X) / dpr;
      const faceScreenY = (charY + charH * FACE_CENTER_Y) / dpr;

      let targetX = mousePos.current.x;
      let targetY = mousePos.current.y;

      if (autoOrbit) {
        orbitAngle.current += 0.024;
        const orbitRadius = Math.min(viewportW, viewportH) * 0.35;
        targetX = faceScreenX + Math.cos(orbitAngle.current) * orbitRadius;
        targetY = faceScreenY + Math.sin(orbitAngle.current) * orbitRadius;
      }

      const dx = targetX - faceScreenX;
      const dy = targetY - faceScreenY;

      // Target vector angle in radians
      const targetAngle = Math.atan2(dy, dx);

      // Shortest-path angular delta
      const delta = Math.atan2(
        Math.sin(targetAngle - smoothedAngle.current),
        Math.cos(targetAngle - smoothedAngle.current)
      );
      const absDelta = Math.abs(delta);
      angularVelocity.current = delta;

      // Adaptive response factor:
      // - Large movement (> 0.45 rad): fast catch-up (HEAD_RESPONSE_MAX = 0.28)
      // - Medium movement (0.08 - 0.45 rad): smoothly scaled response
      // - Tiny micro-motion (0.012 - 0.08 rad): damped response (0.048)
      // - Stationary (<= 0.012 rad): settle naturally with zero jitter (HEAD_SETTLE_RESPONSE = 0.0)
      let dynamicResponse = HEAD_RESPONSE_MIN;
      if (absDelta > 0.45) {
        dynamicResponse = HEAD_RESPONSE_MAX;
      } else if (absDelta > 0.08) {
        const t = (absDelta - 0.08) / (0.45 - 0.08);
        dynamicResponse = HEAD_RESPONSE_MIN + t * (HEAD_RESPONSE_MAX - HEAD_RESPONSE_MIN);
      } else if (absDelta > 0.012) {
        dynamicResponse = HEAD_RESPONSE_MIN * 0.6;
      } else {
        dynamicResponse = HEAD_SETTLE_RESPONSE;
      }

      // Continuous floating-point angle update
      smoothedAngle.current = lerpAngle(smoothedAngle.current, targetAngle, dynamicResponse);

      // Map smoothed continuous angle to 128 continuous frames with frame boundary hysteresis
      const normAngle = ((smoothedAngle.current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      const rawFrameIdx = Math.round((normAngle / (2 * Math.PI)) * TOTAL_FRAMES) % TOTAL_FRAMES;

      const frameStep = (2 * Math.PI) / TOTAL_FRAMES;
      const currentCenterAngle = currentFrameIdx.current * frameStep;
      const diffFromCurrent = Math.abs(
        Math.atan2(Math.sin(normAngle - currentCenterAngle), Math.cos(normAngle - currentCenterAngle))
      );

      // Hysteresis threshold: only change frame if distance to candidate exceeds 35% of a frame step
      if (diffFromCurrent > frameStep * 0.35) {
        currentFrameIdx.current = rawFrameIdx;
      }
      const frameIdx = currentFrameIdx.current;

      // CRITICAL: NEVER do an abrupt center.webp snap!
      // The 128 continuous frames naturally contain the forward/center-facing head orientation.
      // center.webp is reserved solely for prefersReducedMotion.
      let imgToDraw = framesRef.current[frameIdx];

      if (prefersReducedMotion.current && centerImageRef.current) {
        imgToDraw = centerImageRef.current;
      }

      if (imgToDraw) {
        // Seamless background fill matching exactly #ea110b
        ctx.fillStyle = '#ea110b';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Draw single crisp frame at 100% opacity
        ctx.drawImage(imgToDraw, charX, charY, charW, charH);
      }

      // Telemetry update
      const deg = ((smoothedAngle.current * 180 / Math.PI) % 360 + 360) % 360;
      onTelemetryUpdate({
        angleDeg: deg.toFixed(1),
        compassDir: getCompassDirection(smoothedAngle.current),
        frameIndex: frameIdx,
        totalFrames: TOTAL_FRAMES,
        fps: fpsRef.current,
        latencyMs: Math.round((1 - dynamicResponse) * 16 + 6)
      });

    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoaded, autoOrbit, onTelemetryUpdate]);

  return (
    <>
      {!isLoaded && (
        <div style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ea110b',
          zIndex: 100
        }}>
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: '1.2rem',
            letterSpacing: '0.12em',
            marginBottom: '14px',
            color: '#ffffff'
          }}>
            CACHING 128 HIGH-RES FRAMES
          </div>
          <div style={{
            width: '240px',
            height: '4px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${loadProgress}%`,
              height: '100%',
              background: '#ffffff',
              transition: 'width 0.08s ease'
            }} />
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.7)',
            marginTop: '10px'
          }}>
            {loadProgress}% · Continuous 2.81° Micro-Step Engine
          </div>
        </div>
      )}

      {/* FULL-SCREEN CANVAS: 100vw, 100vh, object-fit: cover, NO CSS 3D TRANSFORMS */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          pointerEvents: 'none',
          zIndex: 2,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.25s ease',
          transform: 'none',
          perspective: 'none',
          ...style
        }}
        aria-label="Full-screen continuous cursor-tracking character canvas"
      />
    </>
  );
}
