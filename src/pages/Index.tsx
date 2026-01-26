const Index = () => {
  return (
    <div className="min-h-screen bg-background p-12">
      <h1 className="text-2xl font-medium text-foreground mb-8">Inline Spinners</h1>
      
      <div className="flex flex-wrap gap-12 items-start">
        
        {/* 1. CSS Border Spinner - Most common */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Border</span>
        </div>

        {/* 2. Thin Border Spinner */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Thin</span>
        </div>

        {/* 3. Thick Spinner */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border-[3px] border-muted-foreground/20 border-t-muted-foreground rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Thick</span>
        </div>

        {/* 4. Dual Ring */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground border-b-muted-foreground rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Dual Ring</span>
        </div>

        {/* 5. Half Arc */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border-2 border-transparent border-t-muted-foreground border-r-muted-foreground rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Half Arc</span>
        </div>

        {/* 6. Quarter Arc */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border-2 border-transparent border-t-muted-foreground rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Quarter Arc</span>
        </div>

        {/* 7. Dotted Spinner */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border-2 border-dashed border-muted-foreground/50 rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Dotted</span>
        </div>

        {/* 8. Double Ring */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-5 h-5">
            <div className="absolute inset-0 border-2 border-muted-foreground/20 border-t-muted-foreground rounded-full animate-spin" />
            <div className="absolute inset-1 border border-muted-foreground/20 border-b-muted-foreground rounded-full animate-spin [animation-direction:reverse]" />
          </div>
          <span className="text-sm text-muted-foreground">Double</span>
        </div>

      </div>

      {/* Inline usage examples */}
      <h2 className="text-xl font-medium text-foreground mt-16 mb-6">Inline Usage</h2>
      <div className="flex flex-col gap-4 text-foreground">
        <p className="flex items-center gap-2">
          Loading
          <span className="inline-block w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
        </p>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded w-fit">
          <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
          Saving...
        </button>
      </div>
    </div>
  );
};

export default Index;
