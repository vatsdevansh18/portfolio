import * as THREE from "three"
import { useRef, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider"

export function TacticalCamera() {
  const { camera } = useThree()
  const { lenis, isReducedMotion } = useSmoothScroll()
  const scrollRef = useRef(0)
  const currentPos = useRef(new THREE.Vector3(0, 18, 28))
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 2))

  useEffect(() => {
    if (lenis) {
      const handleScroll = (e: { progress: number; scroll: number }) => {
        // Compute normalized hero-to-about scroll factor (0 to 1 over first 800px)
        const factor = Math.min(1, Math.max(0, e.scroll / 850))
        scrollRef.current = factor
      }
      lenis.on("scroll", handleScroll)
      return () => {
        lenis.off("scroll", handleScroll)
      }
    } else {
      const handleNativeScroll = () => {
        const factor = Math.min(1, Math.max(0, window.scrollY / 850))
        scrollRef.current = factor
      }
      window.addEventListener("scroll", handleNativeScroll, { passive: true })
      return () => {
        window.removeEventListener("scroll", handleNativeScroll)
      }
    }
  }, [lenis])

  useFrame((state, delta) => {
    // If reduced motion is preferred, keep static camera framing
    if (isReducedMotion) {
      camera.position.set(0, 18, 28)
      camera.lookAt(0, 0, 2)
      return
    }

    const scrollFactor = scrollRef.current

    // Subtle pointer parallax (restrained, 1-2 degrees max)
    const pointerX = state.pointer.x * 1.8
    const pointerY = state.pointer.y * 1.2

    // Target Camera Position based on Scroll Transformation:
    // Scroll 0 (Hero): High architectural overview [0, 18, 28]
    // Scroll 1 (About/Code): Cinematic descent towards tactical player node [-2.5, 7.5, 14]
    const targetX = THREE.MathUtils.lerp(0, -3.5, scrollFactor) + pointerX
    const targetY = THREE.MathUtils.lerp(18, 7.5, scrollFactor) + pointerY
    const targetZ = THREE.MathUtils.lerp(28, 14.5, scrollFactor)

    // Target LookAt:
    // Scroll 0: Center of pitch [0, 0, 2]
    // Scroll 1: Focusing onto player node [1.2, 1.8, 5]
    const lookAtX = THREE.MathUtils.lerp(0, 1.2, scrollFactor)
    const lookAtY = THREE.MathUtils.lerp(0, 1.6, scrollFactor)
    const lookAtZ = THREE.MathUtils.lerp(2, 5.0, scrollFactor)

    // Smoothly interpolate with frame delta
    const lerpSpeed = Math.min(1, delta * 4)
    currentPos.current.lerp(new THREE.Vector3(targetX, targetY, targetZ), lerpSpeed)
    currentLookAt.current.lerp(new THREE.Vector3(lookAtX, lookAtY, lookAtZ), lerpSpeed)

    camera.position.copy(currentPos.current)
    camera.lookAt(currentLookAt.current)
  })

  return null
}
