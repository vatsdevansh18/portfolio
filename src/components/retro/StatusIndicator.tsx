import React from "react"

interface StatusIndicatorProps {
  status?: "online" | "busy" | "standby" | "active"
  label?: string
  showText?: boolean
  className?: string
}

export function StatusIndicator({
  status = "online",
  label,
  showText = true,
  className = "",
}: StatusIndicatorProps) {
  const configs = {
    online: {
      color: "bg-[#10b981]",
      border: "border-[#10b981]/40",
      text: label || "ONLINE",
      textColor: "text-[#10b981]",
    },
    busy: {
      color: "bg-[#f59e0b]",
      border: "border-[#f59e0b]/40",
      text: label || "BUSY",
      textColor: "text-[#f59e0b]",
    },
    standby: {
      color: "bg-[#8c8c8c]",
      border: "border-white/20",
      text: label || "STANDBY",
      textColor: "text-[#8c8c8c]",
    },
    active: {
      color: "bg-[#10b981]",
      border: "border-[#10b981]/50",
      text: label || "ACTIVE",
      textColor: "text-[#10b981]",
    },
  }

  const current = configs[status]

  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] select-none ${className}`}>
      <span className="relative flex h-2 w-2 items-center justify-center">
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${current.color} ${
            status === "online" || status === "active" ? "animate-ping" : ""
          }`}
          style={{ animationDuration: "3s" }}
        />
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${current.color}`} />
      </span>
      {showText && <span className={`font-semibold tracking-wider ${current.textColor}`}>{current.text}</span>}
    </span>
  )
}
