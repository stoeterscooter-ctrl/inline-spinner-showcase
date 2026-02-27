import { useCallback, useMemo, useState } from "react";
import { motion, useAnimationControls, useSpring, useTransform } from "framer-motion";

export type AnimationCfg = {
  bezier?: readonly [number, number, number, number];
  duration?: number;
};

export type GooeySwitchProps = {
  defaultOn?: boolean;
  onChange?: (on: boolean) => void;
  size?: "sm" | "md" | "lg";
  anim?: AnimationCfg;
};

type SizeCfg = { width: number; height: number; blob: number };

const SIZE_MAP = {
  sm: { width: 64, height: 32, blob: 24 },
  md: { width: 80, height: 40, blob: 30 },
  lg: { width: 120, height: 56, blob: 42 },
} as const satisfies Record<"sm" | "md" | "lg", SizeCfg>;

export function GooeySwitch({
  defaultOn = false,
  onChange,
  size = "lg",
  anim,
}: GooeySwitchProps) {
  const [isOn, setIsOn] = useState(defaultOn);

  const layout = useMemo(() => {
    const cfg = SIZE_MAP[size];
    const padding = (cfg.height - cfg.blob) / 2;
    const travel = cfg.width - cfg.blob - padding * 2;
    return { cfg, padding, travel };
  }, [size]);

  const hasAnim = !!anim;
  const duration = anim?.duration ?? 0.5;
  const bezier = useMemo(
    () => anim?.bezier ?? ([0.25, 0.1, 0.25, 1] as const),
    [anim?.bezier]
  );

  // Animation controls for tween mode
  const mainControls = useAnimationControls();
  const trail1Controls = useAnimationControls();
  const trail2Controls = useAnimationControls();
  const trail3Controls = useAnimationControls();
  const highlight1Controls = useAnimationControls();
  const highlight2Controls = useAnimationControls();

  // Springs for spring mode — use defaultOn so they only set initial position
  const mainX = useSpring(defaultOn ? layout.travel : 0, {
    stiffness: 300,
    damping: 25,
    mass: 1.2,
  });
  const trailX1 = useSpring(defaultOn ? layout.travel : 0, {
    stiffness: 200,
    damping: 20,
    mass: 1.5,
  });
  const trailX2 = useSpring(defaultOn ? layout.travel : 0, {
    stiffness: 150,
    damping: 18,
    mass: 2,
  });
  const trailX3 = useSpring(defaultOn ? layout.travel : 0, {
    stiffness: 120,
    damping: 22,
    mass: 2.5,
  });

  const scaleX = useTransform(
    mainX,
    [0, layout.travel * 0.5, layout.travel],
    [1, 1.25, 1]
  );
  const scaleY = useTransform(
    mainX,
    [0, layout.travel * 0.5, layout.travel],
    [1, 0.8, 1]
  );

  const onToggle = useCallback(() => {
    setIsOn((prev) => {
      const next = !prev;
      const target = next ? layout.travel : 0;

      if (hasAnim) {
        // Tween mode: explicit controls.start for reliable bidirectional animation
        const ease = bezier as unknown as [number, number, number, number];
        mainControls.start({
          x: target,
          scaleX: [1, 1.25, 1],
          scaleY: [1, 0.8, 1],
          transition: { duration, ease },
        });
        trail1Controls.start({
          x: target,
          transition: { duration: duration * 1.4, ease },
        });
        trail2Controls.start({
          x: target,
          transition: { duration: duration * 1.3, ease },
        });
        trail3Controls.start({
          x: target,
          transition: { duration: duration * 1.2, ease },
        });
        highlight1Controls.start({
          x: target,
          transition: { duration, ease },
        });
        highlight2Controls.start({
          x: target,
          transition: { duration, ease },
        });
      } else {
        // Spring mode
        mainX.set(target);
        trailX1.set(target);
        trailX2.set(target);
        trailX3.set(target);
      }

      onChange?.(next);
      return next;
    });
  }, [layout.travel, onChange, hasAnim, bezier, duration, mainControls, trail1Controls, trail2Controls, trail3Controls, highlight1Controls, highlight2Controls, mainX, trailX1, trailX2, trailX3]);

  const trailDefs = useMemo(
    () => [
      { controls: trail3Controls, springX: trailX3, scale: 0.45 },
      { controls: trail2Controls, springX: trailX2, scale: 0.6 },
      { controls: trail1Controls, springX: trailX1, scale: 0.75 },
    ],
    [trail3Controls, trail2Controls, trail1Controls, trailX3, trailX2, trailX1]
  );

  return (
    <div className="relative">
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="gooey-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 20 -8"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        onClick={onToggle}
        className={[
          "relative overflow-hidden rounded-full cursor-pointer transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isOn ? "gooey-glow-active" : "gooey-glow",
        ].join(" ")}
        style={{ width: layout.cfg.width, height: layout.cfg.height }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            backgroundColor: isOn
              ? "hsl(var(--gooey-track-active))"
              : "hsl(var(--gooey-track))",
          }}
          transition={{ duration: 0.2 }}
        />

        <div className="absolute inset-0" style={{ filter: "url(#gooey-filter)" }}>
          {/* Trail blobs */}
          {trailDefs.map(({ controls, springX, scale }, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gooey-blob"
              animate={hasAnim ? controls : undefined}
              style={{
                x: hasAnim ? undefined : springX,
                left: layout.padding,
                top: "50%",
                translateY: "-50%",
                width: layout.cfg.blob * scale,
                height: layout.cfg.blob * scale,
              }}
            />
          ))}

          {/* Main blob */}
          <motion.div
            className="absolute rounded-full bg-gooey-blob"
            animate={hasAnim ? mainControls : undefined}
            style={{
              x: hasAnim ? undefined : mainX,
              scaleX: hasAnim ? undefined : scaleX,
              scaleY: hasAnim ? undefined : scaleY,
              left: layout.padding,
              top: "50%",
              translateY: "-50%",
              width: layout.cfg.blob,
              height: layout.cfg.blob,
            }}
          />

          {/* Floating highlight blobs */}
          <motion.div
            className="absolute rounded-full bg-gooey-blob"
            animate={hasAnim ? highlight1Controls : undefined}
            style={{
              x: hasAnim ? undefined : mainX,
              left: layout.padding + layout.cfg.blob * 0.15,
              top: "28%",
              width: layout.cfg.blob * 0.3,
              height: layout.cfg.blob * 0.3,
            }}
          />
          <motion.div
            className="absolute rounded-full bg-gooey-blob"
            animate={hasAnim ? highlight2Controls : undefined}
            style={{
              x: hasAnim ? undefined : mainX,
              left: layout.padding + layout.cfg.blob * 0.2,
              bottom: "26%",
              width: layout.cfg.blob * 0.25,
              height: layout.cfg.blob * 0.25,
            }}
          />
        </div>
      </button>
    </div>
  );
}
