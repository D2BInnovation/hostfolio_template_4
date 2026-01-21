"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, OrbitControls, Float } from "@react-three/drei"
import * as THREE from "three"

interface SkillTextProps {
  skill: string
  position: [number, number, number]
  color: string
}

function SkillText({ skill, position, color }: SkillTextProps) {
  const ref = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.lookAt(state.camera.position)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
      <Text
        ref={ref}
        position={position}
        fontSize={0.3}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {skill}
      </Text>
    </Float>
  )
}

function SkillsSphere({ skills }: { skills: string[] }) {
  const groupRef = useRef<THREE.Group>(null)
  
  const positions = useMemo(() => {
    const pos: [number, number, number][] = []
    const phi = Math.PI * (3 - Math.sqrt(5))
    
    for (let i = 0; i < skills.length; i++) {
      const y = 1 - (i / (skills.length - 1)) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = phi * i
      
      pos.push([
        Math.cos(theta) * radius * 3,
        y * 3,
        Math.sin(theta) * radius * 3
      ])
    }
    return pos
  }, [skills.length])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  const colors = ["#64ffda", "#88ccff", "#a8d8ea", "#64ffda", "#88ccff"]

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <SkillText
          key={skill}
          skill={skill}
          position={positions[i]}
          color={colors[i % colors.length]}
        />
      ))}
      
      {/* Central glowing sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#64ffda" 
          emissive="#64ffda" 
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Wireframe sphere */}
      <mesh>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial color="#64ffda" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  )
}

interface Skills3DProps {
  skills: string[]
}

export function Skills3D({ skills }: Skills3DProps) {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#64ffda" />
        <SkillsSphere skills={skills} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
