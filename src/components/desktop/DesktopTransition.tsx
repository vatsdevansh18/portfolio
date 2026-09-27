import { useState, useEffect } from "react"
import { IntroScreen } from "@/components/desktop/IntroScreen"
import { CinematicIntro } from "@/components/desktop/CinematicIntro"
import { DesktopShell } from "@/components/desktop/DesktopShell"
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider"

export type IntroStage = "ROOM" | "VIDEO" | "DESKTOP"

interface DesktopTransitionProps {
  onNavigateToSection: (href: string) => void
  activeSection?: string
}

export function DesktopTransition({
  onNavigateToSection,
  activeSection = "home",
}: DesktopTransitionProps) {
  const { isReducedMotion } = useSmoothScroll()
  const [stage, setStage] = useState<IntroStage>(() => {
    // If reduced motion is requested, start directly in Desktop
    if (typeof window !== "undefined") {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReduced) return "DESKTOP"
    }
    return "ROOM"
  })

  // Watch for reduced-motion updates
  useEffect(() => {
    if (isReducedMotion && stage !== "DESKTOP") {
      setStage("DESKTOP")
    }
  }, [isReducedMotion])

  const handleStartIntro = () => {
    if (isReducedMotion) {
      setStage("DESKTOP")
    } else {
      setStage("VIDEO")
    }
  }

  const handleVideoComplete = () => {
    setStage("DESKTOP")
  }

  const handleVideoError = () => {
    setStage("DESKTOP")
  }

  const handleReplayIntro = () => {
    setStage("ROOM")
  }

  return (
    <div id="desktop" className="relative w-full">
      {stage === "ROOM" && <IntroScreen onEnter={handleStartIntro} />}

      {stage === "VIDEO" && (
        <CinematicIntro
          onComplete={handleVideoComplete}
          onError={handleVideoError}
        />
      )}

      {stage === "DESKTOP" && (
        <DesktopShell
          onNavigateToSection={onNavigateToSection}
          onReplayIntro={handleReplayIntro}
          activeSection={activeSection}
        />
      )}
    </div>
  )
}
