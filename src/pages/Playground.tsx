import { Link } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { GooeySwitch } from "@/components/ui/gooey-switch";
import { ArrowUpRight } from "lucide-react";

const ITEMS = [
  {
    title: "Spinner",
    description: "15 variants · 4 sizes · color · speed",
    path: "/studio",
    preview: <Spinner variant="material" size="sm" />,
  },
  {
    title: "Gooey Switch",
    description: "Spring & tween · 3 sizes · custom palette",
    path: "/studio/gooey-switch",
    preview: <GooeySwitch size="sm" />,
  },
] as const;

export default function Playground() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-6 py-14">
        <header className="mb-8">
          <h1 className="text-sm font-mono font-medium text-foreground tracking-tight mb-1">
            Playground
          </h1>
          <p className="text-xs font-mono text-muted-foreground leading-relaxed">
            Interactive UI components. Self-contained, copy-pasteable.
          </p>
        </header>

        <div className="flex flex-col">
          {ITEMS.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className="group flex items-center justify-between border-t border-border py-4 -mx-4 px-4 transition-colors hover:bg-accent/30"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  {item.preview}
                </div>
                <div className="min-w-0">
                  <h2 className="text-xs font-mono font-medium text-foreground flex items-center gap-1.5">
                    {item.title}
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h2>
                  <p className="text-[11px] font-mono text-muted-foreground truncate">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          <div className="border-t border-border" />
        </div>

        <div className="mt-6">
          <Link
            to="/studio"
            className="text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            View all in Studio
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
