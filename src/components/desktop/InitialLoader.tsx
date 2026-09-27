import { useState, useEffect } from "react"

interface InitialLoaderProps {
  onComplete: () => void
}

export function InitialLoader({ onComplete }: InitialLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState("INITIALIZING WORKSTATION...")

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      onComplete()
      return
    }

    const steps = [
      { p: 18, text: "CHECKING SYSTEM INTEGRITY..." },
      { p: 44, text: "MOUNTING /home/devansh/portfolio..." },
      { p: 76, text: "LOADING TACTICAL MODULES..." },
      { p: 95, text: "INITIALIZING SPATIAL DESKTOP..." },
      { p: 100, text: "SYSTEM READY." },
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].p)
        setStatusText(steps[currentStep].text)
        currentStep++
      } else {
        clearInterval(interval)
        setTimeout(onComplete, 220)
      }
    }, 180)

    return () => clearInterval(interval)
  }, [onComplete])

  // Generate ASCII progress bar
  const totalBars = 24
  const filledBars = Math.round((progress / 100) * totalBars)
  const barString = "█".repeat(filledBars) + "░".repeat(Math.max(0, totalBars - filledBars))

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-[#ededed] font-mono px-6 select-none"
    >
      <div className="w-full max-w-md space-y-4">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 text-xs text-[#8c8c8c]">
          <span className="text-[#ededed] font-semibold tracking-wider">&gt;_ BIOS // BOOT_SEQUENCE</span>
          <span className="inline-block h-3 w-1.5 bg-[#10b981] animate-pulse" />
        </div>

        {/* Status text */}
        <div className="text-xs sm:text-sm text-[#ededed] tracking-wide font-medium">
          {statusText}
        </div>

        {/* ASCII Progress Bar */}
        <div className="text-xs text-[#10b981] tracking-widest font-mono">
          [{barString}] {progress}%
        </div>

        {/* System metadata */}
        <div className="pt-4 border-t border-white/10 flex justify-between items-center text-[10px] text-[#525252]">
          <span>HOST: DEVANSH-PC</span>
          <span>ARCH: x86_64</span>
          <span>SECURE_BOOT: ENABLED</span>
        </div>
      </div>
    </div>
  )
}
