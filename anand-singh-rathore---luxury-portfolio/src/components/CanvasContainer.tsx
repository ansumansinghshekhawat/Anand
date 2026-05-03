import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { GrowthEngine } from './GrowthEngine';
import { ParticleSystem } from './ParticleSystem';
import { MotionValue } from 'motion/react';

interface Props {
  scrollYProgress: MotionValue<number>;
}

export const CanvasContainer: React.FC<Props> = ({ scrollYProgress }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none', background: '#000' }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      >
        <ambientLight intensity={0.5} />
        
        <Suspense fallback={null}>
          <GrowthEngine scrollYProgress={scrollYProgress} />
          <ParticleSystem scrollYProgress={scrollYProgress} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};
