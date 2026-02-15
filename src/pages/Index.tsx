import { useState, useCallback } from "react";
import { Spinner, spinnerVariants, type SpinnerVariant, type SpinnerSize } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check } from "lucide-react";

const sizes: SpinnerSize[] = ["xs", "sm", "md", "lg"];

const variantLabels: Record<SpinnerVariant, string> = {
  border: "Border",
  thin: "Thin",
  thick: "Thick",
  dual: "Dual Ring",
  half: "Half Arc",
  quarter: "Quarter",
  material: "Material",
  eased: "Eased",
  pulse: "Pulse Arc",
  chase: "Chase",
  blade: "Blade",
  dots: "Fading Dots",
  orbit: "Orbit",
  gradient: "Gradient",
  "multi-ring": "Multi-Ring",
};

type ButtonDemoState = "idle" | "loading" | "done";

function useDemoButton(delay = 1500) {
  const [state, setState] = useState<ButtonDemoState>("idle");
  const trigger = useCallback(() => {
    if (state !== "idle") return;
    setState("loading");
    setTimeout(() => {
      setState("done");
      setTimeout(() => setState("idle"), 1200);
    }, delay);
  }, [state, delay]);
  return { state, trigger };
}

const Index = () => {
  const [variant, setVariant] = useState<SpinnerVariant>("material");
  const [size, setSize] = useState<SpinnerSize>("md");

  const save = useDemoButton(1400);
  const post = useDemoButton(1800);
  const postAlt = useDemoButton(2000);
  const google = useDemoButton(2200);
  const github = useDemoButton(1600);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-2xl font-medium text-foreground mb-2">Spinner</h1>
          <p className="text-muted-foreground text-sm max-w-lg">
            A loading indicator with 15 variants and 4 sizes. CSS and SVG-based, no JS animation runtime.
          </p>
        </div>

        {/* Interactive Preview + Configurator */}
        <div className="flex gap-px rounded-lg border border-border overflow-hidden mb-16">
          {/* Preview area */}
          <div className="flex-1 bg-card flex items-center justify-center min-h-[200px]">
            <Spinner variant={variant} size={size} />
          </div>

          {/* Configurator panel */}
          <div className="w-56 bg-card border-l border-border p-5 flex flex-col gap-5">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Variant</label>
              <Select value={variant} onValueChange={(v) => setVariant(v as SpinnerVariant)}>
                <SelectTrigger className="h-8 text-xs">
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
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Size</label>
              <div className="flex gap-1">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`flex-1 h-8 rounded text-xs transition-colors ${
                      size === s
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* All variants quick-pick */}
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Quick pick</label>
              <div className="grid grid-cols-5 gap-1.5">
                {spinnerVariants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
                      variant === v
                        ? "bg-accent"
                        : "hover:bg-accent/50"
                    }`}
                    title={variantLabels[v]}
                  >
                    <Spinner variant={v} size="xs" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-16">
          <h2 className="text-lg font-medium text-foreground mb-1">Use cases</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Click to see loading transitions.
          </p>

          <div className="flex flex-col gap-4">
            {/* Save button */}
            <div className="flex items-center gap-4">
              <Button
                variant="secondary"
                size="sm"
                className="w-32 gap-2"
                onClick={save.trigger}
                disabled={save.state !== "idle"}
              >
                {save.state === "idle" && "Save"}
                {save.state === "loading" && (
                  <>
                    <Spinner variant="border" size="xs" />
                    Saving…
                  </>
                )}
                {save.state === "done" && (
                  <>
                    <Check className="h-3 w-3" />
                    Saved
                  </>
                )}
              </Button>
              <span className="text-xs text-muted-foreground">Save → Saving… → Saved</span>
            </div>

            {/* Post button - text transitions */}
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                className="w-32 gap-2"
                onClick={post.trigger}
                disabled={post.state !== "idle"}
              >
                {post.state === "idle" && "Post"}
                {post.state === "loading" && (
                  <>
                    <Spinner variant="material" size="xs" />
                    Posting…
                  </>
                )}
                {post.state === "done" && (
                  <>
                    <Check className="h-3 w-3" />
                    Posted!
                  </>
                )}
              </Button>
              <span className="text-xs text-muted-foreground">Post → Posting… → Posted!</span>
            </div>

            {/* Post button - spinner only mid-state */}
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                className="w-32 gap-2"
                onClick={postAlt.trigger}
                disabled={postAlt.state !== "idle"}
              >
                {postAlt.state === "idle" && "Publish"}
                {postAlt.state === "loading" && (
                  <Spinner variant="blade" size="sm" />
                )}
                {postAlt.state === "done" && (
                  <>
                    <Check className="h-3 w-3" />
                    Published
                  </>
                )}
              </Button>
              <span className="text-xs text-muted-foreground">Publish → spinner only → Published</span>
            </div>

            {/* Auth buttons */}
            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-44 gap-2"
                onClick={google.trigger}
                disabled={google.state !== "idle"}
              >
                {google.state === "loading" ? (
                  <>
                    <Spinner variant="material" size="xs" />
                    Connecting…
                  </>
                ) : google.state === "done" ? (
                  <>
                    <Check className="h-3 w-3" />
                    Connected
                  </>
                ) : (
                  <>
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="w-44 gap-2"
                onClick={github.trigger}
                disabled={github.state !== "idle"}
              >
                {github.state === "loading" ? (
                  <>
                    <Spinner variant="border" size="xs" />
                    Connecting…
                  </>
                ) : github.state === "done" ? (
                  <>
                    <Check className="h-3 w-3" />
                    Connected
                  </>
                ) : (
                  <>
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Continue with GitHub
                  </>
                )}
              </Button>

              <span className="text-xs text-muted-foreground">Auth loading states</span>
            </div>
          </div>
        </div>

        {/* All Variants Grid */}
        <div>
          <h2 className="text-lg font-medium text-foreground mb-1">All variants</h2>
          <p className="text-muted-foreground text-sm mb-6">15 variants at medium size.</p>
          <div className="grid grid-cols-5 gap-6">
            {spinnerVariants.map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className="flex flex-col items-center gap-2.5 p-3 rounded-lg hover:bg-card transition-colors cursor-pointer"
              >
                <Spinner variant={v} size="md" />
                <span className="text-xs text-muted-foreground">{variantLabels[v]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
