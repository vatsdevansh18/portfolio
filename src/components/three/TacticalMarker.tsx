import * as THREE from "three"
import { useRef, useMemo, useState } from "react"
import { useFrame } from "@react-three/fiber"

interface TacticalMarkerProps {
  position?: [number, number, number]
}

export function TacticalMarker({ position = [1.2, 0, 5] }: TacticalMarkerProps) {
  const groupRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Native Canvas Texture for 100% WebGL-native spatial billboard
  const labelTexture = useMemo(() => {
    if (typeof document === "undefined") return null
    const canvas = document.createElement("canvas")
    canvas.width = 1024
    canvas.height = 360
    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    // Background tactical card
    ctx.fillStyle = "rgba(10, 10, 10, 0.94)"
    ctx.strokeStyle = "rgba(255, 255, 255, 0.22)"
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.roundRect(12, 12, 1000, 336, 24)
    ctx.fill()
    ctx.stroke()

    // Status beacon circle
    ctx.fillStyle = "#10b981"
    ctx.beginPath()
    ctx.arc(72, 104, 18, 0, Math.PI * 2)
    ctx.fill()

    // Title
    ctx.font = "bold 52px monospace"
    ctx.fillStyle = "#10b981"
    ctx.fillText("NODE // DEVANSH VATS", 112, 118)

    // Subtitle / Role
    ctx.font = "bold 42px monospace"
    ctx.fillStyle = "#ededed"
    ctx.fillText("VICE CAPTAIN • TACTICAL ANCHOR", 64, 208)

    // Position telemetry
    ctx.font = "34px monospace"
    ctx.fillStyle = "#8c8c8c"
    ctx.fillText("COORD: X: +01.20 | Z: +05.00", 64, 282)

    const texture = new THREE.CanvasTexture(canvas)
    texture.minFilter = THREE.LinearFilter
    texture.generateMipmaps = true
    return texture
  }, [])

  // Gentle elevation & rotation
  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.08
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4
    }
  })

  const stemHeight = 2.4

  return (
    <group position={position}>
      {/* Ground Concentric Target Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0.55, 0.62, 32]} />
        <meshBasicMaterial
          color="#10b981"
          transparent
          opacity={hovered ? 0.95 : 0.65}
        />
      </mesh>

      {/* Rotating Outer Reticle */}
      <mesh
        ref={ringRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.022, 0]}
      >
        <ringGeometry args={[0.85, 0.88, 24]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
      </mesh>

      {/* Center Target Spot */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <circleGeometry args={[0.12, 16]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>

      {/* Vertical Tactical Coordinate Stem / Beam */}
      <mesh position={[0, stemHeight / 2, 0]}>
        <cylinderGeometry args={[0.015, 0.015, stemHeight, 8]} />
        <meshBasicMaterial
          color="#10b981"
          transparent
          opacity={hovered ? 0.85 : 0.45}
        />
      </mesh>

      {/* Elevated Tactical Node Beacon */}
      <group
        ref={groupRef}
        position={[0, stemHeight, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <mesh>
          <sphereGeometry args={[hovered ? 0.22 : 0.18, 16, 16]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={hovered ? 0.9 : 0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Outer Wireframe Octahedron */}
        <mesh>
          <octahedronGeometry args={[hovered ? 0.38 : 0.3, 0]} />
          <meshBasicMaterial
            color="#ffffff"
            wireframe
            transparent
            opacity={hovered ? 0.7 : 0.35}
          />
        </mesh>

        {/* Native 3D Spatial Billboard Sprite */}
        {labelTexture && (
          <sprite position={[2.8, 1.0, 0]} scale={[5.4, 1.9, 1]}>
            <spriteMaterial
              map={labelTexture}
              transparent
              depthTest={false}
            />
          </sprite>
        )}
      </group>
    </group>
  )
}
