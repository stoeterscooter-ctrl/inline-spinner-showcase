import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const ITEMS = [
  {
    title: "Spinner",
    description: "15 variants · 4 sizes · color · speed",
    path: "/studio",
  },
  {
    title: "Gooey Switch",
    description: "Spring & tween · 3 sizes · custom palette",
    path: "/studio/gooey-switch",
  },
] as const;

export default function Playground() {
  return (
    <div className="min-h-screen bg-background font-mono">
      {/* Full-width section header — matches remcostoeten.nl pattern */}
      <div className="border-t border-b border-border">
        <div className="max-w-[520px] mx-auto px-5 py-2.5">
          <span className="text-xs text-muted-foreground">Playground</span>
        </div>
      </div>

      {/* Content container */}
      <div className="max-w-[520px] mx-auto px-5">
        <div className="py-6">
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            A small collection of interactive UI primitives I've been building.
            Each component is self-contained and copy-pasteable.
          </p>
        </div>

        {/* Component list — bordered card style */}
        <div className="border border-border rounded-md overflow-hidden">
          {ITEMS.map((item, i) => (
            <Link
              key={item.title}
              to={item.path}
              className={`group flex items-center justify-between px-4 py-3.5 transition-colors hover:bg-accent/40 ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
              <div className="flex-1 min-w-0">
                <span className="text-[13px] text-foreground">{item.title}</span>
                <span className="text-[11px] text-muted-foreground ml-2 hidden sm:inline">
                  {item.description}
                </span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </Link>
          ))}
        </div>

        <div className="py-4">
          <Link
            to="/studio"
            className="text-[11px] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            Open Studio →
          </Link>
        </div>
      </div>
    </div>
  );
}
