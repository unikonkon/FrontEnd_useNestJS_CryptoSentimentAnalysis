'use client';

import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import WebGLErrorBoundary from './ErrorBoundary';

// Bitcoin Model Component
function BitcoinModel() {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Load GLB model
  const gltf = useLoader(GLTFLoader, '/model/bitcoin_factory_-_voxel_art(1).glb');

  // Auto-rotate animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.00033;

      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;

      // Scale animation on hover
      const targetScale = hovered ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={[2, 2, 2]}
      position={[3, 0, 2]}
    >
      <primitive object={gltf.scene} />
    </group>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" wireframe />
    </mesh>
  );
}

// Main 3D Background Component
export default function WalletBG({
  className = '',
  height = '400px',
  showControls = true
}: {
  className?: string;
  height?: string;
  showControls?: boolean;
}) {
  return (
    <WebGLErrorBoundary>
      <div className={`relative ${className}`} style={{ height }}>
        <Canvas
          shadows
          camera={{ position: [0, 0, 0], fov: 50 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
          style={{
            background: 'transparent',
            borderRadius: '12px'
          }}
        >
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[8, 5, 8]} />

          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <pointLight position={[0, 0, 0]} intensity={0.3} />

          {/* Environment for reflections */}
          <Environment preset="city" />

          {/* 3D Model with Suspense */}
          <Suspense fallback={<LoadingFallback />}>
            <BitcoinModel />
          </Suspense>

          {/* Controls */}
          {showControls && (
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              minDistance={5}
              maxDistance={15}
              autoRotate={false}
              autoRotateSpeed={0.5}
            />
          )}
        </Canvas>

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-lg" />
      </div>
    </WebGLErrorBoundary>
  );
}

// Alternative compact version for smaller spaces
export function CompactBitcoinModel({
  className = '',
  size = 150
}: {
  className?: string;
  size?: number;
}) {
  return (
    <WebGLErrorBoundary>
      <div
        className={`relative ${className}`}
        style={{ width: size, height: size }}
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />

          <Suspense fallback={<LoadingFallback />}>
            <BitcoinModel />
          </Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
