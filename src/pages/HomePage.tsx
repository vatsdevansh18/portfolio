import { useNavigate } from "react-router-dom"
import { DESKTOP_FOLDERS } from "@/components/desktop/FolderNavigation"
import { FolderItem } from "@/components/desktop/FolderItem"
import { RetroPanel } from "@/components/retro/RetroPanel"
import { SystemReadout } from "@/components/retro/SystemReadout"
import { StatusIndicator } from "@/components/retro/StatusIndicator"
import { RetroProfilePhoto } from "@/components/retro/RetroProfilePhoto"
import { Terminal, Shield, Play, HardDrive, Cpu, FileText, ArrowRight } from "lucide-react"

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 lg:p-6 select-none font-mono animate-in fade-in duration-150">
      {/* Mobile-only view: Quick directory listing */}
      <div className="md:hidden mb-4 p-3 rounded-xs border border-white/10 bg-[#080808]">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/8 text-[11px] text-[#71717a]">
          <span className="text-white font-bold">&gt; SELECT DIRECTORY</span>
          <StatusIndicator status="online" label="ACTIVE" />
        </div>
        <div className="space-y-1.5">
          {DESKTOP_FOLDERS.map((folder, index) => (
            <FolderItem
              key={folder.id}
              id={folder.id}
              name={folder.name}
              subtext={folder.subtext}
              path={folder.path}
              index={index}
              filesCount={folder.filesCount}
              type={folder.type}
              isActive={false}
              onClick={(path) => navigate(path)}
            />
          ))}
        </div>
      </div>

      {/* Main Desktop Workstation Split (Left: Specs & Executables, Right: Retro Personal Photo) */}
      <div className="flex-1 flex flex-col lg:flex-row gap-5 lg:gap-6 items-start justify-between min-h-0">
        {/* Left Column: System specifications and desktop quick launch */}
        <div className="flex-1 w-full lg:max-w-xl xl:max-w-2xl space-y-3 min-w-0">
          {/* Retro ASCII Banner */}
          <div className="hidden sm:block p-2.5 rounded-xs border border-white/8 bg-[#030303] text-[#10b981] overflow-x-auto no-scrollbar">
            <pre className="text-[10px] leading-tight font-mono select-none font-bold">
{` ____  _______     ___    _   _ ____  _   _ 
|  _ \\| ____\\ \\   / / \\  | \\ | / ___|| | | |
| | | |  _|  \\ \\ / / _ \\ |  \\| \\___ \\| |_| |
| |_| | |___  \\ V / ___ \\| |\\  |___) |  _  |
|____/|_____|  \\_/_/   \\_\\_| \\_|____/|_| |_|`}
            </pre>
            <div className="mt-1.5 text-[9px] text-[#71717a] flex items-center justify-between border-t border-white/6 pt-1">
              <span>DEVANSH VATS // COMPUTER WORKSTATION v3.8</span>
              <span className="text-[#10b981]">ROM BIOS 1988-2026 OK</span>
            </div>
          </div>

          {/* System Specifications Box with Dotted Leaders */}
          <RetroPanel
            title="SYSTEM_SPECIFICATION.sys"
            subtitle="HOST HARDWARE & IDENTITY"
            statusText="MOUNTED"
          >
            <div className="space-y-1.5">
              <SystemReadout label="OPERATOR NAME" value="Devansh Vats" status="highlight" />
              <SystemReadout label="ACADEMIC TRACK" value="BCA (2nd Year, 2024-2027)" subtext="Christ University Delhi NCR" />
              <SystemReadout label="ATHLETIC OFFICE" value="Vice Captain // Midfield #8" status="highlight" subtext="Christ University Football" />
              <SystemReadout label="PRIMARY DISCIPLINES" value="Spatial WebGL & TypeScript" subtext="React 19, Three.js, GSAP 3" />
              <SystemReadout label="CORE PHILOSOPHY" value="Tactical Discipline × Spatial Codecraft" status="amber" />
              <SystemReadout label="BASE MEMORY HEAP" value="64 MB VRAM / 41.8 MB ALLOCATED" />
            </div>
          </RetroPanel>

          {/* Quick Launch Executable Desktop Files */}
          <div className="space-y-1.5">
            <div className="text-[10px] text-[#71717a] uppercase tracking-wider flex items-center justify-between">
              <span>DESKTOP QUICK LAUNCH FILES</span>
              <span className="text-[#10b981]">SELECT FILE OR USE DIRECTORY TREE</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* Executable 1 */}
              <button
                type="button"
                onClick={() => navigate("/projects/portfolio-v3")}
                className="p-2.5 rounded-xs border border-white/10 bg-[#080808] hover:border-[#10b981]/50 hover:bg-[#10b981]/5 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs font-bold text-white group-hover:text-[#10b981]">
                  <div className="flex items-center gap-1.5 truncate">
                    <Play className="h-3 w-3 fill-current text-[#10b981]" />
                    <span className="truncate">portfolio_v3.app</span>
                  </div>
                  <span className="text-[9px] text-[#71717a]">42 KB</span>
                </div>
                <div className="text-[10px] text-[#71717a] mt-0.5 truncate">
                  Spatial WebGL Workstation
                </div>
                <div className="text-[9px] text-[#525252] mt-1 flex items-center justify-between">
                  <span>-rwxr-xr-x</span>
                  <span className="text-[#10b981] group-hover:underline">RUN →</span>
                </div>
              </button>

              {/* Executable 2 */}
              <button
                type="button"
                onClick={() => navigate("/projects/football-attendance")}
                className="p-2.5 rounded-xs border border-white/10 bg-[#080808] hover:border-[#10b981]/50 hover:bg-[#10b981]/5 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs font-bold text-white group-hover:text-[#10b981]">
                  <div className="flex items-center gap-1.5 truncate">
                    <Play className="h-3 w-3 fill-current text-[#10b981]" />
                    <span className="truncate">football_attendance.sys</span>
                  </div>
                  <span className="text-[9px] text-[#71717a]">18 KB</span>
                </div>
                <div className="text-[10px] text-[#71717a] mt-0.5 truncate">
                  Varsity Squad Tracking
                </div>
                <div className="text-[9px] text-[#525252] mt-1 flex items-center justify-between">
                  <span>-rwxr-xr-x</span>
                  <span className="text-[#10b981] group-hover:underline">RUN →</span>
                </div>
              </button>

              {/* Executable 3 */}
              <button
                type="button"
                onClick={() => navigate("/projects/tactical-pitch")}
                className="p-2.5 rounded-xs border border-white/10 bg-[#080808] hover:border-[#10b981]/50 hover:bg-[#10b981]/5 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs font-bold text-white group-hover:text-[#10b981]">
                  <div className="flex items-center gap-1.5 truncate">
                    <Play className="h-3 w-3 fill-current text-[#10b981]" />
                    <span className="truncate">tactical_pitch_3d.sim</span>
                  </div>
                  <span className="text-[9px] text-[#71717a]">35 KB</span>
                </div>
                <div className="text-[10px] text-[#71717a] mt-0.5 truncate">
                  3D Pitch Vector Simulator
                </div>
                <div className="text-[9px] text-[#525252] mt-1 flex items-center justify-between">
                  <span>-rwxr-xr-x</span>
                  <span className="text-[#10b981] group-hover:underline">RUN →</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Retro Personal Portrait Viewer */}
        <div className="w-full lg:w-auto shrink-0 flex justify-center lg:justify-end items-start mt-2 lg:mt-0">
          <RetroProfilePhoto />
        </div>
      </div>

      {/* Bottom Command Prompt Status */}
      <div className="pt-2.5 border-t border-white/8 text-[11px] text-[#71717a] flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[#10b981] font-bold">&gt;_</span>
          <span>SELECT DIRECTORY FROM LEFT PANEL TO ACCESS SYSTEM FILES</span>
        </div>
        <div className="text-[10px] text-[#525252] flex items-center gap-3">
          <span>PORT: 8080</span>
          <span>BAUD: 115200</span>
          <span>TTY: tty0</span>
        </div>
      </div>
    </div>
  )
}
