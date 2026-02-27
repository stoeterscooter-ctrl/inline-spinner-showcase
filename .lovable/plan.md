

## Root Cause

The `GooeySwitch` uses Framer Motion's reactive `animate` prop to drive tween animations, but `useSpring` hooks are also initialized with `isOn ? layout.travel : 0` — meaning they re-animate on every toggle regardless of mode. Combined with inline `animate` objects containing static keyframe arrays (`scaleX: [1, 1.25, 1]`), Framer Motion's change detection can fail to properly trigger the reverse tween.

## Fix: Use `useAnimationControls` for tween mode

Replace the reactive `animate` prop approach with explicit `controls.start()` calls in the toggle handler. This guarantees both directions animate reliably.

### Changes to `src/components/ui/gooey-switch.tsx`

1. Import `useAnimationControls` from `framer-motion`
2. Create animation controls for main blob, trail blobs, and highlight blobs
3. In `onToggle`, when `hasAnim` is true, call `controls.start({ x: target, ... })` with the tween transition config explicitly
4. When `!hasAnim` (spring mode), keep existing spring `.set()` logic unchanged
5. Attach controls to each `motion.div` via the `animate` prop (replacing the reactive object)
6. Memoize the `bezier` value with `useMemo` to prevent unnecessary array allocations
7. Stabilize `useSpring` initial values to use `defaultOn` (mount-time only) instead of reactive `isOn`, preventing springs from firing in tween mode

