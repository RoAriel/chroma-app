import { useState } from "react";
import { useTheme } from "../hooks/useTheme";

export default function CopyButton({ text, className = "" }) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const t = theme.colors;

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className={`transition-all duration-200 text-xs font-mono px-2 py-0.5 rounded border ${className}`}
      style={
        copied
          ? { backgroundColor: t.accentSecondary, borderColor: t.accentSecondary, color: "#fff" }
          : { borderColor: `${t.text}25`, color: `${t.text}60` }
      }
    >
      {copied ? "✓ Copiado" : "Copiar"}
    </button>
  );
}
