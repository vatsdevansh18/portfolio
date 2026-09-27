import { Suspense, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { SceneLighting } from "@/components/three/SceneLighting"
import { TacticalPitch } from "@/components/three/TacticalPitch"
import { TacticalMarker } from "@/components/three/TacticalMarker"
import { SpatialCoordinates } from "@/components/three/SpatialCoordinates"
import { TacticalCamera } from "@/components/three/TacticalCamera"
import { SceneFallback } from "@/components/three/SceneFallback"
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider"

// Detect WebGL capability safely in browser
function detectWebGL() {
  if (typeof window === "undefined") return false
  try {
    const canvas = document.createElement("canvas")
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    )
  } catch {
    return false
  }
}

export function TacticalScene() {
  const { isReducedMotion } = useSmoothScroll()
  const [hasWebGL, setHasWebGL] = useState(true)

  useEffect(() => {
    setHasWebGL(detectWebGL())
  }, [])

  // If user prefers reduced motion or WebGL is unsupported, render high-precision fallback
  if (isReducedMotion || !hasWebGL) {
    return <SceneFallback />
  }

  return (
    <div 
      className="relative w-full h-full select-none overflow-hidden"
      aria-label="Interactive 3D Tactical Pitch Environment"
    >
      <Suspense fallback={<SceneFallback />}>
        <Canvas
          camera={{ position: [0, 18, 28], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          className="w-full h-full pointer-events-auto"
        >
          {/* Depth Fog to fade pitch gracefully into deep carbon background */}
          <fog attach="fog" args={["#070707", 22, 58]} />

          {/* Controlled Architectural Lighting */}
          <SceneLighting />

          {/* Controlled Cinematic Camera */}
          <TacticalCamera />

          {/* 3D Physical Football Pitch */}
          <TacticalPitch />

          {/* Devansh Vats Tactical Position Marker */}
          <TacticalMarker position={[1.2, 0, 5]} />

          {/* Spatial Pitch Coordinates */}
          <SpatialCoordinates />
        </Canvas>
      </Suspense>

      {/* Tactical Canvas Overlay Label */}
      <div className="absolute bottom-4 right-4 sm:right-8 font-mono text-[9px] text-[#525252] pointer-events-none select-none flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]/70" />
        <span>R3F SPATIAL TACTICAL VIEWPORT [FPS CAPPED 60/120]</span>
      </div>
    </div>
  )
}
