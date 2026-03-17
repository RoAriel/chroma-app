import { useState } from "react";
import ColorCard from "./ColorCard";
import PaletteStrip from "./PaletteStrip";
import CopyButton from "./CopyButton";
import { useTheme } from "../hooks/useTheme";
import { toHex, toRgb, toHsl } from "../utils/colorUtils";
import { exportCSS, exportJSON, exportHex, exportSVG } from "../utils/exportUtils";
import { encodePaletteToUrl } from "../utils/paletteUrl";

const EXPORT_OPTIONS = [
  { label: "CSS", fn: exportCSS },
  { label: "JSON", fn: exportJSON },
  { label: "HEX", fn: exportHex },
  { label: "SVG", fn: exportSVG },
];

export default function PaletteResults({ colors, onSave }) {
  const [activeTab, setActiveTab] = useState("cards");
  const [paletteName, setPaletteName] = useState("");
  const [saved, setSaved] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [sharedUrl, setSharedUrl] = useState(false);
  const { theme } = useTheme();
  const t = theme.colors;
  const mutedText = `${t.text}55`;

  const handleSave = () => {
    onSave(colors, paletteName.trim() || undefined);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCopyAll = () => {
    const all = colors.map((c) => toHex(c).toUpperCase()).join(", ");
    navigator.clipboard.writeText(all).catch(() => { });
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleShareUrl = () => {
    const url = encodePaletteToUrl(colors);
    navigator.clipboard.writeText(url).catch(() => { });
    window.history.replaceState({}, "", url);
    setSharedUrl(true);
    setTimeout(() => setSharedUrl(false), 2000);
  };

  return (
    <div>
      <PaletteStrip colors={colors} />

      {/* Save row */}
      <div
        className="flex items-center gap-3 mb-4 p-4 rounded-xl border"
        style={{ borderColor: t.border, backgroundColor: t.surface }}
      >
        <input
          type="text"
          value={paletteName}
          onChange={(e) => setPaletteName(e.target.value)}
          placeholder="Nombre de la paleta (opcional)"
          aria-label="Nombre de la paleta"
          className="flex-1 bg-transparent rounded-lg px-3 py-2 text-sm font-mono focus:outline-none border min-w-0"
          style={{ borderColor: t.border, color: t.text }}
        />
        <button
          onClick={handleSave}
          aria-label="Guardar paleta en historial"
          className="px-4 py-2 rounded-lg text-sm font-mono font-semibold transition-all duration-200 whitespace-nowrap border shrink-0"
          style={
            saved
              ? { backgroundColor: t.accentSecondary, borderColor: t.accentSecondary, color: "#fff" }
              : { backgroundColor: `${t.accent}18`, borderColor: `${t.accent}50`, color: t.accent }
          }
        >
          {saved ? "✓ Guardada" : "💾 Guardar"}
        </button>
      </div>

      {/* Acciones rápidas */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={handleCopyAll}
          aria-label="Copiar todos los códigos HEX de la paleta"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono border transition-all duration-200 hover:scale-105"
          style={
            copiedAll
              ? { backgroundColor: t.accentSecondary, borderColor: t.accentSecondary, color: "#fff" }
              : { borderColor: t.border, backgroundColor: t.surface, color: t.text }
          }
        >
          {copiedAll ? "✓ Copiados" : "⎘ Copiar todos los HEX"}
        </button>

        <button
          onClick={handleShareUrl}
          aria-label="Compartir paleta generando una URL"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono border transition-all duration-200 hover:scale-105"
          style={
            sharedUrl
              ? { backgroundColor: t.accent, borderColor: t.accent, color: "#fff" }
              : { borderColor: t.border, backgroundColor: t.surface, color: t.text }
          }
        >
          {sharedUrl ? "✓ URL copiada" : "🔗 Compartir paleta"}
        </button>
      </div>

      {/* Tabs + Export */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div
          className="flex rounded-xl p-1 gap-1 border"
          role="tablist"
          aria-label="Modo de visualización de paleta"
          style={{ borderColor: t.border, backgroundColor: t.surface }}
        >
          {["cards", "list"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              role="tab"
              aria-selected={activeTab === tab}
              className="px-4 py-1.5 rounded-lg text-sm font-mono transition-all duration-200"
              style={
                activeTab === tab
                  ? { backgroundColor: t.accent, color: "#fff" }
                  : { color: mutedText }
              }
            >
              {tab === "cards" ? "Tarjetas" : "Lista"}
            </button>
          ))}
        </div>

        <div className="flex gap-2 flex-wrap">
          {EXPORT_OPTIONS.map(({ label, fn }) => (
            <button
              key={label}
              onClick={() => fn(colors, paletteName.trim() || "palette")}
              aria-label={`Exportar paleta como ${label}`}
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono border transition-all duration-200"
              style={{
                borderColor: `${t.accent}35`,
                backgroundColor: `${t.accent}0A`,
                color: t.accent,
              }}
            >
              ↓ {label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      {activeTab === "cards" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {colors.map((color, i) => (
            <ColorCard key={i} color={color} index={i} />
          ))}
        </div>
      )}

      {/* List */}
      {activeTab === "list" && (
        <div
          className="rounded-2xl border overflow-x-auto"
          style={{ borderColor: t.border, backgroundColor: t.surface }}
        >
          <table className="w-full min-w-[320px]">
            <thead>
              <tr style={{ borderBottom: `1px solid ${t.border}` }}>
                {["Muestra", "HEX", "RGB", "HSL", ""].map((h, i) => (
                  <th
                    key={i}
                    className={`px-4 py-3 text-left text-xs font-mono uppercase tracking-widest
                      ${h === "RGB" ? "hidden sm:table-cell" : ""}
                      ${h === "HSL" ? "hidden md:table-cell" : ""}`}
                    style={{ color: `${t.accent}AA` }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {colors.map((color, i) => {
                const hex = toHex(color).toUpperCase();
                return (
                  <tr key={i} style={{ borderBottom: `1px solid ${t.border}50` }}>
                    <td className="px-4 py-3">
                      <div
                        className="w-8 h-8 rounded-lg border shrink-0"
                        style={{ backgroundColor: hex, borderColor: t.border }}
                      />
                    </td>
                    <td className="px-4 py-3 font-mono text-sm font-semibold" style={{ color: t.text }}>
                      {hex}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs hidden sm:table-cell" style={{ color: mutedText }}>
                      {toRgb(color)}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs hidden md:table-cell" style={{ color: mutedText }}>
                      {toHsl(color)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <CopyButton text={hex} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}