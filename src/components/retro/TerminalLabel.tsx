import React from "react"

interface TerminalLabelProps {
  children: React.ReactNode
  variant?: "green" | "amber" | "muted" | "white"
  size?: "xs" | "sm"
  bracketed?: boolean
  className?: string
}

export function TerminalLabel({
  children,
  variant = "green",
  size = "xs",
  bracketed = true,
  className = "",
}: TerminalLabelProps) {
  const colorMap = {
    green: "text-[#10b981] border-[#10b981]/30 bg-[#10b981]/10",
    amber: "text-[#f59e0b] border-[#f59e0b]/30 bg-[#f59e0b]/10",
    muted: "text-[#8c8c8c] border-white/10 bg-white/[0.03]",
    white: "text-white border-white/20 bg-white/[0.05]",
  }

  const sizeMap = {
    xs: "text-[10px] px-1.5 py-0.5",
    sm: "text-xs px-2 py-0.5",
  }

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono tracking-wider font-semibold rounded-xs border select-none ${colorMap[variant]} ${sizeMap[size]} ${className}`}
    >
      {bracketed && <span className="opacity-40">[</span>}
      {children}
      {bracketed && <span className="opacity-40">]</span>}
    </span>
  )
}
