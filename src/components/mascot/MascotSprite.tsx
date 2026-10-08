import React, { forwardRef } from 'react';
import type { MascotExpression } from './mascot.config';
import { cn } from '@/lib/utils';

interface MascotSpriteProps {
  className?: string;
  expression?: MascotExpression;
}

export const MascotSprite = forwardRef<SVGSVGElement, MascotSpriteProps>(
  ({ className, expression = 'NEUTRAL' }, ref) => {
    
    const renderFace = () => {
      switch (expression) {
        case 'HAPPY':
          return (
            <g className="text-green-900 fill-current">
              <path d="M 35 45 Q 40 38 45 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 55 45 Q 60 38 65 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 45 55 Q 50 60 55 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>
          );
        case 'SURPRISED':
          return (
            <g className="text-green-900 fill-current">
              <circle cx="40" cy="45" r="4" />
              <circle cx="60" cy="45" r="4" />
              <circle cx="50" cy="58" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
            </g>
          );
        case 'THINKING':
          return (
            <g className="text-green-900 fill-current">
              <rect x="37" y="44" width="6" height="2" />
              <rect x="57" y="44" width="6" height="2" />
              <circle cx="45" cy="58" r="1.5" />
              <circle cx="50" cy="58" r="1.5" />
              <circle cx="55" cy="58" r="1.5" />
            </g>
          );
        case 'CONFUSED':
          return (
            <g className="text-green-900 fill-current">
              <circle cx="40" cy="45" r="3" />
              <circle cx="60" cy="42" r="5" />
              <path d="M 46 58 L 54 58" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </g>
          );
        case 'SLEEPING':
          return (
            <g className="text-green-900/50 fill-current">
              <path d="M 36 45 L 44 45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M 56 45 L 64 45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <text x="60" y="35" fontSize="10" fontFamily="monospace" fill="currentColor">z</text>
              <text x="68" y="28" fontSize="8" fontFamily="monospace" fill="currentColor">z</text>
            </g>
          );
        case 'NEUTRAL':
        default:
          return (
            <g className="text-green-900 fill-current">
              <rect x="38" y="42" width="4" height="6" />
              <rect x="58" y="42" width="4" height="6" />
            </g>
          );
      }
    };

    return (
      <svg 
        ref={ref}
        viewBox="0 0 100 100" 
        className={cn("w-20 h-20 drop-shadow-md overflow-visible", className)}
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse id="mascot-shadow" cx="50" cy="90" rx="20" ry="4" fill="rgba(0,0,0,0.2)" />

        <g id="mascot-core">
          {/* Hands */}
          <circle id="mascot-hand-l" cx="20" cy="65" r="8" fill="currentColor" className="text-green-600" />
          <circle id="mascot-hand-r" cx="80" cy="65" r="8" fill="currentColor" className="text-green-600" />

          {/* Head */}
          <g id="mascot-head" transformOrigin="50 50">
            <rect x="25" y="25" width="50" height="50" rx="12" fill="currentColor" className="text-green-400" stroke="currentColor" strokeWidth="2" />
            
            <g id="mascot-face">
              {renderFace()}
            </g>
          </g>
        </g>
      </svg>
    );
  }
);

MascotSprite.displayName = 'MascotSprite';
