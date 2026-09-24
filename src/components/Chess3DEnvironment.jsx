import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Chess } from 'chess.js';

// FIXED CAMERA DISTANCE: strictly constant, zero zoom allowed anywhere
const CHESS_CAMERA_DISTANCE = 19.5;
const TILE_SIZE = 1.4;

/**
 * Creates classical Staunton-style 3D piece meshes
 */

// 1. PAWN: Classic rounded head, sharp annular collar ring, tapered waist, stepped pedestal
function createPawnMesh(material) {
  const group = new THREE.Group();

  // Base, stem, and collar profile
  const pts = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.40, 0),
    new THREE.Vector2(0.40, 0.06),
    new THREE.Vector2(0.35, 0.10),
    new THREE.Vector2(0.35, 0.16),
    new THREE.Vector2(0.28, 0.24),
    new THREE.Vector2(0.20, 0.44),
    new THREE.Vector2(0.18, 0.65),
    new THREE.Vector2(0.24, 0.78),
    new THREE.Vector2(0.26, 0.82),
    new THREE.Vector2(0.15, 0.86),
    new THREE.Vector2(0.12, 0.90),
    new THREE.Vector2(0, 0.90)
  ];
  const stemGeo = new THREE.LatheGeometry(pts, 32);
  const stemMesh = new THREE.Mesh(stemGeo, material);
  group.add(stemMesh);

  // Perfect spherical head
  const headGeo = new THREE.SphereGeometry(0.20, 32, 24);
  const headMesh = new THREE.Mesh(headGeo, material);
  headMesh.position.y = 1.04;
  group.add(headMesh);

  // Tiny apex finial bead
  const beadGeo = new THREE.SphereGeometry(0.04, 16, 16);
  const beadMesh = new THREE.Mesh(beadGeo, material);
  beadMesh.position.y = 1.24;
  group.add(beadMesh);

  return group;
}

// 2. ROOK: Castle tower with cylindrical body, wide base, and crenellated battlement top
function createRookMesh(material) {
  const group = new THREE.Group();

  // Tower pedestal, stem, and hollow parapet rim
  const pts = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.46, 0),
    new THREE.Vector2(0.46, 0.08),
    new THREE.Vector2(0.40, 0.14),
    new THREE.Vector2(0.40, 0.20),
    new THREE.Vector2(0.35, 0.28),
    new THREE.Vector2(0.34, 0.70),
    new THREE.Vector2(0.38, 1.05),
    new THREE.Vector2(0.44, 1.18),
    new THREE.Vector2(0.44, 1.45),
    new THREE.Vector2(0.32, 1.45),
    new THREE.Vector2(0.32, 1.28),
    new THREE.Vector2(0, 1.28)
  ];
  const baseGeo = new THREE.LatheGeometry(pts, 32);
  const baseMesh = new THREE.Mesh(baseGeo, material);
  group.add(baseMesh);

  // 4 Castle battlements (merlons) with distinct embrasures/crenels
  const merlonGeo = new THREE.BoxGeometry(0.18, 0.16, 0.10);
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    const merlon = new THREE.Mesh(merlonGeo, material);
    merlon.position.set(Math.cos(angle) * 0.38, 1.51, Math.sin(angle) * 0.38);
    merlon.rotation.y = -angle;
    group.add(merlon);
  }

  return group;
}

