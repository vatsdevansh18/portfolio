import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MascotSprite } from './MascotSprite';
import { MascotController } from './MascotController';
import { MascotStateMachine } from './MascotStateMachine';
import type { MascotExpression, MascotState } from './mascot.config';
import { cn } from '@/lib/utils';
import gsap from 'gsap';

export const Mascot = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<MascotController | null>(null);
  const stateMachineRef = useRef<MascotStateMachine>(new MascotStateMachine());
  const location = useLocation();
  
  const [state, setState] = useState<MascotState>('IDLE');
  const [expression, setExpression] = useState<MascotExpression>('NEUTRAL');

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize Controller if not already done
    if (!controllerRef.current) {
      controllerRef.current = new MascotController(containerRef.current);
      
      // Setup initial position (bottom right corner)
      gsap.set(containerRef.current, {
        x: window.innerWidth - 150,
        y: window.innerHeight - 200,
        opacity: 0,
        scale: 0.5
      });
      
      // Entrance animation
      gsap.to(containerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.5)',
        delay: 1,
        onComplete: () => {
          stateMachineRef.current.setState('IDLE', 'HAPPY');
          setTimeout(() => stateMachineRef.current.setExpression('NEUTRAL'), 2000);
        }
      });
    }

    // Subscribe to state changes
    const unsubscribe = stateMachineRef.current.subscribe((newState, newExp) => {
      setState(newState);
      setExpression(newExp);
      controllerRef.current?.playState(newState);
    });

    // Start Idle
    controllerRef.current.playState('IDLE');

    // Mouse tracking for subtle head movement
    const handleMouseMove = (e: MouseEvent) => {
      const currentState = stateMachineRef.current.getState();
      if (['SLEEP', 'JUMP', 'WAVE'].includes(currentState)) return;
      controllerRef.current?.lookAt(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Random idle behavior loop
    const idleInterval = setInterval(() => {
      const currentState = stateMachineRef.current.getState();
      if (currentState === 'IDLE') {
        const randomAction = Math.random();
        if (randomAction > 0.8) {
          stateMachineRef.current.setState('WAVE', 'HAPPY');
          setTimeout(() => stateMachineRef.current.setState('IDLE', 'NEUTRAL'), 2000);
        } else if (randomAction > 0.6) {
          stateMachineRef.current.setState('JUMP', 'SURPRISED');
          setTimeout(() => stateMachineRef.current.setState('IDLE', 'NEUTRAL'), 1000);
        } else if (randomAction > 0.4) {
          stateMachineRef.current.setExpression('THINKING');
          setTimeout(() => stateMachineRef.current.setExpression('NEUTRAL'), 3000);
        }
      }
    }, 10000);

    return () => {
      unsubscribe();
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(idleInterval);
    };
  }, []); // Only run once on mount

  // Handle Route Changes
  useEffect(() => {
    if (!controllerRef.current) return;
    
    // Determine new behavior based on path
    const path = location.pathname;
    
    stateMachineRef.current.setState('WALK', 'NEUTRAL');
    
    // Calculate a new position based on route to make it feel alive
    let targetX = window.innerWidth - 150;
    let targetY = window.innerHeight - 200;
    
    if (path === '/') {
      targetX = window.innerWidth - 200; // Stay in the empty right area
      stateMachineRef.current.setExpression('HAPPY');
    } else if (path.includes('/about')) {
      targetX = window.innerWidth / 2; // Move toward middle
      stateMachineRef.current.setExpression('THINKING');
    } else if (path.includes('/projects')) {
      targetX = window.innerWidth - 100;
      stateMachineRef.current.setExpression('SURPRISED'); // Excited about projects
    } else if (path.includes('/football')) {
      targetX = 100; // Move left
      stateMachineRef.current.setExpression('HAPPY');
      // Could trigger a kick animation here later
    }

    controllerRef.current.moveTo(targetX, targetY, () => {
      stateMachineRef.current.setState('IDLE');
      
      // Special entrance reactions
      if (path === '/') {
        stateMachineRef.current.setState('WAVE');
        setTimeout(() => stateMachineRef.current.setState('IDLE', 'NEUTRAL'), 1500);
      } else if (path.includes('/football')) {
        stateMachineRef.current.setState('JUMP', 'HAPPY');
        setTimeout(() => stateMachineRef.current.setState('IDLE', 'NEUTRAL'), 1000);
      }
    });

  }, [location.pathname]);

  // Handle clicking the mascot
  const handleMascotClick = () => {
    const currentState = stateMachineRef.current.getState();
    if (currentState === 'SLEEP') {
      stateMachineRef.current.setState('JUMP', 'SURPRISED');
      setTimeout(() => stateMachineRef.current.setState('IDLE', 'NEUTRAL'), 1500);
    } else {
      stateMachineRef.current.setState('WAVE', 'HAPPY');
      setTimeout(() => stateMachineRef.current.setState('IDLE', 'NEUTRAL'), 1500);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed z-50 pointer-events-auto cursor-pointer"
      style={{ willChange: 'transform' }}
      onClick={handleMascotClick}
    >
      <MascotSprite expression={expression} className="transition-colors duration-500" />
      
      {/* Dev debug info - can be removed later */}
      {/* <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-mono text-green-500 bg-black/80 px-1 rounded pointer-events-none whitespace-nowrap">
        {state} | {expression}
      </div> */}
    </div>
  );
};
