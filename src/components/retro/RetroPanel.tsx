import React from "react"
import { Terminal } from "lucide-react"

interface RetroPanelProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  icon?: React.ReactNode
  statusText?: string
  className?: string
  controls?: boolean
}

export function RetroPanel({
  title,
  subtitle,
  children,
  icon,
  statusText,
  className = "",
  controls = true,
}: RetroPanelProps) {
  return (
    <div className={`relative retro-box rounded-xs overflow-hidden ${className}`}>
      {/* Corner Registration Crosses */}
      <span className="absolute -top-1.5 -left-1.5 text-white/20 font-mono text-[9px] pointer-events-none select-none">+</span>
      <span className="absolute -top-1.5 -right-1.5 text-white/20 font-mono text-[9px] pointer-events-none select-none">+</span>
      <span className="absolute -bottom-1.5 -left-1.5 text-white/20 font-mono text-[9px] pointer-events-none select-none">+</span>
      <span className="absolute -bottom-1.5 -right-1.5 text-white/20 font-mono text-[9px] pointer-events-none select-none">+</span>

      {/* Header Bar */}
      <div className="retro-box-header px-3 py-1.5 flex items-center justify-between font-mono select-none">
        <div className="flex items-center gap-2 truncate">
          {icon || <Terminal className="h-3.5 w-3.5 text-[#10b981]" />}
          <span className="text-xs font-bold text-white tracking-wider truncate">
            {title}
          </span>
          {subtitle && (
            <span className="text-[10px] text-[#71717a] hidden sm:inline truncate">
              // {subtitle}
            </span>
          )}
        </div>

        {/* Right Controls & Status */}
        <div className="flex items-center gap-2.5 shrink-0 text-[10px]">
          {statusText && (
            <span className="text-[#10b981] font-mono text-[10px] hidden md:inline">
              [{statusText}]
            </span>
          )}
          {controls && (
            <div className="flex items-center gap-1 text-[#8c8c8c]">
              <span className="w-3.5 h-3.5 border border-white/20 bg-black/40 flex items-center justify-center text-[8px] hover:border-white/50 cursor-default">_</span>
              <span className="w-3.5 h-3.5 border border-white/20 bg-black/40 flex items-center justify-center text-[8px] hover:border-white/50 cursor-default">■</span>
              <span className="w-3.5 h-3.5 border border-white/20 bg-black/40 flex items-center justify-center text-[8px] hover:text-[#f59e0b] hover:border-[#f59e0b] cursor-default">×</span>
            </div>
          )}
        </div>
      </div>

      {/* Panel Content Slot */}
      <div className="p-4 sm:p-5 font-mono text-xs">
        {children}
      </div>
    </div>
  )
}