// 3. KNIGHT: Dedicated sculptural HORSE-HEAD silhouette with snout, ears, mane, and pedestal
function createKnightMesh(material, color = 'w') {
  const group = new THREE.Group();

  // Stepped lathe pedestal base
  const basePts = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.46, 0),
    new THREE.Vector2(0.46, 0.08),
    new THREE.Vector2(0.40, 0.14),
    new THREE.Vector2(0.38, 0.22),
    new THREE.Vector2(0.32, 0.35),
    new THREE.Vector2(0.32, 0.48),
    new THREE.Vector2(0.34, 0.52),
    new THREE.Vector2(0, 0.52)
  ];
  const baseGeo = new THREE.LatheGeometry(basePts, 32);
  const baseMesh = new THREE.Mesh(baseGeo, material);
  group.add(baseMesh);

  // Sculpted horse head 2D profile
  const horseShape = new THREE.Shape();
  // Bottom of neck at collar
  horseShape.moveTo(-0.16, 0.50);
  // Arched chest swelling forward
  horseShape.bezierCurveTo(0.12, 0.58, 0.32, 0.82, 0.36, 1.05);
  // Throat and chin undercut
  horseShape.bezierCurveTo(0.32, 1.14, 0.26, 1.18, 0.30, 1.25);
  // Lower lip
  horseShape.lineTo(0.36, 1.28);
  // Mouth cleft
  horseShape.lineTo(0.32, 1.31);
  // Muzzle & nostril
  horseShape.bezierCurveTo(0.40, 1.36, 0.38, 1.44, 0.28, 1.44);
  // Bridge of nose curving to forehead
  horseShape.bezierCurveTo(0.20, 1.44, 0.12, 1.50, 0.08, 1.58);
  // Upright pointed horse ears
  horseShape.lineTo(0.06, 1.76);
  horseShape.lineTo(0.00, 1.76);
  horseShape.lineTo(-0.04, 1.62);
  // Crested mane with decorative tresses down the arched neck
  horseShape.bezierCurveTo(-0.12, 1.56, -0.22, 1.42, -0.25, 1.24);
  horseShape.bezierCurveTo(-0.28, 1.05, -0.27, 0.82, -0.22, 0.62);
  horseShape.lineTo(-0.16, 0.50);

  const extrudeSettings = {
    steps: 2,
    depth: 0.24,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelSegments: 4
  };

  const headGeo = new THREE.ExtrudeGeometry(horseShape, extrudeSettings);
  // Center along Z axis (depth)
  headGeo.translate(0, 0, -0.12);

  const headMesh = new THREE.Mesh(headGeo, material);
  group.add(headMesh);

  // 3D sculpted ears for depth
  const earGeo = new THREE.ConeGeometry(0.04, 0.14, 8);
  const leftEar = new THREE.Mesh(earGeo, material);
  leftEar.position.set(0.03, 1.72, 0.08);
  leftEar.rotation.z = -0.15;
  leftEar.rotation.x = 0.2;
  group.add(leftEar);

  const rightEar = new THREE.Mesh(earGeo, material);
  rightEar.position.set(0.03, 1.72, -0.08);
  rightEar.rotation.z = -0.15;
  rightEar.rotation.x = -0.2;
  group.add(rightEar);

  // Sculpted almond eyes
  const eyeGeo = new THREE.SphereGeometry(0.035, 12, 12);
  const leftEye = new THREE.Mesh(eyeGeo, material);
  leftEye.position.set(0.16, 1.42, 0.14);
  group.add(leftEye);

  const rightEye = new THREE.Mesh(eyeGeo, material);
  rightEye.position.set(0.16, 1.42, -0.14);
  group.add(rightEye);

  // White knights face Black (-Z), Black knights face White (+Z)
  if (color === 'w') {
    group.rotation.y = Math.PI / 2;
  } else {
    group.rotation.y = -Math.PI / 2;
  }

  return group;
}

// 4. BISHOP: Tapered stem, miter head with characteristic diagonal bishop slit, and apex bead
function createBishopMesh(material) {
  const group = new THREE.Group();

  // Pedestal and stem
  const pts = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.44, 0),
    new THREE.Vector2(0.44, 0.08),
    new THREE.Vector2(0.38, 0.14),
    new THREE.Vector2(0.38, 0.20),
    new THREE.Vector2(0.32, 0.28),
    new THREE.Vector2(0.22, 0.70),
    new THREE.Vector2(0.26, 0.95),
    new THREE.Vector2(0.32, 1.08),
    new THREE.Vector2(0.20, 1.15),
    new THREE.Vector2(0.30, 1.35),
    new THREE.Vector2(0.26, 1.62),
    new THREE.Vector2(0.10, 1.74),
    new THREE.Vector2(0.08, 1.78),
    new THREE.Vector2(0, 1.78)
  ];
  const stemGeo = new THREE.LatheGeometry(pts, 32);
  const stemMesh = new THREE.Mesh(stemGeo, material);
  group.add(stemMesh);

  // Characteristic Bishop Slit (diagonal cut slot on the miter)
  const slitGeo = new THREE.BoxGeometry(0.04, 0.32, 0.20);
  const slitMat = new THREE.MeshBasicMaterial({ color: 0x0a0608 });
  const slitMesh = new THREE.Mesh(slitGeo, slitMat);
  slitMesh.position.set(0.18, 1.48, 0);
  slitMesh.rotation.z = -0.55; // 32° diagonal angle
  group.add(slitMesh);

  // Apex finial bead
  const finialGeo = new THREE.SphereGeometry(0.07, 20, 20);
  const finialMesh = new THREE.Mesh(finialGeo, material);
  finialMesh.position.y = 1.84;
  group.add(finialMesh);

  return group;
}

