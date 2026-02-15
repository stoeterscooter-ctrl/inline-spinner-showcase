import { cn } from "@/lib/utils";
import { type CSSProperties } from "react";

export type SpinnerVariant =
  | "border" | "thin" | "thick" | "dual" | "half" | "quarter"
  | "material" | "eased" | "pulse" | "chase"
  | "blade" | "dots" | "orbit" | "gradient" | "multi-ring";

export type SpinnerSize = "xs" | "sm" | "md" | "lg";
export type SpinnerColor = "default" | "primary" | "foreground" | "destructive";

interface SpinnerProps {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  color?: SpinnerColor;
  speed?: number;
  className?: string;
}

const sizeMap = {
  xs: { container: "w-3 h-3", stroke: 2, bladeScale: 0.6 },
  sm: { container: "w-4 h-4", stroke: 2, bladeScale: 0.8 },
  md: { container: "w-5 h-5", stroke: 2.5, bladeScale: 1 },
  lg: { container: "w-6 h-6", stroke: 3, bladeScale: 1.2 },
};

const colorMap: Record<SpinnerColor, string> = {
  default: "text-muted-foreground",
  primary: "text-primary",
  foreground: "text-foreground",
  destructive: "text-destructive",
};

// Border track: currentColor at low opacity. Active sides: full currentColor.
const borderStyle = (activeSides: string[], trackOpacity = 25): CSSProperties => ({
  borderColor: `color-mix(in srgb, currentColor ${trackOpacity}%, transparent)`,
  ...Object.fromEntries(activeSides.map((s) => [`border${s}Color`, "currentColor"])),
});

// Transparent track — no visible track, only active sides
const borderTransparent = (activeSides: string[]): CSSProperties => ({
  borderColor: "transparent",
  ...Object.fromEntries(activeSides.map((s) => [`border${s}Color`, "currentColor"])),
});

