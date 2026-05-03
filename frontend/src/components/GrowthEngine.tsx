import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store/useStore';

const vertexShader = `
uniform float uTime;
uniform float uScroll;
varying vec2 vUv;
varying vec3 vPosition;
varying float vDistortion;

void main() {
  vUv = uv;
  vPosition = position;
  
  vec3 pos = position;
  
  // Create a twisting/pulsing effect based on scroll
  float distortion = sin(pos.y * 2.0 + uTime + uScroll * 10.0) * 0.5;
  
  // Expand outward as scroll increases
  pos.x += normal.x * distortion * uScroll * 2.0;
  pos.z += normal.z * distortion * uScroll * 2.0;
  
  vDistortion = distortion;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform float uScroll;
varying vec2 vUv;
varying vec3 vPosition;
varying float vDistortion;

void main() {
  // Base color (Deep cyan / Electric blue)
  vec3 baseColor = vec3(0.0, 0.94, 1.0);
  
  // Make the crystal glow more based on distortion and scroll
  float intensity = abs(vDistortion) + uScroll * 0.5 + 0.2;
  
  // Add some pulsing based on time
  intensity *= 0.8 + 0.2 * sin(uTime * 2.0);
  
  vec3 finalColor = baseColor * intensity;
  
  // Add a dark core
  float core = length(vUv - 0.5);
  finalColor = mix(finalColor, vec3(0.01, 0.01, 0.02), smoothstep(0.4, 0.5, core));
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export const GrowthEngine: React.FC = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    const progress = useStore.getState().scrollProgress;
    
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      // Smooth interpolation for scroll
      materialRef.current.uniforms.uScroll.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uScroll.value,
        progress,
        0.1
      );
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2 + progress * Math.PI * 2;
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 16]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={true}
        transparent={true}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};
