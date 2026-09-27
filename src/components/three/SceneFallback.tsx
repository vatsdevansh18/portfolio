export function SceneFallback() {
  return (
    <div 
      className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#070707] select-none"
      aria-label="Tactical Spatial Pitch Architecture Diagram"
    >
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-tactical-grid opacity-60" />

      {/* Isometric/Perspective SVG Tactical Pitch */}
      <svg
        viewBox="0 0 800 600"
        className="w-full max-w-3xl h-auto opacity-75 transform perspective-[1000px] rotate-x-[25deg]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Boundary / Touchlines */}
        <rect
          x="120"
          y="80"
          width="560"
          height="440"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Halfway Line */}
        <line
          x1="400"
          y1="80"
          x2="400"
          y2="520"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="1.5"
        />

        {/* Center Circle */}
        <circle
          cx="400"
          cy="300"
          r="70"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1.5"
        />
        <circle cx="400" cy="300" r="3" fill="#10b981" />

        {/* Left Penalty Box */}
        <rect
          x="120"
          y="170"
          width="130"
          height="260"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
        />
        {/* Left Goal Area */}
        <rect
          x="120"
          y="230"
          width="45"
          height="140"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1"
        />

        {/* Right Penalty Box */}
        <rect
          x="550"
          y="170"
          width="130"
          height="260"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
        />
        {/* Right Goal Area */}
        <rect
          x="635"
          y="230"
          width="45"
          height="140"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1"
        />

        {/* Tactical Coordinate Channel Lines */}
        <line
          x1="120"
          y1="210"
          x2="680"
          y2="210"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
        <line
          x1="120"
          y1="390"
          x2="680"
          y2="390"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />

        {/* Tactical Player Marker: Devansh Vats (Defensive Midfielder / Anchor) */}
        <g transform="translate(350, 320)">
          {/* Target Ring */}
          <circle cx="0" cy="0" r="14" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
          <circle cx="0" cy="0" r="4" fill="#10b981" />
          <line x1="0" y1="0" x2="0" y2="-45" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />

          {/* Node Metadata Tag */}
          <g transform="translate(15, -45)">
            <rect x="0" y="-12" width="160" height="28" fill="#0d0d0d" stroke="rgba(255, 255, 255, 0.15)" rx="2" />
            <text x="8" y="0" fill="#ededed" fontFamily="monospace" fontSize="8" fontWeight="bold">
              NODE: DEVANSH VATS
            </text>
            <text x="8" y="10" fill="#8c8c8c" fontFamily="monospace" fontSize="7">
              ROLE: CM / VICE CAPTAIN
            </text>
          </g>
        </g>
      </svg>

      {/* Tactical Labels */}
      <div className="absolute bottom-6 left-6 font-mono text-[10px] text-[#8c8c8c]">
        <div>PITCH ARCHITECTURE [2D RESTRAINT MODE]</div>
        <div className="text-[#525252]">X: +01.50 | Y: +00.40 | Z: +07.00</div>
      </div>
    </div>
  )
}
