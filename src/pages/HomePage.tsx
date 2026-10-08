import { useNavigate } from "react-router-dom"
import { RetroPanel } from "@/components/retro/RetroPanel"
import { RetroProfilePhoto } from "@/components/retro/RetroProfilePhoto"
import { ArrowRight, Terminal } from "lucide-react"

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-6 lg:p-8 select-none font-mono animate-in fade-in duration-150">
      


      {/* Main Hero Area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start justify-center lg:justify-start mt-4 lg:mt-12">
        
        {/* Left: Introduction & Identity */}
        <div className="flex-1 w-full max-w-2xl space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#10b981] text-sm tracking-widest">
              <Terminal className="w-4 h-4" />
              <span>HELLO, I'M</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-none">
              Devansh Vats
            </h1>
            <p className="text-lg sm:text-xl text-[#a1a1aa] font-medium tracking-wide">
              BCA Student & Frontend Developer
            </p>
          </div>

          <div className="text-sm text-[#71717a] max-w-xl leading-relaxed border-l-2 border-[#10b981]/30 pl-4 py-1">
            I build highly interactive, spatial web experiences using React, Three.js, and GSAP. 
            Merging tactical discipline with creative codecraft to create memorable interfaces.
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => navigate('/projects')}
              className="flex items-center gap-2 px-6 py-3 bg-[#10b981] hover:bg-[#059669] text-black font-bold uppercase tracking-wider text-sm rounded-xs transition-colors cursor-pointer"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/about')}
              className="flex items-center gap-2 px-6 py-3 bg-transparent border border-white/20 hover:border-white/50 text-white font-bold uppercase tracking-wider text-sm rounded-xs transition-colors cursor-pointer"
            >
              About Me
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="flex items-center gap-2 px-6 py-3 bg-transparent text-[#71717a] hover:text-white font-bold uppercase tracking-wider text-sm transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Right: Profile Photo in a clean retro frame */}
        <div className="w-full lg:w-auto shrink-0 flex justify-center mt-8 lg:mt-0">
          <RetroPanel
            title="PROFILE.img"
            subtitle="VISUAL IDENTITY"
            statusText="LOADED"
            className="w-fit"
          >
            <div className="p-1">
              <RetroProfilePhoto />
            </div>
          </RetroPanel>
        </div>

      </div>

      {/* Bottom Status */}
      <div className="mt-auto pt-6 border-t border-white/8 text-xs text-[#525252] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[#10b981] animate-pulse">●</span>
          <span>SYSTEM ONLINE // READY FOR HIRE</span>
        </div>
        <div className="flex items-center gap-4">
          <span>REACT 19</span>
          <span>THREE.JS</span>
          <span>TAILWIND</span>
        </div>
      </div>

    </div>
  )
}
