import { Spinner, spinnerVariants, type SpinnerVariant, type SpinnerSize } from "@/components/ui/spinner";

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

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-12">
      <h1 className="text-2xl font-medium text-foreground mb-8">Spinner Component</h1>
      
      {/* All Variants */}
      <h2 className="text-lg font-medium text-foreground mb-4">All Variants</h2>
      <div className="flex flex-wrap gap-10 items-start mb-12">
        {spinnerVariants.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-3">
            <Spinner variant={variant} size="md" />
            <span className="text-sm text-muted-foreground">{variantLabels[variant]}</span>
          </div>
        ))}
      </div>

      {/* Size Comparison */}
      <h2 className="text-lg font-medium text-foreground mb-4">Sizes</h2>
      <div className="flex flex-wrap gap-12 items-end mb-12">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-3">
            <Spinner variant="material" size={size} />
            <span className="text-sm text-muted-foreground">{size}</span>
          </div>
        ))}
      </div>

      {/* Inline Usage */}
      <h2 className="text-lg font-medium text-foreground mb-4">Inline Usage</h2>
      <div className="flex flex-col gap-4 text-foreground">
        <p className="flex items-center gap-2">
          Loading
          <Spinner variant="border" size="sm" />
        </p>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded w-fit">
          <Spinner variant="material" size="sm" />
          Saving...
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded w-fit">
          <Spinner variant="blade" size="sm" />
          Processing...
        </button>
      </div>
    </div>
  );
};

export default Index;
