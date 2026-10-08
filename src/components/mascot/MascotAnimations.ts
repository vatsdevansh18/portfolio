import gsap from 'gsap';

export class MascotAnimations {
  
  static idle(core: Element | null, head: Element | null, hands: Element[]): gsap.core.Timeline {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    if (core) {
      tl.to(core, {
        y: -10,
        rotation: 2,
        duration: 2,
        ease: 'sine.inOut'
      }, 0);
    }

    if (hands.length) {
      tl.to(hands, {
        y: -5,
        rotation: -5,
        stagger: 0.2,
        duration: 1.5,
        ease: 'sine.inOut'
      }, 0);
    }

    return tl;
  }

  static walk(core: Element | null, hands: Element[]): gsap.core.Timeline {
    const tl = gsap.timeline({ repeat: -1 });
    
    if (core) {
      tl.to(core, {
        y: -15,
        rotation: 10,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut'
      });
    }

    if (hands.length > 0) {
      tl.to(hands[0], { x: 10, y: -10, duration: 0.3, yoyo: true, repeat: 1 }, 0);
    }
    if (hands.length > 1) {
      tl.to(hands[1], { x: -10, y: 10, duration: 0.3, yoyo: true, repeat: 1 }, 0);
    }
    
    return tl;
  }
  
  static jump(core: Element | null, shadow: Element | null): gsap.core.Timeline {
    const tl = gsap.timeline();
    
    if (core && shadow) {
      tl.to(core, { scaleY: 0.8, scaleX: 1.2, y: 10, duration: 0.15, transformOrigin: 'bottom center', ease: 'power2.in' }) // Squash
        .to(core, { y: -100, scaleY: 1.1, scaleX: 0.9, duration: 0.4, ease: 'power2.out' }) // Stretch & up
        .to(shadow, { scale: 0.5, alpha: 0.1, duration: 0.4, transformOrigin: 'center' }, "<")
        .to(core, { y: 0, scaleY: 1, scaleX: 1, duration: 0.4, ease: 'bounce.out' }) // Down & settle
        .to(shadow, { scale: 1, alpha: 0.4, duration: 0.4, ease: 'bounce.out' }, "<");
    }
    
    return tl;
  }

  static wave(hands: Element[]): gsap.core.Timeline {
    const tl = gsap.timeline();
    if (hands.length > 1) {
      // Right hand wave
      tl.to(hands[1], {
        x: 10,
        y: -30,
        rotation: 20,
        duration: 0.2
      })
      .to(hands[1], {
        rotation: -20,
        duration: 0.1,
        yoyo: true,
        repeat: 5,
        ease: 'sine.inOut'
      })
      .to(hands[1], {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    return tl;
  }
}
