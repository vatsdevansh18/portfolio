import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import Lenis from "lenis"
import { gsap, ScrollTrigger } from "@/lib/gsap"

interface PrimaryScrollContextType {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>
  lenis: Lenis | null
  scrollTo: (
    target: number | HTMLElement | string,
    options?: {
      offset?: number
      immediate?: boolean
      duration?: number
    }
  ) => void
  isReducedMotion: boolean
  isHomePage: boolean
}

const PrimaryScrollContext = createContext<PrimaryScrollContextType>({
  scrollContainerRef: { current: null },
  lenis: null,
  scrollTo: () => {},
  isReducedMotion: false,
  isHomePage: true,
})

export const usePrimaryScroll = () => useContext(PrimaryScrollContext)

interface PrimaryScrollProviderProps {
  children: React.ReactNode
}

export function PrimaryScrollProvider({ children }: PrimaryScrollProviderProps) {
  const location = useLocation()
  const isHomePage = location.pathname === "/"
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setIsReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  // Initialize or re-target Lenis and GSAP ScrollTrigger when route changes
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Always reset scroll to top on route change
    container.scrollTop = 0

    // If on Home page, stop any scrolling and stand down
    if (isHomePage) {
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
        setLenisInstance(null)
      }
      return
    }

    // If reduced motion, use standard container scrolling without Lenis inertia
    if (isReducedMotion) {
      const handleScroll = () => ScrollTrigger.update()
      container.addEventListener("scroll", handleScroll, { passive: true })
      return () => container.removeEventListener("scroll", handleScroll)
    }

    // Initialize Lenis bound specifically to this primary scroll container
    const lenis = new Lenis({
      wrapper: container,
      content: container.firstElementChild as HTMLElement || container,
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis
    setLenisInstance(lenis)

    // Synchronize Lenis scroll events with GSAP ScrollTrigger
    const handleLenisScroll = () => {
      ScrollTrigger.update()
    }
    lenis.on("scroll", handleLenisScroll)

    // Drive Lenis RAF loop through GSAP ticker to prevent duplicate animation loops
    const handleTicker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(handleTicker)
    gsap.ticker.lagSmoothing(0)

    // Update ScrollTrigger defaults to use this primary scroll container as scroller
    ScrollTrigger.defaults({
      scroller: container,
    })

    // Refresh ScrollTrigger calculations after DOM settle
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)

    return () => {
      clearTimeout(refreshTimer)
      lenis.off("scroll", handleLenisScroll)
      gsap.ticker.remove(handleTicker)
      lenis.destroy()
      lenisRef.current = null
      setLenisInstance(null)
    }
  }, [location.pathname, isHomePage, isReducedMotion])

  const scrollTo = (
    target: number | HTMLElement | string,
    options?: {
      offset?: number
      immediate?: boolean
      duration?: number
    }
  ) => {
    const container = scrollContainerRef.current
    if (!container) return

    if (lenisRef.current && !isReducedMotion) {
      lenisRef.current.scrollTo(target, options)
    } else {
      if (typeof target === "number") {
        container.scrollTo({ top: target, behavior: "auto" })
      } else if (typeof target === "string") {
        const el = container.querySelector(target) as HTMLElement
        if (el) {
          el.scrollIntoView({ behavior: "auto" })
        }
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "auto" })
      }
    }
  }

  return (
    <PrimaryScrollContext.Provider
      value={{
        scrollContainerRef,
        lenis: lenisInstance,
        scrollTo,
        isReducedMotion,
        isHomePage,
      }}
    >
      {children}
    </PrimaryScrollContext.Provider>
  )
}
