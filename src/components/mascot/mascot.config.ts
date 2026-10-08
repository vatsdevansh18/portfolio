export const MASCOT_CONFIG = {
  colors: {
    primary: 'currentColor',
    screen: 'rgba(0, 20, 0, 0.8)',
    highlight: '#4ade80',
  },
  animation: {
    idleDuration: 2,
    walkSpeed: 1,
    runSpeed: 0.5,
    bounceHeight: 10,
    jumpHeight: 40,
  },
  physics: {
    friction: 0.8,
    acceleration: 0.1,
    maxSpeed: 5,
  },
  interaction: {
    idleTimeout: 10000, // Ms before triggering a random idle animation
    mouseFollowStrength: 0.05, // How much the head follows the mouse
  },
  dimensions: {
    desktopScale: 1,
    mobileScale: 0.6,
  }
};

export type MascotState = 
  | 'IDLE' 
  | 'WALK' 
  | 'RUN' 
  | 'JUMP' 
  | 'WAVE' 
  | 'LOOK' 
  | 'THINK' 
  | 'SURPRISED' 
  | 'CONFUSED' 
  | 'KICK' 
  | 'CELEBRATE' 
  | 'SLEEP' 
  | 'INTERACT'
  | 'HIDDEN';

export type MascotExpression = 'NEUTRAL' | 'HAPPY' | 'SURPRISED' | 'THINKING' | 'CONFUSED' | 'SLEEPING';
