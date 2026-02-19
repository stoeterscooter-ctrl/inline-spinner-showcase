import { useState, useMemo, useCallback } from "react";
import { GooeySwitch, type GooeySwitchProps, type AnimationCfg } from "@/components/ui/gooey-switch";
import { ComponentShowcase } from "@/components/ComponentShowcase";
import { Slider } from "@/components/ui/slider";
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

function PreviewRow({
  label,
  sublabel,
  switchProps,
}: {
  label: string;
  sublabel: string;
  switchProps: GooeySwitchProps;
}) {
  const [on, setOn] = useState(switchProps.defaultOn ?? false);
  return (
    <div className="flex items-center justify-between gap-6 py-3 px-4 rounded-lg border border-border">
      <div>
        <div className="text-xs font-medium text-foreground">{label}</div>
        <div className="text-[11px] text-muted-foreground mt-0.5">{sublabel}</div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-[11px] tabular-nums text-muted-foreground w-6 text-right">
          {on ? "on" : "off"}
        </span>
        <GooeySwitch
          {...switchProps}
          defaultOn={on}
          onChange={(v) => {
            setOn(v);
            switchProps.onChange?.(v);
          }}
        />
      </div>
    </div>
  );
}

const GooeySwitchShowcase = () => {
  const [size, setSize] = useState<Size>("lg");
  const [tweenEnabled, setTweenEnabled] = useState(false);
  const [duration, setDuration] = useState(0.5);

  const anim = useMemo<AnimationCfg | undefined>(
    () => (tweenEnabled ? { duration, bezier: [0.25, 0.1, 0.25, 1] } : undefined),
    [tweenEnabled, duration]
  );

  const animMode = tweenEnabled ? "tween" : "spring";

  const codeLine = `<GooeySwitch size="${size}"${tweenEnabled ? ` anim={{ duration: ${duration}, bezier: [0.25, 0.1, 0.25, 1] }}` : ""} />`;

  return (
    <ComponentShowcase
      title="GooeySwitch"
      subtitle="physics spring · tween · 3 sizes"
      fileName="gooey-switch.tsx"
      fileSource={gooeySwitchSource}
      codePreview={codeLine}
      preview={
        <div className="flex flex-col items-center gap-8">
          <GooeySwitch size={size} anim={anim} />
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

          <ConfigSection label="Animation">
            <SegmentedControl
              options={["spring", "tween"]}
              value={animMode}
              onChange={(v) => setTweenEnabled(v === "tween")}
            />
          </ConfigSection>

          {tweenEnabled && (
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
          )}

          <ConfigSection label="Default state">
            <div className="flex flex-col gap-2">
              <PreviewRow
                label="Off → On"
                sublabel="defaultOn={false}"
                switchProps={{ size, anim }}
              />
              <PreviewRow
                label="On → Off"
                sublabel="defaultOn={true}"
                switchProps={{ size, anim, defaultOn: true }}
              />
            </div>
          </ConfigSection>
        </>
      }
      useCases={
        <>
          <div className="flex items-center gap-6">
            <UseCaseSwitch label="Dark mode" size={size} anim={anim} />
            <UseCaseSwitch label="Notifications" size={size} anim={anim} defaultOn />
            <UseCaseSwitch label="Auto-save" size={size} anim={anim} />
            <UseCaseSwitch label="Analytics" size={size} anim={anim} defaultOn />
          </div>
        </>
      }
    />
  );
};

function UseCaseSwitch({
  label,
  size,
  anim,
  defaultOn = false,
}: {
  label: string;
  size: Size;
  anim?: AnimationCfg;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center gap-2">
      <GooeySwitch size="sm" anim={anim} defaultOn={on} onChange={setOn} />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export default GooeySwitchShowcase;
