"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { 
  Text3D, 
  Center, 
  Float,
  MeshTransmissionMaterial,
  Environment,
  Stars,
  Trail,
  Sparkles
} from "@react-three/drei"
import * as THREE from "three"

function FloatingGeometry({ position, rotation, scale, color, speed = 1 }: { 
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  color: string
  speed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale || 1}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial 
          color={color} 
          wireframe 
          transparent 
          opacity={0.6}
        />
      </mesh>
    </Float>
  )
}

function GlowingSphere({ position, color, size = 0.3 }: {
  position: [number, number, number]
  color: string
  size?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.5
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={2}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

function AnimatedTorus({ position, color }: {
  position: [number, number, number]
  color: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Trail width={1} length={5} color={color} attenuation={(t) => t * t}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.8, 0.2, 16, 50]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </Trail>
  )
}

function GlassCube({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.4
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <MeshTransmissionMaterial
        backside
        samples={4}
        thickness={0.5}
        chromaticAberration={0.1}
        anisotropy={0.3}
        distortion={0.2}
        distortionScale={0.2}
        temporalDistortion={0.1}
        metalness={0.1}
        roughness={0.2}
        color="#88ccff"
      />
    </mesh>
  )
}

function ParticleField() {
  const count = 500
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return pos
  }, [])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#64ffda" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function GridFloor() {
  return (
    <group position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper args={[50, 50, "#64ffda", "#1a4040"]} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

function FloatingRing({ position, color, size = 1.5 }: {
  position: [number, number, number]
  color: string
  size?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[size, 0.02, 16, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
    </mesh>
  )
}

function MouseFollower() {
  const { viewport } = useThree()
  const ref = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = THREE.MathUtils.lerp(
        ref.current.position.x,
        (state.pointer.x * viewport.width) / 2,
        0.05
      )
      ref.current.position.y = THREE.MathUtils.lerp(
        ref.current.position.y,
        (state.pointer.y * viewport.height) / 2,
        0.05
      )
    }
  })

  return (
    <group ref={ref}>
      <pointLight color="#64ffda" intensity={2} distance={5} />
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={2} />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#64ffda" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#0a192f" />
      
      {/* Stars background */}
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      {/* Sparkles */}
      <Sparkles count={100} scale={15} size={2} speed={0.4} color="#64ffda" />
      
      {/* Floating geometries */}
      <FloatingGeometry position={[-4, 2, -2]} color="#64ffda" speed={0.8} />
      <FloatingGeometry position={[4, -1, -3]} color="#64ffda" speed={1.2} scale={0.7} />
      <FloatingGeometry position={[-3, -2, -1]} color="#88ccff" speed={0.6} scale={0.5} />
      <FloatingGeometry position={[5, 1, -4]} color="#64ffda" speed={1} scale={0.8} />
      
      {/* Glowing spheres */}
      <GlowingSphere position={[-5, 0, -5]} color="#64ffda" size={0.2} />
      <GlowingSphere position={[5, 2, -6]} color="#88ccff" size={0.15} />
      <GlowingSphere position={[3, -2, -4]} color="#64ffda" size={0.25} />
      
      {/* Animated torus */}
      <AnimatedTorus position={[6, 0, -8]} color="#64ffda" />
      
      {/* Glass cube */}
      <GlassCube position={[-6, 1, -6]} />
      
      {/* Floating rings */}
      <FloatingRing position={[0, 0, -10]} color="#64ffda" size={3} />
      <FloatingRing position={[0, 0, -12]} color="#88ccff" size={4} />
      <FloatingRing position={[0, 0, -14]} color="#64ffda" size={5} />
      
      {/* Particle field */}
      <ParticleField />
      
      {/* Grid floor */}
      <GridFloor />
      
      {/* Mouse follower */}
      <MouseFollower />
      
      <Environment preset="night" />
    </>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
