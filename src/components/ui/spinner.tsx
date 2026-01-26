import { cn } from "@/lib/utils";

export type SpinnerVariant =
  | "border"
  | "thin"
  | "thick"
  | "dual"
  | "half"
  | "quarter"
  | "material"
  | "eased"
  | "pulse"
  | "chase"
  | "blade"
  | "dots"
  | "orbit"
  | "gradient"
  | "multi-ring";

export type SpinnerSize = "xs" | "sm" | "md" | "lg";

interface SpinnerProps {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  className?: string;
}

const sizeMap = {
  xs: { container: "w-3 h-3", stroke: 2, bladeScale: 0.6 },
  sm: { container: "w-4 h-4", stroke: 2, bladeScale: 0.8 },
  md: { container: "w-5 h-5", stroke: 2.5, bladeScale: 1 },
  lg: { container: "w-6 h-6", stroke: 3, bladeScale: 1.2 },
};

export function Spinner({ variant = "border", size = "md", className }: SpinnerProps) {
  const { container, stroke, bladeScale } = sizeMap[size];

  // CSS-based border spinners
  if (variant === "border") {
    return (
      <div
        className={cn(
          container,
          "border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin",
          className
        )}
      />
    );
  }

  if (variant === "thin") {
    return (
      <div
        className={cn(
          container,
          "border border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin",
          className
        )}
      />
    );
  }

  if (variant === "thick") {
    return (
      <div
        className={cn(
          container,
          "border-[3px] border-muted-foreground/20 border-t-muted-foreground rounded-full animate-spin",
          className
        )}
      />
    );
  }

  if (variant === "dual") {
    return (
      <div
        className={cn(
          container,
          "border-2 border-muted-foreground/30 border-t-muted-foreground border-b-muted-foreground rounded-full animate-spin",
          className
        )}
      />
    );
  }

  if (variant === "half") {
    return (
      <div
        className={cn(
          container,
          "border-2 border-transparent border-t-muted-foreground border-r-muted-foreground rounded-full animate-spin",
          className
        )}
      />
    );
  }

  if (variant === "quarter") {
    return (
      <div
        className={cn(
          container,
          "border-2 border-transparent border-t-muted-foreground rounded-full animate-spin",
          className
        )}
      />
    );
  }

  // SVG-based spinners
  if (variant === "material") {
    return (
      <svg className={cn(container, "animate-[spin_2s_linear_infinite]", className)} viewBox="0 0 24 24">
        <circle
          className="stroke-muted-foreground animate-dash"
          cx="12"
          cy="12"
          r="10"
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          style={{ strokeDasharray: "1, 200", strokeDashoffset: 0 }}
        />
      </svg>
    );
  }

  if (variant === "eased") {
    return (
      <svg className={cn(container, "animate-spin-ease", className)} viewBox="0 0 24 24">
        <circle
          className="stroke-muted-foreground"
          cx="12"
          cy="12"
          r="10"
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray="31.4 31.4"
        />
      </svg>
    );
  }

  if (variant === "pulse") {
    return (
      <svg className={cn(container, "animate-spin", className)} viewBox="0 0 24 24">
        <circle
          className="stroke-muted-foreground/20"
          cx="12"
          cy="12"
          r="10"
          fill="none"
          strokeWidth={stroke - 0.5}
        />
        <circle
          className="stroke-muted-foreground animate-pulse-arc"
          cx="12"
          cy="12"
          r="10"
          fill="none"
          strokeWidth={stroke - 0.5}
          strokeLinecap="round"
          style={{ strokeDasharray: "15.7 47.1" }}
        />
      </svg>
    );
  }

  if (variant === "chase") {
    return (
      <svg className={cn(container, "animate-[spin_0.8s_linear_infinite]", className)} viewBox="0 0 24 24">
        <circle
          className="stroke-muted-foreground animate-chase"
          cx="12"
          cy="12"
          r="10"
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Blade spinner (iOS-style)
  if (variant === "blade") {
    const blades = 8;
    return (
      <div className={cn(container, "relative", className)}>
        {Array.from({ length: blades }).map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 animate-fade-sequence"
            style={{
              transform: `rotate(${i * (360 / blades)}deg)`,
              animationDelay: `${-i * (1 / blades)}s`,
            }}
          >
            <div
              className="bg-muted-foreground rounded-full mx-auto"
              style={{
                width: `${2 * bladeScale}px`,
                height: `${6 * bladeScale}px`,
                marginTop: `${1 * bladeScale}px`,
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  // Fading dots
  if (variant === "dots") {
    const dots = 8;
    return (
      <div className={cn(container, "relative", className)}>
        {Array.from({ length: dots }).map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 flex justify-center animate-fade-sequence"
            style={{
              transform: `rotate(${i * (360 / dots)}deg)`,
              animationDelay: `${-i * (1 / dots)}s`,
            }}
          >
            <div
              className="bg-muted-foreground rounded-full"
              style={{
                width: `${3 * bladeScale}px`,
                height: `${3 * bladeScale}px`,
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  // Orbit dots
  if (variant === "orbit") {
    return (
      <div className={cn(container, "relative", className)}>
        <div className="absolute inset-0 animate-orbit">
          <div
            className="bg-muted-foreground rounded-full mx-auto"
            style={{ width: `${3 * bladeScale}px`, height: `${3 * bladeScale}px` }}
          />
        </div>
        <div className="absolute inset-0 animate-orbit" style={{ animationDelay: "-0.5s" }}>
          <div
            className="bg-muted-foreground/60 rounded-full mx-auto"
            style={{ width: `${2.5 * bladeScale}px`, height: `${2.5 * bladeScale}px` }}
          />
        </div>
        <div className="absolute inset-0 animate-orbit" style={{ animationDelay: "-1s" }}>
          <div
            className="bg-muted-foreground/30 rounded-full mx-auto"
            style={{ width: `${2 * bladeScale}px`, height: `${2 * bladeScale}px` }}
          />
        </div>
      </div>
    );
  }

  // Gradient arc
  if (variant === "gradient") {
    return (
      <svg className={cn(container, "animate-gradient-rotate", className)} viewBox="0 0 24 24">
        <defs>
          <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
          </linearGradient>
        </defs>
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="url(#spinner-gradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          className="text-muted-foreground"
        />
      </svg>
    );
  }

  // Multi-ring
  if (variant === "multi-ring") {
    return (
      <div className={cn(container, "relative", className)}>
        <div className="absolute inset-0 border-2 border-transparent border-t-muted-foreground rounded-full animate-spin" />
        <div
          className="absolute inset-[3px] border border-transparent border-t-muted-foreground/60 rounded-full animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "0.6s" }}
        />
      </div>
    );
  }

  return null;
}

export const spinnerVariants: SpinnerVariant[] = [
  "border",
  "thin",
  "thick",
  "dual",
  "half",
  "quarter",
  "material",
  "eased",
  "pulse",
  "chase",
  "blade",
  "dots",
  "orbit",
  "gradient",
  "multi-ring",
];
