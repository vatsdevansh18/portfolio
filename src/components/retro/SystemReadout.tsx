import React from "react"

interface SystemReadoutProps {
  label: string
  value: React.ReactNode
  subtext?: string
  status?: "normal" | "highlight" | "amber"
  className?: string
}

export function SystemReadout({
  label,
  value,
  subtext,
  status = "normal",
  className = "",
}: SystemReadoutProps) {
  const valueColor = {
    normal: "text-[#ededed]",
    highlight: "text-[#10b981] font-bold",
    amber: "text-[#f59e0b] font-bold",
  }[status]

  return (
    <div className={`flex flex-wrap sm:flex-nowrap items-baseline justify-between font-mono text-xs gap-y-0.5 min-w-0 ${className}`}>
      <span className="text-[#71717a] shrink-0 uppercase tracking-wider text-[10px] sm:text-[11px]">
        {label}
      </span>
      <span className="hidden sm:inline dotted-leader shrink" />
      <span className={`min-w-0 font-medium ${valueColor} text-left sm:text-right break-words text-[11px] sm:text-xs`}>
        {value}
        {subtext && <span className="text-[#525252] text-[10px] ml-1 sm:ml-1.5 inline-block">({subtext})</span>}
      </span>
    </div>
  )
}
