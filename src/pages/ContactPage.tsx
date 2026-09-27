import { useState } from "react"
import { Terminal, Mail, Check, Copy, ArrowUpRight, Send, CheckCircle2, ShieldCheck, Zap, Radio } from "lucide-react"
import { RetroPanel } from "@/components/retro/RetroPanel"
import { SystemReadout } from "@/components/retro/SystemReadout"
import { TerminalLabel } from "@/components/retro/TerminalLabel"
import { StatusIndicator } from "@/components/retro/StatusIndicator"

interface TerminalLog {
  id: string
  timestamp: string
  type: "INPUT" | "OUTPUT" | "SUCCESS" | "INFO"
  text: string
}

export function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [commandInput, setCommandInput] = useState("")
  const [logs, setLogs] = useState<TerminalLog[]>([
    {
      id: "1",
      timestamp: "00:00:01",
      type: "INFO",
      text: "SERIAL TRANSCEIVER INITIALIZED // 115200 BAUD // READY FOR PACKETS",
    },
    {
      id: "2",
      timestamp: "00:00:02",
      type: "INFO",
      text: "Type an inquiry or enter 'help', 'ping', 'status', 'whoami', 'email'.",
    },
  ])

  const emailAddress = "vatsdevansh18@gmail.com"

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress)
    setCopiedEmail(true)
    const newLog: TerminalLog = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      type: "SUCCESS",
      text: `BUFFER: Copied '${emailAddress}' to system clipboard.`,
    }
    setLogs((prev) => [...prev, newLog])
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = commandInput.trim()
    if (!trimmed) return

    const now = new Date().toLocaleTimeString()
    const inputLog: TerminalLog = {
      id: Date.now().toString(),
      timestamp: now,
      type: "INPUT",
      text: `$ ${trimmed}`,
    }

    let responseLog: TerminalLog

    const lower = trimmed.toLowerCase()
    if (lower === "help") {
      responseLog = {
        id: (Date.now() + 1).toString(),
        timestamp: now,
        type: "OUTPUT",
        text: "AVAILABLE COMMANDS: 'ping', 'status', 'whoami', 'email', 'clear', or type any payload string to dispatch.",
      }
    } else if (lower === "ping") {
      responseLog = {
        id: (Date.now() + 1).toString(),
        timestamp: now,
        type: "SUCCESS",
        text: "PONG: RTT 12ms // Gateway: Delhi NCR, IN // Carrier: OK",
      }
    } else if (lower === "status") {
      responseLog = {
        id: (Date.now() + 1).toString(),
        timestamp: now,
        type: "OUTPUT",
        text: "STATUS: Open for select fullstack software engineering, 3D WebGL projects, and collegiate collaboration.",
      }
    } else if (lower === "whoami") {
      responseLog = {
        id: (Date.now() + 1).toString(),
        timestamp: now,
        type: "OUTPUT",
        text: "USER: Guest Visitor // Protocol: HTTPS // Route: /contact",
      }
    } else if (lower === "email") {
      responseLog = {
        id: (Date.now() + 1).toString(),
        timestamp: now,
        type: "OUTPUT",
        text: `DIRECT ADDRESS: ${emailAddress} (Click [COPY ADDRESS] to copy).`,
      }
    } else if (lower === "clear") {
      setLogs([])
      setCommandInput("")
      return
    } else {
      // Treat as transmission packet
      responseLog = {
        id: (Date.now() + 1).toString(),
        timestamp: now,
        type: "SUCCESS",
        text: `TRANSMISSION PACKET LOGGED: "${trimmed}" → Dispatched to Devansh Vats inbox buffer.`,
      }
    }

    setLogs((prev) => [...prev, inputLog, responseLog])
    setCommandInput("")
  }

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 animate-in fade-in duration-150 font-mono select-none">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-[#10b981]" />
          <span className="text-xs sm:text-sm font-bold text-white tracking-wider">
            TRANSCEIVER // COMM://DEV/SERIAL_CHANNEL/
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <StatusIndicator status="online" label="CARRIER DETECTED" />
          <span className="text-[#71717a] hidden sm:inline">115200 8-N-1</span>
        </div>
      </div>

      {/* Main Content (Flows naturally in primary scroll container) */}
      <div className="flex-1 mt-5 space-y-5">
        {/* Verified Link Files */}
        <div className="space-y-3">
          <div className="text-[10px] text-[#71717a] uppercase tracking-wider flex items-center justify-between">
            <span>VERIFIED TRANSMISSION ENDPOINTS</span>
            <span className="text-[#10b981]">SLA: &lt; 24H RESPONSE TIME</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* GitHub File */}
            <a
              href="https://github.com/vatsdevansh18"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xs retro-box hover:border-[#10b981]/50 hover:bg-[#10b981]/5 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-[#10b981]"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-[#10b981] transition-colors">
                    github.link
                  </div>
                  <div className="text-[11px] text-[#71717a]">
                    github.com/vatsdevansh18
                  </div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-[#71717a] group-hover:text-white transition-colors" />
            </a>

            {/* LinkedIn File */}
            <a
              href="https://www.linkedin.com/in/devansh-vattsss/?isSelfProfile=true"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xs retro-box hover:border-[#10b981]/50 hover:bg-[#10b981]/5 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-[#10b981]"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" r="2" />
                </svg>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-[#10b981] transition-colors">
                    linkedin.link
                  </div>
                  <div className="text-[11px] text-[#71717a]">
                    linkedin.com/in/devansh-vattsss
                  </div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-[#71717a] group-hover:text-white transition-colors" />
            </a>
          </div>

          {/* Email File */}
          <div className="p-3.5 rounded-xs retro-box flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-[#10b981]" />
              <div>
                <div className="text-xs font-bold text-white">email.addr</div>
                <div className="text-[11px] text-[#a1a1aa]">{emailAddress}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-xs border border-white/10 bg-[#121212] text-xs text-[#ededed] hover:border-white/20 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="h-3 w-3 text-[#10b981]" />
                    <span className="text-[#10b981]">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>[COPY ADDRESS]</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${emailAddress}?subject=Engineering%20Collaboration%20Inquiry`}
                className="px-3 py-1.5 rounded-xs border border-[#10b981]/40 bg-[#10b981]/15 text-xs text-white hover:bg-[#10b981]/25 transition-colors flex items-center gap-1.5"
              >
                <span>[OPEN CLIENT]</span>
                <ArrowUpRight className="h-3 w-3 text-[#10b981]" />
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Terminal Dispatch Console */}
        <RetroPanel
          title="COMMUNICATION_DISPATCH_CONSOLE.tty"
          subtitle="SERIAL INPUT BUFFER"
          statusText="CARRIER_OK"
        >
          {/* Console Log History */}
          <div className="p-3 rounded-xs border border-white/6 bg-[#020202] space-y-1.5 max-h-48 overflow-y-auto no-scrollbar text-xs font-mono">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                <span className="text-[#525252] text-[10px] shrink-0">[{log.timestamp}]</span>
                {log.type === "INPUT" && <span className="text-white font-bold">{log.text}</span>}
                {log.type === "SUCCESS" && <span className="text-[#10b981]">{log.text}</span>}
                {log.type === "INFO" && <span className="text-[#71717a]">{log.text}</span>}
                {log.type === "OUTPUT" && <span className="text-[#d4d4d8]">{log.text}</span>}
              </div>
            ))}
          </div>

          {/* Terminal Input Line */}
          <form onSubmit={handleCommandSubmit} className="flex gap-2 mt-3">
            <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-xs border border-white/10 bg-[#000000] text-xs">
              <span className="text-[#10b981] font-bold">&gt;</span>
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="type inquiry payload or 'help', 'ping', 'status'..."
                className="flex-1 bg-transparent text-white placeholder:text-[#525252] focus:outline-none text-xs font-mono"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xs border border-[#10b981] bg-[#10b981]/20 text-xs text-white font-bold hover:bg-[#10b981]/30 transition-colors cursor-pointer shrink-0"
            >
              <Send className="h-3 w-3 text-[#10b981]" />
              <span>TRANSMIT</span>
            </button>
          </form>
        </RetroPanel>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-white/8 shrink-0 flex items-center justify-between text-[10px] text-[#525252]">
        <span>STATUS: OPEN FOR ENGINEERING COLLABORATIONS</span>
        <span>LOCATION: DELHI NCR, INDIA</span>
      </div>
    </div>
  )
}
