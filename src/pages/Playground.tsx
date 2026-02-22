import { Link } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { GooeySwitch } from "@/components/ui/gooey-switch";
import { ArrowUpRight } from "lucide-react";

const ITEMS = [
  {
    title: "Spinner",
    description:
      "15 variants, 4 sizes, adjustable speed & color. Drop-in loading indicator for any context.",
    path: "/studio",
    preview: (
      <div className="flex items-center gap-4">
        <Spinner variant="material" size="md" />
        <Spinner variant="blade" size="sm" />
        <Spinner variant="dots" size="sm" />
      </div>
    ),
  },
  {
    title: "Gooey Switch",
    description:
      "Physics-based toggle with SVG goo filter. Spring or tween animation, 3 sizes, customizable palette.",
    path: "/studio/gooey-switch",
    preview: (
      <div className="flex items-center gap-6">
        <GooeySwitch size="md" />
        <GooeySwitch size="sm" defaultOn />
      </div>
    ),
  },
] as const;

export default function Playground() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-20">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-sm font-mono font-medium text-foreground tracking-tight mb-2">
            Playground
          </h1>
          <p className="text-sm font-mono text-muted-foreground leading-relaxed max-w-lg">
            A collection of interactive UI components I've built. Each one is
            self-contained, copy-pasteable, and ready to drop into your project.
          </p>
        </header>

        {/* Component cards */}
        <div className="flex flex-col">
          {ITEMS.map((item, i) => (
            <Link
              key={item.title}
              to={item.path}
              className="group block border-t border-border py-8 transition-colors hover:bg-accent/30 -mx-6 px-6"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h2 className="text-sm font-mono font-medium text-foreground mb-1 flex items-center gap-2">
                    {item.title}
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h2>
                  <p className="text-xs font-mono text-muted-foreground leading-relaxed max-w-md">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="h-20 flex items-center">{item.preview}</div>
            </Link>
          ))}
          <div className="border-t border-border" />
        </div>

        {/* Footer link */}
        <div className="mt-12">
          <Link
            to="/studio"
            className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
          >
            View all in Studio
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
