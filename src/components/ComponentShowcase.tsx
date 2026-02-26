import { type ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export type PropDef = {
  name: string;
  type: string;
  default?: string;
  description: string;
};

interface ComponentShowcaseProps {
  title: string;
  subtitle: string;
  fileName?: string;
  fileSource?: string;
  preview: ReactNode;
  configurator: ReactNode;
  codePreview?: string;
  propsTable?: PropDef[];
}

export function ComponentShowcase({
  title,
  subtitle,
  fileName,
  fileSource,
  preview,
  configurator,
  codePreview,
  propsTable,
}: ComponentShowcaseProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!fileSource) return;
    navigator.clipboard.writeText(fileSource).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 h-10 border-b border-border shrink-0">
        <div className="flex items-baseline gap-2">
          <h1 className="text-xs font-semibold text-foreground">{title}</h1>
          <span className="text-[10px] text-muted-foreground hidden sm:inline">{subtitle}</span>
        </div>
        {fileSource && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-[10px] gap-1 px-2"
            onClick={handleCopy}
          >
            {copied ? (
              <><Check className="h-3 w-3" />Copied</>
            ) : (
              <><Copy className="h-3 w-3" />Copy</>
            )}
          </Button>
        )}
      </div>

      {/* Preview */}
      <div className="flex items-center justify-center py-10 shrink-0 border-b border-border">
        {preview}
      </div>

      {/* Configurator */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
        {configurator}

        {/* Props table */}
        {propsTable && propsTable.length > 0 && (
          <div className="mt-2">
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5 block font-medium">
              Props
            </label>
            <div className="border border-border rounded overflow-hidden">
              <table className="w-full text-[10px]">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-2 py-1 font-medium text-muted-foreground">Prop</th>
                    <th className="text-left px-2 py-1 font-medium text-muted-foreground">Type</th>
                    <th className="text-left px-2 py-1 font-medium text-muted-foreground">Default</th>
                  </tr>
                </thead>
                <tbody>
                  {propsTable.map((p) => (
                    <tr key={p.name} className="border-b border-border last:border-0">
                      <td className="px-2 py-1 font-mono text-foreground">{p.name}</td>
                      <td className="px-2 py-1 font-mono text-muted-foreground">{p.type}</td>
                      <td className="px-2 py-1 font-mono text-muted-foreground">{p.default ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Code preview */}
      {codePreview && (
        <div className="px-5 py-2 border-t border-border bg-muted/30 shrink-0">
          <code className="text-[10px] text-muted-foreground font-mono leading-tight break-all">{codePreview}</code>
        </div>
      )}
    </div>
  );
}
