import React from 'react';
import * as THREE from 'three';
import { RoomPreset } from '@/types';

interface RoomModelProps {
  room: RoomPreset;
}

export const RoomModel: React.FC<RoomModelProps> = ({ room }) => {
  const { width, depth, height } = room.dimensions;

  const floorMaterial = React.useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: room.floorColor,
      roughness: 0.8,
      metalness: 0.1
    }), [room.floorColor]
  );

  const wallMaterial = React.useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: room.wallColor,
      roughness: 0.9,
      metalness: 0
    }), [room.wallColor]
  );

  return (
    <group>
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[width, depth]} />
        <primitive object={floorMaterial} attach="material" />
      </mesh>

      <mesh 
        position={[0, height / 2, -depth / 2]}
        receiveShadow
      >
        <planeGeometry args={[width, height]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>

      <mesh 
        position={[-width / 2, height / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[depth, height]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>

      <mesh 
        position={[width / 2, height / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[depth, height]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>
    </group>
  );
};
