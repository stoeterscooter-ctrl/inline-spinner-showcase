import { type ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check } from "lucide-react";

interface ComponentShowcaseProps {
  title: string;
  subtitle: string;
  fileName?: string;
  fileSource?: string;
  preview: ReactNode;
  configurator: ReactNode;
  useCases?: ReactNode;
  codePreview?: string;
}

export function ComponentShowcase({
  title,
  subtitle,
  fileName,
  fileSource,
  preview,
  configurator,
  useCases,
  codePreview,
}: ComponentShowcaseProps) {
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    if (!fileSource || !fileName) return;
    const blob = new Blob([fileSource], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

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
      <div className="flex items-center justify-between px-6 h-12 border-b border-border shrink-0">
        <div className="flex items-baseline gap-3">
          <h1 className="text-sm font-medium text-foreground">{title}</h1>
          <span className="text-xs text-muted-foreground">{subtitle}</span>
        </div>
        <div className="flex items-center gap-2">
          {codePreview && (
            <code className="text-[11px] text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
              {codePreview}
            </code>
          )}
          {fileSource && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs gap-1.5"
              onClick={handleCopy}
            >
              {copied ? (
                <><Check className="h-3 w-3" />Copied</>
              ) : (
                <><Copy className="h-3 w-3" />Copy</>
              )}
            </Button>
          )}
          {fileName && fileSource && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs gap-1.5"
              onClick={handleDownload}
            >
              <Download className="h-3 w-3" />
              {fileName}
            </Button>
          )}
        </div>
      </div>

      {/* Main: Preview + Configurator */}
      <div className="flex-1 flex min-h-0">
        <div className="flex-1 flex items-center justify-center">{preview}</div>
        <div className="w-52 border-l border-border p-4 overflow-y-auto flex flex-col gap-5 shrink-0">
          {configurator}
        </div>
      </div>

      {/* Bottom strip: use cases */}
      {useCases && (
        <div className="border-t border-border px-6 h-14 flex items-center gap-3 shrink-0">
          {useCases}
        </div>
      )}
    </div>
  );
}
