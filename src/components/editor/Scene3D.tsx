import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { RoomModel } from './RoomModel';
import { WindowModel } from './WindowModel';
import { Lights } from './Lights';
import { useProjectStore } from '@/store/useProjectStore';
import * as THREE from 'three';

interface CameraControllerProps {
  enabled: boolean;
}

const CameraController: React.FC<CameraControllerProps> = ({ enabled }) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const project = useProjectStore(state => state.currentProject);

  useEffect(() => {
    if (project && enabled) {
      const { width, depth } = project.room.dimensions;
      const distance = Math.max(width, depth) * 1.2;
      camera.position.set(distance * 0.8, distance * 0.6, distance * 0.8);
      camera.lookAt(0, project.room.dimensions.height / 2, 0);
    }
  }, [project, camera, enabled]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      minPolarAngle={0.2}
      maxPolarAngle={Math.PI / 2 - 0.1}
      minDistance={1}
      maxDistance={20}
      enableDamping
      dampingFactor={0.05}
      enabled={enabled}
    />
  );
};

interface SceneContentProps {
  onCanvasClick: () => void;
}

const SceneContent: React.FC<SceneContentProps> = ({ onCanvasClick }) => {
  const project = useProjectStore(state => state.currentProject);
  const selectedWindowId = useProjectStore(state => state.selectedWindowId);
  const selectWindow = useProjectStore(state => state.selectWindow);

  if (!project) return null;

  return (
    <>
      <Lights mode={project.lighting} />
      <RoomModel room={project.room} />
      
      {project.windows.map(window => (
        <WindowModel
          key={window.id}
          window={window}
          isSelected={selectedWindowId === window.id}
          onClick={() => selectWindow(window.id)}
        />
      ))}

      <Grid
        position={[0, 0.001, 0]}
        args={[20, 20]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#2a2a3a"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#3a3a4a"
        fadeDistance={30}
        fadeStrength={1}
        followCamera={false}
      />

      <EffectComposer>
        <Bloom luminanceThreshold={0.8} luminanceSmoothing={0.9} height={300} intensity={0.3} />
      </EffectComposer>
    </>
  );
};

interface Scene3DProps {
  className?: string;
}

export const Scene3D: React.FC<Scene3DProps> = ({ className }) => {
  const selectWindow = useProjectStore(state => state.selectWindow);

  return (
    <div className={className} onClick={() => selectWindow(null)}>
      <Canvas
        shadows
        camera={{ fov: 50, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onPointerMissed={() => selectWindow(null)}
      >
        <color attach="background" args={['#1a1a2e']} />
        <fog attach="fog" args={['#1a1a2e', 10, 30]} />
        
        <CameraController enabled={true} />
        <SceneContent onCanvasClick={() => selectWindow(null)} />
      </Canvas>
    </div>
  );
};
