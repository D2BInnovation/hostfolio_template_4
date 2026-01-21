"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Trail, Sparkles } from "@react-three/drei"
import * as THREE from "three"

function TimelineOrb({ position, index }: { position: [number, number, number]; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime + index
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Trail width={0.5} length={3} color="#64ffda" attenuation={(t) => t * t}>
        <mesh ref={meshRef} position={position}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial 
            color="#64ffda" 
            emissive="#64ffda" 
            emissiveIntensity={0.8}
            wireframe
          />
        </mesh>
      </Trail>
    </Float>
  )
}

function TimelinePath() {
  const points = []
  for (let i = 0; i < 50; i++) {
    const t = i / 49
    points.push(new THREE.Vector3(
      Math.sin(t * Math.PI * 2) * 0.5,
      3 - t * 6,
      Math.cos(t * Math.PI * 2) * 0.5
    ))
  }
  
  const lineRef = useRef<THREE.Line>(null)
  
  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })
  
  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#64ffda" transparent opacity={0.4} />
    </line>
  )
}

function Scene({ experienceCount }: { experienceCount: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <TimelinePath />
      
      {Array.from({ length: experienceCount }).map((_, i) => (
        <TimelineOrb 
          key={i} 
          position={[
            Math.sin((i / experienceCount) * Math.PI * 2) * 0.5,
            2 - (i / (experienceCount - 1)) * 4,
            Math.cos((i / experienceCount) * Math.PI * 2) * 0.5
          ]} 
          index={i}
        />
      ))}
      
      <Sparkles count={50} scale={6} size={1} speed={0.3} color="#64ffda" />
    </group>
  )
}

interface ExperienceTimeline3DProps {
  experienceCount: number
}

export function ExperienceTimeline3D({ experienceCount }: ExperienceTimeline3DProps) {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-30">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#64ffda" />
        <Scene experienceCount={experienceCount} />
      </Canvas>
    </div>
  )
}
