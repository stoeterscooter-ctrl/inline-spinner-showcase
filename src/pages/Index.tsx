import { useState, useCallback } from "react";
import {
  Spinner,
  spinnerVariants,
  spinnerColors,
  type SpinnerVariant,
  type SpinnerSize,
  type SpinnerColor,
} from "@/components/ui/spinner";
import { ComponentShowcase } from "@/components/ComponentShowcase";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Check } from "lucide-react";
// @ts-ignore — Vite raw import
import spinnerSource from "@/components/ui/spinner.tsx?raw";

const sizes: SpinnerSize[] = ["xs", "sm", "md", "lg"];

const variantLabels: Record<SpinnerVariant, string> = {
  border: "Border", thin: "Thin", thick: "Thick", dual: "Dual", half: "Half",
  quarter: "Quarter", material: "Material", eased: "Eased", pulse: "Pulse",
  chase: "Chase", blade: "Blade", dots: "Dots", orbit: "Orbit",
  gradient: "Gradient", "multi-ring": "Multi-Ring",
};

const colorLabels: Record<SpinnerColor, string> = {
  default: "Muted", primary: "Primary", foreground: "Foreground", destructive: "Destructive",
};

const colorSwatches: Record<SpinnerColor, string> = {
  default: "bg-muted-foreground",
  primary: "bg-primary",
  foreground: "bg-foreground",
  destructive: "bg-destructive",
};

type DemoState = "idle" | "loading" | "done";

function useDemoButton(delay = 1500) {
  const [state, setState] = useState<DemoState>("idle");
  const trigger = useCallback(() => {
    if (state !== "idle") return;
    setState("loading");
    setTimeout(() => {
      setState("done");
      setTimeout(() => setState("idle"), 1000);
    }, delay);
  }, [state, delay]);
  return { state, trigger };
}

const Index = () => {
  const [variant, setVariant] = useState<SpinnerVariant>("material");
  const [size, setSize] = useState<SpinnerSize>("md");
  const [color, setColor] = useState<SpinnerColor>("default");
  const [speed, setSpeed] = useState(1);

  const save = useDemoButton(1400);
  const post = useDemoButton(1800);
  const publish = useDemoButton(2000);
  const google = useDemoButton(2200);
  const github = useDemoButton(1600);

  const codeLine = `<Spinner variant="${variant}" size="${size}"${color !== "default" ? ` color="${color}"` : ""}${speed !== 1 ? ` speed={${speed}}` : ""} />`;

  return (
    <ComponentShowcase
      title="Spinner"
      subtitle="15 variants · 4 sizes · color · speed"
      fileName="spinner.tsx"
      fileSource={spinnerSource}
      codePreview={codeLine}
      preview={<Spinner variant={variant} size={size} color={color} speed={speed} />}
      configurator={
        <>
          {/* Variant */}
          <ConfigSection label="Variant">
            <Select value={variant} onValueChange={(v) => setVariant(v as SpinnerVariant)}>
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {spinnerVariants.map((v) => (
                  <SelectItem key={v} value={v} className="text-xs">
                    {variantLabels[v]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </ConfigSection>

          {/* Size */}
          <ConfigSection label="Size">
            <div className="flex gap-0.5">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`flex-1 h-7 rounded text-[11px] transition-colors ${
                    size === s ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </ConfigSection>

          {/* Color */}
          <ConfigSection label="Color">
            <div className="flex gap-2">
              {spinnerColors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className="flex flex-col items-center gap-1 group"
                  title={colorLabels[c]}
                >
                  <div
                    className={`w-5 h-5 rounded-full ${colorSwatches[c]} transition-all ${
                      color === c ? "ring-1 ring-ring ring-offset-1 ring-offset-background scale-110" : "opacity-50 group-hover:opacity-80"
                    }`}
                  />
                </button>
              ))}
            </div>
          </ConfigSection>

          {/* Speed */}
          <ConfigSection label={`Speed · ${speed}×`}>
            <Slider
              value={[speed]}
              onValueChange={([v]) => setSpeed(v)}
              min={0.25}
              max={3}
              step={0.25}
              className="py-1"
            />
          </ConfigSection>

          {/* Browse grid */}
          <ConfigSection label="Browse">
            <div className="grid grid-cols-4 gap-1">
              {spinnerVariants.map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`aspect-square rounded flex items-center justify-center transition-colors ${
                    variant === v ? "bg-accent" : "hover:bg-accent/50"
                  }`}
                  title={variantLabels[v]}
                >
                  <Spinner variant={v} size="xs" color={color} speed={speed} />
                </button>
              ))}
            </div>
          </ConfigSection>
        </>
      }
    />
  );
};

function ConfigSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 block font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}

export default Index;
