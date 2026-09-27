import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [cursorState, setCursorState] = useState<"default" | "interactive" | "text">("default")
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    // Only enable on desktop pointer devices with fine control
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!isFinePointer || prefersReducedMotion) {
      setIsEnabled(false)
      return
    }

    setIsEnabled(true)

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Setup high-performance GSAP quickTo functions for 60/120fps interpolated cursor tracking
    const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" })
    const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" })
    const xRing = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power3.out" })
    const yRing = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power3.out" })

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      if (target.closest("a, button, [role='button'], [data-cursor='interactive']")) {
        setCursorState("interactive")
      } else if (target.closest("input, textarea, [contenteditable='true']")) {
        setCursorState("text")
      } else {
        setCursorState("default")
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mouseover", handleMouseOver, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [isVisible])

  if (!isEnabled) return null

  return (
    <div 
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 rounded-full transition-[width,height,background-color] duration-200 ${
          cursorState === "interactive"
            ? "h-2 w-2 bg-[#10b981]"
            : cursorState === "text"
            ? "h-3 w-0.5 bg-white/70"
            : "h-2 w-2 bg-white"
        }`}
      />

      {/* Tactical Outer Crosshair Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border transition-[width,height,transform,border-color,background-color] duration-300 ease-out flex items-center justify-center ${
          cursorState === "interactive"
            ? "-ml-5 -mt-5 h-10 w-10 border-[#10b981]/60 bg-[#10b981]/5"
            : cursorState === "text"
            ? "-ml-2 -mt-3 h-6 w-4 border-white/20 bg-transparent"
            : "-ml-3.5 -mt-3.5 h-7 w-7 border-white/20 bg-transparent"
        }`}
      >
        {cursorState === "interactive" && (
          <div className="absolute font-mono text-[8px] text-[#10b981] select-none scale-75">
            +
          </div>
        )}
      </div>
    </div>
  )
}
