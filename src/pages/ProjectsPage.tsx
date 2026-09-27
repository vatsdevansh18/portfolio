import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Folder,
  FileCode,
  ArrowUpRight,
  Terminal,
  Layers,
  Play,
  Cpu,
  Activity,
  CheckCircle2,
  Box,
  Globe,
  HardDrive
} from "lucide-react"
import { RetroPanel } from "@/components/retro/RetroPanel"
import { SystemReadout } from "@/components/retro/SystemReadout"
import { TerminalLabel } from "@/components/retro/TerminalLabel"
import { StatusIndicator } from "@/components/retro/StatusIndicator"

interface Project {
  id: string
  name: string
  destinationRoute: string
  category: "3D & SPATIAL" | "FULLSTACK & APPS"
  status: "PRODUCTION" | "DEPLOYED" | "ACTIVE"
  version: string
  fileSize: string
  permissions: string
  description: string
  highlights: string[]
  stack: string[]
  githubUrl: string
  telemetry: {
    frameRate: string
    memory: string
    bundleCost: string
    renderArchitecture: string
  }
}

const PROJECTS: Project[] = [
  {
    id: "01",
    name: "portfolio_v3.app",
    destinationRoute: "/projects/portfolio-v3",
    category: "3D & SPATIAL",
    status: "PRODUCTION",
    version: "v3.8.0",
    fileSize: "42.4 KB",
    permissions: "-rwxr-xr-x",
    description:
      "A retro-tactical developer desktop workstation built to challenge conventional scrolling portfolio templates. Replaces endless scroll feeds with an authentic file explorer, live terminal status bar, and real client routes.",
    highlights: [
      "Scroll-driven 3D deconstructed workstation core with procedural layer separation",
      "Strict viewport-contained desktop filesystem architecture with persistent navigation",
      "Full compliance with prefers-reduced-motion, semantic HTML, and zero console errors",
      "Lenis smooth inertia and GSAP ScrollTrigger scroller-scoped synchronization",
    ],
    stack: ["React 19", "Three.js", "TypeScript", "Tailwind CSS v4", "React Router", "GSAP 3"],
    githubUrl: "https://github.com/vatsdevansh18",
    telemetry: {
      frameRate: "60 FPS (Clamped DPR)",
      memory: "< 42 MB Heap",
      bundleCost: "Zero-bloat modular chunks",
      renderArchitecture: "WebGL Canvas + Primary Scroll Scrubber",
    },
  },
  {
    id: "02",
    name: "football_attendance.sys",
    destinationRoute: "/projects/football-attendance",
    category: "FULLSTACK & APPS",
    status: "DEPLOYED",
    version: "v1.4.2",
    fileSize: "18.2 KB",
    permissions: "-rwxr-xr-x",
    description:
      "A dedicated attendance and squad tracking platform engineered specifically for collegiate athletic teams. Automates session check-ins, fitness logging, matchday availability, and tactical duty assignments.",
    highlights: [
      "Real-time attendance registry with fast squad filtering and export capabilities",
      "Role-based authorization distinguishing coaching staff, captains, and squad players",
      "Lightweight mobile-first interface optimized for pitchside usage under poor connectivity",
      "Optimistic updates and local cache synchronization preventing data loss",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "REST APIs"],
    githubUrl: "https://github.com/vatsdevansh18",
    telemetry: {
      frameRate: "Native 60/120 FPS",
      memory: "< 18 MB Heap",
      bundleCost: "Ultra-lean single bundle",
      renderArchitecture: "Optimistic State + Offline Caching",
    },
  },
  {
    id: "03",
    name: "tactical_pitch_3d.sim",
    destinationRoute: "/projects/tactical-pitch",
    category: "3D & SPATIAL",
    status: "ACTIVE",
    version: "v2.1.0",
    fileSize: "35.8 KB",
    permissions: "-rwxr-xr-x",
    description:
      "Interactive 3D WebGL tactical simulation engine visualizing football pitch coordinates, central midfield pressing zones, passing channels, and spatial distribution vectors.",
    highlights: [
      "Hairline tactical line markings (touchlines, penalty boxes, center circle, 5 longitudinal lanes)",
      "Dynamic player coordinate node tracking at (1.2, 0.0, 5.0) with native billboard canvas sprite",
      "Linear depth fog and clamped DPR to eliminate expensive post-processing passes",
      "Accessible automatic fallback to isometric tactical board on reduced motion",
    ],
    stack: ["Three.js", "React Three Fiber", "Drei", "WebGL", "TypeScript"],
    githubUrl: "https://github.com/vatsdevansh18",
    telemetry: {
      frameRate: "60 FPS Constant",
      memory: "< 35 MB Heap",
      bundleCost: "Buffer Geometry Pipeline",
      renderArchitecture: "Procedural Shaders + Vector Lines",
    },
  },
]

