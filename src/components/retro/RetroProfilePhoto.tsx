import { useState, useEffect } from "react"
import { Terminal, Shield, Camera, Eye, HardDrive, CheckCircle2 } from "lucide-react"
import { StatusIndicator } from "@/components/retro/StatusIndicator"

export function RetroProfilePhoto() {
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [glitchTick, setGlitchTick] = useState(0)

  useEffect(() => {
    // Subtle initial CRT power-on reveal
    const timer = setTimeout(() => setMounted(true), 120)
    return () => clearTimeout(timer)
  }, [])

  // Very subtle deterministic coordinate / status variation on hover
  const handleMouseEnter = () => {
    setIsHovered(true)
    setGlitchTick((prev) => prev + 1)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`retro-box rounded-xs overflow-hidden transition-all duration-200 w-full max-w-[340px] lg:max-w-[360px] select-none ${
        mounted ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"
      } ${
        isHovered
          ? "border-[#10b981]/50 shadow-[0_0_20px_rgba(16,185,129,0.15)] -translate-y-0.5"
          : "border-white/12"
      }`}
    >
      {/* Title Bar */}
      <div className="retro-box-header px-3 py-1.5 flex items-center justify-between font-mono text-xs select-none">
        <div className="flex items-center gap-2 truncate">
          <Camera className="h-3.5 w-3.5 text-[#10b981]" />
          <span className="font-bold text-white tracking-wider text-[11px] truncate">
            IMAGE_VIEWER // DEVANSH.PIC
          </span>
        </div>

        {/* Window controls */}
        <div className="flex items-center gap-1 text-[#8c8c8c] shrink-0">
          <span className="w-3.5 h-3.5 border border-white/20 bg-black/40 flex items-center justify-center text-[8px]">_</span>
          <span className="w-3.5 h-3.5 border border-white/20 bg-black/40 flex items-center justify-center text-[8px]">■</span>
          <span className="w-3.5 h-3.5 border border-white/20 bg-black/40 flex items-center justify-center text-[8px] hover:text-[#f59e0b]">×</span>
        </div>
      </div>

      {/* Subheader / Mode line */}
      <div className="px-3 py-1 bg-[#040404] border-b border-white/6 flex items-center justify-between font-mono text-[9px] text-[#71717a]">
        <div className="flex items-center gap-1.5">
          <span className="text-[#10b981]">●</span>
          <span>DEV://MEDIA/PORTRAIT_RAW</span>
        </div>
        <span>24-BIT RGB // 640x800</span>
      </div>

      {/* Main Image Frame */}
      <div className="p-3 bg-[#030303] flex flex-col items-center">
        <div className="relative w-full aspect-[4/5] rounded-xs overflow-hidden border border-white/10 bg-radial from-[#121212] to-[#040404] flex items-center justify-center group">
          {/* Subtle Technical Corner Registration Markers */}
          <span className="absolute top-1 left-1.5 text-white/30 font-mono text-[9px] z-20 pointer-events-none select-none">┌</span>
          <span className="absolute top-1 right-1.5 text-white/30 font-mono text-[9px] z-20 pointer-events-none select-none">┐</span>
          <span className="absolute bottom-1 left-1.5 text-white/30 font-mono text-[9px] z-20 pointer-events-none select-none">└</span>
          <span className="absolute bottom-1 right-1.5 text-white/30 font-mono text-[9px] z-20 pointer-events-none select-none">┘</span>

          {/* Actual Personal Photo (Clear, High-Quality, Framed with Dignity) */}
          <img
            src="/media/devansh-portrait.png"
            alt="Devansh Vats — Software Developer & Christ University Football Vice Captain"
            loading="eager"
            className={`w-full h-full object-contain object-bottom filter contrast-[1.04] brightness-[0.98] transition-all duration-200 ${
              isHovered ? "scale-[1.01] brightness-[1.02]" : "scale-100"
            }`}
          />

          {/* Subtle CRT Scanline Texture Layer (Non-destructive, transparent, respects face clarity) */}
          <div className="absolute inset-0 crt-scanlines opacity-25 pointer-events-none mix-blend-overlay" />

          {/* Subtle Screen Vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_24px_rgba(0,0,0,0.7)] pointer-events-none" />

          {/* Bottom Overlay Label */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 py-1 bg-[#050505]/85 border border-white/10 backdrop-blur-xs font-mono text-[9px] text-[#ededed]">
            <span className="font-bold tracking-wider text-[#10b981]">OPERATOR: DEVANSH VATS</span>
            <span className="text-[#71717a]">ID: NCR-7731</span>
          </div>
        </div>

        {/* Technical Metadata Dossier */}
        <div className="w-full mt-2.5 pt-2 border-t border-white/6 font-mono text-[10px] space-y-1">
          <div className="flex items-center justify-between text-[#8c8c8c]">
            <span className="text-[#525252]">CALLSIGN</span>
            <span className="text-white font-semibold">Devansh Vats</span>
          </div>
          <div className="flex items-center justify-between text-[#8c8c8c]">
            <span className="text-[#525252]">OFFICE</span>
            <span className="text-[#10b981]">Vice Captain // Midfield #8</span>
          </div>
          <div className="flex items-center justify-between text-[#8c8c8c]">
            <span className="text-[#525252]">ACADEMICS</span>
            <span className="text-[#ededed]">BCA 2nd Yr @ Christ Univ</span>
          </div>
          <div className="flex items-center justify-between text-[#8c8c8c]">
            <span className="text-[#525252]">SYSTEM_STATUS</span>
            <span className="text-[#10b981] flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" />
              PORTRAIT_BUFFER_OK
            </span>
          </div>
        </div>
      </div>

      {/* Footer Status Line */}
      <div className="px-3 py-1 bg-[#080808] border-t border-white/6 flex items-center justify-between font-mono text-[9px] text-[#525252]">
        <span>ENCODING: PNG-24 RGBA</span>
        <span className="text-[#10b981]">READY_FOR_QUERY</span>
      </div>
    </div>
  )
}
