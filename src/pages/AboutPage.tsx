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

type AboutTab = "identity" | "philosophy" | "telemetry" | "playbook" | "academics"

interface TelemetryMetric {
  label: string
  value: string
  subtext: string
  category: "ATHLETIC" | "ENGINEERING"
}

const TELEMETRY_METRICS: TelemetryMetric[] = [
  { label: "MATCH MINUTES LOGGED", value: "1,840+", subtext: "Varsity & Academy 2024-25", category: "ATHLETIC" },
  { label: "DISTANCE COVERED / MATCH", value: "10.4 KM", subtext: "Box-to-box midfield engine", category: "ATHLETIC" },
  { label: "PASSING ACCURACY", value: "88.2%", subtext: "Central third distribution", category: "ATHLETIC" },
  { label: "PRESSING RECOVERY RATE", value: "76.5%", subtext: "Defensive transition turnovers", category: "ATHLETIC" },
  { label: "PRODUCTION BUILD TIME", value: "560 MS", subtext: "Zero-bloat Vite pipeline", category: "ENGINEERING" },
  { label: "WEBGL FRAME TARGET", value: "60 FPS", subtext: "Clamped DPR & buffer geometry", category: "ENGINEERING" },
  { label: "LIGHTHOUSE CORE AUDIT", value: "100%", subtext: "Strict accessibility & best practices", category: "ENGINEERING" },
  { label: "TYPE COVERAGE RATIO", value: "100%", subtext: "Strict TypeScript compilation", category: "ENGINEERING" },
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
    pitchDetail: "Constantly checking over shoulder, assessing defensive gaps before receiving ball.",
    codeConcept: "Runtime Profiling & Tree-Shaking",
    codeDetail: "Analyzing bundle footprints and render bottlenecks before shipping code.",
  },
  {
    pitchConcept: "Spatial Compactness (4-3-3)",
    pitchDetail: "Maintaining strict distances between lines to choke off opposition half-spaces.",
    codeConcept: "Modular Component Architecture",
    codeDetail: "Strict separation of concerns, single-scroll ownership, and encapsulated states.",
  },
  {
    pitchConcept: "Box-to-Box Workrate",
    pitchDetail: "Sustained physical output and mental clarity across 90+ minutes plus extra time.",
    codeConcept: "Deterministic Resilience",
    codeDetail: "Error boundaries, optimistic UI updates, and zero layout thrashing under strain.",
  },
  {
    pitchConcept: "Passing Channels & Third-Man Runs",
    pitchDetail: "Executing geometric triangles to disorganize rigid defensive blocks.",
    codeConcept: "Deterministic Data Flow",
    codeDetail: "Unidirectional state, pure functional mutations, and type-safe event buses.",
  },
]

