export function SceneLighting() {
  return (
    <>
      {/* Soft Ambient Light for Architectural Base */}
      <ambientLight intensity={0.45} color="#d4d4d8" />

      {/* Primary Key Light for Spatial Highlights */}
      <directionalLight
        position={[14, 25, 18]}
        intensity={1.2}
        color="#ffffff"
      />

      {/* Subtle Tactical Accent Light */}
      <directionalLight
        position={[-18, 12, -14]}
        intensity={0.4}
        color="#34d399"
      />

      {/* Subtle Point Light centered over the Tactical Node */}
      <pointLight
        position={[0, 4, 6]}
        intensity={1.5}
        distance={15}
        color="#10b981"
      />
    </>
  )
}
