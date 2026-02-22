import { NavLink } from "react-router-dom";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface StudioComponent {
  id: string;
  label: string;
  path: string;
  badge?: string;
}

interface StudioLayoutProps {
  components: StudioComponent[];
  children: ReactNode;
}

export function StudioLayout({ components, children }: StudioLayoutProps) {
  return (
    <div className="min-h-screen bg-background font-mono">
      {/* Section header */}
      <div className="border-t border-b border-border">
        <div className="max-w-[520px] mx-auto px-5 py-2.5 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Studio</span>
          <NavLink
            to="/"
            className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Playground
          </NavLink>
        </div>
      </div>

      {/* Component tabs */}
      <div className="max-w-[520px] mx-auto px-5">
        <nav className="flex gap-0 border-b border-border overflow-x-auto">
          {components.map((c) => (
            <NavLink
              key={c.id}
              to={c.path}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 text-[11px] whitespace-nowrap transition-colors border-b -mb-px",
                  isActive
                    ? "text-foreground border-foreground"
                    : "text-muted-foreground hover:text-foreground border-transparent"
                )
              }
            >
              {c.label}
              {c.badge && (
                <span className="ml-1.5 text-[9px] uppercase tracking-wider text-muted-foreground/60">
                  {c.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Main content */}
        <main className="py-5">{children}</main>
      </div>
    </div>
  );
}
