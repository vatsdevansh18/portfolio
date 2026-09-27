import { useState, useEffect } from "react"
import { Cpu, HardDrive, Wifi, Activity } from "lucide-react"

export function HUDReadout() {
  const [cpuLoad, setCpuLoad] = useState(4.2)
  const [memoryHeap, setMemoryHeap] = useState(41.8)
  const [packetsTx, setPacketsTx] = useState(1482)
  const [uptimeSeconds, setUptimeSeconds] = useState(1420)

  useEffect(() => {
    // Subtle, deterministic periodic updates that make the machine feel alive
    const interval = setInterval(() => {
      setUptimeSeconds((prev) => prev + 1)
      setCpuLoad(+(4.2 + (Math.sin(Date.now() / 3000) * 1.4)).toFixed(1))
      setMemoryHeap(+(41.6 + (Math.cos(Date.now() / 5000) * 0.4)).toFixed(1))
      setPacketsTx((prev) => prev + Math.floor(Math.random() * 3))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatUptime = (sec: number) => {
    const hrs = Math.floor(sec / 3600)
    const mins = Math.floor((sec % 3600) / 60)
    const s = sec % 60
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-mono text-[10px] text-[#71717a] select-none">
      {/* CPU Load */}
      <div className="flex items-center gap-1.5" title="CPU Core Usage">
        <Cpu className="h-3 w-3 text-[#10b981]" />
        <span>CPU:</span>
        <span className="text-white font-bold">{cpuLoad}%</span>
      </div>

      <span className="text-white/20 hidden sm:inline">|</span>

      {/* Memory Heap */}
      <div className="flex items-center gap-1.5" title="Allocated Heap Memory">
        <HardDrive className="h-3 w-3 text-[#10b981]" />
        <span>MEM:</span>
        <span className="text-white font-bold">{memoryHeap} MB</span>
      </div>

      <span className="text-white/20 hidden md:inline">|</span>

      {/* Network TX Packets */}
      <div className="hidden md:flex items-center gap-1.5" title="Network Buffer Telemetry">
        <Wifi className="h-3 w-3 text-[#10b981]" />
        <span>NET:</span>
        <span className="text-white font-bold">1000BASE-T</span>
      </div>

      <span className="text-white/20 hidden lg:inline">|</span>

      {/* Machine Uptime */}
      <div className="hidden lg:flex items-center gap-1.5" title="System Uptime">
        <Activity className="h-3 w-3 text-[#10b981]" />
        <span>UP:</span>
        <span className="text-white font-bold">{formatUptime(uptimeSeconds)}</span>
      </div>
    </div>
  )
}
