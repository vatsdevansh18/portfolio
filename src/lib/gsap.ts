import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useLayoutEffect, useRef } from "react"

// Ensure GSAP plugins are registered in browser environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)

  // Configure high-precision defaults for tactical/architectural motion
  gsap.defaults({
    ease: "power3.out",
    duration: 0.9,
  })
}

// Universal safe layout effect (SSR/client resilient)
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

/**
 * Custom hook to execute GSAP animations inside an isolated gsap.context().
 * Automatically reverts all created timelines, tweens, and ScrollTriggers on unmount.
 * Prevents memory leaks, duplicate triggers, and stale DOM reference errors.
 */
export function useGSAPContext(
  animationCallback: (context: gsap.Context) => void,
  scopeRef?: React.RefObject<HTMLElement | null>,
  dependencies: unknown[] = []
) {
  const callbackRef = useRef(animationCallback)
  callbackRef.current = animationCallback

  useIsomorphicLayoutEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      // If reduced motion is requested, do not run motion timelines
      return
    }

    const scope = scopeRef?.current ?? undefined
    const ctx = gsap.context((self) => {
      callbackRef.current(self)
    }, scope)

    return () => {
      ctx.revert()
    }
  }, dependencies)
}

export { gsap, ScrollTrigger }
