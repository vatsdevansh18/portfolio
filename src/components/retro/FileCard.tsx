import React from "react"
import { FileCode, FileText, Cpu, Play } from "lucide-react"

interface FileCardProps {
  name: string
  extension: ".app" | ".sys" | ".sim" | ".txt" | ".md" | ".cfg" | ".log"
  description: string
  size: string
  permissions?: string
  isSelected?: boolean
  onClick?: () => void
  onExecute?: () => void
  className?: string
}

export function FileCard({
  name,
  extension,
  description,
  size,
  permissions = "-rwxr-xr-x",
  isSelected = false,
  onClick,
  onExecute,
  className = "",
}: FileCardProps) {
  const getIcon = () => {
    switch (extension) {
      case ".app":
      case ".sim":
        return <Cpu className={`h-4 w-4 ${isSelected ? "text-[#10b981]" : "text-[#8c8c8c]"}`} />
      case ".sys":
      case ".cfg":
        return <FileCode className={`h-4 w-4 ${isSelected ? "text-[#10b981]" : "text-[#8c8c8c]"}`} />
      default:
        return <FileText className={`h-4 w-4 ${isSelected ? "text-[#10b981]" : "text-[#8c8c8c]"}`} />
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick?.()
        }
      }}
      className={`p-3 rounded-xs border text-left font-mono transition-all cursor-pointer select-none group ${
        isSelected
          ? "border-[#10b981] bg-[#10b981]/10 text-white shadow-[0_0_12px_rgba(16,185,129,0.15)]"
          : "border-white/10 bg-[#080808] text-[#a1a1aa] hover:border-white/25 hover:text-white hover:bg-[#0c0c0c]"
      } ${className}`}
    >
      <div className="flex items-center justify-between text-xs font-bold pb-1.5 border-b border-white/6">
        <div className="flex items-center gap-2 truncate">
          {getIcon()}
          <span className="truncate group-hover:text-white">{name}</span>
        </div>
        <span className={`text-[10px] ${isSelected ? "text-[#10b981]" : "text-[#71717a]"}`}>
          {size}
        </span>
      </div>

      <div className="text-[11px] text-[#71717a] mt-1.5 line-clamp-2 leading-relaxed">
        {description}
      </div>

      <div className="mt-2.5 pt-2 border-t border-white/6 flex items-center justify-between text-[10px] text-[#525252]">
        <span className="font-mono">{permissions}</span>
        {onExecute && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onExecute()
            }}
            className="inline-flex items-center gap-1 text-[#10b981] hover:underline cursor-pointer"
          >
            <Play className="h-2.5 w-2.5 fill-current" />
            <span>RUN</span>
          </button>
        )}
      </div>
    </div>
  )
}
