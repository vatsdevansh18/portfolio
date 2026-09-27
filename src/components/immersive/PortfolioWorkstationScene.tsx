import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

interface PortfolioWorkstationSceneProps {
  progress: number // Normalized scroll progress 0.0 to 1.0
}

export function PortfolioWorkstationScene({ progress }: PortfolioWorkstationSceneProps) {
  const { camera } = useThree()

  // References for animating layers and nodes
  const groupRef = useRef<THREE.Group>(null)
  const layer1Ref = useRef<THREE.Mesh>(null)
  const layer2Ref = useRef<THREE.Mesh>(null)
  const layer3Ref = useRef<THREE.Mesh>(null)
  const layer4Ref = useRef<THREE.Mesh>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const nodesGroupRef = useRef<THREE.Group>(null)

  // Target camera coordinates based on scroll progress
  // 0.0 -> [0, 2, 8]
  // 0.3 -> [4.5, 3.0, 7.0]
  // 0.6 -> [1.5, 0.8, 4.2]
  // 0.85 -> [-3.0, 4.0, 6.5]
  // 1.0 -> [0, 6, 11]
  useFrame(() => {
    let targetX = 0
    let targetY = 2.0
    let targetZ = 8.0
    let lookTarget = new THREE.Vector3(0, 0, 0)

    if (progress < 0.25) {
      // Scene 1: System Boot / Monolith
      const t = progress / 0.25
      targetX = THREE.MathUtils.lerp(0, 2.0, t)
      targetY = THREE.MathUtils.lerp(2.0, 2.5, t)
      targetZ = THREE.MathUtils.lerp(8.0, 7.5, t)
    } else if (progress < 0.5) {
      // Scene 2: Layer Separation
      const t = (progress - 0.25) / 0.25
      targetX = THREE.MathUtils.lerp(2.0, 4.8, t)
      targetY = THREE.MathUtils.lerp(2.5, 3.2, t)
      targetZ = THREE.MathUtils.lerp(7.5, 6.5, t)
    } else if (progress < 0.75) {
      // Scene 3: Filesystem Dive
      const t = (progress - 0.5) / 0.25
      targetX = THREE.MathUtils.lerp(4.8, 1.2, t)
      targetY = THREE.MathUtils.lerp(3.2, 0.5, t)
      targetZ = THREE.MathUtils.lerp(6.5, 4.0, t)
    } else {
      // Scene 4 & 5: Tech Nodes & Final Pullback
      const t = (progress - 0.75) / 0.25
      targetX = THREE.MathUtils.lerp(1.2, 0, t)
      targetY = THREE.MathUtils.lerp(0.5, 5.5, t)
      targetZ = THREE.MathUtils.lerp(4.0, 10.5, t)
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.08)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.08)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08)
    camera.lookAt(lookTarget)

    // Layer explosion distance driven by scroll progress
    // In Scene 2 (0.2 - 0.5), layers explode outwards vertically
    const separation = Math.max(0, Math.min(1, (progress - 0.2) / 0.25))

    if (layer1Ref.current) layer1Ref.current.position.y = THREE.MathUtils.lerp(0.3, 1.8, separation)
    if (layer2Ref.current) layer2Ref.current.position.y = THREE.MathUtils.lerp(0.1, 0.6, separation)
    if (layer3Ref.current) layer3Ref.current.position.y = THREE.MathUtils.lerp(-0.1, -0.6, separation)
    if (layer4Ref.current) layer4Ref.current.position.y = THREE.MathUtils.lerp(-0.3, -1.8, separation)

    // Rotate core slowly
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.005
    }

    // Nodes group expansion in Scene 3
    if (nodesGroupRef.current) {
      const nodeScale = Math.max(0.01, Math.min(1, (progress - 0.45) / 0.2))
      nodesGroupRef.current.scale.setScalar(nodeScale)
      nodesGroupRef.current.rotation.y = progress * Math.PI * 1.5
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = progress * 0.5
    }
  })

  // Materials
  const carbonMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0a0a0a",
        roughness: 0.25,
        metalness: 0.85,
      }),
    []
  )

  const emeraldLineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#10b981",
        transparent: true,
        opacity: 0.75,
      }),
    []
  )

  return (
    <group ref={groupRef}>
      {/* Central Monolith & Separating Architectural Layers */}
      <group position={[0, 0, 0]}>
        {/* Layer 1: UI & Styling Plane */}
        <mesh ref={layer1Ref} position={[0, 0.3, 0]}>
          <boxGeometry args={[3.2, 0.12, 3.2]} />
          <primitive object={carbonMaterial} attach="material" />
        </mesh>

        {/* Layer 2: Routing & State Plane */}
        <mesh ref={layer2Ref} position={[0, 0.1, 0]}>
          <boxGeometry args={[3.0, 0.12, 3.0]} />
          <primitive object={carbonMaterial} attach="material" />
        </mesh>

        {/* Layer 3: WebGL & 3D Pitch Plane */}
        <mesh ref={layer3Ref} position={[0, -0.1, 0]}>
          <boxGeometry args={[3.0, 0.12, 3.0]} />
          <primitive object={carbonMaterial} attach="material" />
        </mesh>

        {/* Layer 4: Motion & GSAP Pipeline Plane */}
        <mesh ref={layer4Ref} position={[0, -0.3, 0]}>
          <boxGeometry args={[3.2, 0.12, 3.2]} />
          <primitive object={carbonMaterial} attach="material" />
        </mesh>

        {/* Central Pulsing Beacon Core */}
        <mesh ref={coreRef} position={[0, 0, 0]}>
          <octahedronGeometry args={[0.35, 0]} />
          <meshBasicMaterial color="#10b981" wireframe />
        </mesh>
      </group>

      {/* Radial Filesystem Directory Nodes */}
      <group ref={nodesGroupRef} position={[0, 0, 0]} scale={0.01}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2
          const radius = 2.8
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius

          return (
            <group key={i} position={[x, 0, z]}>
              <mesh>
                <cylinderGeometry args={[0.2, 0.2, 0.08, 16]} />
                <meshStandardMaterial color="#141414" roughness={0.3} metalness={0.8} />
              </mesh>
              <mesh position={[0, 0.05, 0]}>
                <ringGeometry args={[0.22, 0.26, 24]} />
                <meshBasicMaterial color="#10b981" side={THREE.DoubleSide} />
              </mesh>
            </group>
          )
        })}
      </group>

      {/* Atmospheric Ground Grid */}
      <gridHelper
        args={[24, 24, "#10b981", "#222222"]}
        position={[0, -2.4, 0]}
      />
    </group>
  )
}
