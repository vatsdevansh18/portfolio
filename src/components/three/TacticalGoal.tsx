import * as THREE from "three"
import { useMemo } from "react"

interface TacticalGoalProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export function TacticalGoal({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: TacticalGoalProps) {
  // Goal specifications (scaled for architectural harmony)
  const width = 4.4
  const height = 1.65
  const depth = 1.2
  const postRadius = 0.04

  // Shared geometry & material for efficiency
  const { postGeometry, crossbarGeometry, depthGeometry, material, netLineMaterial } = useMemo(() => {
    return {
      postGeometry: new THREE.CylinderGeometry(postRadius, postRadius, height, 12),
      crossbarGeometry: new THREE.CylinderGeometry(postRadius, postRadius, width, 12),
      depthGeometry: new THREE.CylinderGeometry(postRadius * 0.75, postRadius * 0.75, depth, 8),
      material: new THREE.MeshStandardMaterial({
        color: "#52525b",
        roughness: 0.35,
        metalness: 0.65,
      }),
      netLineMaterial: new THREE.LineBasicMaterial({
        color: "#27272a",
        transparent: true,
        opacity: 0.35,
      }),
    }
  }, [])

  // Net frame lines
  const netLinesGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [
      // Top back bar
      new THREE.Vector3(-width / 2, height, depth),
      new THREE.Vector3(width / 2, height, depth),
      // Bottom back bar
      new THREE.Vector3(width / 2, 0, depth),
      new THREE.Vector3(-width / 2, 0, depth),
      new THREE.Vector3(-width / 2, height, depth),
      // Vertical back strut
      new THREE.Vector3(0, height, depth),
      new THREE.Vector3(0, 0, depth),
    ]
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [width, height, depth])

  return (
    <group position={position} rotation={rotation}>
      {/* Left Post */}
      <mesh
        geometry={postGeometry}
        material={material}
        position={[-width / 2, height / 2, 0]}
      />

      {/* Right Post */}
      <mesh
        geometry={postGeometry}
        material={material}
        position={[width / 2, height / 2, 0]}
      />

      {/* Crossbar */}
      <mesh
        geometry={crossbarGeometry}
        material={material}
        position={[0, height, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />

      {/* Top Left Depth Strut */}
      <mesh
        geometry={depthGeometry}
        material={material}
        position={[-width / 2, height, depth / 2]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      {/* Top Right Depth Strut */}
      <mesh
        geometry={depthGeometry}
        material={material}
        position={[width / 2, height, depth / 2]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      {/* Bottom Left Ground Strut */}
      <mesh
        geometry={depthGeometry}
        material={material}
        position={[-width / 2, 0, depth / 2]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      {/* Bottom Right Ground Strut */}
      <mesh
        geometry={depthGeometry}
        material={material}
        position={[width / 2, 0, depth / 2]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      {/* Net Wireframe Outline */}
      <lineSegments geometry={netLinesGeometry} material={netLineMaterial} />
    </group>
  )
}