// 5. QUEEN: Flared coronet crown with pearl finials, royal dome, slightly shorter than King
function createQueenMesh(material) {
  const group = new THREE.Group();

  // Pedestal, slender waist, and flared coronet body
  const pts = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.48, 0),
    new THREE.Vector2(0.48, 0.10),
    new THREE.Vector2(0.42, 0.18),
    new THREE.Vector2(0.40, 0.24),
    new THREE.Vector2(0.26, 0.85),
    new THREE.Vector2(0.32, 1.20),
    new THREE.Vector2(0.36, 1.30),
    new THREE.Vector2(0.24, 1.38),
    new THREE.Vector2(0.40, 1.72),
    new THREE.Vector2(0.44, 1.88),
    new THREE.Vector2(0.34, 1.88),
    new THREE.Vector2(0.18, 1.84),
    new THREE.Vector2(0.14, 1.94),
    new THREE.Vector2(0, 1.94)
  ];
  const stemGeo = new THREE.LatheGeometry(pts, 32);
  const stemMesh = new THREE.Mesh(stemGeo, material);
  group.add(stemMesh);

  // 8 Royal coronet points / pearls around the rim
  const pearlGeo = new THREE.SphereGeometry(0.045, 12, 12);
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8;
    const pearl = new THREE.Mesh(pearlGeo, material);
    pearl.position.set(Math.cos(angle) * 0.42, 1.90, Math.sin(angle) * 0.42);
    group.add(pearl);
  }

  // Central royal orb finial atop the dome
  const orbGeo = new THREE.SphereGeometry(0.09, 20, 20);
  const orbMesh = new THREE.Mesh(orbGeo, material);
  orbMesh.position.y = 2.05;
  group.add(orbMesh);

  return group;
}

// 6. KING: Tallest piece, wide regal base, imperial crown, and 3D cross apex
function createKingMesh(material) {
  const group = new THREE.Group();

  // Regal base, dignified stem, and imperial flared crown
  const pts = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.52, 0),
    new THREE.Vector2(0.52, 0.12),
    new THREE.Vector2(0.45, 0.22),
    new THREE.Vector2(0.44, 0.28),
    new THREE.Vector2(0.28, 0.95),
    new THREE.Vector2(0.36, 1.30),
    new THREE.Vector2(0.42, 1.45),
    new THREE.Vector2(0.28, 1.54),
    new THREE.Vector2(0.44, 1.85),
    new THREE.Vector2(0.46, 2.08),
    new THREE.Vector2(0.30, 2.18),
    new THREE.Vector2(0.16, 2.18),
    new THREE.Vector2(0.12, 2.24),
    new THREE.Vector2(0, 2.24)
  ];
  const bodyGeo = new THREE.LatheGeometry(pts, 32);
  const bodyMesh = new THREE.Mesh(bodyGeo, material);
  group.add(bodyMesh);

  // 3D Maltese / Latin Royal Cross at pinnacle
  const crossGroup = new THREE.Group();
  const vBarGeo = new THREE.BoxGeometry(0.08, 0.28, 0.08);
  const hBarGeo = new THREE.BoxGeometry(0.22, 0.08, 0.08);
  const vBar = new THREE.Mesh(vBarGeo, material);
  const hBar = new THREE.Mesh(hBarGeo, material);
  vBar.position.y = 2.38;
  hBar.position.y = 2.42;
  crossGroup.add(vBar);
  crossGroup.add(hBar);

  const crossTopBead = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), material);
  crossTopBead.position.y = 2.53;
  crossGroup.add(crossTopBead);

  group.add(crossGroup);

  return group;
}

