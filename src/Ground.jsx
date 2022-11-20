import React, { useEffect } from 'react';
import { MeshReflectorMaterial } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { LinearEncoding, RepeatWrapping, TextureLoader } from 'three';

//? 如果解決了 process.env => import.meta.env 的狀況，下兩行就不須存在
import TerrainNormal from './assets/textures/terrain-normal.jpg';
import TerrainRoughness from './assets/textures/terrain-roughness.jpg';

export const Ground = () => {
  const [roughness, normal] = useLoader(
    TextureLoader,
    [TerrainRoughness, TerrainNormal]
    //! 主要直接引入圖片?  不使用import， process.env 僅適用於 react-create-app (CRA)
    //! protcess.env => import.meta.env || CRA => Vite
    // process.env.PUBLIC_URL + 'textures/terrain-roughness.jpg',
    // process.env.PUBLIC_URL + 'textures/terrain-normal.jpg'
  );
  // TODO 如果我一開始不使用useEffect 做初次渲染，那結果是甚麼??
  useEffect(() => {
    [normal, roughness].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(5, 5);
      //! wrapS 定義紋理 如何水平包裹並對應於 UV 映射中的 U。
      //! wrapT 定義紋理 如何垂直包裹並對應於 UV 映射中的 V。
      //! repeat 紋理在 U 和 V 的每個方向上在整個表面上重複多少次。
      //? 如果在任一方向上將 repeat 設置為大於 1，
      //? 則相應的 Wrap 參數也應設置為 THREE.RepeatWrapping或THREE.MirroredRepeatWrapping
      //? 以實現所需的平鋪影響。為紋理設置不同的重複值以與.offset相同的方式受到限制。
      //TODO https://threejs.org/docs/?q=repeat#api/en/textures/Texture.wrapS
    });

    //!
    normal.encoding = LinearEncoding;
  }, [normal, roughness]);

  return (
    //! 跟 rotation-x 差在哪裡??
    // mesh.rotation.x = -Math.PI * 0.5
    <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial
        envMapIntensity={0}
        normalMap={normal}
        normalScale={[0.15, 0.15]}
        roughnessMap={roughness}
        dithering={true}
        color={[0.015, 0.015, 0.015]}
        roughness={0.7}
        blur={[1000, 400]}
        mixBlur={30}
        mixStrength={80}
        mixContrast={1}
        resolution={1024}
        mirror={0}
        depthScale={0.01}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
        //! 這個沒提示要查一下
        debug={0}
        reflectorOffset={0.2}
      />
    </mesh>
  );
};
