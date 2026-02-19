import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ComponentShowcase } from "@/components/ComponentShowcase";
import { Check, Plus, Trash2, ArrowRight, Heart, Send } from "lucide-react";
// @ts-ignore — Vite raw import
import buttonSource from "@/components/ui/button.tsx?raw";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";
type DemoState = "idle" | "loading" | "done";

const variants: ButtonVariant[] = ["default", "destructive", "outline", "secondary", "ghost", "link"];
const sizes: ButtonSize[] = ["default", "sm", "lg", "icon"];

function useDemoButton(delay = 1400) {
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

const ButtonShowcase = () => {
  const [variant, setVariant] = useState<ButtonVariant>("default");
  const [size, setSize] = useState<ButtonSize>("default");
  const [withIcon, setWithIcon] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const save = useDemoButton(1400);
  const del = useDemoButton(1200);
  const sub = useDemoButton(1800);

  const sizeLabel: Record<ButtonSize, string> = { default: "md", sm: "sm", lg: "lg", icon: "icon" };
  const codeLine = `<Button variant="${variant}" size="${size === "default" ? "default" : size}"${disabled ? " disabled" : ""}>${size === "icon" ? "<Icon />" : "Label"}</Button>`;

  const preview = (
    <Button
      variant={variant}
      size={size}
      disabled={disabled}
    >
      {withIcon && size !== "icon" && <Heart className="h-4 w-4" />}
      {size === "icon" ? <Plus className="h-4 w-4" /> : "Button"}
    </Button>
  );

  const configurator = (
    <>
      <ConfigSection label="Variant">
        <div className="flex flex-col gap-0.5">
          {variants.map((v) => (
            <button
              key={v}
              onClick={() => setVariant(v)}
              className={`text-left px-2 h-7 rounded text-[11px] transition-colors ${
                variant === v
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </ConfigSection>

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
              {sizeLabel[s]}
            </button>
          ))}
        </div>
      </ConfigSection>

      <ConfigSection label="Options">
        <div className="flex flex-col gap-1">
          {[
            { label: "With icon", value: withIcon, set: setWithIcon },
            { label: "Disabled", value: disabled, set: setDisabled },
          ].map(({ label, value, set }) => (
            <button
              key={label}
              onClick={() => set(!value)}
              className={`flex items-center justify-between px-2 h-7 rounded text-[11px] transition-colors ${
                value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
              <div className={`w-3 h-3 rounded-sm border transition-colors ${value ? "bg-foreground border-foreground" : "border-muted-foreground"}`} />
            </button>
          ))}
        </div>
      </ConfigSection>

      <ConfigSection label="Browse">
        <div className="flex flex-col gap-1">
          {variants.map((v) => (
            <button
              key={v}
              onClick={() => setVariant(v)}
              className="flex justify-start"
            >
              <Button variant={v} size="sm" className="h-6 text-[10px] px-2 pointer-events-none w-full">
                {v}
              </Button>
            </button>
          ))}
        </div>
      </ConfigSection>
    </>
  );

  const useCases = (
    <>
      <Button size="sm" className="h-8 w-28 gap-1.5 text-xs" onClick={save.trigger} disabled={save.state !== "idle"}>
        {save.state === "idle" && <><Plus className="h-3 w-3" />Create</>}
        {save.state === "loading" && <span className="animate-pulse">Creating…</span>}
        {save.state === "done" && <><Check className="h-3 w-3" />Created!</>}
      </Button>

      <Button variant="destructive" size="sm" className="h-8 w-28 gap-1.5 text-xs" onClick={del.trigger} disabled={del.state !== "idle"}>
        {del.state === "idle" && <><Trash2 className="h-3 w-3" />Delete</>}
        {del.state === "loading" && <span className="animate-pulse">Deleting…</span>}
        {del.state === "done" && <><Check className="h-3 w-3" />Deleted</>}
      </Button>

      <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" onClick={sub.trigger} disabled={sub.state !== "idle"}>
        {sub.state === "idle" && <><Send className="h-3 w-3" />Subscribe</>}
        {sub.state === "loading" && <span className="animate-pulse">Sending…</span>}
        {sub.state === "done" && <><Check className="h-3 w-3" />Subscribed!</>}
      </Button>

      <div className="w-px h-5 bg-border mx-1" />

      <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
        Learn more <ArrowRight className="h-3 w-3" />
      </Button>
    </>
  );

  return (
    <ComponentShowcase
      title="Button"
      subtitle={`6 variants · 4 sizes`}
      fileName="button.tsx"
      fileSource={buttonSource}
      codePreview={codeLine}
      preview={preview}
      configurator={configurator}
    />
  );
};

export default ButtonShowcase;
