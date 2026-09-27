import { useState, useEffect } from "react"
import { Monitor } from "lucide-react"

export function CRTOverlay() {
  const [crtEnabled, setCrtEnabled] = useState(true)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    setCrtEnabled(!media.matches)

    const handler = (e: MediaQueryListEvent) => {
      setCrtEnabled(!e.matches)
    }
    media.addEventListener("change", handler)
    return () => media.removeEventListener("change", handler)
  }, [])

  if (!crtEnabled) return null

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50 select-none overflow-hidden"
    >
      {/* Crisp 4px Scanlines */}
      <div className="absolute inset-0 crt-scanlines opacity-40 mix-blend-overlay" />

      {/* Screen Edge Vignette */}
      <div className="absolute inset-0 crt-vignette opacity-50" />
    </div>
  )
}
