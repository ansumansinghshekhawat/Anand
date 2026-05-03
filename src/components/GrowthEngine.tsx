import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MotionValue } from 'motion/react';

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
  // Base color (Black / Silver / Subtle Gold for luxury)
  vec3 baseColor = vec3(0.8, 0.8, 0.8);
  
  // Make the crystal glow more based on distortion and scroll
  float intensity = abs(vDistortion) + uScroll * 0.5 + 0.2;
  
  // Add some pulsing based on time
  intensity *= 0.8 + 0.2 * sin(uTime * 2.0);
  
  vec3 finalColor = baseColor * intensity;
  
  // Add a dark core
  float core = length(vUv - 0.5);
  finalColor = mix(finalColor, vec3(0.05, 0.05, 0.05), smoothstep(0.4, 0.5, core));
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

interface Props {
  scrollYProgress: MotionValue<number>;
}

export const GrowthEngine: React.FC<Props> = ({ scrollYProgress }) => {
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
    const progress = scrollYProgress.get();
    
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
      
      // Scale based on scroll
      const scale = 1 + progress * 0.5;
      meshRef.current.scale.set(scale, scale, scale);
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
