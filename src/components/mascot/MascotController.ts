import gsap from 'gsap';
import { MascotAnimations } from './MascotAnimations';
import type { MascotState } from './mascot.config';

export class MascotController {
  private container: HTMLElement;
  private core: Element | null;
  private head: Element | null;
  private shadow: Element | null;
  private hands: Element[];
  
  private currentAnimation: gsap.core.Timeline | null = null;
  private isReducedMotion: boolean = false;

  constructor(container: HTMLElement) {
    this.container = container;
    this.core = container.querySelector('#mascot-core');
    this.head = container.querySelector('#mascot-head');
    this.shadow = container.querySelector('#mascot-shadow');
    
    const handL = container.querySelector('#mascot-hand-l');
    const handR = container.querySelector('#mascot-hand-r');
    this.hands = [handL, handR].filter(Boolean) as Element[];
    
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  public playState(state: MascotState) {
    if (this.currentAnimation) {
      this.currentAnimation.kill();
      // Reset transforms
      gsap.set([this.core, this.head, ...this.hands], { clearProps: "all" });
    }

    if (this.isReducedMotion) {
      // In reduced motion, we skip complex tweens.
      return;
    }

    switch (state) {
      case 'IDLE':
      case 'THINK':
      case 'CONFUSED':
      case 'SURPRISED':
      case 'LOOK':
        this.currentAnimation = MascotAnimations.idle(this.core, this.head, this.hands);
        break;
      case 'WALK':
      case 'RUN':
        this.currentAnimation = MascotAnimations.walk(this.core, this.hands);
        break;
      case 'WAVE':
      case 'CELEBRATE':
        this.currentAnimation = MascotAnimations.wave(this.hands);
        break;
      case 'JUMP':
        this.currentAnimation = MascotAnimations.jump(this.core, this.shadow);
        break;
      case 'SLEEP':
        // Just settle on the ground
        this.currentAnimation = gsap.timeline().to(this.core, { y: 20, duration: 1, ease: 'power2.out' });
        break;
      default:
        this.currentAnimation = MascotAnimations.idle(this.core, this.head, this.hands);
        break;
    }
  }

  public moveTo(x: number, y: number, onComplete?: () => void) {
    if (this.isReducedMotion) {
      gsap.set(this.container, { x, y });
      if (onComplete) onComplete();
      return;
    }

    const currentX = gsap.getProperty(this.container, "x") as number;
    const distance = Math.abs(x - currentX);
    const duration = Math.max(0.5, distance / 300); // 300px per second

    // Face direction
    const direction = x > currentX ? 1 : -1;
    gsap.to(this.core, { scaleX: direction, duration: 0.2 });

    gsap.to(this.container, {
      x,
      y,
      duration,
      ease: "power1.inOut",
      onComplete
    });
  }

  public lookAt(mouseX: number, mouseY: number) {
    if (this.isReducedMotion || !this.head) return;
    
    const rect = this.container.getBoundingClientRect();
    const mascotX = rect.left + rect.width / 2;
    const mascotY = rect.top + rect.height / 2;
    
    const dx = mouseX - mascotX;
    const dy = mouseY - mascotY;
    
    // Calculate subtle rotation and translation
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const cappedAngle = Math.max(-15, Math.min(15, angle)); // Don't snap neck
    
    const tx = Math.max(-5, Math.min(5, dx * 0.05));
    const ty = Math.max(-5, Math.min(5, dy * 0.05));

    gsap.to(this.head, {
      rotation: cappedAngle,
      x: tx,
      y: ty,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }

  public cleanup() {
    if (this.currentAnimation) {
      this.currentAnimation.kill();
    }
    gsap.killTweensOf(this.container);
  }
}
