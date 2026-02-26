import type { ReactNode } from "react";

export function ConfigRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5 block font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}
