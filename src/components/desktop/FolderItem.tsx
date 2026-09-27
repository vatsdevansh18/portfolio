import React, { useState } from "react"

export interface FolderItemProps {
  id: string
  name: string
  subtext: string
  path: string
  index: number
  filesCount: string
  type: string
  isActive?: boolean
  onClick: (path: string) => void
  onHover?: (folder: { name: string; path: string; type: string; filesCount: string }) => void
  onLeave?: () => void
}

export function FolderItem({
  name,
  subtext,
  path,
  filesCount,
  type,
  isActive = false,
  onClick,
  onHover,
  onLeave,
}: FolderItemProps) {
  const [isPressed, setIsPressed] = useState(false)

  const triggerOpen = () => {
    setIsPressed(true)
    setTimeout(() => {
      setIsPressed(false)
      onClick(path)
    }, 100)
  }

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={(e) => {
        e.preventDefault()
        triggerOpen()
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          triggerOpen()
        }
      }}
      onMouseEnter={() => onHover?.({ name, path, type, filesCount })}
      onMouseLeave={() => onLeave?.()}
      aria-label={`Directory ${name}: ${subtext}`}
      aria-current={isActive ? "page" : undefined}
      data-cursor="interactive"
      className={`group relative flex items-center justify-between px-2.5 py-1.5 rounded-xs cursor-pointer select-none transition-all duration-100 outline-none border font-mono ${
        isActive
          ? "border-[#10b981]/50 bg-[#10b981]/10 text-white shadow-[inset_1px_1px_0_rgba(16,185,129,0.3)] translate-x-1"
          : "border-transparent text-[#a1a1aa] hover:border-white/15 hover:bg-white/[0.04] hover:text-white hover:translate-x-0.5"
      } ${isPressed ? "translate-y-0.5 scale-[0.99] opacity-80" : ""}`}
    >
      {/* Left side: Directory Indicator, Glyph & Name */}
      <div className="flex items-center gap-2 min-w-0">
        {/* Retro Folder Glyph: ASCII Brackets or Outline Folder */}
        <div className="relative shrink-0 flex items-center text-xs">
          {isActive ? (
            <span className="text-[#10b981] font-bold">[-]</span>
          ) : (
            <span className="text-[#71717a] group-hover:text-white transition-colors">[+]</span>
          )}
        </div>

        {/* Folder Title & Type */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider leading-none">
            <span className={isActive ? "text-[#10b981]" : "text-[#ededed] group-hover:text-white"}>
              {name}
            </span>
            {isActive && (
              <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" />
            )}
          </div>
          <span className="text-[9px] text-[#71717a] group-hover:text-[#a1a1aa] transition-colors truncate mt-0.5">
            /{subtext}
          </span>
        </div>
      </div>

      {/* Right side: File count badge & arrow */}
      <div className="flex items-center gap-1.5 shrink-0 text-[9px] text-[#525252] group-hover:text-[#8c8c8c]">
        <span className="hidden sm:inline font-mono px-1 py-0.2 rounded border border-white/6 bg-black/40">
          {filesCount}
        </span>
        <span
          className={`transition-transform duration-100 ${
            isActive ? "text-[#10b981] translate-x-0.5" : "group-hover:translate-x-0.5"
          }`}
        >
          →
        </span>
      </div>
    </div>
  )
}
