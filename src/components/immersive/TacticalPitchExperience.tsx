import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { TacticalScene } from "@/components/three/TacticalScene"
import { ArrowLeft, ArrowUpRight, Activity, Shield, Trophy, Compass, Layers } from "lucide-react"

export function TacticalPitchExperience() {
  const navigate = useNavigate()
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const scrollContainer = document.getElementById("page-scroll-container")
    if (!scrollContainer) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer
      const maxScroll = scrollHeight - clientHeight
      if (maxScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, scrollTop / maxScroll)))
      }
    }

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true })
    return () => scrollContainer.removeEventListener("scroll", handleScroll)
  }, [])

  const currentStage = Math.min(4, Math.max(1, Math.floor(scrollProgress * 4) + 1))

  const scrollToStage = (stage: number) => {
    const scrollContainer = document.getElementById("page-scroll-container")
    if (!scrollContainer) return
    const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight
    const target = ((stage - 1) / 3) * maxScroll
    scrollContainer.scrollTo({ top: target, behavior: "smooth" })
  }

  return (
    <div className="relative w-full min-h-[400vh] text-[#ededed] font-mono select-none">
      {/* Sticky 3D Tactical Pitch Layer */}
      <div className="sticky top-0 h-[calc(100dvh-2.75rem)] w-full pointer-events-auto z-0 overflow-hidden">
        <TacticalScene />

        {/* HUD Top Bar Overlay */}
        <div className="absolute top-4 left-4 sm:left-8 z-10 flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-white/10 bg-[#050505]/90 text-xs text-[#8c8c8c] hover:border-[#10b981]/50 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3 w-3 text-[#10b981]" />
            <span>[PROJECTS/]</span>
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xs border border-white/10 bg-[#050505]/90 text-xs text-[#10b981]">
            <Activity className="h-3 w-3" />
            <span className="hidden sm:inline">TACTICAL_PITCH_3D.SIM // REAL-TIME WEBGL</span>
            <span className="sm:hidden">PITCH 3D</span>
          </div>

          {/* Tactical Coordinates Live HUD */}
          <div className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-xs border border-white/10 bg-[#050505]/90 text-xs text-[#a1a1aa]">
            <Compass className="h-3 w-3 text-[#10b981]" />
            <span>NODE [1.2, 0.0, 5.0] // ZONE 14 PIVOT</span>
          </div>
        </div>

        {/* Scroll Progress & Stage Jumper */}
        <div className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-6 z-10 pointer-events-auto flex flex-col items-end gap-2 text-[10px] text-[#71717a]">
          <div className="text-[#10b981] font-bold">
            STAGE 0{currentStage}/04
          </div>

          <div className="flex flex-col gap-1 my-1">
            {[1, 2, 3, 4].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => scrollToStage(s)}
                className={`w-5 h-5 rounded-xs flex items-center justify-center border text-[9px] transition-colors cursor-pointer ${
                  currentStage === s
                    ? "border-[#10b981] bg-[#10b981]/20 text-[#10b981] font-bold shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                    : "border-white/10 bg-[#070707]/90 text-[#8c8c8c] hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="w-1.5 h-24 rounded-xs bg-white/10 overflow-hidden relative">
            <div
              className="w-full bg-[#10b981] transition-all duration-75"
              style={{ height: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
          <div>{Math.round(scrollProgress * 100)}%</div>
        </div>
      </div>

      {/* Floating Storytelling Milestones */}
      <div className="relative z-10 -mt-[calc(100dvh-2.75rem)] flex flex-col pointer-events-none">
        {/* Section 01 */}
        <section className="min-h-[100dvh] flex items-center px-6 sm:px-12 lg:px-20 py-16">
          <div className="max-w-xl p-6 sm:p-8 rounded-xs retro-box pointer-events-auto space-y-3">
            <div className="text-[10px] px-2 py-0.5 rounded-xs border border-[#10b981]/40 text-[#10b981] bg-[#10b981]/10 w-fit">
              STAGE 01 // OVERVIEW & COORDINATES
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Tactical Pitch 3D Engine
            </h1>
            <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
              A mathematical 3D simulation of a regulation 105m × 68m football pitch. Engineered with Three.js custom buffer geometry, hairline tactical markings, and a dynamic player coordinate node anchored at central midfield (1.2, 0.0, 5.0).
            </p>
          </div>
        </section>

        {/* Section 02 */}
        <section className="min-h-[100dvh] flex items-center justify-end px-6 sm:px-12 lg:px-20 py-16">
          <div className="max-w-xl p-6 sm:p-8 rounded-xs retro-box pointer-events-auto space-y-3">
            <div className="text-[10px] px-2 py-0.5 rounded-xs border border-[#10b981]/40 text-[#10b981] bg-[#10b981]/10 w-fit">
              STAGE 02 // SPATIAL CHANNELS & HALF-SPACES
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Five Longitudinal Tactical Channels
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
              Left Wing, Left Half-Space, Central Corridor, Right Half-Space, and Right Wing. In Devansh's tactical scheme, these guide player spacing, defensive rest-defense, and transition pressing.
            </p>
          </div>
        </section>

        {/* Section 03 */}
        <section className="min-h-[100dvh] flex items-center px-6 sm:px-12 lg:px-20 py-16">
          <div className="max-w-xl p-6 sm:p-8 rounded-xs retro-box pointer-events-auto space-y-3">
            <div className="text-[10px] px-2 py-0.5 rounded-xs border border-[#10b981]/40 text-[#10b981] bg-[#10b981]/10 w-fit">
              STAGE 03 // PERFORMANCE & MOBILE EFFICIENCY
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Precision 60 FPS WebGL
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
              Features clamped device pixel ratio [1, 1.5], linear depth fog to eliminate expensive postprocessing passes, and full automatic fallback to an accessible isometric tactical diagram under reduced-motion mode.
            </p>
          </div>
        </section>

        {/* Section 04 */}
        <section className="min-h-[100dvh] flex items-center justify-center px-6 sm:px-12 lg:px-20 py-16">
          <div className="max-w-xl w-full p-6 sm:p-8 rounded-xs retro-box pointer-events-auto space-y-4 text-center">
            <div className="text-[10px] px-2 py-0.5 rounded-xs border border-[#10b981]/40 text-[#10b981] bg-[#10b981]/10 w-fit mx-auto">
              STAGE 04 // VERIFICATION & INTEGRATION
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Simulation Complete
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
              Integrated natively with Devansh Vats' varsity football tactical records and match analysis.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/football")}
                className="px-4 py-2 rounded-xs border border-[#10b981] bg-[#10b981]/15 text-white text-xs font-bold hover:bg-[#10b981]/25 transition-colors cursor-pointer"
              >
                VIEW FOOTBALL DOSSIER
              </button>
              <button
                type="button"
                onClick={() => navigate("/projects")}
                className="px-4 py-2 rounded-xs border border-white/10 bg-[#080808] text-xs text-[#8c8c8c] hover:text-white transition-colors cursor-pointer"
              >
                RETURN TO PROJECTS
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