export function ProjectsPage() {
  const navigate = useNavigate()
  const [selectedProjectId, setSelectedProjectId] = useState<string>("01")
  const [filterCategory, setFilterCategory] = useState<"ALL" | "3D & SPATIAL" | "FULLSTACK & APPS">("ALL")
  const [isSimulatingLaunch, setIsSimulatingLaunch] = useState(false)

  const filteredProjects = PROJECTS.filter((p) => {
    if (filterCategory === "ALL") return true
    return p.category === filterCategory
  })

  const selectedProject =
    filteredProjects.find((p) => p.id === selectedProjectId) ||
    filteredProjects[0] ||
    PROJECTS[0]

  const handleLaunchProject = (route: string) => {
    setIsSimulatingLaunch(true)
    setTimeout(() => {
      navigate(route)
    }, 280)
  }

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 animate-in fade-in duration-150 font-mono select-none">
      {/* Top Directory Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-[#10b981]" />
          <span className="text-xs sm:text-sm font-bold text-white tracking-wider">
            DIRECTORY // DEV://BIN/PROJECTS/
          </span>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setFilterCategory("ALL")}
            className={`px-2.5 py-1 rounded-xs border transition-colors cursor-pointer text-[11px] ${
              filterCategory === "ALL"
                ? "border-[#10b981] bg-[#10b981]/15 text-white"
                : "border-white/10 bg-[#0a0a0a] text-[#8c8c8c] hover:text-white"
            }`}
          >
            [ALL {PROJECTS.length}]
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory("3D & SPATIAL")}
            className={`px-2.5 py-1 rounded-xs border transition-colors cursor-pointer text-[11px] ${
              filterCategory === "3D & SPATIAL"
                ? "border-[#10b981] bg-[#10b981]/15 text-white"
                : "border-white/10 bg-[#0a0a0a] text-[#8c8c8c] hover:text-white"
            }`}
          >
            [3D_SPATIAL 2]
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory("FULLSTACK & APPS")}
            className={`px-2.5 py-1 rounded-xs border transition-colors cursor-pointer text-[11px] ${
              filterCategory === "FULLSTACK & APPS"
                ? "border-[#10b981] bg-[#10b981]/15 text-white"
                : "border-white/10 bg-[#0a0a0a] text-[#8c8c8c] hover:text-white"
            }`}
          >
            [FULLSTACK 1]
          </button>
        </div>
      </div>

      {/* Main Split File Explorer View */}
      <div className="flex-1 flex flex-col md:flex-row gap-5 mt-4">
        {/* Left: Project File List */}
        <div className="w-full md:w-72 lg:w-80 shrink-0 flex flex-col gap-2 pr-1">
          <div className="text-[10px] text-[#71717a] uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>SELECT EXECUTABLE FILE</span>
            <span className="text-[#10b981]">{filteredProjects.length} AVAILABLE</span>
          </div>

          {filteredProjects.map((project) => {
            const isSelected = project.id === selectedProject.id
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => setSelectedProjectId(project.id)}
                className={`w-full text-left p-3 rounded-xs border transition-all cursor-pointer font-mono group ${
                  isSelected
                    ? "border-[#10b981] bg-[#10b981]/10 text-white shadow-[0_0_12px_rgba(16,185,129,0.15)] translate-x-1"
                    : "border-white/10 bg-[#080808] text-[#a1a1aa] hover:border-white/20 hover:text-white hover:translate-x-0.5"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2 truncate">
                    <FileCode className={`h-3.5 w-3.5 ${isSelected ? "text-[#10b981]" : "text-[#71717a]"}`} />
                    <span className="truncate group-hover:text-white">{project.name}</span>
                  </div>
                  <span className={`text-[10px] ${isSelected ? "text-[#10b981]" : "text-[#71717a]"}`}>
                    [{project.fileSize}]
                  </span>
                </div>
                <div className="text-[10px] text-[#71717a] mt-1 flex justify-between">
                  <span className="truncate">{project.category}</span>
                  <span className="font-mono text-[9px] text-[#525252]">{project.permissions}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Right: Project Inspection Pane */}
        <div className="flex-1 retro-box rounded-xs p-4 sm:p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/8">
              <div>
                <h2 className="text-base sm:text-lg font-bold font-mono text-white flex items-center gap-2">
                  <span>{selectedProject.name}</span>
                  <TerminalLabel variant="green">{selectedProject.status}</TerminalLabel>
                </h2>
                <div className="font-mono text-xs text-[#10b981] mt-0.5">
                  TYPE: {selectedProject.category} // VER: {selectedProject.version}
                </div>
              </div>

              {/* DIRECT EXECUTE BUTTON */}
              <button
                type="button"
                onClick={() => handleLaunchProject(selectedProject.destinationRoute)}
                disabled={isSimulatingLaunch}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xs border border-[#10b981] bg-[#10b981]/20 text-white text-xs font-bold hover:bg-[#10b981]/30 transition-all cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.2)]"
              >
                <Play className="h-3 w-3 fill-current text-[#10b981]" />
                <span>{isSimulatingLaunch ? "LAUNCHING RUNTIME..." : "EXECUTE // LAUNCH 3D"}</span>
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#d4d4d8] leading-relaxed">
              {selectedProject.description}
            </p>

            {/* Architectural Telemetry Box with SystemReadout */}
            <div className="p-3.5 rounded-xs border border-white/8 bg-[#040404] space-y-2">
              <div className="text-[10px] text-[#71717a] uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Cpu className="h-3 w-3 text-[#10b981]" />
                  <span>RUNTIME BENCHMARKS & TELEMETRY</span>
                </span>
                <span className="text-[#10b981]">SYSTEM STABLE</span>
              </div>
              <div className="space-y-1.5 pt-1">
                <SystemReadout label="FRAME BUDGET" value={selectedProject.telemetry.frameRate} status="highlight" />
                <SystemReadout label="MEMORY HEAP" value={selectedProject.telemetry.memory} />
                <SystemReadout label="BUNDLE FOOTPRINT" value={selectedProject.telemetry.bundleCost} />
                <SystemReadout label="RENDER ARCHITECTURE" value={selectedProject.telemetry.renderArchitecture} status="highlight" />
              </div>
            </div>

            {/* Engineering Highlights */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="h-3 w-3 text-[#10b981]" />
                <span>KEY ARCHITECTURAL HIGHLIGHTS</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#a1a1aa]">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#10b981] mt-0.5">›</span>
                    <span className="leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack Tags */}
            <div className="space-y-2">
              <div className="text-[10px] text-[#71717a] uppercase tracking-wider">
                COMPILATION DEPENDENCIES
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-xs border border-white/10 bg-[#0a0a0a] text-[11px] text-[#ededed]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-white/8 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-[10px] text-[#525252]">
              PERMISSIONS: {selectedProject.permissions} // FILE SIZE: {selectedProject.fileSize}
            </span>

            <div className="flex items-center gap-3">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-white/15 bg-white/[0.05] text-[#d4d4d8] hover:text-white hover:border-white/30 transition-colors"
              >
                <span>SOURCE REPO</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#10b981]" />
              </a>

              <button
                type="button"
                onClick={() => handleLaunchProject(selectedProject.destinationRoute)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-[#10b981] bg-[#10b981]/15 text-white hover:bg-[#10b981]/25 transition-colors cursor-pointer"
              >
                <span>OPEN 3D EXPERIENCE →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