export function AboutPage() {
  const [activeTab, setActiveTab] = useState<AboutTab>("identity")
  const [selectedDiscipline, setSelectedDiscipline] = useState<number>(0)

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 animate-in fade-in duration-150 font-mono select-none">
      {/* File Inspector Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-[#10b981]" />
          <span className="text-xs sm:text-sm font-bold text-white tracking-wider">
            FILE_INSPECTOR // DEV://USER/DEVANSH/
          </span>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("identity")}
            className={`px-2.5 py-1 rounded-xs border transition-all cursor-pointer flex items-center gap-1.5 text-[11px] ${
              activeTab === "identity"
                ? "border-[#10b981] bg-[#10b981]/15 text-white shadow-[0_0_8px_rgba(16,185,129,0.2)]"
                : "border-white/10 bg-[#0a0a0a] text-[#8c8c8c] hover:text-white hover:border-white/20"
            }`}
          >
            <FileText className="h-3 w-3 text-[#10b981]" />
            <span>[identity.txt]</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("philosophy")}
            className={`px-2.5 py-1 rounded-xs border transition-all cursor-pointer flex items-center gap-1.5 text-[11px] ${
              activeTab === "philosophy"
                ? "border-[#10b981] bg-[#10b981]/15 text-white shadow-[0_0_8px_rgba(16,185,129,0.2)]"
                : "border-white/10 bg-[#0a0a0a] text-[#8c8c8c] hover:text-white hover:border-white/20"
            }`}
          >
            <Compass className="h-3 w-3 text-[#10b981]" />
            <span>[philosophy.md]</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("telemetry")}
            className={`px-2.5 py-1 rounded-xs border transition-all cursor-pointer flex items-center gap-1.5 text-[11px] ${
              activeTab === "telemetry"
                ? "border-[#10b981] bg-[#10b981]/15 text-white shadow-[0_0_8px_rgba(16,185,129,0.2)]"
                : "border-white/10 bg-[#0a0a0a] text-[#8c8c8c] hover:text-white hover:border-white/20"
            }`}
          >
            <Activity className="h-3 w-3 text-[#10b981]" />
            <span>[telemetry.dat]</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("playbook")}
            className={`px-2.5 py-1 rounded-xs border transition-all cursor-pointer flex items-center gap-1.5 text-[11px] ${
              activeTab === "playbook"
                ? "border-[#10b981] bg-[#10b981]/15 text-white shadow-[0_0_8px_rgba(16,185,129,0.2)]"
                : "border-white/10 bg-[#0a0a0a] text-[#8c8c8c] hover:text-white hover:border-white/20"
            }`}
          >
            <Shield className="h-3 w-3 text-[#10b981]" />
            <span>[playbook.cfg]</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("academics")}
            className={`px-2.5 py-1 rounded-xs border transition-all cursor-pointer flex items-center gap-1.5 text-[11px] ${
              activeTab === "academics"
                ? "border-[#10b981] bg-[#10b981]/15 text-white shadow-[0_0_8px_rgba(16,185,129,0.2)]"
                : "border-white/10 bg-[#0a0a0a] text-[#8c8c8c] hover:text-white hover:border-white/20"
            }`}
          >
            <Award className="h-3 w-3 text-[#10b981]" />
            <span>[academics.log]</span>
          </button>
        </div>
      </div>

      {/* Main File Content (Flows naturally in primary scroll container) */}
      <div className="flex-1 mt-5 text-xs sm:text-sm text-[#d4d4d8] leading-relaxed">
        {/* TAB 1: IDENTITY */}
        {activeTab === "identity" && (
          <div className="space-y-5 max-w-4xl">
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

        {/* TAB 4: PLAYBOOK */}
        {activeTab === "playbook" && (
          <div className="space-y-5 max-w-4xl">
            <div className="border-b border-white/6 pb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                TACTICAL PLAYBOOK // CORE SCHEMES & PROTOCOLS
              </span>
              <span className="text-[10px] text-[#71717a]">VERSION 2.4</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <RetroPanel title="SCHEME_01" subtitle="MIDFIELD TRANSITION" controls={false}>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  Upon winning second balls in the middle third, execute immediate forward progression or release into wide half-space channels before opposition re-compacts.
                </p>
                <div className="text-[10px] text-[#10b981] pt-2 border-t border-white/6 mt-2">
                  TRIGGER: Turnover in Zone 11/14
                </div>
              </RetroPanel>

              <RetroPanel title="SCHEME_02" subtitle="HALF-SPACE OVERLOAD" controls={false}>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  Combine with advancing full-back and inverted winger to create 3v2 numerical superiority in the right channel, forcing defender displacement.
                </p>
                <div className="text-[10px] text-[#10b981] pt-2 border-t border-white/6 mt-2">
                  TRIGGER: Low block containment
                </div>
              </RetroPanel>

              <RetroPanel title="SCHEME_03" subtitle="REST-DEFENSE PIVOT" controls={false}>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  Maintain central pivot cover at (1.2, 0.0, 5.0) while attacks unfold to extinguish immediate counter-attack channels before they reach the back four.
                </p>
                <div className="text-[10px] text-[#10b981] pt-2 border-t border-white/6 mt-2">
                  TRIGGER: Attacking phase possession
                </div>
              </RetroPanel>
            </div>
          </div>
        )}

        {/* TAB 5: ACADEMICS */}
        {activeTab === "academics" && (
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
