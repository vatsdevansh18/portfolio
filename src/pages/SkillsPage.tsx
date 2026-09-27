import { useState, useMemo } from "react"
import {
  Terminal,
  Folder,
  FileCode,
  CheckCircle2,
  Cpu,
  Search,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  HardDrive
} from "lucide-react"
import { RetroPanel } from "@/components/retro/RetroPanel"
import { SystemReadout } from "@/components/retro/SystemReadout"
import { TerminalLabel } from "@/components/retro/TerminalLabel"
import { StatusIndicator } from "@/components/retro/StatusIndicator"

interface SkillDetail {
  id: string
  name: string
  level: "CORE" | "ADVANCED" | "INTERMEDIATE"
  scope: string
  productionBenchmark: string
  projectUsage: string
  verificationSignature: string
}

interface SkillGroup {
  id: string
  directory: string
  category: string
  description: string
  skills: SkillDetail[]
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "frontend",
    directory: "01_FRONTEND/",
    category: "REACTIVE UI & TYPOGRAPHY",
    description: "Component hierarchies, deterministic state, and reactive UI architecture.",
    skills: [
      {
        id: "react",
        name: "React 19 & Next.js",
        level: "ADVANCED",
        scope: "Concurrent features, custom hooks, single-scroll ownership, server/client boundaries",
        productionBenchmark: "0 layout shifts (CLS: 0), sub-16ms render loop",
        projectUsage: "portfolio_v3.app, football_attendance.sys",
        verificationSignature: "VERIFIED_COMPLIANT // REACT_19_CORE",
      },
      {
        id: "typescript",
        name: "TypeScript 5.x",
        level: "CORE",
        scope: "Strict null checks, generics, discriminated unions, exhaustive type checking",
        productionBenchmark: "100% strict compilation, zero 'any' fallbacks",
        projectUsage: "All repositories and portfolio architecture",
        verificationSignature: "VERIFIED_COMPLIANT // STRICT_TS_SAFE",
      },
      {
        id: "tailwind",
        name: "Tailwind CSS v4",
        level: "CORE",
        scope: "Modern @theme tokens, hairline borders, CSS variables, zero-specificity conflicts",
        productionBenchmark: "Sub-10kB critical CSS payload, zero runtime style injection",
        projectUsage: "Retro folder desktop shell, tactical cards",
        verificationSignature: "VERIFIED_COMPLIANT // TW_V4_ENGINE",
      },
      {
        id: "a11y",
        name: "Semantic HTML & A11y",
        level: "CORE",
        scope: "ARIA roles, keyboard focus traps, screen-reader landmarks, WCAG AA contrast",
        productionBenchmark: "100% Lighthouse Accessibility score",
        projectUsage: "Full desktop shell and interactive components",
        verificationSignature: "VERIFIED_COMPLIANT // WCAG_AA_PASS",
      },
    ],
  },
  {
    id: "spatial_3d",
    directory: "02_3D_AND_SPATIAL/",
    category: "WEBGL & MATHEMATICAL GRAPHICS",
    description: "WebGL math, procedural 3D environments, camera math, and hardware-accelerated motion.",
    skills: [
      {
        id: "three",
        name: "Three.js R170",
        level: "ADVANCED",
        scope: "BufferGeometry, procedural tactical lines, custom mesh materials, linear fog",
        productionBenchmark: "60 FPS stable on mobile, clamped DPR [1, 1.5]",
        projectUsage: "tactical_pitch_3d.sim, portfolio-v3 workstation",
        verificationSignature: "VERIFIED_COMPLIANT // THREE_R170_STABLE",
      },
      {
        id: "r3f",
        name: "React Three Fiber & Drei",
        level: "ADVANCED",
        scope: "Declarative scene graph, frame hooks, canvas lifecycle, billboard sprites",
        productionBenchmark: "Zero memory leak on scene unmount, RAF sync",
        projectUsage: "portfolio_v3.app, tactical_pitch_3d.sim",
        verificationSignature: "VERIFIED_COMPLIANT // R3F_CANVAS_SYNC",
      },
      {
        id: "gsap",
        name: "GSAP 3 & Lenis",
        level: "CORE",
        scope: "ScrollTrigger scroller proxying, quickTo coordinate transforms, tick lag smoothing",
        productionBenchmark: "Zero jank scroll scrub, synchronized RAF loop",
        projectUsage: "PrimaryScrollProvider and 3D camera transitions",
        verificationSignature: "VERIFIED_COMPLIANT // GSAP_LENIS_SYNC",
      },
      {
        id: "spatial_math",
        name: "Spatial Coordinate Vectors",
        level: "CORE",
        scope: "Pitch coordinate mapping, vector projections, distance formulas, half-space grids",
        productionBenchmark: "Sub-millisecond matrix calculations",
        projectUsage: "Tactical pitch node tracking (1.2, 0.0, 5.0)",
        verificationSignature: "VERIFIED_COMPLIANT // SPATIAL_VEC_MATH",
      },
    ],
  },
  {
    id: "backend",
    directory: "03_BACKEND_AND_DATA/",
    category: "SERVER RUNTIMES & APIS",
    description: "Server runtimes, REST APIs, data structures, and database querying.",
    skills: [
      {
        id: "nodejs",
        name: "Node.js & Express",
        level: "INTERMEDIATE",
        scope: "RESTful endpoints, middleware, authentication guards, JSON schema validation",
        productionBenchmark: "< 50ms API response latency",
        projectUsage: "football_attendance.sys backend",
        verificationSignature: "VERIFIED_COMPLIANT // NODE_REST_ROUTER",
      },
      {
        id: "python",
        name: "Python 3",
        level: "INTERMEDIATE",
        scope: "Data structures, algorithms, tactical statistical parsing, automation scripts",
        productionBenchmark: "Clean modular scripts & algorithmic rigor",
        projectUsage: "Match analysis & academic coursework",
        verificationSignature: "VERIFIED_COMPLIANT // PY3_ALGO_STABLE",
      },
      {
        id: "databases",
        name: "Relational & Document DBs",
        level: "INTERMEDIATE",
        scope: "PostgreSQL, IndexedDB local caching, Firebase, schema design, relational indexes",
        productionBenchmark: "Optimistic updates with zero pitchside data loss",
        projectUsage: "Varsity athletic tracking storage",
        verificationSignature: "VERIFIED_COMPLIANT // DB_DATA_INTEGRITY",
      },
    ],
  },
  {
    id: "tools",
    directory: "04_SYSTEMS_AND_TOOLS/",
    category: "TOOLCHAINS & INFRASTRUCTURE",
    description: "Version control, build toolchains, terminal scripting, and developer workflows.",
    skills: [
      {
        id: "git",
        name: "Git & GitHub Workflows",
        level: "CORE",
        scope: "Atomic commits, semantic versioning, feature branches, pull request discipline",
        productionBenchmark: "Clean, documented linear commit history",
        projectUsage: "github.com/vatsdevansh18",
        verificationSignature: "VERIFIED_COMPLIANT // GIT_WORKFLOW_DISCIPLINE",
      },
      {
        id: "vite",
        name: "Vite 6 & Rollup",
        level: "CORE",
        scope: "Fast HMR, dynamic chunk splitting, tree-shaking, production optimization",
        productionBenchmark: "560ms production builds, sub-second HMR updates",
        projectUsage: "All frontend development tooling",
        verificationSignature: "VERIFIED_COMPLIANT // VITE_PIPELINE_FAST",
      },
      {
        id: "linux_cli",
        name: "Linux / Terminal CLI",
        level: "CORE",
        scope: "Bash scripting, SSH, process monitoring, system diagnostics, piping",
        productionBenchmark: "Keyboard-first development workflows",
        projectUsage: "Daily development & server deployment",
        verificationSignature: "VERIFIED_COMPLIANT // POSIX_SHELL_FLUENT",
      },
    ],
  },
]

