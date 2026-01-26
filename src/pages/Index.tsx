const Index = () => {
  return (
    <div className="min-h-screen bg-background p-12">
      <h1 className="text-2xl font-medium text-foreground mb-8">Inline Spinners</h1>
      
      {/* Basic CSS Spinners */}
      <h2 className="text-lg font-medium text-foreground mb-4">Basic (CSS)</h2>
      <div className="flex flex-wrap gap-12 items-start mb-12">
        
        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Border</span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Thin</span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border-[3px] border-muted-foreground/20 border-t-muted-foreground rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Thick</span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground border-b-muted-foreground rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Dual Ring</span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border-2 border-transparent border-t-muted-foreground border-r-muted-foreground rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Half Arc</span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border-2 border-transparent border-t-muted-foreground rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Quarter Arc</span>
        </div>

      </div>

      {/* Advanced SVG Spinners with arc morphing */}
      <h2 className="text-lg font-medium text-foreground mb-4">Advanced (SVG with arc morphing)</h2>
      <div className="flex flex-wrap gap-12 items-start mb-12">
        
        {/* Material-style spinner: rotates + arc grows/shrinks */}
        <div className="flex flex-col items-center gap-3">
          <svg className="w-5 h-5 animate-[spin_2s_linear_infinite]" viewBox="0 0 24 24">
            <circle
              className="stroke-muted-foreground animate-[dash_1.5s_ease-in-out_infinite]"
              cx="12"
              cy="12"
              r="10"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{
                strokeDasharray: '1, 200',
                strokeDashoffset: 0,
              }}
            />
          </svg>
          <span className="text-sm text-muted-foreground">Material</span>
        </div>

        {/* Eased rotation spinner */}
        <div className="flex flex-col items-center gap-3">
          <svg className="w-5 h-5 animate-[spin-ease_1.4s_ease-in-out_infinite]" viewBox="0 0 24 24">
            <circle
              className="stroke-muted-foreground"
              cx="12"
              cy="12"
              r="10"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="31.4 31.4"
              strokeDashoffset="0"
            />
          </svg>
          <span className="text-sm text-muted-foreground">Eased</span>
        </div>

        {/* Pulsing arc */}
        <div className="flex flex-col items-center gap-3">
          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
            <circle
              className="stroke-muted-foreground/20"
              cx="12"
              cy="12"
              r="10"
              fill="none"
              strokeWidth="2"
            />
            <circle
              className="stroke-muted-foreground animate-[pulse-arc_1s_ease-in-out_infinite]"
              cx="12"
              cy="12"
              r="10"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ strokeDasharray: '15.7 47.1' }}
            />
          </svg>
          <span className="text-sm text-muted-foreground">Pulse Arc</span>
        </div>

        {/* Chase spinner */}
        <div className="flex flex-col items-center gap-3">
          <svg className="w-5 h-5 animate-[spin_0.8s_linear_infinite]" viewBox="0 0 24 24">
            <circle
              className="stroke-muted-foreground animate-[chase_1.2s_ease-in-out_infinite]"
              cx="12"
              cy="12"
              r="10"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-sm text-muted-foreground">Chase</span>
        </div>

      </div>

      {/* Inline usage examples */}
      <h2 className="text-lg font-medium text-foreground mb-4">Inline Usage</h2>
      <div className="flex flex-col gap-4 text-foreground">
        <p className="flex items-center gap-2">
          Loading
          <span className="inline-block w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
        </p>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded w-fit">
          <svg className="w-4 h-4 animate-[spin_2s_linear_infinite]" viewBox="0 0 24 24">
            <circle
              className="stroke-current animate-[dash_1.5s_ease-in-out_infinite]"
              cx="12"
              cy="12"
              r="10"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ strokeDasharray: '1, 200' }}
            />
          </svg>
          Saving...
        </button>
      </div>
    </div>
  );
};

export default Index;
