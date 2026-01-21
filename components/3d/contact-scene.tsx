"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei"
import * as THREE from "three"

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={2}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#64ffda"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  )
}

function FloatingRings() {
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = state.clock.elapsedTime * 0.5
      ring1Ref.current.rotation.y = state.clock.elapsedTime * 0.3
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = state.clock.elapsedTime * 0.3 + Math.PI / 4
      ring2Ref.current.rotation.z = state.clock.elapsedTime * 0.4
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = state.clock.elapsedTime * 0.4
      ring3Ref.current.rotation.z = state.clock.elapsedTime * 0.2 + Math.PI / 3
    }
  })

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshStandardMaterial color="#88ccff" emissive="#88ccff" emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={0.3} />
      </mesh>
    </>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#64ffda" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#88ccff" />
      
      <AnimatedSphere />
      <FloatingRings />
      
      <Sparkles count={100} scale={10} size={1.5} speed={0.3} color="#64ffda" />
    </>
  )
}

export function ContactScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
