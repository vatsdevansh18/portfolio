import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Canvas } from "@react-three/fiber"
import { PortfolioWorkstationScene } from "@/components/immersive/PortfolioWorkstationScene"
import { ArrowLeft, ArrowUpRight, Terminal, Layers, ShieldCheck, Cpu, Code2, Globe } from "lucide-react"

export function PortfolioV3Experience() {
  const navigate = useNavigate()
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Listen to the scroll container in AppShell (#page-scroll-container)
  useEffect(() => {
    const scrollContainer = document.getElementById("page-scroll-container")
    if (!scrollContainer) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer
      const maxScroll = scrollHeight - clientHeight
      if (maxScroll > 0) {
        const p = Math.min(1, Math.max(0, scrollTop / maxScroll))
        setScrollProgress(p)
      }
    }

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true })
    return () => scrollContainer.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate current active milestone
  const stageIndex = Math.min(5, Math.max(1, Math.floor(scrollProgress * 5) + 1))

  return (
    <div ref={containerRef} className="relative w-full min-h-[500vh] text-[#ededed] font-mono select-none">
      {/* Sticky 3D WebGL Canvas Layer (Fixed to viewport) */}
      <div className="sticky top-0 h-[calc(100dvh-2.75rem)] w-full pointer-events-none z-0 overflow-hidden">
        <Canvas
          camera={{ position: [0, 2, 8], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[6, 10, 6]} intensity={1.4} />
          <pointLight position={[-6, -4, -4]} intensity={0.4} color="#10b981" />
          <PortfolioWorkstationScene progress={scrollProgress} />
        </Canvas>

        {/* Minimal Technical HUD Overlay (Pointer events enabled for controls) */}
        <div className="absolute top-4 left-4 sm:left-8 z-10 pointer-events-auto flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-white/10 bg-[#050505]/90 text-xs text-[#8c8c8c] hover:border-[#10b981]/50 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3 w-3 text-[#10b981]" />
            <span>[PROJECTS/]</span>
          </button>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xs border border-white/10 bg-[#050505]/90 text-xs text-[#10b981]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" />
            <span>PORTFOLIO_V3.APP // SCROLL-DRIVEN 3D CORE</span>
          </div>
        </div>

        {/* Right-edge Scroll Depth Scrubber */}
        <div className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-6 z-10 pointer-events-none flex flex-col items-end gap-2 text-[10px] text-[#71717a]">
          <div className="text-[#10b981] font-bold">
            STAGE 0{stageIndex}/05
          </div>
          <div className="w-1.5 h-32 rounded-xs bg-white/10 overflow-hidden relative">
            <div
              className="w-full bg-[#10b981] transition-all duration-75"
              style={{ height: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
          <div>{Math.round(scrollProgress * 100)}%</div>
        </div>
      </div>

      {/* Floating Scroll Storytelling Sections */}
      <div className="relative z-10 -mt-[calc(100dvh-2.75rem)] flex flex-col pointer-events-none">
        {/* Section 01: System Boot */}
        <section className="min-h-[100dvh] flex items-center px-6 sm:px-12 lg:px-20 py-16">
          <div className="max-w-xl p-6 sm:p-8 rounded-xs retro-box pointer-events-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-[10px] px-2 py-0.5 rounded-xs border border-[#10b981]/40 text-[#10b981] bg-[#10b981]/10">
              <span className="h-1 w-1 rounded-full bg-[#10b981]" />
              <span>SCENE 01 // SYSTEM INITIALIZATION</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              portfolio_v3.app
            </h1>
            <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
              A high-performance retro-spatial developer workstation. Engineered to replace generic infinite-scroll feeds with a strict, disciplined filesystem hierarchy and scroll-driven WebGL storytelling.
            </p>
            <div className="pt-2 text-[10px] text-[#71717a] flex items-center gap-2 border-t border-white/6">
              <span className="text-[#10b981]">↓</span>
              <span>SCROLL DOWN TO DIVE INTO ARCHITECTURE</span>
            </div>
          </div>
        </section>

        {/* Section 02: Architecture Layers */}
        <section className="min-h-[100dvh] flex items-center justify-end px-6 sm:px-12 lg:px-20 py-16">
          <div className="max-w-xl p-6 sm:p-8 rounded-xs retro-box pointer-events-auto space-y-4">
            <div className="inline-flex items-center gap-2 text-[10px] px-2 py-0.5 rounded-xs border border-[#10b981]/40 text-[#10b981] bg-[#10b981]/10">
              <Layers className="h-3 w-3" />
              <span>SCENE 02 // ARCHITECTURAL SEPARATION</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Deconstructed System Planes
            </h2>
            <div className="space-y-2 text-xs text-[#d4d4d8]">
              <div className="p-2.5 rounded-xs border border-white/6 bg-[#040404] flex justify-between items-center">
                <span>[01] USER INTERFACE</span>
                <span className="text-[#10b981]">Tailwind CSS v4 & Geist Typography</span>
              </div>
              <div className="p-2.5 rounded-xs border border-white/6 bg-[#040404] flex justify-between items-center">
                <span>[02] ROUTER & SHELL</span>
                <span className="text-[#10b981]">Client Routing & 100dvh AppShell</span>
              </div>
              <div className="p-2.5 rounded-xs border border-white/6 bg-[#040404] flex justify-between items-center">
                <span>[03] 3D GRAPHICS</span>
                <span className="text-[#10b981]">Three.js & React Three Fiber</span>
              </div>
              <div className="p-2.5 rounded-xs border border-white/6 bg-[#040404] flex justify-between items-center">
                <span>[04] MOTION PIPELINE</span>
                <span className="text-[#10b981]">GSAP & Scroll-linked RAF</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Filesystem Interaction */}
        <section className="min-h-[100dvh] flex items-center px-6 sm:px-12 lg:px-20 py-16">
          <div className="max-w-xl p-6 sm:p-8 rounded-xs retro-box pointer-events-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-[10px] px-2 py-0.5 rounded-xs border border-[#10b981]/40 text-[#10b981] bg-[#10b981]/10">
              <Terminal className="h-3 w-3" />
              <span>SCENE 03 // 3-LEVEL DEPTH HIERARCHY</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Desktop → Directory → Deep File
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
              Directories maintain strict fixed viewport boundaries. Navigating into project files unpacks deep, scroll-driven interactive spaces without losing the persistent left navigation shell.
            </p>
            <div className="p-3 bg-[#030303] border border-white/6 rounded-xs text-[11px] text-[#71717a] space-y-1">
              <div>LEVEL 1: ROOT WORKSTATION (/)</div>
              <div>LEVEL 2: DIRECTORY SYSTEM (/projects, /skills)</div>
              <div>LEVEL 3: IMMERSIVE 3D EXPERIENCE (/projects/portfolio-v3)</div>
            </div>
          </div>
        </section>

        {/* Section 04: Technology Stack Nodes */}
        <section className="min-h-[100dvh] flex items-center justify-end px-6 sm:px-12 lg:px-20 py-16">
          <div className="max-w-xl p-6 sm:p-8 rounded-xs retro-box pointer-events-auto space-y-4">
            <div className="inline-flex items-center gap-2 text-[10px] px-2 py-0.5 rounded-xs border border-[#10b981]/40 text-[#10b981] bg-[#10b981]/10">
              <Cpu className="h-3 w-3" />
              <span>SCENE 04 // SPATIAL TECH STACK</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Zero Generic Bloat
            </h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xs border border-white/6 bg-[#040404]">
                <div className="font-bold text-white">React 19</div>
                <div className="text-[10px] text-[#71717a] mt-0.5">Concurrent rendering</div>
              </div>
              <div className="p-3 rounded-xs border border-white/6 bg-[#040404]">
                <div className="font-bold text-white">Three.js / R3F</div>
                <div className="text-[10px] text-[#71717a] mt-0.5">Procedural WebGL</div>
              </div>
              <div className="p-3 rounded-xs border border-white/6 bg-[#040404]">
                <div className="font-bold text-white">TypeScript</div>
                <div className="text-[10px] text-[#71717a] mt-0.5">Strict static safety</div>
              </div>
              <div className="p-3 rounded-xs border border-white/6 bg-[#040404]">
                <div className="font-bold text-white">Tailwind v4</div>
                <div className="text-[10px] text-[#71717a] mt-0.5">Hairline tokens</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Production & Source */}
        <section className="min-h-[100dvh] flex items-center justify-center px-6 sm:px-12 lg:px-20 py-16">
          <div className="max-w-xl w-full p-6 sm:p-8 rounded-xs retro-box pointer-events-auto space-y-4 text-center">
            <div className="inline-flex items-center gap-2 text-[10px] px-2 py-0.5 rounded-xs border border-[#10b981]/40 text-[#10b981] bg-[#10b981]/10">
              <ShieldCheck className="h-3 w-3" />
              <span>SCENE 05 // PRODUCTION READY</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Architecture Execution Complete
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
              0 TypeScript errors. 0 console warnings. Full prefers-reduced-motion accessibility compliance and responsive mobile drawer integration.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://github.com/vatsdevansh18"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xs border border-[#10b981] bg-[#10b981]/15 text-white text-xs font-bold hover:bg-[#10b981]/25 transition-colors"
              >
                <span>INSPECT GITHUB REPOSITORY</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>

              <button
                type="button"
                onClick={() => navigate("/projects")}
                className="px-4 py-2 rounded-xs border border-white/10 bg-[#080808] text-xs text-[#8c8c8c] hover:text-white transition-colors cursor-pointer"
              >
                RETURN TO DIRECTORY
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
