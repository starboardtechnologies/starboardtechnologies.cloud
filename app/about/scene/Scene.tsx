'use client';

import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function Scene() {
  // Load textures
  const normalMap = useLoader(THREE.TextureLoader, '/textures/water.jpg');
  const causticsMap = useLoader(THREE.TextureLoader, '/textures/caustics.png');

  // Correct: configure wrapping AFTER loading
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  causticsMap.wrapS = causticsMap.wrapT = THREE.RepeatWrapping;

  // Repeat tiling
  normalMap.repeat.set(4, 4);
  causticsMap.repeat.set(8, 8);

  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Animate offsets
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    normalMap.offset.set(t * 0.02, t * 0.05);
    causticsMap.offset.set(-t * 0.1, -t * 0.05);
  });

  return (
    <>
      {/* Ambient fill light */}
      <ambientLight intensity={0.3} color="#aab0b5" />

      {/* Center spotlight with shadows */}
      <spotLight
        position={[0, 15, 0]}
        angle={0.6}
        intensity={1.2}
        penumbra={0.5}
        distance={60}
        color="#ebeff1"
        castShadow
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
      />

      {/* Additional spotlights without shadows */}
      {Array.from({ length: 5 }, (_, x) =>
        Array.from({ length: 5 }, (_, z) => {
          const isCenter = x === 2 && z === 2;
          if (isCenter) return null;
          const posX = (x - 2) * 20;
          const posZ = (z - 2) * 20;
          return (
            <spotLight
              key={`spot-${x}-${z}`}
              position={[posX, 15, posZ]}
              angle={0.5}
              intensity={0.8}
              penumbra={0.4}
              distance={50}
              color="#ebeff1"
              castShadow={false}
            />
          );
        })
      )}

      {/* Water plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#eaf2f6"
          metalness={0.2}
          roughness={0.1}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(1.5, 1.5)}
          emissive="#052433"
          emissiveMap={causticsMap}
          emissiveIntensity={0.4}
        />
      </mesh>
    </>
  );
}
