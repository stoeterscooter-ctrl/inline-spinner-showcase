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
    <div className="h-screen flex bg-background font-mono overflow-hidden">
      {/* Sidebar */}
      <aside className="w-40 border-r border-border flex flex-col shrink-0">
        <div className="px-3 h-10 flex items-center border-b border-border">
          <NavLink
            to="/"
            className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Playground
          </NavLink>
        </div>
        <div className="px-2 py-2 flex-1">
          <span className="text-[9px] uppercase tracking-widest text-muted-foreground/60 px-2 mb-1 block">
            Components
          </span>
          <nav className="flex flex-col gap-0.5">
            {components.map((c) => (
              <NavLink
                key={c.id}
                to={c.path}
                end={c.path === "/studio"}
                className={({ isActive }) =>
                  cn(
                    "px-2 py-1.5 rounded text-[11px] transition-colors flex items-center gap-1.5",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )
                }
              >
                {c.label}
                {c.badge && (
                  <span className="text-[8px] uppercase tracking-wider text-muted-foreground/60 bg-muted px-1 rounded">
                    {c.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
