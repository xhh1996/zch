import React, { useEffect, useRef } from "react";
import "./App.css";
import Navbar from "./components/Navbar/index";
import Hero from "./components/Hero/index";
import About from "./components/About/index";
import Skills from "./components/Skills/index";
import Experience from "./components/Experience/index";
import Contact from "./components/Contact/index";

const App: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 导入Three.js (动态导入以避免类型问题)
    import("three").then(async (THREE) => {
      // 基础场景设置
      const scene = new THREE.Scene();

      // 修正相机设置，使用更合适的视场角和宽高比
      const camera = new THREE.PerspectiveCamera(
        50, // 进一步减小视场角，减少畸变
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // 确保挂载点是干净的
      if (mountRef.current) {
        while (mountRef.current.firstChild) {
          mountRef.current.removeChild(mountRef.current.firstChild);
        }
        mountRef.current.appendChild(renderer.domElement);
      }

      // 调整相机位置 - 使地球位于中心
      camera.position.z = 7; // 增加距离，确保球体完全可见
      camera.position.x = 0; // 确保x轴居中
      camera.position.y = 0; // 确保y轴居中

      // 相机看向场景中心
      camera.lookAt(0, 0, 0);

      // 添加纹理加载器
      const textureLoader = new THREE.TextureLoader();

      // 创建一个加载管理器来跟踪纹理加载进度
      const manager = new THREE.LoadingManager();
      manager.onProgress = function (url, itemsLoaded, itemsTotal) {
        console.log(`正在加载纹理 ${url}: ${itemsLoaded}/${itemsTotal}`);
      };

      // 使用更可靠的CDN源加载纹理
      const textureURLs = {
        earthMap:
          "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
        bumpMap:
          "https://threejs.org/examples/textures/planets/earth_normal_2048.jpg",
        specMap:
          "https://threejs.org/examples/textures/planets/earth_specular_2048.jpg",
        cloudMap:
          "https://threejs.org/examples/textures/planets/earth_clouds_1024.png",
      };

      // 创建地球
      const earthGeometry = new THREE.SphereGeometry(2, 64, 64);

      // 加载纹理
      const earthMap = await new Promise((resolve) => {
        textureLoader.load(textureURLs.earthMap, (texture) => resolve(texture));
      });

      const bumpMap = await new Promise((resolve) => {
        textureLoader.load(textureURLs.bumpMap, (texture) => resolve(texture));
      });

      const specMap = await new Promise((resolve) => {
        textureLoader.load(textureURLs.specMap, (texture) => resolve(texture));
      });

      const cloudMap = await new Promise((resolve) => {
        textureLoader.load(textureURLs.cloudMap, (texture) => resolve(texture));
      });

      // 创建地球材质 - 使用更好的光照模型
      const earthMaterial = new THREE.MeshPhongMaterial({
        map: earthMap as any,
        bumpMap: bumpMap as any,
        bumpScale: 0.2,
        specularMap: specMap as any,
        specular: new THREE.Color(0x777777),
        shininess: 25,
        reflectivity: 0.2,
      });

      // 创建地球网格
      const earth = new THREE.Mesh(earthGeometry, earthMaterial);
      scene.add(earth);

      // 创建云层
      const cloudGeometry = new THREE.SphereGeometry(2.05, 64, 64);
      const cloudMaterial = new THREE.MeshPhongMaterial({
        map: cloudMap as any,
        transparent: true,
        opacity: 0.5,
      });

      const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
      earth.add(clouds);

      // 添加北京标记 (红色点)
      const markerGeometry = new THREE.SphereGeometry(0.05, 16, 16);
      const markerMaterial = new THREE.MeshPhongMaterial({
        color: 0xff3333,
        emissive: 0xff0000,
        emissiveIntensity: 1.5,
        shininess: 100,
      });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);

      // 北京坐标：北纬39.9°，东经116.3°
      // 调整经纬度和公式以匹配正确位置（向左侧移动到红色矩阵位置）
      const latitude = 40.0 * (Math.PI / 180); // 调整纬度
      const longitude = 30.0 * (Math.PI / 180); // 进一步减小经度值，使标记点更加向左移动
      const radius = 2.06;

      // 使用更精确的球面坐标映射
      // 注意：Three.js中y轴正方向为上，所以维度计算时使用cos，经度计算时x使用-sin，z使用-cos
      marker.position.x = -radius * Math.cos(latitude) * Math.sin(longitude);
      marker.position.y = radius * Math.sin(latitude);
      marker.position.z = -radius * Math.cos(latitude) * Math.cos(longitude);

      earth.add(marker);

      // 添加标记的脉冲效果
      const pulseGeometry = new THREE.SphereGeometry(0.07, 16, 16);
      const pulseMaterial = new THREE.MeshBasicMaterial({
        color: 0xff3333,
        transparent: true,
        opacity: 0.6,
      });
      const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
      pulse.position.copy(marker.position);
      earth.add(pulse);

      // 添加"北京"文字标签
      const canvas = document.createElement("canvas");
      canvas.width = 100;
      canvas.height = 50;
      const ctx = canvas.getContext("2d");

      // 创建标签旋转更新函数
      let label: any = null;
      const updateLabelRotation = () => {
        if (label) {
          label.lookAt(camera.position);
        }
      };

      if (ctx) {
        ctx.fillStyle = "white";
        ctx.font = "bold 28px Arial";
        ctx.textAlign = "center";
        ctx.fillText("腾讯科技", 50, 30);

        const labelTexture = new THREE.CanvasTexture(canvas);
        const labelMaterial = new THREE.MeshBasicMaterial({
          map: labelTexture,
          transparent: true,
          side: THREE.DoubleSide,
        });
        const labelGeometry = new THREE.PlaneGeometry(0.5, 0.25);
        label = new THREE.Mesh(labelGeometry, labelMaterial);

        // 设置标签位置，稍微偏移
        label.position.copy(marker.position);
        // 向外偏移一点
        const offsetFactor = 1.12;
        label.position.x *= offsetFactor;
        label.position.y *= offsetFactor;
        label.position.z *= offsetFactor;

        // 确保标签始终面向相机
        label.lookAt(camera.position);

        earth.add(label);
      }

      // 添加光环
      const glowGeometry = new THREE.SphereGeometry(2.15, 64, 64);
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          c: { value: 0.2 },
          p: { value: 3.0 },
          glowColor: { value: new THREE.Color(0x5588ff) },
          viewVector: { value: camera.position },
        },
        vertexShader: `
          uniform vec3 viewVector;
          uniform float c;
          uniform float p;
          varying float intensity;
          void main() {
            vec3 vNormal = normalize(normal);
            vec3 vNormel = normalize(viewVector);
            intensity = pow(abs(c - dot(vNormal, vNormel)), p);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          varying float intensity;
          void main() {
            vec3 glow = glowColor * intensity;
            gl_FragColor = vec4(glow, 1.0);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
      });

      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      scene.add(glowMesh);

      // 强化光源
      const ambientLight = new THREE.AmbientLight(0x666666, 1); // 增强环境光
      scene.add(ambientLight);

      // 添加一个从亚洲方向照射的光源
      const pointLight = new THREE.PointLight(0xffffff, 1.8);
      pointLight.position.set(-15, 5, 10); // 从东亚方向照射
      scene.add(pointLight);

      // 添加来自正面的光源
      const frontLight = new THREE.DirectionalLight(0xffffff, 1.2);
      frontLight.position.set(-2, 0, 5);
      scene.add(frontLight);

      // 星空背景
      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.02,
        transparent: true,
      });

      const starVertices = [];
      for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
      }

      starGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(starVertices, 3)
      );
      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);

      // 设置初始角度 - 使中国朝向屏幕
      earth.rotation.y = Math.PI / 3; // 调整初始角度使中国西北部区域面向屏幕

      // 自动旋转动画
      let pulseScale = 1;
      let pulseDirection = 0.01;

      const animate = () => {
        requestAnimationFrame(animate);
        earth.rotation.y += 0.003; // 降低旋转速度
        clouds.rotation.y += 0.004; // 相应降低云层旋转速度

        // 脉冲动画
        pulseScale += pulseDirection;
        if (pulseScale > 1.3 || pulseScale < 0.7) {
          pulseDirection *= -1;
        }
        pulse.scale.set(pulseScale, pulseScale, pulseScale);

        // 更新大气层效果
        glowMaterial.uniforms.viewVector.value = new THREE.Vector3().subVectors(
          camera.position,
          earth.position
        );

        // 确保标签始终面向相机
        if (typeof updateLabelRotation === "function") {
          updateLabelRotation();
        }

        renderer.render(scene, camera);
      };

      animate();

      // 响应式
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener("resize", handleResize);

      // 设置地球位置，确保居中
      earth.position.set(0, 0, 0);

      // 清理函数
      return () => {
        window.removeEventListener("resize", handleResize);
        if (mountRef.current) {
          while (mountRef.current.firstChild) {
            mountRef.current.removeChild(mountRef.current.firstChild);
          }
        }
        // 释放资源
        scene.clear();
        renderer.dispose();
      };
    });
  }, []);

  return (
    <div className="App">
      <div
        ref={mountRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          display: "block",
          overflow: "hidden",
        }}
      />
      <div
        className="content-wrapper"
        style={{ position: "relative", zIndex: 1 }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Contact />
        </main>
      </div>
    </div>
  );
};

export default App;
