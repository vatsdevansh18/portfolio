import { useState } from "react"
import {
  Terminal,
  FileText,
  Award,
  Activity,
  Cpu,
  Shield,
  Zap,
  ChevronRight,
  TrendingUp,
  MapPin,
  Clock,
  Compass,
  HardDrive
} from "lucide-react"
import { RetroPanel } from "@/components/retro/RetroPanel"
import { SystemReadout } from "@/components/retro/SystemReadout"
import { StatusIndicator } from "@/components/retro/StatusIndicator"
import { TerminalLabel } from "@/components/retro/TerminalLabel"

type AboutTab = "profile" | "education" | "philosophy" | "metrics"

interface TelemetryMetric {
  label: string
  value: string
  subtext: string
  category: "ATHLETIC" | "ENGINEERING"
}

const TELEMETRY_METRICS: TelemetryMetric[] = [
  { label: "MATCH MINUTES LOGGED", value: "1,840+", subtext: "Varsity & Academy 2024-25", category: "ATHLETIC" },
  { label: "DISTANCE COVERED / MATCH", value: "10.4 KM", subtext: "Box-to-box midfield engine", category: "ATHLETIC" },
  { label: "PRODUCTION BUILD TIME", value: "560 MS", subtext: "Zero-bloat Vite pipeline", category: "ENGINEERING" },
  { label: "WEBGL FRAME TARGET", value: "60 FPS", subtext: "Clamped DPR & buffer geometry", category: "ENGINEERING" },
]

interface DualDiscipline {
  pitchConcept: string
  pitchDetail: string
  codeConcept: string
  codeDetail: string
}

const DUAL_DISCIPLINES: DualDiscipline[] = [
  {
    pitchConcept: "Midfield 360° Scanning",
    pitchDetail: "Constantly checking over shoulder, assessing gaps before receiving ball.",
    codeConcept: "Runtime Profiling & Tree-Shaking",
    codeDetail: "Analyzing bundle footprints and render bottlenecks before shipping.",
  },
  {
    pitchConcept: "Spatial Compactness",
    pitchDetail: "Maintaining strict distances between lines to choke off opposition.",
    codeConcept: "Modular Architecture",
    codeDetail: "Strict separation of concerns and encapsulated states.",
  },
]

