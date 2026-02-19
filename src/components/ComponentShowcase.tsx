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
  codePreview?: string;
}

export function ComponentShowcase({
  title,
  subtitle,
  fileName,
  fileSource,
  preview,
  configurator,
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
      <div className="flex items-center justify-between px-6 h-11 border-b border-border shrink-0">
        <div className="flex items-baseline gap-2">
          <h1 className="text-sm font-semibold text-foreground">{title}</h1>
          <span className="text-[11px] text-muted-foreground hidden sm:inline">{subtitle}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {fileSource && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-[11px] gap-1.5 px-2"
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
              className="h-7 text-[11px] gap-1.5 px-2"
              onClick={handleDownload}
            >
              <Download className="h-3 w-3" />
              {fileName}
            </Button>
          )}
        </div>
      </div>

      {/* Code preview bar */}
      {codePreview && (
        <div className="px-6 py-1.5 border-b border-border bg-muted/30 shrink-0">
          <code className="text-[11px] text-muted-foreground font-mono">{codePreview}</code>
        </div>
      )}

      {/* Main: Preview + Configurator */}
      <div className="flex-1 flex min-h-0">
        <div className="flex-1 flex items-center justify-center">{preview}</div>
        <div className="w-56 border-l border-border p-4 overflow-y-auto flex flex-col gap-5 shrink-0">
          {configurator}
        </div>
      </div>
    </div>
  );
}
