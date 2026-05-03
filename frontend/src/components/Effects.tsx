import React from 'react';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useStore } from '../store/useStore';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const Effects: React.FC = () => {
  const chromAberRef = React.useRef<any>(null);

  useFrame(() => {
    // Modify effects based on scroll progress to give a sense of acceleration
    const progress = useStore.getState().scrollProgress;
    if (chromAberRef.current) {
      // increase chromatic aberration as user scrolls down
      const offset = 0.002 + progress * 0.01;
      chromAberRef.current.offset = new THREE.Vector2(offset, offset);
    }
  });

  return (
    <EffectComposer disableNormalPass>
      <Bloom
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        intensity={1.5}
      />
      <ChromaticAberration
        ref={chromAberRef}
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(0.002, 0.002)}
      />
      <Noise 
        premultiply 
        blendFunction={BlendFunction.ADD} 
        opacity={0.15}
      />
    </EffectComposer>
  );
};
