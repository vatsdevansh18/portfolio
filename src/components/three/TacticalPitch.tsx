import * as THREE from "three"
import { useMemo } from "react"
import { TacticalGoal } from "@/components/three/TacticalGoal"

interface TacticalPitchProps {
  scrollProgress?: number
}

export function TacticalPitch({ scrollProgress = 0 }: TacticalPitchProps) {
  const pitchWidth = 26
  const pitchLength = 44
  const halfWidth = pitchWidth / 2
  const halfLength = pitchLength / 2

  // Pitch line geometries
  const {
    outerBoundaryGeo,
    halfwayLineGeo,
    centerCircleGeo,
    penaltyBoxNorthGeo,
    penaltyBoxSouthGeo,
    goalAreaNorthGeo,
    goalAreaSouthGeo,
    tacticalZonesGeo,
  } = useMemo(() => {
    // 1. Outer Boundary
    const outerPoints = [
      new THREE.Vector3(-halfWidth, 0.01, -halfLength),
      new THREE.Vector3(halfWidth, 0.01, -halfLength),
      new THREE.Vector3(halfWidth, 0.01, halfLength),
      new THREE.Vector3(-halfWidth, 0.01, halfLength),
      new THREE.Vector3(-halfWidth, 0.01, -halfLength),
    ]

    // 2. Halfway Line
    const halfwayPoints = [
      new THREE.Vector3(-halfWidth, 0.01, 0),
      new THREE.Vector3(halfWidth, 0.01, 0),
    ]

    // 3. Center Circle (radius 4.2)
    const circlePoints: THREE.Vector3[] = []
    const circleSegments = 48
    const radius = 4.2
    for (let i = 0; i <= circleSegments; i++) {
      const theta = (i / circleSegments) * Math.PI * 2
      circlePoints.push(
        new THREE.Vector3(Math.cos(theta) * radius, 0.01, Math.sin(theta) * radius)
      )
    }

    // 4. North Penalty Box (width 14, depth 6.8)
    const pBoxWidth = 7
    const pBoxDepth = 6.8
    const northPBoxPoints = [
      new THREE.Vector3(-pBoxWidth, 0.01, -halfLength),
      new THREE.Vector3(-pBoxWidth, 0.01, -halfLength + pBoxDepth),
      new THREE.Vector3(pBoxWidth, 0.01, -halfLength + pBoxDepth),
      new THREE.Vector3(pBoxWidth, 0.01, -halfLength),
    ]

    // 5. South Penalty Box
    const southPBoxPoints = [
      new THREE.Vector3(-pBoxWidth, 0.01, halfLength),
      new THREE.Vector3(-pBoxWidth, 0.01, halfLength - pBoxDepth),
      new THREE.Vector3(pBoxWidth, 0.01, halfLength - pBoxDepth),
      new THREE.Vector3(pBoxWidth, 0.01, halfLength),
    ]

    // 6. North Goal Area (width 7, depth 2.4)
    const gAreaWidth = 3.5
    const gAreaDepth = 2.4
    const northGAreaPoints = [
      new THREE.Vector3(-gAreaWidth, 0.01, -halfLength),
      new THREE.Vector3(-gAreaWidth, 0.01, -halfLength + gAreaDepth),
      new THREE.Vector3(gAreaWidth, 0.01, -halfLength + gAreaDepth),
      new THREE.Vector3(gAreaWidth, 0.01, -halfLength),
    ]

    // 7. South Goal Area
    const southGAreaPoints = [
      new THREE.Vector3(-gAreaWidth, 0.01, halfLength),
      new THREE.Vector3(-gAreaWidth, 0.01, halfLength - gAreaDepth),
      new THREE.Vector3(gAreaWidth, 0.01, halfLength - gAreaDepth),
      new THREE.Vector3(gAreaWidth, 0.01, halfLength),
    ]

    // 8. Tactical 5-Channel Grid Lines (Half spaces and central channel)
    const tacticalPoints: THREE.Vector3[] = [
      // Left half-space line
      new THREE.Vector3(-pBoxWidth * 0.6, 0.008, -halfLength),
      new THREE.Vector3(-pBoxWidth * 0.6, 0.008, halfLength),
      // Right half-space line
      new THREE.Vector3(pBoxWidth * 0.6, 0.008, -halfLength),
      new THREE.Vector3(pBoxWidth * 0.6, 0.008, halfLength),
      // Wide flank channels
      new THREE.Vector3(-halfWidth * 0.72, 0.008, -halfLength),
      new THREE.Vector3(-halfWidth * 0.72, 0.008, halfLength),
      new THREE.Vector3(halfWidth * 0.72, 0.008, -halfLength),
      new THREE.Vector3(halfWidth * 0.72, 0.008, halfLength),
    ]

    return {
      outerBoundaryGeo: new THREE.BufferGeometry().setFromPoints(outerPoints),
      halfwayLineGeo: new THREE.BufferGeometry().setFromPoints(halfwayPoints),
      centerCircleGeo: new THREE.BufferGeometry().setFromPoints(circlePoints),
      penaltyBoxNorthGeo: new THREE.BufferGeometry().setFromPoints(northPBoxPoints),
      penaltyBoxSouthGeo: new THREE.BufferGeometry().setFromPoints(southPBoxPoints),
      goalAreaNorthGeo: new THREE.BufferGeometry().setFromPoints(northGAreaPoints),
      goalAreaSouthGeo: new THREE.BufferGeometry().setFromPoints(southGAreaPoints),
      tacticalZonesGeo: new THREE.BufferGeometry().setFromPoints(tacticalPoints),
    }
  }, [halfWidth, halfLength])

  // Pitch line materials (restrained white / hairline)
  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.35,
      linewidth: 1,
    })
  }, [])

  const tacticalLineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: "#10b981",
      transparent: true,
      opacity: 0.14,
      linewidth: 1,
    })
  }, [])

  return (
    <group position={[0, -0.2, 0]}>
      {/* 3D Physical Pitch Plinth Surface */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[pitchWidth + 4, 0.2, pitchLength + 4]} />
        <meshStandardMaterial
          color="#090909"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Subtle Pitch Plinth Hairline Border */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(pitchWidth + 4, 0.2, pitchLength + 4)]} />
        <lineBasicMaterial color="#ffffff" transparent opacity={0.08} />
      </lineSegments>

      {/* Center Spot */}
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.2, 16]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>

      {/* Pitch Lines */}
      <lineLoop geometry={outerBoundaryGeo} material={lineMaterial} />
      <lineSegments geometry={halfwayLineGeo} material={lineMaterial} />
      <lineLoop geometry={centerCircleGeo} material={lineMaterial} />
      <lineLoop geometry={penaltyBoxNorthGeo} material={lineMaterial} />
      <lineLoop geometry={penaltyBoxSouthGeo} material={lineMaterial} />
      <lineLoop geometry={goalAreaNorthGeo} material={lineMaterial} />
      <lineLoop geometry={goalAreaSouthGeo} material={lineMaterial} />

      {/* Tactical 5-Channel Division Lines */}
      <lineSegments geometry={tacticalZonesGeo} material={tacticalLineMaterial} />

      {/* Goal Posts */}
      <TacticalGoal position={[0, 0, -halfLength]} />
      <TacticalGoal position={[0, 0, halfLength]} rotation={[0, Math.PI, 0]} />
    </group>
  )
}
