import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { OrbitControls, Text3D as DreiText3D } from "@react-three/drei";
import * as THREE from "three";

// 不再需要extend和类型定义，改用drei的Text3D组件
interface Text3DProps {
  text: string;
}

const Text3D: React.FC<Text3DProps> = ({ text }) => {
  const mesh = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // 设置相机位置
  useEffect(() => {
    camera.position.z = 4;
    camera.position.y = 0;
  }, [camera]);

  // 动画
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.005;
      mesh.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.2;
    }
  });

  return (
    <group ref={mesh} position={[0, 0, 0]}>
      <DreiText3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.03}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        {text}
        <meshStandardMaterial
          color="#4a90e2"
          metalness={0.8}
          roughness={0.2}
          emissive="#000000"
        />
      </DreiText3D>
    </group>
  );
};

const ThreeText: React.FC<Text3DProps> = ({ text }) => {
  return (
    <div
      className="three-text-container"
      style={{ height: "30vh", width: "100%" }}
    >
      <Canvas shadows dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <OrbitControls enableZoom={false} enablePan={false} />
        <Text3D text={text} />
      </Canvas>
    </div>
  );
};

export default ThreeText;
