import { useEffect, useState } from "react"
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider"

export function ScrollProgress() {
  const { lenis } = useSmoothScroll()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (lenis) {
      const handleLenisScroll = (e: { progress: number }) => {
        setProgress(e.progress)
      }
      lenis.on("scroll", handleLenisScroll)
      return () => {
        lenis.off("scroll", handleLenisScroll)
      }
    } else {
      const handleNativeScroll = () => {
        const total = document.documentElement.scrollHeight - window.innerHeight
        if (total > 0) {
          setProgress(window.scrollY / total)
        }
      }
      window.addEventListener("scroll", handleNativeScroll, { passive: true })
      return () => {
        window.removeEventListener("scroll", handleNativeScroll)
      }
    }
  }, [lenis])

  return (
    <div 
      className="absolute bottom-0 left-0 right-0 h-[1.5px] w-full bg-white/5 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-white/30 via-[#10b981] to-[#10b981] transition-transform duration-75 ease-out origin-left will-change-transform"
        style={{
          transform: `scaleX(${progress})`,
        }}
      />
    </div>
  )
}
