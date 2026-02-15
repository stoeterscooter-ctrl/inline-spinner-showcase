import { type ReactNode } from "react";

interface ComponentShowcaseProps {
  title: string;
  description: string;
  preview: ReactNode;
  configurator: ReactNode;
  children?: ReactNode; // use cases, extras below the fold
}

export function ComponentShowcase({
  title,
  description,
  preview,
  configurator,
  children,
}: ComponentShowcaseProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero — fills viewport */}
      <section className="h-screen flex flex-col">
        {/* Top bar: title + description */}
        <div className="px-10 pt-10 pb-6 shrink-0">
          <h1 className="text-xl font-medium text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-md">{description}</p>
        </div>

        {/* Preview + Configurator */}
        <div className="flex-1 flex min-h-0 mx-10 mb-10 rounded-lg border border-border overflow-hidden">
          {/* Preview */}
          <div className="flex-1 flex items-center justify-center bg-card/50">
            {preview}
          </div>

          {/* Configurator sidebar */}
          <div className="w-52 border-l border-border bg-card p-5 overflow-y-auto flex flex-col gap-6">
            {configurator}
          </div>
        </div>
      </section>

      {/* Below the fold */}
      {children && (
        <section className="px-10 py-16">
          {children}
        </section>
      )}
    </div>
  );
}
