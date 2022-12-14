import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import './styles.css';
import { Ground } from './Ground';
import Car from './Car';

const CarShow = () => {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      {/* let color = new Color(0, 0, 0) 設定背景顏色 */}
      <color args={[0, 0, 0]} attach="background" />

      <Car />
      {/* 
        let spotlight = new Spotlight()
        spotlight.intensity = 1.5;
        spotlight.position.set(...)  
      */}
      <spotLight
        //! 這是甚麼表示法??
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadowBias={-0.0001}
      />

      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadowBias={-0.0001}
      />

      <Ground />

      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={'red'} />
      </mesh>
    </>
  );
};

const App = () => {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow></CarShow>
      </Canvas>
    </Suspense>
  );
};

export default App;
