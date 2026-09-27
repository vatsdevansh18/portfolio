import { useState } from "react"
import { Terminal, Calendar, MapPin, CheckCircle2, Award, Briefcase, Shield, Cpu } from "lucide-react"
import { RetroPanel } from "@/components/retro/RetroPanel"
import { SystemReadout } from "@/components/retro/SystemReadout"
import { TerminalLabel } from "@/components/retro/TerminalLabel"

type ExperienceCategory = "ALL" | "ACADEMIC" | "LEADERSHIP & ATHLETICS" | "ENGINEERING"

interface TimelineRecord {
  period: string
  title: string
  entity: string
  location: string
  details: string[]
  badge: "ACADEMIC" | "LEADERSHIP & ATHLETICS" | "ENGINEERING"
  stats?: string
}

const TIMELINE_RECORDS: TimelineRecord[] = [
  {
    period: "2024 — 2027",
    title: "Bachelor of Computer Applications (BCA)",
    entity: "Christ University Delhi NCR",
    location: "Delhi NCR, India",
    details: [
      "Currently in 2nd Year, focusing on software engineering, object-oriented design, algorithms, and systems architectures.",
      "Developing high-fidelity web experiences using React, TypeScript, and modern 3D graphics (Three.js / WebGL).",
      "Maintaining high academic standards while balancing rigorous varsity athletic commitments.",
    ],
    badge: "ACADEMIC",
    stats: "2nd Year // Distinction Track",
  },
  {
    period: "2024 — PRESENT",
    title: "Vice Captain & Central Midfielder (#8)",
    entity: "Christ University Varsity Football Team",
    location: "Inter-University Circuit",
    details: [
      "Appointed Vice Captain of the university football squad.",
      "Lead team tactical briefings, midfield transition schemes, spatial compact setups, and matchday game plans.",
      "Represent Christ University across competitive inter-collegiate tournaments with 1,840+ match minutes logged.",
    ],
    badge: "LEADERSHIP & ATHLETICS",
    stats: "1,840+ Mins // 78.5% Win Rate",
  },
  {
    period: "COMPETITIVE CAMPAIGNS",
    title: "Academy & Club Footballer",
    entity: "OAFA & Northern United FC",
    location: "Regional & State Circuit",
    details: [
      "Trained at Ochsenhausen Asian Football Academy (OAFA) under European technical training doctrines.",
      "Competed with Northern United FC in rigorous competitive regional league matches.",
      "Specialized in central midfield distribution, spatial compactness, and high-intensity pressing triggers.",
    ],
    badge: "LEADERSHIP & ATHLETICS",
    stats: "European Technical Syllabus",
  },
  {
    period: "2024 — PRESENT",
    title: "Spatial WebGL & Systems Engineering",
    entity: "Independent Engineering & Open Source",
    location: "Global",
    details: [
      "Architected 3D spatial developer workstations with Three.js, React Three Fiber, and Tailwind CSS v4.",
      "Engineered automated attendance and roster management platforms for varsity athletic squads.",
      "Pioneering minimal, tactile, zero-bloat web development with single-scroll ownership.",
    ],
    badge: "ENGINEERING",
    stats: "Production Repositories Deployed",
  },
]

export function ExperiencePage() {
  const [filter, setFilter] = useState<ExperienceCategory>("ALL")

  const filteredRecords = TIMELINE_RECORDS.filter((r) => {
    if (filter === "ALL") return true
    return r.badge === filter
  })

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 animate-in fade-in duration-150 font-mono select-none">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-[#10b981]" />
          <span className="text-xs sm:text-sm font-bold text-white tracking-wider">
            LOGS // DEV://SYS/CHRONOLOGY/
          </span>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setFilter("ALL")}
            className={`px-2.5 py-1 rounded-xs border transition-colors cursor-pointer text-[11px] ${
              filter === "ALL"
                ? "border-[#10b981] bg-[#10b981]/15 text-white"
                : "border-white/10 bg-[#0a0a0a] text-[#8c8c8c] hover:text-white"
            }`}
          >
            [ALL {TIMELINE_RECORDS.length}]
          </button>
          <button
            type="button"
            onClick={() => setFilter("ACADEMIC")}
            className={`px-2.5 py-1 rounded-xs border transition-colors cursor-pointer text-[11px] ${
              filter === "ACADEMIC"
                ? "border-[#10b981] bg-[#10b981]/15 text-white"
                : "border-white/10 bg-[#0a0a0a] text-[#8c8c8c] hover:text-white"
            }`}
          >
            [ACADEMIC]
          </button>
          <button
            type="button"
            onClick={() => setFilter("LEADERSHIP & ATHLETICS")}
            className={`px-2.5 py-1 rounded-xs border transition-colors cursor-pointer text-[11px] ${
              filter === "LEADERSHIP & ATHLETICS"
                ? "border-[#10b981] bg-[#10b981]/15 text-white"
                : "border-white/10 bg-[#0a0a0a] text-[#8c8c8c] hover:text-white"
            }`}
          >
            [ATHLETICS & LEADERSHIP]
          </button>
          <button
            type="button"
            onClick={() => setFilter("ENGINEERING")}
            className={`px-2.5 py-1 rounded-xs border transition-colors cursor-pointer text-[11px] ${
              filter === "ENGINEERING"
                ? "border-[#10b981] bg-[#10b981]/15 text-white"
                : "border-white/10 bg-[#0a0a0a] text-[#8c8c8c] hover:text-white"
            }`}
          >
            [ENGINEERING]
          </button>
        </div>
      </div>

      {/* Timeline List (Flows naturally in primary scroll container) */}
      <div className="flex-1 mt-5 space-y-3.5">
        {filteredRecords.map((record, index) => (
          <div
            key={index}
            className="p-4 sm:p-5 rounded-xs retro-box space-y-2.5 hover:border-white/20 transition-all"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/6">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white">
                  {record.title}
                </h2>
                <div className="text-xs text-[#10b981] mt-0.5">
                  {record.entity}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <TerminalLabel variant={record.badge === "ACADEMIC" ? "muted" : record.badge === "LEADERSHIP & ATHLETICS" ? "green" : "amber"}>
                  {record.badge}
                </TerminalLabel>
                <span className="text-[10px] px-2 py-0.5 rounded-xs border border-white/10 bg-[#101010] text-[#a1a1aa]">
                  {record.period}
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-[#a1a1aa]">
              {record.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-[#10b981] mt-0.5">›</span>
                  <span className="leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>

            <div className="pt-2.5 border-t border-white/6 flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#71717a]">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-white/40" />
                <span>{record.location}</span>
              </div>
              {record.stats && (
                <div className="text-[#10b981]">
                  # {record.stats}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-white/8 shrink-0 flex items-center justify-between text-[10px] text-[#525252]">
        <span>RECORDS VERIFIED BY INSTITUTION & CLUB</span>
        <span>STATUS: AUDITED CHRONOLOGY</span>
      </div>
    </div>
  )
}