export function SkillsPage() {
  const [selectedGroupId, setSelectedGroupId] = useState<string>("frontend")
  const [selectedSkillId, setSelectedSkillId] = useState<string>("react")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [viewMode, setViewMode] = useState<"DIRECTORY" | "DEPENDENCY_GRAPH">("DIRECTORY")

  const selectedGroup =
    SKILL_GROUPS.find((g) => g.id === selectedGroupId) || SKILL_GROUPS[0]

  // Flattened search for grep filter
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null
    const q = searchQuery.toLowerCase()
    const results: { group: SkillGroup; skill: SkillDetail }[] = []
    SKILL_GROUPS.forEach((g) => {
      g.skills.forEach((s) => {
        if (
          s.name.toLowerCase().includes(q) ||
          s.scope.toLowerCase().includes(q) ||
          s.level.toLowerCase().includes(q)
        ) {
          results.push({ group: g, skill: s })
        }
      })
    })
    return results
  }, [searchQuery])

  // Get currently selected skill object
  const currentSkill: SkillDetail = useMemo(() => {
    for (const group of SKILL_GROUPS) {
      const found = group.skills.find((s) => s.id === selectedSkillId)
      if (found) return found
    }
    return selectedGroup.skills[0]
  }, [selectedSkillId, selectedGroup])

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 animate-in fade-in duration-150 font-mono select-none">
      {/* Directory Title & View Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-[#10b981]" />
          <span className="text-xs sm:text-sm font-bold text-white tracking-wider">
            SYSTEM_DIAGNOSTICS // DEV://SYS/MODULES/
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setViewMode("DIRECTORY")}
            className={`px-2.5 py-1 rounded-xs border transition-colors cursor-pointer flex items-center gap-1.5 text-[11px] ${
              viewMode === "DIRECTORY"
                ? "border-[#10b981] bg-[#10b981]/15 text-white"
                : "border-white/10 bg-[#0a0a0a] text-[#8c8c8c] hover:text-white"
            }`}
          >
            <Folder className="h-3 w-3 text-[#10b981]" />
            <span>[MODULE DIRECTORY]</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("DEPENDENCY_GRAPH")}
            className={`px-2.5 py-1 rounded-xs border transition-colors cursor-pointer flex items-center gap-1.5 text-[11px] ${
              viewMode === "DEPENDENCY_GRAPH"
                ? "border-[#10b981] bg-[#10b981]/15 text-white"
                : "border-white/10 bg-[#0a0a0a] text-[#8c8c8c] hover:text-white"
            }`}
          >
            <Layers className="h-3 w-3 text-[#10b981]" />
            <span>[SYSTEM DEPENDENCY GRAPH]</span>
          </button>
        </div>
      </div>

      {/* Terminal Live Filter Bar */}
      <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-xs border border-white/10 bg-[#080808] text-xs">
        <Search className="h-3.5 w-3.5 text-[#10b981] shrink-0" />
        <span className="text-[#10b981] font-bold shrink-0">$ grep -i</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="filter modules (e.g., three, react, typescript, webgl)..."
          className="flex-1 bg-transparent text-white placeholder:text-[#525252] focus:outline-none text-xs"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="text-[10px] text-[#71717a] hover:text-white cursor-pointer"
          >
            [CLEAR]
          </button>
        )}
      </div>

      {/* VIEW MODE 1: DIRECTORY BROWSER */}
      {viewMode === "DIRECTORY" && (
        <div className="flex-1 flex flex-col md:flex-row gap-5 mt-4">
          {/* Left: Subdirectory folders (or Search Results) */}
          <div className="w-full md:w-64 lg:w-72 shrink-0 flex flex-col gap-2 pr-1">
            <div className="text-[10px] text-[#71717a] uppercase tracking-wider mb-1 flex justify-between">
              <span>{searchResults ? `MATCHED (${searchResults.length})` : "SUBDIRECTORIES"}</span>
              <span className="text-[#10b981]">DIR_TREE</span>
            </div>

            {searchResults ? (
              searchResults.length === 0 ? (
                <div className="p-3 text-xs text-[#71717a] border border-dashed border-white/10 rounded-xs">
                  No modules match '{searchQuery}'.
                </div>
              ) : (
                searchResults.map(({ group, skill }) => (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => {
                      setSelectedGroupId(group.id)
                      setSelectedSkillId(skill.id)
                    }}
                    className={`w-full text-left p-2.5 rounded-xs border transition-all cursor-pointer ${
                      selectedSkillId === skill.id
                        ? "border-[#10b981] bg-[#10b981]/10 text-white"
                        : "border-white/10 bg-[#080808] text-[#a1a1aa] hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <div className="text-xs font-bold truncate">{skill.name}</div>
                    <div className="text-[10px] text-[#71717a] mt-0.5 truncate">
                      {group.directory}
                    </div>
                  </button>
                ))
              )
            ) : (
              SKILL_GROUPS.map((group) => {
                const isSelected = group.id === selectedGroupId
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => {
                      setSelectedGroupId(group.id)
                      setSelectedSkillId(group.skills[0].id)
                    }}
                    className={`w-full text-left p-3 rounded-xs border transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#10b981] bg-[#10b981]/10 text-white shadow-[0_0_10px_rgba(16,185,129,0.15)] translate-x-1"
                        : "border-white/10 bg-[#080808] text-[#a1a1aa] hover:border-white/20 hover:text-white hover:translate-x-0.5"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <Folder className={`h-3.5 w-3.5 ${isSelected ? "text-[#10b981]" : "text-[#71717a]"}`} />
                      <span className="truncate">{group.directory}</span>
                    </div>
                    <div className="text-[10px] text-[#71717a] mt-1 line-clamp-1">
                      {group.category} ({group.skills.length})
                    </div>
                  </button>
                )
              })
            )}
          </div>

          {/* Right: Modules & Deep Diagnostic Spec Sheet */}
          <div className="flex-1 retro-box rounded-xs p-4 sm:p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div>
                <div className="text-base font-bold text-white flex items-center gap-2">
                  <span>{selectedGroup.directory}</span>
                  <span className="text-xs text-[#10b981] font-normal">
                    // {selectedGroup.category}
                  </span>
                </div>
                <div className="text-xs text-[#a1a1aa] mt-1">
                  {selectedGroup.description}
                </div>
              </div>

              {/* Module Selector Chips */}
              <div className="space-y-2">
                <div className="text-[10px] text-[#71717a] uppercase tracking-wider">
                  ACTIVE SUBSYSTEMS (SELECT TO INSPECT SPEC SHEET)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedGroup.skills.map((skill) => {
                    const isSelected = skill.id === currentSkill.id
                    return (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => setSelectedSkillId(skill.id)}
                        className={`p-2.5 rounded-xs border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          isSelected
                            ? "border-[#10b981] bg-[#10b981]/15 text-white shadow-[0_0_8px_rgba(16,185,129,0.15)]"
                            : "border-white/8 bg-[#050505] text-[#d4d4d8] hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <div className="truncate">
                          <div className="text-xs font-bold truncate flex items-center gap-1.5">
                            <FileCode className={`h-3.5 w-3.5 ${isSelected ? "text-[#10b981]" : "text-[#71717a]"}`} />
                            <span>{skill.name}</span>
                          </div>
                          <div className="text-[10px] text-[#71717a] mt-0.5 truncate">
                            {skill.projectUsage}
                          </div>
                        </div>

                        <TerminalLabel variant={skill.level === "ADVANCED" ? "green" : "muted"}>
                          {skill.level}
                        </TerminalLabel>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Deep Diagnostic Spec Sheet for Selected Module */}
              <div className="p-4 rounded-xs border border-[#10b981]/30 bg-[#030303] space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-white/6 text-xs font-bold text-white">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-3.5 w-3.5 text-[#10b981]" />
                    <span>DIAGNOSTIC SPEC SHEET: {currentSkill.name}</span>
                  </div>
                  <span className="text-[10px] text-[#10b981] font-normal">
                    {currentSkill.verificationSignature}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <SystemReadout label="PRODUCTION BENCHMARK" value={currentSkill.productionBenchmark} status="highlight" />
                  <SystemReadout label="REPOSITORIES USING MODULE" value={currentSkill.projectUsage} />
                  <div className="pt-1.5">
                    <span className="text-[#71717a] text-[10px] uppercase block">
                      ARCHITECTURAL SCOPE & CAPABILITIES:
                    </span>
                    <span className="text-[#ededed] text-xs leading-relaxed block mt-0.5">
                      {currentSkill.scope}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/8 text-[10px] text-[#525252] flex items-center justify-between">
              <span>COMPLIANCE: STRICT TYPES & HIGH PERFORMANCE</span>
              <span>VERIFIED BY DEVANSH VATS</span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: SYSTEM DEPENDENCY GRAPH */}
      {viewMode === "DEPENDENCY_GRAPH" && (
        <div className="flex-1 retro-box rounded-xs p-4 sm:p-6 mt-4 space-y-6">
          <div className="border-b border-white/8 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#10b981]" />
              <span>FULLSTACK & SPATIAL ARCHITECTURE TOPOLOGY</span>
            </h2>
            <p className="text-xs text-[#a1a1aa] mt-1">
              How Devansh's technical stack layers interact across runtime, WebGL rendering, and persistent storage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Layer 1: Interface */}
            <RetroPanel title="[L1] CLIENT SHELL" subtitle="UI & TYPOGRAPHY" controls={false}>
              <ul className="text-xs space-y-1.5 text-[#d4d4d8]">
                <li>• React 19 Core</li>
                <li>• Tailwind CSS v4</li>
                <li>• Geist Typography</li>
                <li>• Single-Scroll Lenis</li>
              </ul>
              <div className="text-[10px] text-[#71717a] pt-2 border-t border-white/6 mt-2">
                Renders viewport shell and persistent folders.
              </div>
            </RetroPanel>

            {/* Layer 2: 3D Engine */}
            <RetroPanel title="[L2] SPATIAL WEBGL" subtitle="THREE.JS GRAPHICS" controls={false}>
              <ul className="text-xs space-y-1.5 text-[#d4d4d8]">
                <li>• Three.js R170</li>
                <li>• React Three Fiber</li>
                <li>• Custom BufferGeom</li>
                <li>• Vector Projections</li>
              </ul>
              <div className="text-[10px] text-[#71717a] pt-2 border-t border-white/6 mt-2">
                Drives tactical pitch and 3D workstation.
              </div>
            </RetroPanel>

            {/* Layer 3: Motion & Routing */}
            <RetroPanel title="[L3] MOTION & STATE" subtitle="GSAP CONTROLLER" controls={false}>
              <ul className="text-xs space-y-1.5 text-[#d4d4d8]">
                <li>• GSAP ScrollTrigger</li>
                <li>• Scroller Proxying</li>
                <li>• React Router v7</li>
                <li>• Strict TypeScript</li>
              </ul>
              <div className="text-[10px] text-[#71717a] pt-2 border-t border-white/6 mt-2">
                Synchronizes scroll progress to 3D cameras.
              </div>
            </RetroPanel>

            {/* Layer 4: Data & Backend */}
            <RetroPanel title="[L4] DATA INTEGRITY" subtitle="OFFLINE STORAGE" controls={false}>
              <ul className="text-xs space-y-1.5 text-[#d4d4d8]">
                <li>• Node.js & REST APIs</li>
                <li>• IndexedDB Offline</li>
                <li>• Optimistic Updates</li>
                <li>• Git CI Workflows</li>
              </ul>
              <div className="text-[10px] text-[#71717a] pt-2 border-t border-white/6 mt-2">
                Guarantees zero data loss under spotty network.
              </div>
            </RetroPanel>
          </div>
        </div>
      )}
    </div>
  )
}
