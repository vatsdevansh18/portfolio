import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"

interface CinematicIntroProps {
  onComplete: () => void
  onError?: () => void
}

export function CinematicIntro({ onComplete, onError }: CinematicIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const completedRef = useRef(false)

  const triggerComplete = () => {
    if (completedRef.current) return
    completedRef.current = true

    // Quick crossfade to seamlessly hand over to React desktop interface
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.inOut",
        onComplete: () => {
          onComplete()
        },
      })
    } else {
      onComplete()
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Attempt playback with audio first; fallback to muted if blocked
    const startPlayback = async () => {
      try {
        video.muted = false
        await video.play()
        setHasStarted(true)
      } catch {
        // Fallback to muted playback
        try {
          video.muted = true
          await video.play()
          setHasStarted(true)
        } catch (err) {
          console.warn("Video playback failed, triggering fallback:", err)
          onError ? onError() : triggerComplete()
        }
      }
    }

    startPlayback()

    // Listen for Escape key to skip video
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        triggerComplete()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video) return

    // Hand off to the crisp HTML/React desktop at ~8.5s when the monitor zoom completes
    // and before the blurry video text persists
    if (video.currentTime >= 8.5) {
      triggerComplete()
    }
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] w-full h-full bg-[#050505] flex items-center justify-center overflow-hidden select-none"
    >
      <video
        ref={videoRef}
        src="/media/portfolio-intro.mp4"
        playsInline
        preload="auto"
        onEnded={triggerComplete}
        onTimeUpdate={handleTimeUpdate}
        onError={() => (onError ? onError() : triggerComplete())}
        className="w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Subtle Skip Prompt in Corner */}
      <button
        type="button"
        onClick={triggerComplete}
        aria-label="Skip intro video"
        className="absolute bottom-6 right-6 font-mono text-[10px] tracking-wider text-white/60 hover:text-white bg-black/60 hover:bg-black/90 border border-white/10 hover:border-white/20 px-3 py-1.5 rounded transition-all duration-200 cursor-pointer"
      >
        SKIP [ESC]
      </button>
    </div>
  )
}
