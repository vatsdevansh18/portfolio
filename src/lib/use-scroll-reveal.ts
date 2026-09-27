import { useLayoutEffect, useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

export interface ScrollRevealOptions {
  yOffset?: number
  duration?: number
  stagger?: number
  start?: string
  ease?: string
  opacity?: number
}

/**
 * Reusable GSAP ScrollTrigger hook for smooth section and element reveals.
 * Automatically respects prefers-reduced-motion and reverts clean on unmount.
 */
export function useScrollReveal(
  targetSelectorOrRef: string | React.RefObject<HTMLElement | null>,
  options: ScrollRevealOptions = {}
) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReducedMotion) return

    const {
      yOffset = 24,
      duration = 0.8,
      stagger = 0.08,
      start = "top 88%",
      ease = "power3.out",
    } = options

    const ctx = gsap.context(() => {
      let targets: unknown

      if (typeof targetSelectorOrRef === "string") {
        targets = targetSelectorOrRef
      } else if (targetSelectorOrRef.current) {
        targets = targetSelectorOrRef.current
      }

      if (!targets) return

      gsap.fromTo(
        targets as gsap.TweenTarget,
        {
          y: yOffset,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease,
          scrollTrigger: {
            trigger: targets as gsap.DOMTarget,
            start,
            toggleActions: "play none none none",
            once: true,
          },
        }
      )
    }, containerRef)

    return () => {
      ctx.revert()
    }
  }, [options.yOffset, options.duration, options.stagger, options.start, options.ease])

  return containerRef
}
