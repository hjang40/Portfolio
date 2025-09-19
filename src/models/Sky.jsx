import { useGLTF } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';

import skyScene from '../assets/3d/sky.glb';

const Sky = () => {
  const { scene } = useGLTF(skyScene);
  const skyRef = useRef();

  useEffect(() => {
    if (skyRef.current) {
      // Apply the scale manually to the sky model
      skyRef.current.scale.set(5, 5, 5);
    }
  }, []);

  return (
    <mesh ref={skyRef}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Sky;
