import { useState, useMemo, useEffect } from "react";
import { GooeySwitch, type AnimationCfg } from "@/components/ui/gooey-switch";
import { ComponentShowcase, type PropDef } from "@/components/ComponentShowcase";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
// @ts-ignore — Vite raw import
import gooeySwitchSource from "@/components/ui/gooey-switch.tsx?raw";

type Size = "sm" | "md" | "lg";

const COLOR_PRESETS = [
  { name: "Default", track: "0 0% 18%", trackActive: "0 0% 26%", blob: "0 0% 92%" },
  { name: "Blue", track: "220 20% 18%", trackActive: "220 50% 30%", blob: "210 100% 70%" },
  { name: "Green", track: "150 20% 14%", trackActive: "150 40% 24%", blob: "145 70% 60%" },
  { name: "Purple", track: "270 20% 18%", trackActive: "270 40% 28%", blob: "265 80% 72%" },
  { name: "Amber", track: "30 20% 16%", trackActive: "35 50% 26%", blob: "40 90% 60%" },
  { name: "Rose", track: "350 20% 16%", trackActive: "350 45% 28%", blob: "345 80% 65%" },
] as const;

function ConfigRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5 block font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex gap-0.5">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`flex-1 h-6 rounded text-[10px] transition-colors capitalize ${
            value === o
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

const PROPS: PropDef[] = [
  { name: "defaultOn", type: "boolean", default: "false", description: "Initial toggle state" },
  { name: "onChange", type: "(on: boolean) => void", default: "—", description: "Called when toggled" },
  { name: "size", type: '"sm" | "md" | "lg"', default: '"lg"', description: "Switch dimensions" },
  { name: "anim", type: "AnimationCfg", default: "undefined", description: "Tween override (spring by default)" },
];

const GooeySwitchShowcase = () => {
  const [size, setSize] = useState<Size>("md");
  const [defaultOn, setDefaultOn] = useState(false);
  const [tweenEnabled, setTweenEnabled] = useState(false);
  const [duration, setDuration] = useState(0.5);
  const [b0, setB0] = useState(0.25);
  const [b1, setB1] = useState(0.1);
  const [b2, setB2] = useState(0.25);
  const [b3, setB3] = useState(1.0);
  const [colorIdx, setColorIdx] = useState(0);
  const [key, setKey] = useState(0);

  const preset = COLOR_PRESETS[colorIdx];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--gooey-track", preset.track);
    root.style.setProperty("--gooey-track-active", preset.trackActive);
    root.style.setProperty("--gooey-blob", preset.blob);
    return () => {
      root.style.removeProperty("--gooey-track");
      root.style.removeProperty("--gooey-track-active");
      root.style.removeProperty("--gooey-blob");
    };
  }, [preset]);

  const anim = useMemo<AnimationCfg | undefined>(
    () =>
      tweenEnabled
        ? { duration, bezier: [b0, b1, b2, b3] as readonly [number, number, number, number] }
        : undefined,
    [tweenEnabled, duration, b0, b1, b2, b3]
  );

  const bezierStr = `[${b0}, ${b1}, ${b2}, ${b3}]`;
  const codeLine = `<GooeySwitch size="${size}"${defaultOn ? " defaultOn" : ""}${tweenEnabled ? ` anim={{ duration: ${duration}, bezier: ${bezierStr} }}` : ""} />`;

  return (
    <ComponentShowcase
      title="GooeySwitch"
      subtitle="spring · tween · 3 sizes"
      fileName="gooey-switch.tsx"
      fileSource={gooeySwitchSource}
      codePreview={codeLine}
      propsTable={PROPS}
      preview={
        <GooeySwitch key={key} size={size} anim={anim} defaultOn={defaultOn} />
      }
      configurator={
        <>
          <div className="grid grid-cols-2 gap-4">
            <ConfigRow label="Size">
              <SegmentedControl<Size>
                options={["sm", "md", "lg"]}
                value={size}
                onChange={setSize}
              />
            </ConfigRow>

            <ConfigRow label="Default state">
              <div className="flex items-center gap-2 h-6">
                <Switch
                  id="default-on"
                  checked={defaultOn}
                  onCheckedChange={(v) => {
                    setDefaultOn(v);
                    setKey((k) => k + 1);
                  }}
                />
                <Label htmlFor="default-on" className="text-[10px] text-muted-foreground">
                  {defaultOn ? "On" : "Off"}
                </Label>
              </div>
            </ConfigRow>
          </div>

          <ConfigRow label="Color">
            <div className="flex gap-1.5">
              {COLOR_PRESETS.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setColorIdx(i)}
                  title={p.name}
                  className={`w-5 h-5 rounded-full transition-all ${
                    colorIdx === i
                      ? "ring-2 ring-ring ring-offset-1 ring-offset-background scale-110"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  style={{ background: `hsl(${p.blob})` }}
                />
              ))}
            </div>
          </ConfigRow>

          <ConfigRow label="Animation">
            <div className="flex items-center gap-2">
              <Switch
                id="tween-mode"
                checked={tweenEnabled}
                onCheckedChange={setTweenEnabled}
              />
              <Label htmlFor="tween-mode" className="text-[10px] text-muted-foreground">
                {tweenEnabled ? "Tween" : "Spring"}
              </Label>
            </div>
          </ConfigRow>

          {tweenEnabled && (
            <>
              <ConfigRow label={`Duration · ${duration.toFixed(2)}s`}>
                <Slider
                  value={[duration]}
                  onValueChange={([v]) => setDuration(v)}
                  min={0.2}
                  max={1.2}
                  step={0.05}
                  className="py-1"
                />
              </ConfigRow>

              <Collapsible>
                <CollapsibleTrigger className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground font-medium hover:text-foreground transition-colors group w-full">
                  Bezier curve
                  <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2 pt-2">
                    {[
                      { label: "x1", value: b0, set: setB0 },
                      { label: "y1", value: b1, set: setB1 },
                      { label: "x2", value: b2, set: setB2 },
                      { label: "y2", value: b3, set: setB3 },
                    ].map(({ label, value, set }) => (
                      <div key={label} className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground w-5 shrink-0">{label}</span>
                        <Slider
                          value={[value]}
                          onValueChange={([v]) => set(v)}
                          min={0}
                          max={1}
                          step={0.05}
                          className="flex-1"
                        />
                        <span className="text-[10px] tabular-nums text-muted-foreground w-7 text-right">
                          {value.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </>
          )}
        </>
      }
    />
  );
};

export default GooeySwitchShowcase;
