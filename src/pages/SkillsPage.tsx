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
  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 animate-in fade-in duration-150 font-mono select-none">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-[#10b981]" />
          <span className="text-xs sm:text-sm font-bold text-white tracking-wider">
            DIRECTORY // SKILLS_AND_TECH/
          </span>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="flex-1 mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto no-scrollbar pb-10">
        {SKILL_GROUPS.map((group) => (
          <div key={group.id} className="retro-box rounded-xs p-5 sm:p-6 flex flex-col h-full border border-white/10">
            
            <div className="flex items-center gap-2 mb-2">
              <Folder className="h-4 w-4 text-[#10b981]" />
              <h2 className="text-sm font-bold text-white uppercase tracking-widest">{group.category}</h2>
            </div>
            
            <p className="text-xs text-[#a1a1aa] mb-6 leading-relaxed border-l border-[#10b981]/30 pl-3">
              {group.description}
            </p>

            <div className="flex flex-col gap-4 mt-auto">
              {group.skills.map((skill) => (
                <div key={skill.id} className="flex flex-col gap-1.5 pb-3 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{skill.name}</span>
                    <TerminalLabel variant={skill.level === "CORE" ? "green" : "muted"}>
                      {skill.level}
                    </TerminalLabel>
                  </div>
                  <span className="text-xs text-[#71717a] leading-relaxed">
                    {skill.scope}
                  </span>
                </div>
              ))}
            </div>
            
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-white/8 shrink-0 flex items-center justify-between text-[10px] text-[#525252]">
        <span>COMPLIANCE: STRICT TYPES & HIGH PERFORMANCE</span>
        <span>VERIFIED BY DEVANSH VATS</span>
      </div>
    </div>
  )
}