export default function Chess3DEnvironment({
  onHoverPiece = () => {},
  onStatusUpdate = () => {}
}) {
  const mountRef = useRef(null);
  const containerRef = useRef(null);
  const debugHudRef = useRef(null);

  const [gameStatus, setGameStatus] = useState('White to move');
  const [lastMoveText, setLastMoveText] = useState('Standard Starting Layout');
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [isDebug, setIsDebug] = useState(false);

  // Stable references for Three.js state
  const chessRef = useRef(new Chess());
  const piecesMapRef = useRef(new Map()); // square -> Mesh/Group
  const interactivePiecesRef = useRef([]); // raycast targets
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const isVisibleRef = useRef(true);

  // Interaction State Machine: strictly ONE of 'IDLE' | 'CAMERA_ORBIT' | 'PIECE_DRAG'
  const interactionMode = useRef('IDLE');

  // Camera Orbit State (Distance = 19.5 ALWAYS, ZERO ZOOM)
  const cameraAngles = useRef({ theta: 0.0, phi: 0.88 });
  const orbitStart = useRef({ x: 0, y: 0, theta: 0.0, phi: 0.88 });

  // Piece Drag State
  const selectedMeshRef = useRef(null);
  const dragStartSquareRef = useRef(null);
  const dragStartPosRef = useRef(new THREE.Vector3());
  const hoveredSquareRef = useRef(null);
  const legalMoveIndicators = useRef([]);
  const introFinishedRef = useRef(false);

  // Check ?debug=true in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('debug') === 'true') {
      setIsDebug(true);
    }
  }, []);

  // Crisp Web Audio feedback for chess moves
  const playMoveSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(170, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      // Audio optional
    }
  };

  // Convert board square ('e4') to 3D world coordinates
  const squareToWorld = (square) => {
    const file = square.charCodeAt(0) - 97; // 0..7 (a-h)
    const rank = parseInt(square[1], 10) - 1; // 0..7 (1-8)
    const x = (file - 3.5) * TILE_SIZE;
    const z = (3.5 - rank) * TILE_SIZE;
    return { x, z };
  };

  // Convert 3D world coordinates to board square
  const worldToSquare = (x, z) => {
    const fileIdx = Math.round(x / TILE_SIZE + 3.5);
    const rankIdx = Math.round(3.5 - z / TILE_SIZE);
    if (fileIdx < 0 || fileIdx > 7 || rankIdx < 0 || rankIdx > 7) return null;
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    return `${files[fileIdx]}${rankIdx + 1}`;
  };

  // Update camera position using spherical coordinates at fixed radius
  const updateCameraPosition = (camera) => {
    const r = CHESS_CAMERA_DISTANCE; // FIXED RADIUS: exactly 19.5, zero zoom
    const phi = cameraAngles.current.phi;
    const theta = cameraAngles.current.theta;
    camera.position.x = r * Math.sin(phi) * Math.sin(theta);
    camera.position.y = r * Math.cos(phi);
    camera.position.z = r * Math.sin(phi) * Math.cos(theta);
    camera.lookAt(0, 0.35, 0); // Targeted at board center
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Visibility observer to pause render loop when out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a0507);
    scene.fog = new THREE.FogExp2(0x0a0507, 0.022);

    // 2. Camera Setup (fixed distance, sensible near/far planes)
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.5, 60);
    cameraRef.current = camera;
    updateCameraPosition(camera);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. ABSOLUTE REQUIREMENT: ZERO ZOOM
    // Intercept and cancel all wheel events inside chess canvas
    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };
    renderer.domElement.addEventListener('wheel', handleWheel, { passive: false });

    // 5. Disable context menu ONLY inside chess canvas
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    renderer.domElement.addEventListener('contextmenu', handleContextMenu);

    // 6. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff6f2, 1.05);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.85);
    dirLight.position.set(7, 16, 9);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 40;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    const redRim = new THREE.PointLight(0xea110b, 1.2, 22);
    redRim.position.set(-8, 5, -8);
    scene.add(redRim);

    // 7. Board Substrate & 64 Alternating Squares
    const boardGroup = new THREE.Group();
    scene.add(boardGroup);

    // Hardwood frame
    const frameGeo = new THREE.BoxGeometry(12.6, 0.55, 12.6);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x140d10,
      roughness: 0.38,
      metalness: 0.45
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    frameMesh.position.y = -0.28;
    frameMesh.receiveShadow = true;
    boardGroup.add(frameMesh);

    // 64 Alternating Squares
    const tileGeo = new THREE.BoxGeometry(1.38, 0.08, 1.38);
    const lightTileMat = new THREE.MeshStandardMaterial({
      color: 0xe6dcce,
      roughness: 0.28,
      metalness: 0.08
    });
    const darkTileMat = new THREE.MeshStandardMaterial({
      color: 0x221519,
      roughness: 0.35,
      metalness: 0.18
    });

    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    for (let f = 0; f < 8; f++) {
      for (let r = 0; r < 8; r++) {
        const sq = `${files[f]}${r + 1}`;
        const isDark = (f + r) % 2 === 0;
        const tile = new THREE.Mesh(tileGeo, isDark ? darkTileMat : lightTileMat);
        const { x, z } = squareToWorld(sq);
        tile.position.set(x, 0, z);
        tile.receiveShadow = true;
        boardGroup.add(tile);
      }
    }

    // 8. Pieces Group & Premium Materials
    const piecesGroup = new THREE.Group();
    scene.add(piecesGroup);

    // Ivory Warm White for White pieces
    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xede7dc,
      roughness: 0.26,
      metalness: 0.06
    });

    // Deep Charcoal Ebony for Black pieces
    const blackMat = new THREE.MeshStandardMaterial({
      color: 0x1c1619,
      roughness: 0.32,
      metalness: 0.14
    });

    const initialLayout = [
      // White pieces (ranks 1 & 2)
      { type: 'r', color: 'w', square: 'a1' },
      { type: 'n', color: 'w', square: 'b1' },
      { type: 'b', color: 'w', square: 'c1' },
      { type: 'q', color: 'w', square: 'd1' },
      { type: 'k', color: 'w', square: 'e1' },
      { type: 'b', color: 'w', square: 'f1' },
      { type: 'n', color: 'w', square: 'g1' },
      { type: 'r', color: 'w', square: 'h1' },
      ...files.map((f) => ({ type: 'p', color: 'w', square: `${f}2` })),

      // Black pieces (ranks 7 & 8)
      ...files.map((f) => ({ type: 'p', color: 'b', square: `${f}7` })),
      { type: 'r', color: 'b', square: 'a8' },
      { type: 'n', color: 'b', square: 'b8' },
      { type: 'b', color: 'b', square: 'c8' },
      { type: 'q', color: 'b', square: 'd8' },
      { type: 'k', color: 'b', square: 'e8' },
      { type: 'b', color: 'b', square: 'f8' },
      { type: 'n', color: 'b', square: 'g8' },
      { type: 'r', color: 'b', square: 'h8' }
    ];

    const descentAnimations = [];
    interactivePiecesRef.current = [];

    initialLayout.forEach((item, index) => {
      const mat = (item.color === 'w' ? whiteMat : blackMat).clone();
      let pieceObj;

      if (item.type === 'p') {
        pieceObj = createPawnMesh(mat);
      } else if (item.type === 'r') {
        pieceObj = createRookMesh(mat);
      } else if (item.type === 'n') {
        pieceObj = createKnightMesh(mat, item.color);
      } else if (item.type === 'b') {
        pieceObj = createBishopMesh(mat);
      } else if (item.type === 'q') {
        pieceObj = createQueenMesh(mat);
      } else if (item.type === 'k') {
        pieceObj = createKingMesh(mat);
      }

      pieceObj.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.userData = {
            parentPiece: pieceObj,
            type: item.type,
            color: item.color,
            square: item.square
          };
        }
      });

      const { x, z } = squareToWorld(item.square);
      const fileIdx = item.square.charCodeAt(0) - 97;
      const staggerDelay = item.color === 'b' ? fileIdx * 0.035 : 0.2 + fileIdx * 0.035;
      const startHeight = 6.5 + Math.random() * 2.5;

      pieceObj.position.set(x, startHeight, z);

      pieceObj.userData = {
        id: `piece-${index}`,
        type: item.type,
        color: item.color,
        square: item.square,
        targetY: 0.04,
        staggerDelay,
        isFalling: true
      };

      piecesGroup.add(pieceObj);
      piecesMapRef.current.set(item.square, pieceObj);
      interactivePiecesRef.current.push(pieceObj);
      descentAnimations.push(pieceObj);
    });

    // 9. Raycasting & Horizontal Drag Plane
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2(-10, -10);
    const dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.45);
    const planeIntersect = new THREE.Vector3();

    const clearMoveIndicators = () => {
      legalMoveIndicators.current.forEach((ind) => scene.remove(ind));
      legalMoveIndicators.current = [];
    };

    const showLegalMoves = (fromSquare) => {
      clearMoveIndicators();
      const moves = chessRef.current.moves({ square: fromSquare, verbose: true });

      moves.forEach((m) => {
        const { x, z } = squareToWorld(m.to);
        const ringGeo = new THREE.RingGeometry(0.22, 0.44, 32);
        ringGeo.rotateX(-Math.PI / 2);
        const ringMat = new THREE.MeshBasicMaterial({
          color: m.captured ? 0xea110b : 0x22c55e,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.set(x, 0.06, z); // Slightly above board surface, zero z-fighting
        ringMesh.userData = { isIndicator: true, targetSquare: m.to };
        scene.add(ringMesh);
        legalMoveIndicators.current.push(ringMesh);
      });
    };

    const executeMove = (fromSquare, toSquare) => {
      const move = chessRef.current.move({ from: fromSquare, to: toSquare, promotion: 'q' });
      if (!move) return false;

      playMoveSound();

      // If capture occurred: scale down captured piece and remove cleanly
      if (piecesMapRef.current.has(toSquare)) {
        const capturedObj = piecesMapRef.current.get(toSquare);
        let s = 1;
        const shrink = () => {
          s -= 0.16;
          if (s <= 0) {
            piecesGroup.remove(capturedObj);
            const idx = interactivePiecesRef.current.indexOf(capturedObj);
            if (idx > -1) interactivePiecesRef.current.splice(idx, 1);
            piecesMapRef.current.delete(toSquare);
          } else {
            capturedObj.scale.setScalar(s);
            requestAnimationFrame(shrink);
          }
        };
        shrink();
      }

      // Smoothly animate piece landing at target square
      const movingObj = piecesMapRef.current.get(fromSquare);
      if (movingObj) {
        piecesMapRef.current.delete(fromSquare);
        piecesMapRef.current.set(toSquare, movingObj);
        movingObj.userData.square = toSquare;
        movingObj.traverse((child) => {
          if (child.userData) child.userData.square = toSquare;
        });

        const { x, z } = squareToWorld(toSquare);
        let progress = 0;
        const startX = movingObj.position.x;
        const startZ = movingObj.position.z;

        const animateMove = () => {
          progress += 0.12;
          if (progress >= 1) {
            movingObj.position.set(x, 0.04, z);
          } else {
            const curX = startX + (x - startX) * progress;
            const curZ = startZ + (z - startZ) * progress;
            const curY = 0.04 + Math.sin(progress * Math.PI) * 0.55;
            movingObj.position.set(curX, curY, curZ);
            requestAnimationFrame(animateMove);
          }
        };
        animateMove();
      }

      const turnText = chessRef.current.turn() === 'w' ? 'White to move' : 'Black to move';
      const checkText = chessRef.current.inCheck() ? ' (CHECK!)' : '';
      setGameStatus(`${turnText}${checkText}`);
      setLastMoveText(`Move: ${move.san}`);
      onStatusUpdate(`${move.san} — ${turnText}`);

      clearMoveIndicators();
      selectedMeshRef.current = null;
      dragStartSquareRef.current = null;
      setSelectedInfo(null);
      return true;
    };

    // 10. POINTER EVENTS: Strictly separated interaction modes
    const handlePointerDown = (e) => {
      // MODE 1: RIGHT MOUSE (button === 2) -> CAMERA ORBIT
      if (e.button === 2) {
        if (interactionMode.current === 'PIECE_DRAG') return;
        interactionMode.current = 'CAMERA_ORBIT';
        orbitStart.current = {
          x: e.clientX,
          y: e.clientY,
          theta: cameraAngles.current.theta,
          phi: cameraAngles.current.phi
        };
        renderer.domElement.setPointerCapture(e.pointerId);
        return;
      }

      // MODE 2: LEFT MOUSE (button === 0) -> PIECE DRAGGING
      if (e.button === 0) {
        if (interactionMode.current === 'CAMERA_ORBIT') return;
        // Interaction enabled only after falling intro completes
        if (!introFinishedRef.current) return;

        const rect = renderer.domElement.getBoundingClientRect();
        mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseCoord.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

        raycaster.setFromCamera(mouseCoord, camera);
        const hits = raycaster.intersectObjects(piecesGroup.children, true);

        if (hits.length > 0) {
          const hitObj = hits[0].object;
          const pieceMesh = hitObj.userData.parentPiece || hitObj;
          const square = pieceMesh.userData.square;

          interactionMode.current = 'PIECE_DRAG';
          selectedMeshRef.current = pieceMesh;
          dragStartSquareRef.current = square;
          dragStartPosRef.current.copy(pieceMesh.position);

          renderer.domElement.setPointerCapture(e.pointerId);

          // Subtle emissive highlight
          pieceMesh.traverse((child) => {
            if (child.isMesh && child.material) {
              child.material.emissive = new THREE.Color(0xea110b);
              child.material.emissiveIntensity = 0.35;
            }
          });

          setSelectedInfo(square.toUpperCase());
          showLegalMoves(square);
        }
      }
    };

    const handlePointerMove = (e) => {
      // 1. CAMERA ORBIT (RIGHT DRAG)
      if (interactionMode.current === 'CAMERA_ORBIT') {
        const dx = (e.clientX - orbitStart.current.x) * 0.007;
        const dy = (e.clientY - orbitStart.current.y) * 0.007;

        cameraAngles.current.theta = orbitStart.current.theta - dx;
        // Clamped elevation: prevents camera from flipping or going underneath board
        cameraAngles.current.phi = Math.max(0.25, Math.min(Math.PI / 2 - 0.10, orbitStart.current.phi + dy));

        updateCameraPosition(camera);
        return;
      }

      const rect = renderer.domElement.getBoundingClientRect();
      mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseCoord.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      raycaster.setFromCamera(mouseCoord, camera);

      // 2. PIECE DRAGGING (LEFT DRAG)
      if (interactionMode.current === 'PIECE_DRAG' && selectedMeshRef.current) {
        if (raycaster.ray.intersectPlane(dragPlane, planeIntersect)) {
          // Smoothly track pointer along horizontal board plane with slight lift
          selectedMeshRef.current.position.x = planeIntersect.x;
          selectedMeshRef.current.position.z = planeIntersect.z;
          selectedMeshRef.current.position.y = 0.45;

          const sq = worldToSquare(planeIntersect.x, planeIntersect.z);
          hoveredSquareRef.current = sq;
        }
        return;
      }

      // 3. IDLE HOVER FEEDBACK
      if (interactionMode.current === 'IDLE') {
        const hits = raycaster.intersectObjects(piecesGroup.children, true);
        if (hits.length > 0) {
          const piece = hits[0].object.userData.parentPiece || hits[0].object;
          const nameMap = { p: 'Pawn', r: 'Rook', n: 'Knight', b: 'Bishop', q: 'Queen', k: 'King' };
          const pName = nameMap[piece.userData.type] || 'Piece';
          const pColor = piece.userData.color === 'w' ? 'White' : 'Black';
          onHoverPiece(`${pName} (${pColor}) · ${piece.userData.square.toUpperCase()}`);
        } else {
          onHoverPiece(null);
        }
      }
    };

    const handlePointerUp = (e) => {
      if (renderer.domElement.hasPointerCapture && renderer.domElement.hasPointerCapture(e.pointerId)) {
        renderer.domElement.releasePointerCapture(e.pointerId);
      }

      // Conclude Camera Orbit
      if (interactionMode.current === 'CAMERA_ORBIT') {
        interactionMode.current = 'IDLE';
        return;
      }

      // Conclude Piece Drag
      if (interactionMode.current === 'PIECE_DRAG' && selectedMeshRef.current) {
        const draggedObj = selectedMeshRef.current;
        const fromSquare = dragStartSquareRef.current;

        // Reset highlight
        draggedObj.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.emissive = new THREE.Color(0x000000);
            child.material.emissiveIntensity = 0;
          }
        });

        const targetSquare = worldToSquare(draggedObj.position.x, draggedObj.position.z);
        let success = false;
        if (targetSquare && targetSquare !== fromSquare) {
          success = executeMove(fromSquare, targetSquare);
        }

        if (!success) {
          // Snap back smoothly to original starting square
          const { x, z } = squareToWorld(fromSquare);
          draggedObj.position.set(x, 0.04, z);
          clearMoveIndicators();
          selectedMeshRef.current = null;
          dragStartSquareRef.current = null;
          setSelectedInfo(null);
        }

        interactionMode.current = 'IDLE';
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', handlePointerDown);
    domElement.addEventListener('pointermove', handlePointerMove);
    domElement.addEventListener('pointerup', handlePointerUp);

    // 11. Single Synchronized Render Loop
    let animId;
    let clock = new THREE.Clock();

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isVisibleRef.current) return;

      const delta = clock.getDelta();

      // Intro falling animation (runs once on scroll entry, then strictly locks pieces)
      if (!introFinishedRef.current) {
        let allLanded = true;
        descentAnimations.forEach((piece) => {
          if (piece.userData.isFalling) {
            allLanded = false;
            if (piece.userData.staggerDelay > 0) {
              piece.userData.staggerDelay -= delta;
            } else {
              const dy = (piece.position.y - piece.userData.targetY) * 0.14;
              piece.position.y -= dy;
              if (Math.abs(piece.position.y - piece.userData.targetY) < 0.02) {
                piece.position.y = piece.userData.targetY;
                piece.userData.isFalling = false;
              }
            }
          }
        });
        if (allLanded) {
          introFinishedRef.current = true;
          // Ensure every piece is solidly locked to its square
          piecesMapRef.current.forEach((piece, sq) => {
            const { x, z } = squareToWorld(sq);
            piece.position.set(x, 0.04, z);
          });
        }
      }

      // Subtle pulse on legal move indicators
      legalMoveIndicators.current.forEach((ind, idx) => {
        ind.scale.setScalar(1 + Math.sin(Date.now() * 0.007 + idx) * 0.05);
      });

      renderer.render(scene, camera);

      // Direct DOM update for debug HUD (zero React re-render overhead)
      if (debugHudRef.current) {
        debugHudRef.current.innerHTML = `
          <div style="color: #fff; font-weight: 700; margin-bottom: 4px;">CHESS DEBUG</div>
          <div>CAMERA MODE: ${interactionMode.current}</div>
          <div>CAMERA DISTANCE: ${CHESS_CAMERA_DISTANCE.toFixed(1)} (LOCKED)</div>
          <div>SELECTED PIECE: ${dragStartSquareRef.current ? `${dragStartSquareRef.current.toUpperCase()}` : 'None'}</div>
          <div>SELECTED SQUARE: ${dragStartSquareRef.current || 'None'}</div>
          <div>TARGET SQUARE: ${hoveredSquareRef.current || 'None'}</div>
          <div>PIECES: ${piecesMapRef.current.size} / 32</div>
        `;
      }
    };

    render();

    const handleResize = () => {
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Strict Mode Safety & Resource Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('pointerdown', handlePointerDown);
      domElement.removeEventListener('pointermove', handlePointerMove);
      domElement.removeEventListener('pointerup', handlePointerUp);
      domElement.removeEventListener('wheel', handleWheel);
      domElement.removeEventListener('contextmenu', handleContextMenu);
      observer.disconnect();

      // Clean disposal of geometries & materials
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []); // Run ONCE on mount, strictly isolated

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '560px',
        borderRadius: '24px',
        overflow: 'hidden',
        background: '#090507',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
        userSelect: 'none'
      }}
    >
      {/* 3D WebGL Canvas Viewport */}
      <div ref={mountRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />

      {/* Floating Tactical HUD Readout */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '24px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          pointerEvents: 'none'
        }}
      >
        <div
          style={{
            padding: '6px 14px',
            borderRadius: '9999px',
            background: 'rgba(0, 0, 0, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem',
            color: '#22c55e',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
          <span>{gameStatus.toUpperCase()}</span>
        </div>

        {selectedInfo && (
          <div
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(234, 17, 11, 0.2)',
              border: '1px solid #ea110b',
              backdropFilter: 'blur(10px)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.72rem',
              color: '#ffffff'
            }}
          >
            SELECTED: {selectedInfo}
          </div>
        )}
      </div>

      {/* Interactive Controls Guide */}
      <div
        style={{
          position: 'absolute',
          bottom: '18px',
          left: '24px',
          right: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.7rem',
          color: 'rgba(255, 255, 255, 0.5)',
          pointerEvents: 'none'
        }}
      >
        <span>[LEFT DRAG: MOVE PIECE · RIGHT DRAG: ORBIT CAMERA · ZERO ZOOM]</span>
        <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{lastMoveText}</span>
      </div>

      {/* Debug Mode HUD (?debug=true) */}
      {isDebug && (
        <div
          ref={debugHudRef}
          style={{
            position: 'absolute',
            top: '20px',
            right: '24px',
            background: 'rgba(0, 0, 0, 0.90)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: '10px',
            padding: '10px 14px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.68rem',
            color: '#22c55e',
            pointerEvents: 'none',
            lineHeight: '1.45'
          }}
        />
      )}
    </div>
  );
}