export function AboutPage() {
  const [activeTab, setActiveTab] = useState<AboutTab>("profile")
  const [selectedDiscipline, setSelectedDiscipline] = useState<number>(0)

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 animate-in fade-in duration-150 font-mono select-none">
      {/* File Inspector Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-[#10b981]" />
          <span className="text-xs sm:text-sm font-bold text-white tracking-wider">
            DIRECTORY // ABOUT_ME/
          </span>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`px-3 py-1.5 rounded-xs border transition-all cursor-pointer flex items-center gap-2 text-[11px] font-bold ${
              activeTab === "profile"
                ? "border-[#10b981] bg-[#10b981]/15 text-white"
                : "border-white/10 bg-[#0a0a0a] text-[#8c8c8c] hover:text-white"
            }`}
          >
            <FileText className="h-3 w-3 text-[#10b981]" />
            <span>[profile.txt]</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("education")}
            className={`px-3 py-1.5 rounded-xs border transition-all cursor-pointer flex items-center gap-2 text-[11px] font-bold ${
              activeTab === "education"
                ? "border-[#10b981] bg-[#10b981]/15 text-white"
                : "border-white/10 bg-[#0a0a0a] text-[#8c8c8c] hover:text-white"
            }`}
          >
            <Award className="h-3 w-3 text-[#10b981]" />
            <span>[education.log]</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("philosophy")}
            className={`px-3 py-1.5 rounded-xs border transition-all cursor-pointer flex items-center gap-2 text-[11px] font-bold ${
              activeTab === "philosophy"
                ? "border-[#10b981] bg-[#10b981]/15 text-white"
                : "border-white/10 bg-[#0a0a0a] text-[#8c8c8c] hover:text-white"
            }`}
          >
            <Compass className="h-3 w-3 text-[#10b981]" />
            <span>[philosophy.md]</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("metrics")}
            className={`px-3 py-1.5 rounded-xs border transition-all cursor-pointer flex items-center gap-2 text-[11px] font-bold ${
              activeTab === "metrics"
                ? "border-[#10b981] bg-[#10b981]/15 text-white"
                : "border-white/10 bg-[#0a0a0a] text-[#8c8c8c] hover:text-white"
            }`}
          >
            <Activity className="h-3 w-3 text-[#10b981]" />
            <span>[metrics.dat]</span>
          </button>
        </div>
      </div>

      {/* Main File Content */}
      <div className="flex-1 mt-6 text-xs sm:text-sm text-[#d4d4d8] leading-relaxed">
        {/* TAB 1: PROFILE */}
        {activeTab === "profile" && (
          <div className="space-y-6 max-w-3xl">
            <RetroPanel
              title="USER_PROFILE.sys"
              subtitle="ATHLETE & ENGINEER DOSSIER"
              statusText="SECURITY: PUBLIC_UNLOCKED"
            >
              <div className="space-y-2.5">
                <SystemReadout label="OPERATOR IDENTIFIER" value="Devansh Vats" status="highlight" />
                <SystemReadout label="PRIMARY RESIDENCE" value="Delhi NCR, India (28.58° N, 77.31° E)" />
                <SystemReadout label="ACADEMIC INSTITUTION" value="Christ University Delhi NCR" />
                <SystemReadout label="ACADEMIC PROGRAM" value="Bachelor of Computer Applications (BCA)" subtext="2nd Year, 2024 — 2027" />
                <SystemReadout label="ATHLETIC OFFICE" value="Vice Captain & Central Midfield #8" status="highlight" subtext="Christ University Varsity" />
                <SystemReadout label="AFFILIATED CLUBS" value="OAFA, Northern United FC" subtext="Competitive Circuit" />
              </div>
            </RetroPanel>

            <div className="p-4 rounded-xs border border-white/8 bg-[#070707] space-y-3 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
              <p>
                <span className="text-[#10b981] font-bold">&gt;&gt;</span> Computer applications undergraduate and competitive collegiate footballer operating at the intersection of modern software systems and high-intensity athletics.
              </p>
              <p>
                My technical engineering concentrates on high-performance frontends, spatial WebGL graphics (Three.js and React Three Fiber), and disciplined TypeScript architectures. I approach code with the same tactical clarity, spatial foresight, and physical resilience required to command central midfield in competitive collegiate tournaments.
              </p>
            </div>

            {/* Quick Metrics Callout */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="p-3 rounded-xs border border-white/8 bg-[#080808]">
                <div className="text-[10px] text-[#71717a] uppercase">TACTICAL POSITION</div>
                <div className="font-bold text-white text-xs sm:text-sm mt-0.5">Central Midfield</div>
                <div className="text-[10px] text-[#10b981]">Spatial Node [1.2, 0, 5.0]</div>
              </div>
              <div className="p-3 rounded-xs border border-white/8 bg-[#080808]">
                <div className="text-[10px] text-[#71717a] uppercase">ENGINEERING CORE</div>
                <div className="font-bold text-white text-xs sm:text-sm mt-0.5">TypeScript & React</div>
                <div className="text-[10px] text-[#10b981]">Strict Determinism</div>
              </div>
              <div className="p-3 rounded-xs border border-white/8 bg-[#080808]">
                <div className="text-[10px] text-[#71717a] uppercase">SPATIAL GRAPHICS</div>
                <div className="font-bold text-white text-xs sm:text-sm mt-0.5">Three.js & WebGL</div>
                <div className="text-[10px] text-[#10b981]">60 FPS Pipeline</div>
              </div>
              <div className="p-3 rounded-xs border border-white/8 bg-[#080808]">
                <div className="text-[10px] text-[#71717a] uppercase">VARSITY APPOINTMENT</div>
                <div className="font-bold text-white text-xs sm:text-sm mt-0.5">Vice Captain</div>
                <div className="text-[10px] text-[#10b981]">Tactical Commander</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PHILOSOPHY */}
        {activeTab === "philosophy" && (
          <div className="space-y-5 max-w-4xl">
            <div className="border-l-2 border-[#10b981] pl-4 space-y-1">
              <div className="text-white font-bold text-base tracking-wide">
                TACTICAL DISCIPLINE × SPATIAL CODECRAFT
              </div>
              <div className="text-xs text-[#8c8c8c]">
                The Dual Discipline Engineering & Athletic Manifesto
              </div>
            </div>

            <div className="p-4 rounded-xs border border-white/8 bg-[#070707] space-y-3 text-xs sm:text-sm text-[#a1a1aa]">
              <p>
                In competitive football, central midfield is the engine room of spatial control. You cannot afford panic or superfluous motion. You scan constantly, read passing angles before the ball arrives, maintain defensive compactness, and distribute under pressure.
              </p>
              <p>
                In software engineering, this exact discipline defines clean architecture: modular components, predictable state machines, strict type bounds, and eliminating computational waste. Every visual interaction and architectural decision must serve an intentional purpose.
              </p>
            </div>

            {/* Interactive Dual-Discipline Comparison Matrix */}
            <div className="space-y-2.5 pt-1">
              <div className="text-[10px] text-[#71717a] uppercase tracking-wider flex items-center justify-between">
                <span>INTERACTIVE COMPARATIVE MATRIX // SELECT SCHEME</span>
                <span className="text-[#10b981]">CLICK TO INSPECT CORRELATION</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {DUAL_DISCIPLINES.map((d, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedDiscipline(index)}
                    className={`p-2.5 rounded-xs border text-left transition-all cursor-pointer font-mono ${
                      selectedDiscipline === index
                        ? "border-[#10b981] bg-[#10b981]/15 text-white shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                        : "border-white/8 bg-[#080808] text-[#8c8c8c] hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <div className="text-[10px] font-bold truncate">{d.pitchConcept}</div>
                    <div className="text-[9px] text-[#71717a] mt-0.5 truncate">
                      ↔ {d.codeConcept}
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Scheme Deep-Dive Card */}
              <div className="p-4 rounded-xs border border-white/10 bg-[#050505] grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="space-y-2 border-r-0 md:border-r border-white/6 pr-0 md:pr-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#10b981]">
                    <Shield className="h-3.5 w-3.5" />
                    <span>ON THE PITCH: {DUAL_DISCIPLINES[selectedDiscipline].pitchConcept}</span>
                  </div>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    {DUAL_DISCIPLINES[selectedDiscipline].pitchDetail}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#ededed]">
                    <Cpu className="h-3.5 w-3.5 text-[#10b981]" />
                    <span>IN THE CODEBASE: {DUAL_DISCIPLINES[selectedDiscipline].codeConcept}</span>
                  </div>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    {DUAL_DISCIPLINES[selectedDiscipline].codeDetail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TELEMETRY */}
        {activeTab === "telemetry" && (
          <div className="space-y-5 max-w-4xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/6">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                BENCHMARK METRICS // ATHLETIC & TECHNICAL TELEMETRY
              </span>
              <StatusIndicator status="active" label="AUDITED" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TELEMETRY_METRICS.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xs border border-white/8 bg-[#080808] hover:border-white/15 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#71717a] tracking-wider uppercase">
                      {metric.label}
                    </span>
                    <TerminalLabel variant={metric.category === "ATHLETIC" ? "green" : "amber"}>
                      {metric.category}
                    </TerminalLabel>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white mt-2 font-mono">
                    {metric.value}
                  </div>
                  <div className="text-[11px] text-[#8c8c8c] mt-1">
                    {metric.subtext}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: EDUCATION */}
        {activeTab === "education" && (
          <div className="space-y-4 max-w-3xl">
            <RetroPanel
              title="INSTITUTIONAL_RECORD.log"
              subtitle="CHRIST UNIVERSITY DELHI NCR"
              statusText="DEGREE CANDIDATE"
            >
              <div className="space-y-2">
                <SystemReadout label="PROGRAM OF STUDY" value="Bachelor of Computer Applications (BCA)" status="highlight" />
                <SystemReadout label="CURRENT STANDING" value="2nd Year (Semester IV)" subtext="2024 — 2027" />
                <SystemReadout label="CORE DISCIPLINES" value="Algorithms, WebGL, Data Structures, OOP Architecture" />
                <SystemReadout label="ATHLETIC OFFICE" value="Appointed University Football Vice Captain" status="highlight" />
                <SystemReadout label="PRACTICAL RESEARCH" value="3D Procedural WebGL & Minimalist Runtimes" />
              </div>
            </RetroPanel>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-white/8 shrink-0 flex items-center justify-between text-[10px] text-[#525252]">
        <span>READ_PERMISSION: GRANTED</span>
        <span>SECURITY_CLASSIFICATION: VERIFIED PUBLIC</span>
      </div>
    </div>
  )
}
