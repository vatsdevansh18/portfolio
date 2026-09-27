import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Shield,
  Users,
  Calendar,
  Activity,
  Layers,
  Cpu,
  Database,
  WifiOff
} from "lucide-react"

export function FootballAttendanceExperience() {
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

  // Calculate current drill phase based on scroll progress
  const stage = scrollProgress < 0.33 ? 1 : scrollProgress < 0.66 ? 2 : 3

  return (
    <div className="relative w-full min-h-[350vh] text-[#ededed] font-mono select-none">
      {/* Sticky Background Data HUD */}
      <div className="sticky top-0 h-[calc(100dvh-2.75rem)] w-full pointer-events-none z-0 overflow-hidden flex flex-col justify-between p-4 sm:p-8 lg:p-12">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-white/10 bg-[#050505]/90 text-xs text-[#8c8c8c] hover:border-[#10b981]/50 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3 w-3 text-[#10b981]" />
            <span>[PROJECTS/]</span>
          </button>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xs border border-white/10 bg-[#050505]/90 text-xs text-[#10b981]">
            <Activity className="h-3 w-3" />
            <span>FOOTBALL_ATTENDANCE.SYS // VARSITY PLATFORM</span>
          </div>
        </div>

        {/* Tactical Animated Background Canvas / Visual Simulation */}
        <div className="my-auto max-w-xl mx-auto w-full p-5 sm:p-6 rounded-xs retro-box space-y-4">
          <div className="flex items-center justify-between text-xs border-b border-white/8 pb-2">
            <div className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5 text-[#10b981]" />
              <span className="text-white font-bold">VARSITY SQUAD ROSTER // ACTIVE DRILL</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-xs border border-[#10b981]/40 bg-[#10b981]/10 text-[#10b981]">
              STAGE 0{stage}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xs border border-white/6 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#71717a]">[08]</span>
                <span className="font-bold text-white">DEVANSH VATS</span>
                <span className="text-[10px] text-[#10b981]">(VICE CAPTAIN)</span>
              </div>
              <span className="text-[#10b981] text-[11px] font-mono">
                {stage === 1 ? "CHECKED-IN // WARMUP" : stage === 2 ? "MIDFIELD RONDO // PASSING" : "11v11 TACTICAL DRILL"}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xs border border-white/6 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#71717a]">[04]</span>
                <span className="text-[#d4d4d8]">CENTRE BACK GENERAL</span>
              </div>
              <span className="text-[#10b981] text-[11px] font-mono">
                {stage === 1 ? "CHECKED-IN" : stage === 2 ? "DEFENSIVE LINE DRILL" : "COMPACT BLOCK"}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xs border border-white/6 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#71717a]">[07]</span>
                <span className="text-[#d4d4d8]">RIGHT WING ATTACKER</span>
              </div>
              <span className="text-[#10b981] text-[11px] font-mono">
                {stage === 1 ? "CHECKED-IN" : stage === 2 ? "OVERLOAD TRANSITION" : "WIDE CHANNEL"}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/6 flex items-center justify-between text-[10px] text-[#71717a]">
            <span>OFFLINE SYNC: OPTIMISTIC BUFFER READY</span>
            <span>BATTERY DRAIN: &lt; 2% / HR</span>
          </div>
        </div>

        {/* Scroll Progress indicator */}
        <div className="flex items-center justify-between text-[10px] text-[#71717a] border-t border-white/8 pt-3">
          <span>DEVANSH VATS // CASE STUDY 02</span>
          <span className="text-[#10b981] font-bold">SCROLL PROGRESS: {Math.round(scrollProgress * 100)}%</span>
        </div>
      </div>

      {/* Floating Storytelling Milestones */}
      <div className="relative z-10 -mt-[calc(100dvh-2.75rem)] flex flex-col pointer-events-none">
        {/* Section 01 */}
        <section className="min-h-[100dvh] flex items-center px-6 sm:px-12 lg:px-20 py-16">
          <div className="max-w-xl p-6 sm:p-8 rounded-xs retro-box pointer-events-auto space-y-3">
            <div className="text-[10px] px-2 py-0.5 rounded-xs border border-[#10b981]/40 text-[#10b981] bg-[#10b981]/10 w-fit">
              STAGE 01 // PROBLEM STATEMENT
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Varsity Athletic Tracking System
            </h1>
            <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
              Managing 30+ collegiate football players across early morning training sessions, tactical lectures, and tournament travel previously relied on fragile paper sheets and disorganized group chats.
            </p>
            <p className="text-xs sm:text-sm text-[#d4d4d8] leading-relaxed">
              As Vice Captain, Devansh engineered <span className="text-[#10b981]">football_attendance.sys</span> to automate session check-ins, medical rehabilitation logs, and matchday squad readiness.
            </p>
          </div>
        </section>

        {/* Section 02 */}
        <section className="min-h-[100dvh] flex items-center justify-end px-6 sm:px-12 lg:px-20 py-16">
          <div className="max-w-xl p-6 sm:p-8 rounded-xs retro-box pointer-events-auto space-y-3">
            <div className="text-[10px] px-2 py-0.5 rounded-xs border border-[#10b981]/40 text-[#10b981] bg-[#10b981]/10 w-fit">
              STAGE 02 // ARCHITECTURE & OFFLINE RESILIENCE
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Pitchside Network Fault Tolerance
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
              Outdoor university athletic pitches frequently experience spotty 4G/5G signal. The platform uses optimistic state writes with automatic IndexedDB offline queues.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 rounded-xs border border-white/6 bg-[#040404]">
                <div className="text-white font-bold">Optimistic Updates</div>
                <div className="text-[10px] text-[#71717a] mt-0.5">0ms UI latency check-in</div>
              </div>
              <div className="p-2.5 rounded-xs border border-white/6 bg-[#040404]">
                <div className="text-white font-bold">Role-Based Auth</div>
                <div className="text-[10px] text-[#71717a] mt-0.5">Captain, Coach, Player tiers</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03 */}
        <section className="min-h-[100dvh] flex items-center justify-center px-6 sm:px-12 lg:px-20 py-16">
          <div className="max-w-xl w-full p-6 sm:p-8 rounded-xs retro-box pointer-events-auto space-y-4 text-center">
            <div className="text-[10px] px-2 py-0.5 rounded-xs border border-[#10b981]/40 text-[#10b981] bg-[#10b981]/10 w-fit mx-auto">
              STAGE 03 // DEPLOYMENT & METRICS
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Active Varsity Deployment
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
              Over 40 training drills logged, 100% data preservation during network drops, and immediate roster generation for coaching staff before match kickoffs.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <a
                href="https://github.com/vatsdevansh18"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xs border border-[#10b981] bg-[#10b981]/15 text-white text-xs font-bold hover:bg-[#10b981]/25 transition-colors"
              >
                <span>INSPECT SOURCE REPO</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
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
