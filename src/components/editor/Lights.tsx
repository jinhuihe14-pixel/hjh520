import React from 'react';
import { Environment } from '@react-three/drei';

interface LightsProps {
  mode: 'day' | 'evening';
}

export const Lights: React.FC<LightsProps> = ({ mode }) => {
  const isDay = mode === 'day';

  return (
    <>
      <ambientLight intensity={isDay ? 0.6 : 0.3} />
      
      <directionalLight
        position={isDay ? [5, 8, 5] : [3, 5, 3]}
        intensity={isDay ? 1.2 : 0.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {isDay ? (
        <>
          <pointLight position={[-4, 3, 2]} intensity={0.3} color="#FFF5E6" />
          <pointLight position={[4, 3, -2]} intensity={0.2} color="#E6F0FF" />
        </>
      ) : (
        <>
          <pointLight position={[0, 2.5, -1]} intensity={0.8} color="#FFB366" distance={10} />
          <pointLight position={[-2, 2, 1]} intensity={0.4} color="#FFD4A3" distance={8} />
          <pointLight position={[2, 2, 1]} intensity={0.4} color="#FFD4A3" distance={8} />
        </>
      )}

      {isDay ? (
        <Environment preset="city" />
      ) : (
        <Environment preset="sunset" />
      )}
    </>
  );
};
