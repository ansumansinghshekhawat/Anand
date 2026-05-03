import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { GrowthEngine } from './GrowthEngine';
import { Effects } from './Effects';
import { ParticleSystem } from './ParticleSystem';

export const CanvasContainer: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={['#030303']} />
      <ambientLight intensity={0.5} />
      
      <Suspense fallback={null}>
        <GrowthEngine />
        <ParticleSystem />
        <Effects />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};
