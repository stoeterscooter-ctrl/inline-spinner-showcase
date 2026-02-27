import { useState, useMemo, useEffect } from "react";
import { GooeySwitch, type AnimationCfg } from "@/components/ui/gooey-switch";
import { ComponentShowcase, type PropDef } from "@/components/ComponentShowcase";
import { ConfigRow } from "@/components/studio/ConfigRow";
import { SegmentedControl } from "@/components/studio/SegmentedControl";
import { AnimationEditor, type AnimationValue } from "@/components/studio/AnimationEditor";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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

const PROPS: PropDef[] = [
  { name: "defaultOn", type: "boolean", default: "false", description: "Initial toggle state" },
  { name: "onChange", type: "(on: boolean) => void", default: "—", description: "Called when toggled" },
  { name: "size", type: '"sm" | "md" | "lg"', default: '"lg"', description: "Switch dimensions" },
  { name: "anim", type: "AnimationCfg", default: "undefined", description: "Tween override (spring by default)" },
];

const GooeySwitchShowcase = () => {
  const [size, setSize] = useState<Size>("md");
  const [defaultOn, setDefaultOn] = useState(false);
  const [colorIdx, setColorIdx] = useState(0);
  const [key, setKey] = useState(0);
  const [animValue, setAnimValue] = useState<AnimationValue>({
    enabled: false,
    duration: 0.5,
    bezier: [0.25, 0.1, 0.25, 1.0],
  });

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
      animValue.enabled
        ? { duration: animValue.duration, bezier: animValue.bezier }
        : undefined,
    [animValue]
  );

  const bezierStr = `[${animValue.bezier.join(", ")}]`;
  const codeLine = `<GooeySwitch size="${size}"${defaultOn ? " defaultOn" : ""}${animValue.enabled ? ` anim={{ duration: ${animValue.duration}, bezier: ${bezierStr} }}` : ""} />`;

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

          <AnimationEditor value={animValue} onChange={setAnimValue} />
        </>
      }
    />
  );
};

export default GooeySwitchShowcase;
