import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

import temple from "../assets/3d/temple.glb";

const Temple = (props) => {
  const { nodes, materials } = useGLTF(temple);
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_8.geometry}
          material={materials["Material.001"]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    </group>
  );
};

export default Temple;
