"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

function StarField() {
  const ref = useRef<THREE.Points>(null)
  
  const positions = useMemo(() => {
    const arr = new Float32Array(3000)
    for (let i = 0; i < 3000; i += 3) {
      arr[i] = (Math.random() - 0.5) * 20
      arr[i + 1] = (Math.random() - 0.5) * 20
      arr[i + 2] = (Math.random() - 0.5) * 20
    }
    return arr
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15
      ref.current.rotation.y -= delta / 20
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#64ffda"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)
  const torusRef = useRef<THREE.Mesh>(null)
  const octahedronRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2
      meshRef.current.rotation.y = t * 0.3
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.3
    }
    
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.3
      torusRef.current.rotation.z = t * 0.2
      torusRef.current.position.y = Math.cos(t * 0.4) * 0.2 + 1
    }
    
    if (octahedronRef.current) {
      octahedronRef.current.rotation.y = t * 0.4
      octahedronRef.current.rotation.z = t * 0.2
      octahedronRef.current.position.y = Math.sin(t * 0.6) * 0.25 - 1
    }
  })

  return (
    <>
      <mesh ref={meshRef} position={[3, 0, -2]}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshBasicMaterial color="#64ffda" wireframe opacity={0.3} transparent />
      </mesh>
      
      <mesh ref={torusRef} position={[-3, 1, -3]}>
        <torusGeometry args={[0.4, 0.15, 16, 32]} />
        <meshBasicMaterial color="#64ffda" wireframe opacity={0.25} transparent />
      </mesh>
      
      <mesh ref={octahedronRef} position={[2.5, -1, -2.5]}>
        <octahedronGeometry args={[0.5]} />
        <meshBasicMaterial color="#64ffda" wireframe opacity={0.2} transparent />
      </mesh>
    </>
  )
}

export function Hero3DBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <StarField />
        <FloatingGeometry />
      </Canvas>
    </div>
  )
}
