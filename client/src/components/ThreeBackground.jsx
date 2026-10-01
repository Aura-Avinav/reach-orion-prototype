import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch {
      return;
    }

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x121315, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 2. Color Palette Tokens in Hex
    // Fig 1.1 Brand Palette Swatches:
    // Warm Goldenrod: #E5A93B (0xE5A93B)
    // Deep Slate Teal: #2C5D63 (0x2C5D63)
    // Burnt Terracotta: #A73C1E (0xA73C1E)
    // Soft Sky Blue: #97C4DE (0x97C4DE)
    // Cool Cream White: #F4F0E8 (0xF4F0E8)
    const colorGold = new THREE.Color(0xE5A93B);
    const colorTeal = new THREE.Color(0x2C5D63);
    const colorTerracotta = new THREE.Color(0xA73C1E);
    const colorSky = new THREE.Color(0x97C4DE);
    const colorWhite = new THREE.Color(0xF4F0E8);

    // 3. Particle Starfield / Galaxy Constellation (1200 particles)
    const particleCount = 1200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const colorChoices = [colorGold, colorTeal, colorTerracotta, colorSky, colorWhite];

    for (let i = 0; i < particleCount; i++) {
      // Spread across deep 3D space
      positions[i * 3] = (Math.random() - 0.5) * 1600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1200 - 100;

      const chosenColor = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;

      scales[i] = Math.random() * 2.5 + 1;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle sprite using canvas texture for soft, glowing circular dots
    const canvasTexture = (() => {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d');
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(244, 240, 232, 0.7)');
      gradient.addColorStop(0.7, 'rgba(229, 169, 59, 0.25)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      const texture = new THREE.CanvasTexture(c);
      return texture;
    })();

    const particleMaterial = new THREE.PointsMaterial({
      size: 7,
      map: canvasTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 4. Undulating 3D Wireframe Wave Mesh (Underneath Hero)
    const waveCols = 40;
    const waveRows = 40;
    const waveGeometry = new THREE.PlaneGeometry(1400, 1000, waveCols - 1, waveRows - 1);
    waveGeometry.rotateX(-Math.PI / 2.3);
    waveGeometry.translate(0, -220, -50);

    const waveMaterial = new THREE.MeshBasicMaterial({
      color: 0x2C5D63,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });

    const waveMesh = new THREE.Mesh(waveGeometry, waveMaterial);
    scene.add(waveMesh);

    // 5. Floating Architectural 3D Geometric Polyhedra (Subtle luxury brand kinetic sculpture)
    const coreGroup = new THREE.Group();
    coreGroup.position.set(280, 40, -120);

    // Outer wireframe icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(110, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0xE5A93B,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    coreGroup.add(icoMesh);

    // Inner glowing octahedron
    const octGeometry = new THREE.OctahedronGeometry(65, 0);
    const octMaterial = new THREE.MeshBasicMaterial({
      color: 0xA73C1E,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const octMesh = new THREE.Mesh(octGeometry, octMaterial);
    coreGroup.add(octMesh);

    // Subtle orbital ring
    const ringGeometry = new THREE.TorusGeometry(145, 1.2, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x97C4DE,
      transparent: true,
      opacity: 0.28
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 3;
    coreGroup.add(ringMesh);

    scene.add(coreGroup);

    // 6. Smooth Mouse Parallax & Dynamic Motion Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      // Normalized between -1 and 1
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY || window.pageYOffset;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 7. Responsive Resizing
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Adjust 3D kinetic sculpture position on smaller screens
      if (width < 900) {
        coreGroup.position.set(0, 100, -200);
        coreGroup.scale.set(0.65, 0.65, 0.65);
      } else {
        coreGroup.position.set(280, 40, -120);
        coreGroup.scale.set(1, 1, 1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let animationFrameId;
    const startTime = performance.now();

    const wavePosAttr = waveGeometry.attributes.position;
    const originalYCoords = new Float32Array(wavePosAttr.count);
    for (let i = 0; i < wavePosAttr.count; i++) {
      originalYCoords[i] = wavePosAttr.getY(i);
    }

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Fluid mouse interpolation (smooth lerp)
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Parallax camera drift
      camera.position.x = currentMouseX * 50;
      camera.position.y = currentMouseY * 40 - scrollY * 0.15;
      camera.lookAt(0, -scrollY * 0.15, 0);

      // Rotate particle galaxy slowly
      particles.rotation.y = elapsedTime * 0.03 + currentMouseX * 0.1;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      // Rotate core luxury geometric sculpture
      coreGroup.rotation.x = elapsedTime * 0.2 + currentMouseY * 0.3;
      coreGroup.rotation.y = elapsedTime * 0.25 + currentMouseX * 0.3;
      coreGroup.rotation.z = elapsedTime * 0.1;
      ringMesh.rotation.z = -elapsedTime * 0.4;

      // 3D Wave Undulation calculation
      for (let i = 0; i < wavePosAttr.count; i++) {
        const u = i % waveCols;
        const v = Math.floor(i / waveCols);
        const wave = Math.sin(elapsedTime * 1.5 + u * 0.35 + v * 0.25) * 22;
        const crossWave = Math.cos(elapsedTime * 0.8 + u * 0.2) * 14;
        wavePosAttr.setZ(i, wave + crossWave);
      }
      wavePosAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      particleGeometry.dispose();
      particleMaterial.dispose();
      waveGeometry.dispose();
      waveMaterial.dispose();
      icoGeometry.dispose();
      icoMaterial.dispose();
      octGeometry.dispose();
      octMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      id="three-canvas-container"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: 0.85
      }}
    />
  );
}
