"use client"
import React, { useRef, useEffect, useContext } from 'react';
import * as THREE from 'three';
import { BackgroundContext } from '../providers';

const SpinningCubesBackground = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setIsLoaded } = useContext(BackgroundContext);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Add starfield background
    const starCount = 1000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      // Place stars in a sphere around the scene
      const radius = 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i3 + 2] = radius * Math.cos(phi);
      
      // Random star colors (mostly white/blue with occasional yellow/red)
      const colorChoice = Math.random();
      if (colorChoice > 0.9) { // Red/yellow stars
        starColors[i3] = 1.0;
        starColors[i3 + 1] = 0.7 + Math.random() * 0.3;
        starColors[i3 + 2] = 0.3 + Math.random() * 0.3;
      } else if (colorChoice > 0.6) { // Blue stars
        starColors[i3] = 0.3 + Math.random() * 0.3;
        starColors[i3 + 1] = 0.7 + Math.random() * 0.3;
        starColors[i3 + 2] = 1.0;
      } else { // White stars
        const brightness = 0.7 + Math.random() * 0.3;
        starColors[i3] = brightness;
        starColors[i3 + 1] = brightness;
        starColors[i3 + 2] = brightness;
      }
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    
    const starMaterial = new THREE.PointsMaterial({
      size: 0.1 + Math.random() * 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);
    
    // Camera with a slightly wider field of view
    const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance' 
    });
    
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Camera position
    camera.position.z = 20;
    
    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add a point light for more dynamic lighting
    const pointLight = new THREE.PointLight(0x6699ff, 0.8, 50);
    pointLight.position.set(0, 0, 15);
    scene.add(pointLight);
    
    // Add a second point light of different color
    const pointLight2 = new THREE.PointLight(0xff9966, 0.6, 50);
    pointLight2.position.set(0, 0, -15);
    scene.add(pointLight2);
    
    // Create cubes in a ring formation
    const cubes: THREE.Mesh[] = [];
    const cubeCount = 6;
    const radius = 10;
    
    // Add a second inner ring
    const innerCubes: THREE.Mesh[] = [];
    
    // Create texture loader
    const textureLoader = new THREE.TextureLoader();
    
    // Define background colors for each cube
    const backgroundColors = [
      new THREE.Color(0, 1, 1),     // Cyan
      new THREE.Color(1, 0, 0),     // Red
      new THREE.Color(1, 0, 0),     // Red (was Green)
      new THREE.Color(0, 0, 1),     // Blue
      new THREE.Color(1, 1, 0),     // Yellow
      new THREE.Color(1, 0, 1),     // Magenta
      new THREE.Color(1, 0.5, 0),   // Orange
      new THREE.Color(0.5, 0, 0.5)  // Purple
    ];
    
    // Load textures
    const textures = [
      textureLoader.load('/textures/texture1.jpg'),
      textureLoader.load('/textures/texture2.jpg'),
      textureLoader.load('/textures/texture3.jpg'),
      textureLoader.load('/textures/texture4.jpg'),
      textureLoader.load('/textures/texture5.jpg'),
      textureLoader.load('/textures/texture6.jpg'),
      textureLoader.load('/textures/texture7.jpg'),
      textureLoader.load('/textures/texture8.jpg')
    ];
    
    // Configure textures
    textures.forEach(texture => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
    });
    
    for (let i = 0; i < cubeCount; i++) {
      // Outer ring cubes
      const size = 2.4;
      const geometry = new THREE.BoxGeometry(size, size, size);
      
      // Create background materials (solid color)
      const backgroundMaterials = [
        new THREE.MeshPhongMaterial({ 
          color: backgroundColors[i],
          transparent: true, 
          opacity: 1,
          side: THREE.BackSide
        }),
        new THREE.MeshPhongMaterial({ 
          color: backgroundColors[i],
          transparent: true, 
          opacity: 1,
          side: THREE.BackSide
        }),
        new THREE.MeshPhongMaterial({ 
          color: backgroundColors[i],
          transparent: true, 
          opacity: 1,
          side: THREE.BackSide
        }),
        new THREE.MeshPhongMaterial({ 
          color: backgroundColors[i],
          transparent: true, 
          opacity: 1,
          side: THREE.BackSide
        }),
        new THREE.MeshPhongMaterial({ 
          color: backgroundColors[i],
          transparent: true, 
          opacity: 1,
          side: THREE.BackSide
        }),
        new THREE.MeshPhongMaterial({ 
          color: backgroundColors[i],
          transparent: true, 
          opacity: 1,
          side: THREE.BackSide
        })
      ];
      
      // Create texture materials
      const textureMaterials = [
        new THREE.MeshPhongMaterial({ 
          map: textures[i], 
          transparent: false, 
          opacity: 1, 
          shininess: 100,
          side: THREE.FrontSide
        }),
        new THREE.MeshPhongMaterial({ 
          map: textures[i], 
          transparent: false, 
          opacity: 1, 
          shininess: 100,
          side: THREE.FrontSide
        }),
        new THREE.MeshPhongMaterial({ 
          map: textures[i], 
          transparent: false, 
          opacity: 1, 
          shininess: 100,
          side: THREE.FrontSide
        }),
        new THREE.MeshPhongMaterial({ 
          map: textures[i], 
          transparent: false, 
          opacity: 1, 
          shininess: 100,
          side: THREE.FrontSide
        }),
        new THREE.MeshPhongMaterial({ 
          map: textures[i], 
          transparent: false, 
          opacity: 1, 
          shininess: 100,
          side: THREE.FrontSide
        }),
        new THREE.MeshPhongMaterial({ 
          map: textures[i], 
          transparent: false, 
          opacity: 1, 
          shininess: 100,
          side: THREE.FrontSide
        })
      ];
      
      // Create background mesh
      const backgroundMesh = new THREE.Mesh(geometry, backgroundMaterials);
      backgroundMesh.scale.set(1.01, 1.01, 1.01); // Slightly larger to prevent z-fighting
      
      // Create texture mesh
      const textureMesh = new THREE.Mesh(geometry, textureMaterials);
      
      // Create a group to hold both meshes
      const cubeGroup = new THREE.Group();
      cubeGroup.add(backgroundMesh);
      cubeGroup.add(textureMesh);
      
      // Position in a perfect ring formation
      const angle = (i / cubeCount) * Math.PI * 2;
      cubeGroup.position.x = Math.cos(angle) * radius;
      cubeGroup.position.y = Math.sin(angle) * radius;
      cubeGroup.position.z = 0;
      
      // Add rotation speeds
      cubeGroup.userData.rotationSpeed = {
        x: Math.random() * 0.006 + 0.002,
        y: Math.random() * 0.006 + 0.002,
        z: Math.random() * 0.006 + 0.002
      };
      
      // Add orbit data
      cubeGroup.userData.orbit = {
        angle: angle,
        speed: 0.002,
        radius: radius
      };
      
      scene.add(cubeGroup);
      // @ts-ignore
      cubes.push(cubeGroup);
    }
    
    // Add particle system for sparkle effect
    const particleCount = 300;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const dist = (Math.random() * 5) + radius - 2;
      
      particlePositions[i3] = Math.cos(angle) * dist;
      particlePositions[i3 + 1] = Math.sin(angle) * dist;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 5;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.15,
      transparent: true,
      opacity: 0.7
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const elapsed = clock.getElapsedTime();
      
      // Update each cube's position and rotation
      cubes.forEach(cube => {
        // Self rotation
        cube.rotation.x += cube.userData.rotationSpeed.x;
        cube.rotation.y += cube.userData.rotationSpeed.y;
        cube.rotation.z += cube.userData.rotationSpeed.z;
        
        // Orbit around the ring
        const orbit = cube.userData.orbit;
        orbit.angle += orbit.speed;
        
        cube.position.x = Math.cos(orbit.angle) * orbit.radius;
        cube.position.y = Math.sin(orbit.angle) * orbit.radius;
      });
      
      // Update inner ring cubes
      innerCubes.forEach(cube => {
        // Self rotation
        cube.rotation.x += cube.userData.rotationSpeed.x;
        cube.rotation.y += cube.userData.rotationSpeed.y;
        cube.rotation.z += cube.userData.rotationSpeed.z;
        
        // Orbit around the ring
        const orbit = cube.userData.orbit;
        orbit.angle += orbit.speed;
        
        cube.position.x = Math.cos(orbit.angle) * orbit.radius;
        cube.position.y = Math.sin(orbit.angle) * orbit.radius;
      });
      
      // Pulse the point lights
      pointLight.intensity = 0.8 + Math.sin(elapsed * 2) * 0.2;
      pointLight2.intensity = 0.6 + Math.cos(elapsed * 2) * 0.2;
      
      // Make particles twinkle
      const positions = particleGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 2] += (Math.random() - 0.5) * 0.05;
        
        if (Math.abs(positions[i3 + 2]) > 5) {
          positions[i3 + 2] = Math.sign(positions[i3 + 2]) * 5;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;
      
      // Rotate particle system slightly
      particles.rotation.z += 0.0005;
      
      // Rotate starfield very slowly
      starField.rotation.y += 0.0001;
      starField.rotation.x += 0.00005;
      
      // Make some stars twinkle
      const starColors = starGeometry.attributes.color.array;
      for (let i = 0; i < 20; i++) { // Only update a few stars each frame
        const starIndex = Math.floor(Math.random() * starCount);
        const i3 = starIndex * 3;
        
        // Slightly vary the brightness for twinkling
        const twinkleFactor = 0.9 + Math.random() * 0.2;
        starColors[i3] *= twinkleFactor;
        starColors[i3 + 1] *= twinkleFactor;
        starColors[i3 + 2] *= twinkleFactor;
        
        // Ensure colors stay in valid range
        starColors[i3] = Math.min(Math.max(starColors[i3], 0.2), 1.0);
        starColors[i3 + 1] = Math.min(Math.max(starColors[i3 + 1], 0.2), 1.0);
        starColors[i3 + 2] = Math.min(Math.max(starColors[i3 + 2], 0.2), 1.0);
      }
      starGeometry.attributes.color.needsUpdate = true;
      
      // Fixed camera position without panning
      camera.position.set(0, 0, 20);
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    animate();
    setIsLoaded(true);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      cubes.forEach(cube => {
        scene.remove(cube);
        cube.geometry.dispose();
        if (Array.isArray(cube.material)) {
          cube.material.forEach(mat => mat.dispose());
        } else {
          cube.material.dispose();
        }
      });
      
      innerCubes.forEach(cube => {
        scene.remove(cube);
        cube.geometry.dispose();
        if (Array.isArray(cube.material)) {
          cube.material.forEach(mat => mat.dispose());
        } else {
          cube.material.dispose();
        }
      });
      
      particleGeometry.dispose();
      particleMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      
      renderer.dispose();
    };
  }, []);
  
  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-slate-900 to-black">
      {/* Three.js container */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 z-0"
      />
      
      {/* Content overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
        {children}
      </div>
    </div>
  );
};

export default SpinningCubesBackground;