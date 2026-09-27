import * as THREE from "three"
import { useMemo } from "react"

interface CoordinateAnchorProps {
  position: [number, number, number]
  label: string
}

function CoordinateCross({ position }: { position: [number, number, number] }) {
  const geometry = useMemo(() => {
    const s = 0.4
    const points = [
      new THREE.Vector3(-s, 0.02, 0),
      new THREE.Vector3(s, 0.02, 0),
      new THREE.Vector3(0, 0.02, -s),
      new THREE.Vector3(0, 0.02, s),
    ]
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [])

  return (
    <group position={position}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial color="#10b981" transparent opacity={0.6} />
      </lineSegments>
    </group>
  )
}

export function SpatialCoordinates() {
  return (
    <group>
      {/* 4 Corner Spatial Anchors */}
      <CoordinateCross position={[-13, 0, -22]} />
      <CoordinateCross position={[13, 0, -22]} />
      <CoordinateCross position={[-13, 0, 22]} />
      <CoordinateCross position={[13, 0, 22]} />

      {/* Midfield Spatial Anchors */}
      <CoordinateCross position={[-13, 0, 0]} />
      <CoordinateCross position={[13, 0, 0]} />
      <CoordinateCross position={[0, 0, 0]} />

      {/* Penalty Spot Coordinate Marks */}
      <CoordinateCross position={[0, 0, -17.5]} />
      <CoordinateCross position={[0, 0, 17.5]} />
    </group>
  )
}
