import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Terminal,
  Shield,
  Trophy,
  Activity,
  Maximize2,
  X,
  Compass,
  Layers,
  ChevronRight,
  TrendingUp,
  Award
} from "lucide-react"
import { TacticalScene } from "@/components/three/TacticalScene"
import { RetroPanel } from "@/components/retro/RetroPanel"
import { SystemReadout } from "@/components/retro/SystemReadout"
import { TerminalLabel } from "@/components/retro/TerminalLabel"
import { StatusIndicator } from "@/components/retro/StatusIndicator"

type Formation = "4-3-3" | "4-2-3-1"

interface MatchRecord {
  id: string
  date: string
  tournament: string
  opponent: string
  score: string
  result: "WIN" | "DRAW"
  role: string
  minutes: number
  tacticalNote: string
}

const MATCH_RECORDS: MatchRecord[] = [
  {
    id: "M01",
    date: "OCT 2024",
    tournament: "North Zone Inter-University Championship",
    opponent: "Regional University XI",
    score: "3 — 1",
    result: "WIN",
    role: "Vice Captain // Central Midfield #8",
    minutes: 90,
    tacticalNote: "Controlled central progression, completed 47 passes, initiated second-goal transition through right half-space.",
  },
  {
    id: "M02",
    date: "NOV 2024",
    tournament: "Inter-Collegiate Invitational Cup",
    opponent: "Metropolitan Athletic College",
    score: "2 — 0",
    result: "WIN",
    role: "Vice Captain // Deep Pivot #6",
    minutes: 90,
    tacticalNote: "Maintained defensive compactness, broke up 6 counter-attacks, organized back-four rest defense.",
  },
  {
    id: "M03",
    date: "DEC 2024",
    tournament: "Delhi NCR University League Derby",
    opponent: "State Tech University",
    score: "1 — 1",
    result: "DRAW",
    role: "Vice Captain // Box-to-Box #8",
    minutes: 90,
    tacticalNote: "Heavy pressing intensity in middle third, assisted equalizer with penetrative through-ball.",
  },
]

