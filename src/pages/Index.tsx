import { useState } from "react";
import {
  Spinner,
  spinnerVariants,
  spinnerColors,
  type SpinnerVariant,
  type SpinnerSize,
  type SpinnerColor,
} from "@/components/ui/spinner";
import { ComponentShowcase, type PropDef } from "@/components/ComponentShowcase";
import { ConfigRow } from "@/components/studio/ConfigRow";
import { SegmentedControl } from "@/components/studio/SegmentedControl";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
// @ts-ignore — Vite raw import
import spinnerSource from "@/components/ui/spinner.tsx?raw";

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

const PROPS: PropDef[] = [
  { name: "variant", type: "SpinnerVariant", default: '"border"', description: "Visual style of the spinner" },
  { name: "size", type: '"xs" | "sm" | "md" | "lg"', default: '"md"', description: "Spinner dimensions" },
  { name: "color", type: "SpinnerColor", default: '"default"', description: "Color theme" },
  { name: "speed", type: "number", default: "1", description: "Animation speed multiplier" },
  { name: "className", type: "string", default: "—", description: "Additional CSS classes" },
];

const Index = () => {
  const [variant, setVariant] = useState<SpinnerVariant>("material");
  const [size, setSize] = useState<SpinnerSize>("md");
  const [color, setColor] = useState<SpinnerColor>("default");
  const [speed, setSpeed] = useState(1);

  const codeLine = `<Spinner variant="${variant}" size="${size}"${color !== "default" ? ` color="${color}"` : ""}${speed !== 1 ? ` speed={${speed}}` : ""} />`;

  return (
    <ComponentShowcase
      title="Spinner"
      subtitle="15 variants · 4 sizes · color · speed"
      fileName="spinner.tsx"
      fileSource={spinnerSource}
      codePreview={codeLine}
      propsTable={PROPS}
      preview={<Spinner variant={variant} size={size} color={color} speed={speed} />}
      configurator={
        <>
          {/* Row 1: Variant + Size side by side */}
          <div className="grid grid-cols-2 gap-4">
            <ConfigRow label="Variant">
              <Select value={variant} onValueChange={(v) => setVariant(v as SpinnerVariant)}>
                <SelectTrigger className="h-6 text-[10px]">
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
            </ConfigRow>

            <ConfigRow label="Size">
              <SegmentedControl<SpinnerSize>
                options={["xs", "sm", "md", "lg"]}
                value={size}
                onChange={setSize}
              />
            </ConfigRow>
          </div>

          {/* Row 2: Color + Speed side by side */}
          <div className="grid grid-cols-2 gap-4">
            <ConfigRow label="Color">
              <div className="flex gap-1.5">
                {spinnerColors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    title={colorLabels[c]}
                    className={`w-5 h-5 rounded-full ${colorSwatches[c]} transition-all ${
                      color === c ? "ring-2 ring-ring ring-offset-1 ring-offset-background scale-110" : "opacity-70 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            </ConfigRow>

            <ConfigRow label={`Speed · ${speed}×`}>
              <Slider
                value={[speed]}
                onValueChange={([v]) => setSpeed(v)}
                min={0.25}
                max={3}
                step={0.25}
                className="py-1"
              />
            </ConfigRow>
          </div>

          {/* Browse grid — all variants at a glance */}
          <ConfigRow label="All variants">
            <div className="grid grid-cols-5 gap-0.5">
              {spinnerVariants.map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`flex flex-col items-center gap-1 py-2 rounded text-[8px] transition-colors ${
                    variant === v
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  }`}
                  title={variantLabels[v]}
                >
                  <Spinner variant={v} size="xs" color={color} speed={speed} />
                  <span className="truncate w-full text-center leading-none">{variantLabels[v]}</span>
                </button>
              ))}
            </div>
          </ConfigRow>
        </>
      }
    />
  );
};

export default Index;
