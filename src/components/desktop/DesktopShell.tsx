import { useState, useEffect } from "react"
import { FolderNavigation } from "@/components/desktop/FolderNavigation"
import { BatteryMedium, RotateCcw } from "lucide-react"

interface DesktopShellProps {
  onNavigateToSection: (href: string) => void
  onReplayIntro?: () => void
  activeSection?: string
}

export function DesktopShell({
  onNavigateToSection,
  onReplayIntro,
  activeSection = "home",
}: DesktopShellProps) {
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      )
      setCurrentDate(
        `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`
      )
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div 
      className="relative min-h-screen w-full bg-[#050505] text-[#ededed] flex flex-col select-none overflow-hidden animate-in fade-in duration-300"
      aria-label="Developer Workstation Desktop"
    >
      {/* Top Terminal Status Bar */}
      <header className="flex h-10 w-full items-center justify-between border-b border-white/10 bg-[#000000] px-4 sm:px-8 font-mono text-xs text-[#8c8c8c] shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[#ededed] font-semibold tracking-wider text-[11px] sm:text-xs">
            &gt;_ devansh@portfolio:~
          </span>
          <span className="inline-block h-3.5 w-1.5 bg-[#10b981] animate-pulse" />
        </div>

        <div className="flex items-center gap-3 sm:gap-6 text-[10px] sm:text-[11px]">
          <span>{currentTime || "11:33 PM"}</span>
          <span className="hidden sm:inline">{currentDate || "9/27/2026"}</span>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1.5 text-[#ededed]">
            <BatteryMedium className="h-3.5 w-3.5 text-[#10b981]" />
            <span className="text-[10px]">100%</span>
          </div>
        </div>
      </header>

      {/* Main Desktop Workstation Workspace */}
      <main className="flex-1 flex flex-col justify-between px-6 sm:px-12 lg:px-20 py-10 sm:py-16 max-w-7xl w-full mx-auto">
        {/* Left Side Vertical Folder Navigation */}
        <div className="max-w-md">
          <FolderNavigation
            currentPath={activeSection.startsWith("/") ? activeSection : `/${activeSection === "home" ? "" : activeSection}`}
            onSelectPath={onNavigateToSection}
          />
        </div>

        {/* Bottom Workstation Status & Replay Control */}
        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-6 font-mono text-xs text-[#525252]">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
            <span className="text-[#8c8c8c]">SYSTEM READY // SELECT A FOLDER TO INITIALIZE</span>
          </div>

          {onReplayIntro && (
            <button
              type="button"
              onClick={onReplayIntro}
              aria-label="Replay room intro sequence"
              className="inline-flex items-center gap-1.5 rounded border border-white/10 bg-[#0d0d0d] px-3 py-1.5 text-[11px] text-[#8c8c8c] hover:border-white/20 hover:text-[#ededed] transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>REPLAY INTRO</span>
            </button>
          )}
        </footer>
      </main>
    </div>
  )
}
