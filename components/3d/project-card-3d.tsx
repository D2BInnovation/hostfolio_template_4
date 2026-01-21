"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { RoundedBox, Text, Html } from "@react-three/drei"
import * as THREE from "three"
import { ExternalLink, Github, Folder } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
  featured: boolean
}

function Card3D({ project, isHovered }: { project: Project; isHovered: boolean }) {
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        isHovered ? 0.1 : 0,
        0.1
      )
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        isHovered ? -0.05 : 0,
        0.1
      )
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        isHovered ? 0.5 : 0,
        0.1
      )
    }
  })

  return (
    <group ref={meshRef}>
      {/* Main card */}
      <RoundedBox args={[4, 2.5, 0.1]} radius={0.1} smoothness={4}>
        <meshStandardMaterial 
          color={isHovered ? "#1a3a4a" : "#112240"} 
          metalness={0.3}
          roughness={0.7}
        />
      </RoundedBox>
      
      {/* Glow border when hovered */}
      {isHovered && (
        <mesh position={[0, 0, -0.06]}>
          <planeGeometry args={[4.1, 2.6]} />
          <meshBasicMaterial color="#64ffda" transparent opacity={0.3} />
        </mesh>
      )}

      {/* Project icon */}
      <mesh position={[-1.5, 0.8, 0.06]}>
        <boxGeometry args={[0.3, 0.3, 0.05]} />
        <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={0.5} />
      </mesh>

      {/* Title */}
      <Text
        position={[-0.5, 0.8, 0.1]}
        fontSize={0.2}
        color="#ccd6f6"
        anchorX="left"
        maxWidth={2.5}
      >
        {project.title}
      </Text>

      {/* Description */}
      <Text
        position={[-1.8, 0.2, 0.1]}
        fontSize={0.12}
        color="#8892b0"
        anchorX="left"
        maxWidth={3.5}
        lineHeight={1.4}
        font="/fonts/Geist-Regular.ttf"
      >
        {project.description.substring(0, 100)}...
      </Text>

      {/* Tech tags */}
      {project.technologies.slice(0, 4).map((tech, i) => (
        <Text
          key={tech}
          position={[-1.8 + i * 0.9, -0.8, 0.1]}
          fontSize={0.1}
          color="#64ffda"
          anchorX="left"
          font="/fonts/GeistMono-Regular.ttf"
        >
          {tech}
        </Text>
      ))}
    </group>
  )
}

interface ProjectCard3DProps {
  project: Project
}

export function ProjectCard3D({ project }: ProjectCard3DProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative w-full h-[300px] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#64ffda" />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#0a192f" />
        <Card3D project={project} isHovered={isHovered} />
      </Canvas>
      
      {/* Overlay with links */}
      <div className={`absolute bottom-4 right-4 flex gap-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <a 
          href={project.githubUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <Github size={20} />
        </a>
        <a 
          href={project.liveUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <ExternalLink size={20} />
        </a>
      </div>
    </div>
  )
}
