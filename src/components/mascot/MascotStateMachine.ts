import type { MascotState, MascotExpression } from './mascot.config';

type StateTransition = {
  to: MascotState;
  condition?: () => boolean;
};

// Define valid transitions to prevent conflicting states
export const StateMachineMap: Record<MascotState, MascotState[]> = {
  IDLE: ['WALK', 'RUN', 'WAVE', 'LOOK', 'THINK', 'SURPRISED', 'CONFUSED', 'SLEEP', 'INTERACT', 'JUMP', 'HIDDEN'],
  WALK: ['IDLE', 'RUN', 'JUMP', 'HIDDEN'],
  RUN: ['IDLE', 'WALK', 'JUMP', 'HIDDEN'],
  JUMP: ['IDLE', 'WALK', 'RUN', 'HIDDEN'],
  WAVE: ['IDLE', 'HIDDEN'],
  LOOK: ['IDLE', 'HIDDEN'],
  THINK: ['IDLE', 'HIDDEN'],
  SURPRISED: ['IDLE', 'HIDDEN'],
  CONFUSED: ['IDLE', 'HIDDEN'],
  KICK: ['IDLE', 'HIDDEN'],
  CELEBRATE: ['IDLE', 'HIDDEN'],
  SLEEP: ['IDLE', 'SURPRISED', 'HIDDEN'],
  INTERACT: ['IDLE', 'HIDDEN'],
  HIDDEN: ['IDLE']
};

export class MascotStateMachine {
  private currentState: MascotState = 'IDLE';
  private currentExpression: MascotExpression = 'NEUTRAL';
  private stateChangeListeners: ((state: MascotState, expression: MascotExpression) => void)[] = [];

  public getState(): MascotState {
    return this.currentState;
  }

  public getExpression(): MascotExpression {
    return this.currentExpression;
  }

  public canTransitionTo(newState: MascotState): boolean {
    return StateMachineMap[this.currentState]?.includes(newState) || this.currentState === newState;
  }

  public setState(newState: MascotState, expression?: MascotExpression) {
    if (this.canTransitionTo(newState)) {
      this.currentState = newState;
      if (expression) {
        this.currentExpression = expression;
      }
      this.notifyListeners();
    } else {
      console.warn(`[Mascot] Invalid transition from ${this.currentState} to ${newState}`);
    }
  }

  public setExpression(newExpression: MascotExpression) {
    this.currentExpression = newExpression;
    this.notifyListeners();
  }

  public subscribe(listener: (state: MascotState, expression: MascotExpression) => void) {
    this.stateChangeListeners.push(listener);
    return () => {
      this.stateChangeListeners = this.stateChangeListeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.stateChangeListeners.forEach(listener => listener(this.currentState, this.currentExpression));
  }
}