export function FootballPage() {
  const navigate = useNavigate()
  const [showPitchModal, setShowPitchModal] = useState(false)
  const [formation, setFormation] = useState<Formation>("4-3-3")
  const [selectedPlayerNode, setSelectedPlayerNode] = useState<string>("devansh")

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 animate-in fade-in duration-150 font-mono select-none">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-[#10b981]" />
          <span className="text-xs sm:text-sm font-bold text-white tracking-wider">
            SPORTS_DATABASE // SIM://VARSITY/PITCH_TELEMETRY/
          </span>
        </div>

        {/* 3D Pitch Simulator Trigger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/projects/tactical-pitch")}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-xs border border-white/10 bg-[#080808] text-[#8c8c8c] text-xs hover:text-white transition-colors cursor-pointer"
          >
            <span>[3D CASE STUDY]</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPitchModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs border border-[#10b981]/50 bg-[#10b981]/15 text-white text-xs hover:bg-[#10b981]/25 transition-colors cursor-pointer shadow-[0_0_8px_rgba(16,185,129,0.2)]"
          >
            <Maximize2 className="h-3 w-3 text-[#10b981]" />
            <span>[3D PITCH SIMULATOR]</span>
          </button>
        </div>
      </div>

      {/* Main Dossier (Flows naturally in primary scroll container) */}
      <div className="flex-1 mt-5 space-y-5">
        {/* Leadership & Identity Card */}
        <RetroPanel
          title="VARSITY_ATHLETIC_PROFILE.dat"
          subtitle="CHRIST UNIVERSITY FOOTBALL SQUAD"
          statusText="ACTIVE VICE CAPTAIN"
        >
          <div className="space-y-2">
            <SystemReadout label="TEAM SQUAD" value="Christ University Varsity XI" status="highlight" />
            <SystemReadout label="OFFICIAL APPOINTMENT" value="Vice Captain" subtext="2024 — Present" status="highlight" />
            <SystemReadout label="TACTICAL POSITION" value="Central Midfield (#8) // Deep Pivot (#6)" />
            <SystemReadout label="COORDINATE NODE" value="[1.2, 0.0, 5.0] Zone 14" status="amber" />
            <SystemReadout label="PASS ACCURACY" value="88.2% (Central Third)" status="highlight" />
            <SystemReadout label="SQUAD WIN RATE" value="78.5% (Starting Lineup)" />
          </div>
        </RetroPanel>

        {/* INTERACTIVE 2D TACTICAL BOARD */}
        <div className="retro-box rounded-xs p-4 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/8 pb-3">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-[#10b981]" />
              <span className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider">
                INTERACTIVE TACTICAL BOARD // FORMATION SCHEMATIC
              </span>
            </div>

            {/* Formation Toggle */}
            <div className="flex items-center gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setFormation("4-3-3")}
                className={`px-2.5 py-1 rounded-xs border transition-colors cursor-pointer text-[11px] ${
                  formation === "4-3-3"
                    ? "border-[#10b981] bg-[#10b981]/20 text-white font-bold shadow-[0_0_8px_rgba(16,185,129,0.2)]"
                    : "border-white/10 bg-[#080808] text-[#8c8c8c] hover:text-white"
                }`}
              >
                [4-3-3 SINGLE PIVOT]
              </button>
              <button
                type="button"
                onClick={() => setFormation("4-2-3-1")}
                className={`px-2.5 py-1 rounded-xs border transition-colors cursor-pointer text-[11px] ${
                  formation === "4-2-3-1"
                    ? "border-[#10b981] bg-[#10b981]/20 text-white font-bold shadow-[0_0_8px_rgba(16,185,129,0.2)]"
                    : "border-white/10 bg-[#080808] text-[#8c8c8c] hover:text-white"
                }`}
              >
                [4-2-3-1 DOUBLE PIVOT]
              </button>
            </div>
          </div>

          {/* SVG Pitch Display */}
          <div className="relative w-full aspect-[2/1] max-h-72 rounded-xs border border-white/15 bg-[#031008] overflow-hidden flex items-center justify-center">
            {/* 5 Longitudinal Tactical Channels */}
            <div className="absolute inset-0 grid grid-cols-5 pointer-events-none">
              <div className="border-r border-white/[0.05] flex items-end justify-center pb-2 text-[9px] text-white/20">LEFT WING</div>
              <div className="border-r border-white/[0.05] bg-white/[0.02] flex items-end justify-center pb-2 text-[9px] text-[#10b981]/40">L-HALF-SPACE</div>
              <div className="border-r border-white/[0.05] flex items-end justify-center pb-2 text-[9px] text-white/20">CENTRAL</div>
              <div className="border-r border-white/[0.05] bg-white/[0.02] flex items-end justify-center pb-2 text-[9px] text-[#10b981]/40">R-HALF-SPACE</div>
              <div className="flex items-end justify-center pb-2 text-[9px] text-white/20">RIGHT WING</div>
            </div>

            {/* Pitch Markings */}
            <div className="absolute inset-3 border border-white/20 rounded-xs pointer-events-none">
              {/* Half-way line */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 border-r border-white/20" />
              {/* Center Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-white/20" />
              {/* Left Penalty Box */}
              <div className="absolute top-1/4 bottom-1/4 left-0 w-16 border-r border-y border-white/20" />
              {/* Right Penalty Box */}
              <div className="absolute top-1/4 bottom-1/4 right-0 w-16 border-l border-y border-white/20" />
            </div>

            {/* Interactive Player Nodes */}
            {/* Devansh Vats (Center Midfield Node) */}
            <button
              type="button"
              onClick={() => setSelectedPlayerNode("devansh")}
              className={`absolute left-[54%] top-[48%] -translate-x-1/2 -translate-y-1/2 z-10 px-2.5 py-1 rounded-xs border text-[10px] font-bold cursor-pointer transition-all ${
                selectedPlayerNode === "devansh"
                  ? "border-[#10b981] bg-[#10b981] text-black shadow-[0_0_14px_rgba(16,185,129,0.9)] scale-110"
                  : "border-[#10b981] bg-[#10b981]/30 text-white hover:bg-[#10b981]/50"
              }`}
            >
              #8 DEVANSH (VC)
            </button>

            {/* Pivot / Midfield Partner */}
            <button
              type="button"
              onClick={() => setSelectedPlayerNode("pivot")}
              className={`absolute z-10 px-2 py-0.5 rounded-xs border text-[9px] cursor-pointer transition-all ${
                formation === "4-3-3"
                  ? "left-[45%] top-[50%]"
                  : "left-[50%] top-[62%]"
              } -translate-x-1/2 -translate-y-1/2 ${
                selectedPlayerNode === "pivot"
                  ? "border-white bg-white text-black font-bold"
                  : "border-white/20 bg-black/70 text-[#a1a1aa] hover:border-white/40"
              }`}
            >
              #6 DEF PIVOT
            </button>

            {/* Attacking Midfielder / Winger */}
            <button
              type="button"
              onClick={() => setSelectedPlayerNode("attack")}
              className={`absolute z-10 px-2 py-0.5 rounded-xs border text-[9px] cursor-pointer transition-all ${
                formation === "4-3-3"
                  ? "left-[62%] top-[34%]"
                  : "left-[60%] top-[48%]"
              } -translate-x-1/2 -translate-y-1/2 ${
                selectedPlayerNode === "attack"
                  ? "border-white bg-white text-black font-bold"
                  : "border-white/20 bg-black/70 text-[#a1a1aa] hover:border-white/40"
              }`}
            >
              #10 ATTACK PIVOT
            </button>
          </div>

          {/* Node Tactical Instruction Details */}
          <div className="p-3.5 rounded-xs border border-white/8 bg-[#040404] text-xs space-y-1">
            <div className="text-[10px] text-[#71717a] uppercase tracking-wider flex items-center justify-between">
              <span>NODE TACTICAL BRIEFING // {selectedPlayerNode.toUpperCase()}</span>
              <span className="text-[#10b981]">COORDINATES LOGGED</span>
            </div>
            {selectedPlayerNode === "devansh" && (
              <p className="text-[#ededed] leading-relaxed pt-1">
                <span className="text-[#10b981] font-bold">DEVANSH VATS [1.2, 0.0, 5.0]:</span> Acts as the central tempo regulator and primary link between back-four defensive distribution and wide attacking channels. Responsible for second-ball recoveries, line-breaking passes, and leading vocal tactical adjustments across the pitch.
              </p>
            )}
            {selectedPlayerNode === "pivot" && (
              <p className="text-[#ededed] leading-relaxed pt-1">
                <span className="text-white font-bold">DEFENSIVE PIVOT [#6]:</span> Provides central rest-defense security directly ahead of the two centre-backs. Stays compact to eliminate opponent counter-attack corridors.
              </p>
            )}
            {selectedPlayerNode === "attack" && (
              <p className="text-[#ededed] leading-relaxed pt-1">
                <span className="text-white font-bold">ATTACKING PROGRESSION [#10]:</span> Floats between the opponent midfield and defensive lines in Zone 14, combining with Devansh on quick one-twos and through-balls.
              </p>
            )}
          </div>
        </div>

        {/* MATCHDAY TIMELINE & LOGS */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between border-b border-white/8 pb-2">
            <div className="flex items-center gap-1.5">
              <Trophy className="h-3.5 w-3.5 text-[#10b981]" />
              <span>VARSITY MATCHDAY CAMPAIGN LOGS</span>
            </div>
            <span className="text-[10px] text-[#71717a]">SEASON 2024-25 // VERIFIED AUDIT</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {MATCH_RECORDS.map((record) => (
              <div
                key={record.id}
                className="p-4 rounded-xs border border-white/8 bg-[#080808] space-y-2 hover:border-white/15 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{record.tournament}</span>
                    <span className="text-[#71717a]">vs. {record.opponent}</span>
                  </div>

                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-xs font-bold text-white px-2 py-0.5 rounded-xs bg-white/10">
                      {record.score}
                    </span>
                    <TerminalLabel variant={record.result === "WIN" ? "green" : "amber"}>
                      {record.result}
                    </TerminalLabel>
                  </div>
                </div>

                <div className="text-[11px] text-[#a1a1aa] leading-relaxed">
                  {record.tacticalNote}
                </div>

                <div className="pt-2 border-t border-white/6 flex items-center justify-between text-[10px] text-[#71717a]">
                  <span>{record.role}</span>
                  <span>{record.minutes} MINS PLAYED</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Club Career & Academies */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-white/8 pb-2">
            <Award className="h-3.5 w-3.5 text-[#10b981]" />
            <span>CLUB & ACADEMY AFFILIATIONS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 rounded-xs border border-white/8 bg-[#080808] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span>OAFA</span>
                <span className="text-[10px] text-[#71717a]">ACADEMY SQUAD</span>
              </div>
              <div className="text-xs text-[#a1a1aa]">
                Ochsenhausen Asian Football Academy
              </div>
              <p className="text-[11px] text-[#71717a] leading-relaxed pt-1">
                Rigorous European technical syllabus focusing on spatial geometry, first-touch efficiency, and high-intensity match simulation.
              </p>
            </div>

            <div className="p-4 rounded-xs border border-white/8 bg-[#080808] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span>NORTHERN UNITED FC</span>
                <span className="text-[10px] text-[#71717a]">COMPETITIVE CLUB</span>
              </div>
              <div className="text-xs text-[#a1a1aa]">
                Senior Competitive Football
              </div>
              <p className="text-[11px] text-[#71717a] leading-relaxed pt-1">
                Competitive regional league campaigns, tactical game management, and physical conditioning against seasoned opposition.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Pitch Modal Window */}
      {showPitchModal && (
        <div className="fixed inset-0 z-50 bg-[#000000]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-150">
          <div className="w-full max-w-5xl h-[85vh] rounded-xs border border-white/20 bg-[#030303] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Terminal Header */}
            <div className="h-10 border-b border-white/10 bg-[#080808] px-4 flex items-center justify-between font-mono text-xs shrink-0">
              <div className="flex items-center gap-2">
                <Activity className="h-3.5 w-3.5 text-[#10b981]" />
                <span className="text-white font-bold">TACTICAL_PITCH_3D.SIM // REAL-TIME WEBGL</span>
              </div>
              <button
                type="button"
                onClick={() => setShowPitchModal(false)}
                className="p-1 rounded-xs text-[#8c8c8c] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close 3D pitch simulator"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* 3D Pitch Canvas */}
            <div className="flex-1 w-full h-full relative">
              <TacticalScene />
              <div className="absolute bottom-3 left-3 bg-[#050505]/90 border border-white/10 px-2.5 py-1 rounded-xs font-mono text-[10px] text-[#a1a1aa] pointer-events-none">
                NODE: DEVANSH VATS [1.2, 0.0, 5.0]
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-3 border-t border-white/8 shrink-0 flex items-center justify-between text-[10px] text-[#525252]">
        <span>TEAM: CHRIST UNIVERSITY VARSITY</span>
        <span>STATUS: ACTIVE VICE CAPTAINCY</span>
      </div>
    </div>
  )
}
