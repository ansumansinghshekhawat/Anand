import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MotionValue } from 'motion/react';

const count = 2000;

interface Props {
  scrollYProgress: MotionValue<number>;
}

export const ParticleSystem: React.FC<Props> = ({ scrollYProgress }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 40;
      const speed = Math.random() * 0.02 + 0.01;
      const factor = Math.random() * 100;
      temp.push({ x, y, z, speed, factor });
    }
    return temp;
  }, []);

  useFrame((state) => {
    const { clock } = state;
    const progress = scrollYProgress.get();
    
    if (meshRef.current) {
      particles.forEach((particle, i) => {
        let { x, y, z, speed, factor } = particle;

        const t = clock.getElapsedTime() * speed + progress * 2.0;
        
        dummy.position.set(
          x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
          y + (t * 10) % 40 - 20, 
          z + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10
        );
        
        const scale = Math.max(0.1, 1.0 - progress * 0.5);
        dummy.scale.set(scale, scale, scale);
        
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
    </instancedMesh>
  );
};
