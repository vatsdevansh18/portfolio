import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { FolderNavigation, type DesktopFolder } from "@/components/desktop/FolderNavigation"
import { isImmersiveRoute, getRouteMeta } from "@/lib/routes"
import { usePrimaryScroll } from "@/lib/scroll-context"
import { HUDReadout } from "@/components/retro/HUDReadout"
import { BatteryMedium, Folder, X, ArrowLeft, Terminal, Shield, HardDrive } from "lucide-react"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname
  const isHomePage = currentPath === "/"
  const isImmersive = isImmersiveRoute(currentPath)
  const routeMeta = getRouteMeta(currentPath)
  const { scrollContainerRef } = usePrimaryScroll()

  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  const [hoveredFolder, setHoveredFolder] = useState<DesktopFolder | null>(null)
  const [tickerIndex, setTickerIndex] = useState(0)

  // Real-time system clock
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

  // Bottom diagnostic ticker messages
  const TICKER_MESSAGES = [
    "SYS_STATUS: ALL SUBSYSTEMS NOMINAL",
    "LOCATION: DELHI NCR (28.5833° N, 77.3167° E)",
    "LENIS_SYNC: PRIMARY SCROLLER INERTIA ACTIVE",
    "ENCODING: UTF-8 // STRICT POSIX ENVIRONMENT",
    "SQUAD_ROLE: VICE CAPTAIN // CENTRAL MIDFIELD #8",
    "COMPILER: VITE 6.3 + TS 5.x STRICT EMIT (560ms)",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TICKER_MESSAGES.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [TICKER_MESSAGES.length])

  // Handle path selection
  const handleSelectPath = (path: string) => {
    setIsMobileDrawerOpen(false)
    navigate(path)
  }

  // Keyboard shortcut listener (Escape closes mobile drawer)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileDrawerOpen) {
        setIsMobileDrawerOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isMobileDrawerOpen])

  return (
    <div
      className="fixed inset-0 h-[100dvh] w-full bg-[#050505] text-[#ededed] flex flex-col select-none overflow-hidden font-sans"
      aria-label="Devansh Vats Developer Workstation OS"
    >
      {/* Top Retro Workstation Status Bar (Fixed to viewport) */}
      <header className="flex h-10 w-full items-center justify-between border-b border-white/10 bg-[#030303] px-3 sm:px-6 font-mono text-xs text-[#8c8c8c] shrink-0 z-30 select-none">
        {/* Left: Terminal Prompt & Navigation Breadcrumb */}
        <div className="flex items-center gap-2 truncate">
          <button
            type="button"
            onClick={() => handleSelectPath("/")}
            title="Return to root workstation (~)"
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-left truncate"
          >
            <span className="text-[#ededed] font-semibold tracking-wider text-[11px] sm:text-xs truncate">
              <span className="text-[#10b981] font-bold">&gt;_</span> DEVANSH_WS_v3.8
              <span className="text-white/40 hidden sm:inline">:~</span>
              {currentPath !== "/" && (
                <span className="text-[#10b981] hidden sm:inline">{currentPath}</span>
              )}
            </span>
            <span className="inline-block h-3.5 w-1.5 bg-[#10b981] animate-retro-blink" />
          </button>
        </div>

        {/* Center: Live Telemetry Readout on desktop */}
        <div className="hidden xl:flex items-center">
          <HUDReadout />
        </div>

        {/* Right: Mobile Drawer Toggle & Clock / Battery */}
        <div className="flex items-center gap-2.5 sm:gap-4 text-[10px] sm:text-[11px]">
          {/* Mobile Folder Drawer Button */}
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
            aria-label="Toggle folders navigation drawer"
            className="md:hidden flex items-center gap-1 px-2 py-0.5 rounded-xs border border-white/15 bg-white/[0.05] text-white hover:bg-white/[0.1] transition-colors cursor-pointer"
          >
            {isMobileDrawerOpen ? (
              <>
                <X className="h-3 w-3 text-[#10b981]" />
                <span className="font-mono text-[10px]">CLOSE</span>
              </>
            ) : (
              <>
                <Folder className="h-3 w-3 text-[#10b981]" />
                <span className="font-mono text-[10px]">DIR</span>
              </>
            )}
          </button>

          <span className="hidden sm:inline font-mono">{currentTime || "11:33 PM"}</span>
          <span className="hidden lg:inline text-white/20">|</span>
          <span className="hidden lg:inline font-mono">{currentDate || "9/27/2026"}</span>
          <span className="text-white/20 hidden sm:inline">|</span>

          {/* Battery Status */}
          <div className="flex items-center gap-1 text-[#ededed] font-mono">
            <BatteryMedium className="h-3.5 w-3.5 text-[#10b981]" />
            <span className="text-[10px]">100%</span>
          </div>
        </div>
      </header>

      {/* Main Workstation Workspace Split */}
      <div className="flex-1 flex w-full overflow-hidden relative">
        {/* Left: Persistent Retro Desktop Folder Navigation (Clean, zero scrollbar) */}
        <aside
          aria-label="File Explorer Sidebar"
          className="w-60 lg:w-68 border-r border-white/10 bg-[#060606] p-3.5 lg:p-4 shrink-0 flex flex-col justify-between hidden md:flex overflow-hidden no-scrollbar select-none"
        >
          <div>
            {/* Header: Retro Volume and Explorer Title */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/8 font-mono text-[10px] text-[#71717a]">
              <div className="flex items-center gap-1.5 text-white font-bold tracking-wider">
                <HardDrive className="h-3 w-3 text-[#10b981]" />
                <span>VOL_01://ROOT/</span>
              </div>
              <span className="text-[#10b981] flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" />
                ONLINE
              </span>
            </div>

            <FolderNavigation
              currentPath={currentPath}
              onSelectPath={handleSelectPath}
              onHoverFolder={setHoveredFolder}
            />
          </div>

          {/* Workstation Machine Specs or Hover Diagnostic Footer */}
          <div className="pt-3 border-t border-white/8 font-mono text-[10px] text-[#525252] space-y-1 select-none">
            {hoveredFolder ? (
              <div className="p-2 rounded-xs border border-[#10b981]/30 bg-[#10b981]/5 text-[9px] text-[#ededed] space-y-0.5 animate-in fade-in duration-75">
                <div className="text-[#10b981] font-bold truncate">
                  &gt; ACCESS {hoveredFolder.path}
                </div>
                <div className="text-[#8c8c8c] flex justify-between">
                  <span>TYPE: {hoveredFolder.type}</span>
                  <span>{hoveredFolder.filesCount}</span>
                </div>
                <div className="text-[#71717a]">
                  MODIFIED: {hoveredFolder.lastModified}
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span>SYSTEM</span>
                  <span className="text-[#a1a1aa]">NCR_STATION_3.8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>SCROLLER</span>
                  <span className={isHomePage ? "text-[#a1a1aa]" : "text-[#10b981]"}>
                    {isHomePage ? "VIEWPORT_LOCKED" : "PRIMARY_ACTIVE"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>STATUS</span>
                  <span className="text-[#10b981]">READY_FOR_INPUT</span>
                </div>
              </>
            )}
          </div>
        </aside>

        {/* Mobile Slide-Over Folder Drawer */}
        {isMobileDrawerOpen && (
          <div className="md:hidden absolute inset-0 z-40 bg-[#050505]/95 backdrop-blur-md flex flex-col p-5 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 font-mono text-xs">
              <span className="text-white font-bold">&gt; SELECT DIRECTORY</span>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1 text-[#8c8c8c] hover:text-white"
                aria-label="Close drawer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar">
              <FolderNavigation
                currentPath={currentPath}
                onSelectPath={handleSelectPath}
                isMobileDrawer={true}
              />
            </div>

            <div className="pt-3 border-t border-white/10 font-mono text-[10px] text-[#71717a] flex justify-between">
              <span>DEVANSH VATS // WORKSTATION</span>
              <span className="text-[#10b981]">ACTIVE</span>
            </div>
          </div>
        )}

        {/* Right / Center: Workspace */}
        <main
          id="main-content"
          className="flex-1 h-full flex flex-col overflow-hidden bg-[#040404] relative"
        >
          {/* Top Breadcrumb Bar */}
          <div className="h-8 border-b border-white/6 px-4 sm:px-6 flex items-center justify-between font-mono text-[11px] text-[#71717a] bg-[#070707] shrink-0 z-20 select-none">
            <div className="flex items-center gap-2 truncate">
              {routeMeta?.parentDirectory && (
                <button
                  type="button"
                  onClick={() => handleSelectPath(routeMeta.parentDirectory!)}
                  className="inline-flex items-center gap-1 text-[#10b981] hover:underline cursor-pointer mr-1 text-[10px] font-bold"
                >
                  <ArrowLeft className="h-3 w-3" />
                  <span>[UP]</span>
                </button>
              )}
              <span className="text-white/40">DIR:</span>
              <span className="text-[#ededed] font-medium truncate">
                DEV://VOL_01/PORTFOLIO{currentPath === "/" ? "" : currentPath}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-[10px]">
              <span className="inline-flex items-center gap-1 text-[#10b981]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                {isHomePage ? "VIEWPORT_LOCKED" : "PRIMARY_SCROLLER_ACTIVE"}
              </span>
            </div>
          </div>

          {/* THE SINGLE PRIMARY SCROLL CONTEXT
              - When on / (Home): overflow-hidden (viewport-contained, zero scrolling).
              - When on destination pages: overflow-y-auto tactical-scrollbar (the ONE single primary scroller for the page!).
              - Bound directly to Lenis and GSAP ScrollTrigger via PrimaryScrollProvider.
              - Eliminates the nested "website inside a website" problem entirely.
          */}
          <div
            id="page-scroll-container"
            ref={scrollContainerRef}
            className={`flex-1 h-full relative ${
              isHomePage
                ? "overflow-y-auto lg:overflow-hidden flex flex-col no-scrollbar"
                : "overflow-y-auto overflow-x-hidden tactical-scrollbar scroll-smooth"
            }`}
          >
            <div className="w-full min-h-full">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Global Hairline Bottom Status Bar (Fixed to viewport) */}
      <footer className="h-7 w-full border-t border-white/8 bg-[#020202] px-3 sm:px-6 flex items-center justify-between font-mono text-[10px] text-[#525252] shrink-0 z-20 select-none">
        <div className="flex items-center gap-2 truncate">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
          <span className="text-[#8c8c8c] font-medium truncate">
            {TICKER_MESSAGES[tickerIndex]}
          </span>
        </div>

        <div className="flex items-center gap-3 text-[#71717a] shrink-0">
          <span className="hidden md:inline">
            MODE: {isHomePage ? "DESKTOP" : "DIRECTORY"}
          </span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span>BCA 2ND YR // CHRIST UNIV</span>
        </div>
      </footer>
    </div>
  )
}
