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
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Left nav */}
      <aside className="w-44 shrink-0 border-r border-border flex flex-col">
        <div className="h-12 flex items-center px-4 border-b border-border shrink-0">
          <span className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
            Studio
          </span>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {components.map((c) => (
            <NavLink
              key={c.id}
              to={c.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center justify-between px-4 py-1.5 text-xs transition-colors rounded-none",
                  isActive
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )
              }
            >
              <span>{c.label}</span>
              {c.badge && (
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground/60">
                  {c.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