export function Spinner({
  variant = "border",
  size = "md",
  color = "default",
  speed = 1,
  className,
}: SpinnerProps) {
  const { container, stroke, bladeScale } = sizeMap[size];
  const col = colorMap[color];
  const dur = (ms: number): CSSProperties =>
    speed !== 1 ? { animationDuration: `${ms / speed}ms` } : {};
  const t = (seconds: number) => seconds / speed;

  // ── Border variants ────────────────────────────────────────────
  if (variant === "border") {
    return (
      <div
        className={cn(container, col, "border-2 rounded-full animate-spin", className)}
        style={{ ...borderStyle(["Top"]), ...dur(1000) }}
      />
    );
  }
  if (variant === "thin") {
    return (
      <div
        className={cn(container, col, "border rounded-full animate-spin", className)}
        style={{ ...borderStyle(["Top"]), ...dur(1000) }}
      />
    );
  }
  if (variant === "thick") {
    return (
      <div
        className={cn(container, col, "border-[3px] rounded-full animate-spin", className)}
        style={{ ...borderStyle(["Top"], 20), ...dur(1000) }}
      />
    );
  }
  if (variant === "dual") {
    return (
      <div
        className={cn(container, col, "border-2 rounded-full animate-spin", className)}
        style={{ ...borderStyle(["Top", "Bottom"]), ...dur(1000) }}
      />
    );
  }
  if (variant === "half") {
    return (
      <div
        className={cn(container, col, "border-2 rounded-full animate-spin", className)}
        style={{ ...borderTransparent(["Top", "Right"]), ...dur(1000) }}
      />
    );
  }
  if (variant === "quarter") {
    return (
      <div
        className={cn(container, col, "border-2 rounded-full animate-spin", className)}
        style={{ ...borderTransparent(["Top"]), ...dur(1000) }}
      />
    );
  }

  // ── SVG spinners ───────────────────────────────────────────────
  if (variant === "material") {
    return (
      <svg
        className={cn(container, col, "animate-[spin_2s_linear_infinite]", className)}
        viewBox="0 0 24 24"
        style={dur(2000)}
      >
        <circle
          className="animate-dash"
          cx="12" cy="12" r="10" fill="none"
          stroke="currentColor" strokeWidth={stroke} strokeLinecap="round"
          style={{ strokeDasharray: "1, 200", strokeDashoffset: 0, ...dur(1500) }}
        />
      </svg>
    );
  }
  if (variant === "eased") {
    return (
      <svg
        className={cn(container, col, "animate-spin-ease", className)}
        viewBox="0 0 24 24"
        style={dur(1400)}
      >
        <circle
          cx="12" cy="12" r="10" fill="none"
          stroke="currentColor" strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray="31.4 31.4"
        />
      </svg>
    );
  }
  if (variant === "pulse") {
    return (
      <svg
        className={cn(container, col, "animate-spin", className)}
        viewBox="0 0 24 24"
        style={dur(1000)}
      >
        <circle
          cx="12" cy="12" r="10" fill="none"
          stroke="currentColor" strokeWidth={stroke - 0.5} opacity={0.2}
        />
        <circle
          className="animate-pulse-arc"
          cx="12" cy="12" r="10" fill="none"
          stroke="currentColor" strokeWidth={stroke - 0.5} strokeLinecap="round"
          style={{ strokeDasharray: "15.7 47.1", ...dur(1000) }}
        />
      </svg>
    );
  }
  if (variant === "chase") {
    return (
      <svg
        className={cn(container, col, "animate-[spin_0.8s_linear_infinite]", className)}
        viewBox="0 0 24 24"
        style={dur(800)}
      >
        <circle
          className="animate-chase"
          cx="12" cy="12" r="10" fill="none"
          stroke="currentColor" strokeWidth={stroke} strokeLinecap="round"
          style={dur(1200)}
        />
      </svg>
    );
  }

  // ── Blade (iOS-style) ──────────────────────────────────────────
  if (variant === "blade") {
    const blades = 8;
    return (
      <div className={cn(container, col, "relative", className)}>
        {Array.from({ length: blades }).map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 animate-fade-sequence"
            style={{
              transform: `rotate(${i * (360 / blades)}deg)`,
              animationDelay: `${-t(i * (1000 / blades))}ms`,
              ...dur(1000),
            }}
          >
            <div
              className="bg-current rounded-full mx-auto"
              style={{ width: `${2 * bladeScale}px`, height: `${6 * bladeScale}px`, marginTop: `${bladeScale}px` }}
            />
          </div>
        ))}
      </div>
    );
  }

  // ── Fading dots ────────────────────────────────────────────────
  if (variant === "dots") {
    const dots = 8;
    return (
      <div className={cn(container, col, "relative", className)}>
        {Array.from({ length: dots }).map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 flex justify-center animate-fade-sequence"
            style={{
              transform: `rotate(${i * (360 / dots)}deg)`,
              animationDelay: `${-t(i * (1000 / dots))}ms`,
              ...dur(1000),
            }}
          >
            <div
              className="bg-current rounded-full"
              style={{ width: `${3 * bladeScale}px`, height: `${3 * bladeScale}px` }}
            />
          </div>
        ))}
      </div>
    );
  }

  // ── Orbit dots ─────────────────────────────────────────────────
  if (variant === "orbit") {
    return (
      <div className={cn(container, col, "relative", className)}>
        {[
          { opacity: 1, scale: 3, delay: 0 },
          { opacity: 0.6, scale: 2.5, delay: -500 },
          { opacity: 0.3, scale: 2, delay: -1000 },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute inset-0 animate-orbit"
            style={{ animationDelay: `${t(dot.delay)}ms`, ...dur(1500) }}
          >
            <div
              className="bg-current rounded-full mx-auto"
              style={{
                width: `${dot.scale * bladeScale}px`,
                height: `${dot.scale * bladeScale}px`,
                opacity: dot.opacity,
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  // ── Gradient arc ───────────────────────────────────────────────
  if (variant === "gradient") {
    return (
      <svg
        className={cn(container, col, "animate-gradient-rotate", className)}
        viewBox="0 0 24 24"
        style={dur(1000)}
      >
        <defs>
          <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
          </linearGradient>
        </defs>
        <circle
          cx="12" cy="12" r="10" fill="none"
          stroke="url(#spinner-gradient)" strokeWidth={stroke} strokeLinecap="round"
        />
      </svg>
    );
  }

  // ── Multi-ring ─────────────────────────────────────────────────
  if (variant === "multi-ring") {
    return (
      <div className={cn(container, col, "relative", className)}>
        <div
          className="absolute inset-0 border-2 rounded-full animate-spin"
          style={{ ...borderTransparent(["Top"]), ...dur(1000) }}
        />
        <div
          className="absolute inset-[3px] border rounded-full animate-spin"
          style={{
            ...borderTransparent(["Top"]),
            opacity: 0.6,
            animationDirection: "reverse",
            ...dur(600),
          }}
        />
      </div>
    );
  }

  return null;
}

export const spinnerVariants: SpinnerVariant[] = [
  "border", "thin", "thick", "dual", "half", "quarter",
  "material", "eased", "pulse", "chase",
  "blade", "dots", "orbit", "gradient", "multi-ring",
];

export const spinnerColors: SpinnerColor[] = ["default", "primary", "foreground", "destructive"];
