import { useState, useMemo } from "react";
import { GooeySwitch, type GooeySwitchProps, type AnimationCfg } from "@/components/ui/gooey-switch";
import { ComponentShowcase } from "@/components/ComponentShowcase";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
// @ts-ignore — Vite raw import
import gooeySwitchSource from "@/components/ui/gooey-switch.tsx?raw";

type Size = "sm" | "md" | "lg";

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
          className={`flex-1 h-7 rounded text-[11px] transition-colors capitalize ${
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

const GooeySwitchShowcase = () => {
  const [size, setSize] = useState<Size>("lg");
  const [defaultOn, setDefaultOn] = useState(false);
  const [tweenEnabled, setTweenEnabled] = useState(false);
  const [duration, setDuration] = useState(0.5);
  const [b0, setB0] = useState(0.25);
  const [b1, setB1] = useState(0.1);
  const [b2, setB2] = useState(0.25);
  const [b3, setB3] = useState(1.0);

  // Key to force remount when defaultOn changes
  const [key, setKey] = useState(0);

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
      subtitle="physics spring · tween · 3 sizes"
      fileName="gooey-switch.tsx"
      fileSource={gooeySwitchSource}
      codePreview={codeLine}
      preview={
        <div className="flex flex-col items-center gap-8">
          <GooeySwitch key={key} size={size} anim={anim} defaultOn={defaultOn} />
          <div className="text-[11px] text-muted-foreground">
            {tweenEnabled ? `tween · ${duration}s` : "spring physics"}
          </div>
        </div>
      }
      configurator={
        <>
          <ConfigSection label="Size">
            <SegmentedControl<Size>
              options={["sm", "md", "lg"]}
              value={size}
              onChange={setSize}
            />
          </ConfigSection>

          <ConfigSection label="Default state">
            <div className="flex items-center gap-2">
              <Switch
                id="default-on"
                checked={defaultOn}
                onCheckedChange={(v) => {
                  setDefaultOn(v);
                  setKey((k) => k + 1);
                }}
              />
              <Label htmlFor="default-on" className="text-xs text-muted-foreground">
                {defaultOn ? "On" : "Off"}
              </Label>
            </div>
          </ConfigSection>

          <ConfigSection label="Animation mode">
            <div className="flex items-center gap-2">
              <Switch
                id="tween-mode"
                checked={tweenEnabled}
                onCheckedChange={setTweenEnabled}
              />
              <Label htmlFor="tween-mode" className="text-xs text-muted-foreground">
                {tweenEnabled ? "Tween" : "Spring"}
              </Label>
            </div>
          </ConfigSection>

          {tweenEnabled && (
            <>
              <ConfigSection label={`Duration · ${duration.toFixed(2)}s`}>
                <Slider
                  value={[duration]}
                  onValueChange={([v]) => setDuration(v)}
                  min={0.2}
                  max={1.2}
                  step={0.05}
                  className="py-1"
                />
              </ConfigSection>

              <ConfigSection label="Bezier curve">
                <div className="flex flex-col gap-2">
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
              </ConfigSection>
            </>
          )}
        </>
      }
      useCases={
        <div className="flex items-center gap-6">
          {["Dark mode", "Notifications", "Auto-save", "Analytics"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <GooeySwitch size="sm" anim={anim} defaultOn={i % 2 === 1} />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      }
    />
  );
};

export default GooeySwitchShowcase;
