import { useState, useMemo, useCallback } from "react";
import { ConfigRow } from "./ConfigRow";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export type AnimationValue = {
  enabled: boolean;
  duration: number;
  bezier: readonly [number, number, number, number];
};

type BezierPreset = {
  name: string;
  value: readonly [number, number, number, number];
};

const EASING_PRESETS: BezierPreset[] = [
  { name: "Ease", value: [0.25, 0.1, 0.25, 1.0] },
  { name: "Ease In", value: [0.42, 0, 1, 1] },
  { name: "Ease Out", value: [0, 0, 0.58, 1] },
  { name: "Ease In-Out", value: [0.42, 0, 0.58, 1] },
  { name: "Snappy", value: [0.2, 0.8, 0.2, 1] },
  { name: "Bounce", value: [0.68, -0.55, 0.27, 1.55] },
];

interface AnimationEditorProps {
  value: AnimationValue;
  onChange: (value: AnimationValue) => void;
  /** Label for the enabled state (default: "Spring") */
  disabledLabel?: string;
  /** Label for the tween state (default: "Tween") */
  enabledLabel?: string;
}

export function AnimationEditor({
  value,
  onChange,
  disabledLabel = "Spring",
  enabledLabel = "Tween",
}: AnimationEditorProps) {
  const [bezierOpen, setBezierOpen] = useState(false);

  const update = useCallback(
    (patch: Partial<AnimationValue>) => onChange({ ...value, ...patch }),
    [value, onChange]
  );

  const setBezierIdx = useCallback(
    (idx: number, v: number) => {
      const next = [...value.bezier] as [number, number, number, number];
      next[idx] = v;
      update({ bezier: next });
    },
    [value.bezier, update]
  );

  const activePreset = useMemo(
    () =>
      EASING_PRESETS.findIndex(
        (p) => p.value.every((v, i) => Math.abs(v - value.bezier[i]) < 0.01)
      ),
    [value.bezier]
  );

  const bezierLabels = ["x1", "y1", "x2", "y2"];

  return (
    <div className="flex flex-col gap-3">
      {/* Mode toggle */}
      <ConfigRow label="Animation">
        <div className="flex items-center gap-2">
          <Switch
            checked={value.enabled}
            onCheckedChange={(v) => update({ enabled: v })}
          />
          <Label className="text-[10px] text-muted-foreground">
            {value.enabled ? enabledLabel : disabledLabel}
          </Label>
        </div>
      </ConfigRow>

      {value.enabled && (
        <>
          {/* Duration */}
          <ConfigRow label={`Duration · ${value.duration.toFixed(2)}s`}>
            <Slider
              value={[value.duration]}
              onValueChange={([v]) => update({ duration: v })}
              min={0.1}
              max={2}
              step={0.05}
              className="py-1"
            />
          </ConfigRow>

          {/* Easing presets */}
          <ConfigRow label="Easing">
            <div className="flex flex-wrap gap-1">
              {EASING_PRESETS.map((preset, i) => (
                <button
                  key={preset.name}
                  onClick={() => update({ bezier: preset.value })}
                  className={`h-5 px-2 rounded text-[9px] font-medium transition-colors ${
                    activePreset === i
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </ConfigRow>

          {/* Bezier fine-tuning */}
          <Collapsible open={bezierOpen} onOpenChange={setBezierOpen}>
            <CollapsibleTrigger className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground font-medium hover:text-foreground transition-colors group w-full">
              Bézier curve
              <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col gap-2 pt-2">
                {bezierLabels.map((label, idx) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground w-5 shrink-0 font-mono">
                      {label}
                    </span>
                    <Slider
                      value={[value.bezier[idx]]}
                      onValueChange={([v]) => setBezierIdx(idx, v)}
                      min={idx % 2 === 1 ? -1 : 0}
                      max={idx % 2 === 1 ? 2 : 1}
                      step={0.05}
                      className="flex-1"
                    />
                    <span className="text-[10px] tabular-nums text-muted-foreground w-8 text-right font-mono">
                      {value.bezier[idx].toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </>
      )}
    </div>
  );
}
