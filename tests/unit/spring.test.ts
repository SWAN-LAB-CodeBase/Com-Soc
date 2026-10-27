import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createSpring } from "@/lib/spring";

// Drive requestAnimationFrame manually at 60 fps.
let queue: FrameRequestCallback[] = [];
let now = 0;

beforeEach(() => {
  queue = [];
  now = 0;
  globalThis.requestAnimationFrame = (cb) => (queue.push(cb), queue.length);
  globalThis.cancelAnimationFrame = () => {};
  globalThis.performance = { now: () => now } as Performance;
});

afterEach(() => {
  queue = [];
});

function runFrames(max = 600) {
  for (let i = 0; i < max && queue.length; i++) {
    now += 1000 / 60;
    const cbs = queue;
    queue = [];
    cbs.forEach((cb) => cb(now));
  }
}

describe("createSpring", () => {
  it("settles exactly on the target", () => {
    let value = 0;
    const spring = createSpring(0, (v) => (value = v), { response: 0.4, dampingRatio: 1 });
    spring.set(100);
    runFrames();
    expect(value).toBe(100);
    expect(queue).toHaveLength(0); // stops scheduling frames once at rest
  });

  it("never overshoots when critically damped", () => {
    const seen: number[] = [];
    const spring = createSpring(0, (v) => seen.push(v), { response: 0.4, dampingRatio: 1 });
    spring.set(1);
    runFrames();
    expect(Math.max(...seen)).toBeLessThanOrEqual(1 + 1e-9);
  });

  it("overshoots when under-damped", () => {
    const seen: number[] = [];
    const spring = createSpring(0, (v) => seen.push(v), { response: 0.4, dampingRatio: 0.5 });
    spring.set(1);
    runFrames();
    expect(Math.max(...seen)).toBeGreaterThan(1);
  });

  it("retargets mid-flight from the current value without jumping", () => {
    const seen: number[] = [];
    const spring = createSpring(0, (v) => seen.push(v), { response: 0.4, dampingRatio: 1 });
    spring.set(100);
    for (let i = 0; i < 6; i++) {
      now += 1000 / 60;
      const cbs = queue;
      queue = [];
      cbs.forEach((cb) => cb(now));
    }
    const before = seen.at(-1)!;
    spring.set(-100);
    now += 1000 / 60;
    const cbs = queue;
    queue = [];
    cbs.forEach((cb) => cb(now));
    // Velocity carries through the reversal: the next frame is still near the
    // previous value, not snapped toward the new target.
    expect(Math.abs(seen.at(-1)! - before)).toBeLessThan(10);
    runFrames();
    expect(seen.at(-1)).toBe(-100);
  });

  it("jump() snaps immediately", () => {
    let value = 0;
    const spring = createSpring(0, (v) => (value = v));
    spring.jump(42);
    expect(value).toBe(42);
  });
});
