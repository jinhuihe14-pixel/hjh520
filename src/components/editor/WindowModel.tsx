import React, { useMemo } from 'react';
import * as THREE from 'three';
import { WindowInstance } from '@/types';

interface WindowModelProps {
  window: WindowInstance;
  isSelected: boolean;
  onClick: () => void;
}

export const WindowModel: React.FC<WindowModelProps> = ({ window, isSelected, onClick }) => {
  const { width, height, profile, glass, panes, type } = window;
  const frameThickness = 0.08;
  const depth = 0.06;

  const frameMaterial = useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: profile.color,
      metalness: profile.metalness,
      roughness: profile.roughness
    }), [profile.color, profile.metalness, profile.roughness]
  );

  const glassMaterial = useMemo(() => 
    new THREE.MeshPhysicalMaterial({
      color: glass.color,
      transparent: true,
      opacity: glass.opacity,
      roughness: glass.roughness,
      metalness: 0,
      transmission: 1 - glass.opacity * 0.5,
      thickness: 0.01,
      clearcoat: 1,
      clearcoatRoughness: 0.1
    }), [glass.color, glass.opacity, glass.roughness]
  );

  const paneWidth = (width - frameThickness * (panes + 1)) / panes;

  return (
    <group 
      position={window.position}
      rotation={window.rotation as any}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <mesh position={[0, height / 2 - frameThickness / 2, 0]} castShadow>
        <boxGeometry args={[width, frameThickness, depth]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      <mesh position={[0, frameThickness / 2, 0]} castShadow>
        <boxGeometry args={[width, frameThickness, depth]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      <mesh position={[-width / 2 + frameThickness / 2, height / 2, 0]} castShadow>
        <boxGeometry args={[frameThickness, height, depth]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      <mesh position={[width / 2 - frameThickness / 2, height / 2, 0]} castShadow>
        <boxGeometry args={[frameThickness, height, depth]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      {Array.from({ length: panes - 1 }).map((_, i) => (
        <mesh 
          key={`mullion-${i}`}
          position={[
            -width / 2 + frameThickness + paneWidth * (i + 1) + frameThickness * i + frameThickness / 2,
            height / 2,
            0
          ]}
          castShadow
        >
          <boxGeometry args={[frameThickness, height, depth]} />
          <primitive object={frameMaterial} attach="material" />
        </mesh>
      ))}

      {Array.from({ length: panes }).map((_, i) => (
        <mesh
          key={`glass-${i}`}
          position={[
            -width / 2 + frameThickness + paneWidth * i + frameThickness * i + paneWidth / 2,
            height / 2,
            0.01
          ]}
        >
          <boxGeometry args={[paneWidth - 0.01, height - frameThickness * 2 - 0.01, 0.01]} />
          <primitive object={glassMaterial} attach="material" />
        </mesh>
      ))}

      {type === 'casement' && (
        <mesh position={[width / 2 - frameThickness - 0.08, height / 2, depth / 2 + 0.02]} castShadow>
          <boxGeometry args={[0.03, 0.12, 0.02]} />
          <meshStandardMaterial color={window.hardware.color} metalness={0.8} roughness={0.2} />
        </mesh>
      )}

      {type === 'sliding' && (
        <mesh position={[0, height / 2, depth / 2 + 0.02]} castShadow>
          <boxGeometry args={[0.08, 0.08, 0.02]} />
          <meshStandardMaterial color={window.hardware.color} metalness={0.8} roughness={0.2} />
        </mesh>
      )}

      {isSelected && (
        <mesh position={[0, height / 2, 0]}>
          <boxGeometry args={[width + 0.04, height + 0.04, depth + 0.04]} />
          <meshBasicMaterial color="#D4AF37" wireframe transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
};
