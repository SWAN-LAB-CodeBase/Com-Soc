/**
 * A tiny interruptible spring, parameterised the way Apple describes motion:
 * `response` (seconds to reach the target, not a duration) and
 * `dampingRatio` (1 = critically damped, no overshoot; < 1 = bounce).
 *
 * Retargeting mid-flight keeps the current value *and* velocity, so motion
 * never jumps or hits a "brick wall" when the user reverses direction.
 * Animate each axis with its own spring.
 */

export interface SpringOptions {
  response?: number;
  dampingRatio?: number;
}

export interface Spring {
  /** Move toward a new target from the current value and velocity. */
  set(target: number): void;
  /** Snap immediately (e.g. reduced motion). */
  jump(value: number): void;
  stop(): void;
}

const STEP = 1 / 240; // fixed integration step for stability
const MAX_FRAME = 0.064; // clamp long frames (tab switches) to avoid explosions

export function createSpring(
  initial: number,
  onUpdate: (value: number) => void,
  { response = 0.4, dampingRatio = 1 }: SpringOptions = {},
): Spring {
  const stiffness = (2 * Math.PI) / response;
  const k = stiffness * stiffness;
  const c = 2 * dampingRatio * stiffness;

  let value = initial;
  let velocity = 0;
  let target = initial;
  let frame = 0;
  let last = 0;

  const tick = (now: number) => {
    let dt = Math.min(MAX_FRAME, (now - last) / 1000);
    last = now;
    while (dt > 0) {
      const h = Math.min(STEP, dt);
      velocity += (-k * (value - target) - c * velocity) * h; // semi-implicit Euler
      value += velocity * h;
      dt -= h;
    }
    if (Math.abs(velocity) < 0.001 && Math.abs(value - target) < 0.0005) {
      value = target;
      velocity = 0;
      frame = 0;
      onUpdate(value);
      return;
    }
    onUpdate(value);
    frame = requestAnimationFrame(tick);
  };

  return {
    set(next) {
      target = next;
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    },
    jump(next) {
      cancelAnimationFrame(frame);
      frame = 0;
      value = target = next;
      velocity = 0;
      onUpdate(value);
    },
    stop() {
      cancelAnimationFrame(frame);
      frame = 0;
    },
  };
}

/** True when the user prefers reduced motion (safe on the server). */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** True for devices with a precise hovering pointer (mouse, trackpad). */
export function hasFinePointer(): boolean {
  return (
    typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}
