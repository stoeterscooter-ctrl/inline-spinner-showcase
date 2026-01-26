const Index = () => {
  return (
    <div className="min-h-screen bg-background p-12">
      <h1 className="text-2xl font-medium text-foreground mb-8">Common Inline Spinners</h1>
      
      <div className="flex flex-wrap gap-12 items-start">
        
        {/* 1. CSS Border Spinner - Most common */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Border Spinner</span>
        </div>

        {/* 2. Thin Border Spinner */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Thin Border</span>
        </div>

        {/* 3. Three Dots - Typing indicator style */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
          </div>
          <span className="text-sm text-muted-foreground">Bouncing Dots</span>
        </div>

        {/* 4. Pulsing Dots */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:0.2s]" />
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:0.4s]" />
          </div>
          <span className="text-sm text-muted-foreground">Pulsing Dots</span>
        </div>

        {/* 5. Dual Ring */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground border-b-muted-foreground rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Dual Ring</span>
        </div>

        {/* 6. Growing Bars */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-0.5 items-end h-5">
            <div className="w-1 bg-muted-foreground animate-pulse h-2" />
            <div className="w-1 bg-muted-foreground animate-pulse [animation-delay:0.1s] h-4" />
            <div className="w-1 bg-muted-foreground animate-pulse [animation-delay:0.2s] h-5" />
            <div className="w-1 bg-muted-foreground animate-pulse [animation-delay:0.3s] h-3" />
          </div>
          <span className="text-sm text-muted-foreground">Bars</span>
        </div>

        {/* 7. Simple Pulse Dot */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-4 h-4 bg-muted-foreground rounded-full animate-ping opacity-75" />
          <span className="text-sm text-muted-foreground">Ping</span>
        </div>

        {/* 8. Rotating Square */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-4 h-4 bg-muted-foreground animate-spin" />
          <span className="text-sm text-muted-foreground">Square</span>
        </div>

        {/* 9. Half Circle */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border-2 border-transparent border-t-muted-foreground border-r-muted-foreground rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Half Arc</span>
        </div>

        {/* 10. Thick Spinner */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border-[3px] border-muted-foreground/20 border-t-muted-foreground rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Thick</span>
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
        <p className="flex items-center gap-1 text-muted-foreground">
          AI is thinking
          <span className="flex gap-0.5">
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
          </span>
        </p>
      </div>
    </div>
  );
};

export default Index;
