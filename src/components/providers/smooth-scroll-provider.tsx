import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import Lenis from "lenis"
import { gsap, ScrollTrigger } from "@/lib/gsap"

interface SmoothScrollContextType {
  lenis: Lenis | null
  scrollTo: (
    target: string | number | HTMLElement,
    options?: {
      offset?: number
      immediate?: boolean
      duration?: number
      lock?: boolean
    }
  ) => void
  lockScroll: (locked: boolean) => void
  isReducedMotion: boolean
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
  lockScroll: () => {},
  isReducedMotion: false,
})

export const useSmoothScroll = () => useContext(SmoothScrollContext)

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const checkReducedMotion = () => {
      setIsReducedMotion(mediaQuery.matches)
    }

    checkReducedMotion()
    mediaQuery.addEventListener("change", checkReducedMotion)

    // If user prefers reduced motion, bypass Lenis inertia for standard accessible navigation
    if (mediaQuery.matches) {
      return () => {
        mediaQuery.removeEventListener("change", checkReducedMotion)
      }
    }

    // Initialize Lenis with precise inertia parameters
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis
    setLenisInstance(lenis)

    // Connect Lenis scroll updates to GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update()
    }
    lenis.on("scroll", handleScroll)

    // Drive Lenis RAF loop via GSAP ticker to eliminate duplicate frame loops
    const handleTicker = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(handleTicker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      mediaQuery.removeEventListener("change", checkReducedMotion)
      lenis.off("scroll", handleScroll)
      gsap.ticker.remove(handleTicker)
      lenis.destroy()
      lenisRef.current = null
      setLenisInstance(null)
    }
  }, [isReducedMotion])

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: {
      offset?: number
      immediate?: boolean
      duration?: number
      lock?: boolean
    }
  ) => {
    if (lenisRef.current && !isReducedMotion) {
      lenisRef.current.scrollTo(target, options)
    } else {
      // Fallback for reduced motion or unmounted Lenis
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "auto" })
      } else if (typeof target === "string") {
        const el = document.querySelector(target)
        if (el) {
          el.scrollIntoView({ behavior: "auto" })
        }
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "auto" })
      }
    }
  }

  const lockScroll = (locked: boolean) => {
    if (locked) {
      lenisRef.current?.stop()
      document.body.style.overflow = "hidden"
    } else {
      lenisRef.current?.start()
      document.body.style.overflow = ""
    }
  }

  return (
    <SmoothScrollContext.Provider
      value={{
        lenis: lenisInstance,
        scrollTo,
        lockScroll,
        isReducedMotion,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  )
}
