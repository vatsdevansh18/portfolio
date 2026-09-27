import { useEffect, useRef } from "react"

interface IntroScreenProps {
  onEnter: () => void
}

export function IntroScreen({ onEnter }: IntroScreenProps) {
  const triggeredRef = useRef(false)

  const handleTrigger = () => {
    if (triggeredRef.current) return
    triggeredRef.current = true
    onEnter()
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore modifier keys alone
      if (["Control", "Shift", "Alt", "Meta"].includes(e.key)) return
      handleTrigger()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleTrigger}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleTrigger()
        }
      }}
      aria-label="Click anywhere or press any key to enter portfolio"
      className="fixed inset-0 z-[100] w-full h-full bg-[#050505] cursor-pointer select-none overflow-hidden outline-none"
    >
      {/* High-Resolution Room Image (object-fit: cover) */}
      <img
        src="/media/landing-room.jpg"
        alt="Developer room workstation with desk, computer, and cat"
        className="w-full h-full object-cover object-center pointer-events-none"
        loading="eager"
      />

      {/* Subtle Retro Prompt at Bottom */}
      <div 
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 font-mono text-xs sm:text-sm text-white/90 bg-black/80 border border-white/20 px-6 py-2.5 rounded-full tracking-widest uppercase shadow-2xl backdrop-blur-xs flex items-center gap-2.5 transition-all duration-300 hover:scale-105 hover:border-white/40"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
        </span>
        <span className="font-semibold">PRESS ANY KEY / CLICK TO ENTER</span>
      </div>
    </div>
  )
}
