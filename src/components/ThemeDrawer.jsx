import { useState, useEffect, useRef } from "react";
import { useTheme } from "../hooks/useTheme";
import { PRESET_THEMES } from "../hooks/themePresets";

// ─── Campos editables ────────────────────────────────────────────────────────
const COLOR_FIELDS = [
  { key: "background", label: "Fondo", icon: "■" },
  { key: "surface", label: "Superficies", icon: "▣" },
  { key: "accent", label: "Acento principal", icon: "●" },
  { key: "accentSecondary", label: "Acento secundario", icon: "◉" },
  { key: "text", label: "Texto", icon: "A" },
  { key: "border", label: "Bordes", icon: "□" },
];

// ─── Mini preview de tema ────────────────────────────────────────────────────
function ThemePreview({ colors }) {
  return (
    <div
      className="w-full h-10 rounded-lg overflow-hidden flex"
      style={{ backgroundColor: colors.background, border: `1px solid ${colors.border}` }}
    >
      <div className="flex-1" style={{ backgroundColor: colors.background }} />
      <div className="w-6" style={{ backgroundColor: colors.accent }} />
      <div className="w-4" style={{ backgroundColor: colors.accentSecondary }} />
      <div className="w-3" style={{ backgroundColor: colors.surface }} />
    </div>
  );
}

// ─── Color picker row ────────────────────────────────────────────────────────
function ColorRow({ field, value, onChange, theme }) {
  const inputRef = useRef(null);

  // Extraer hex limpio para el input type=color
  const hexValue = value.startsWith("#") ? value : "#888888";

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl transition-colors"
      style={{ backgroundColor: `${theme.colors.surface}` }}
    >
      {/* Swatch clickeable */}
      <button
        onClick={() => inputRef.current?.click()}
        className="w-9 h-9 rounded-lg border-2 shrink-0 transition-transform hover:scale-105 cursor-pointer"
        style={{
          backgroundColor: value,
          borderColor: theme.colors.border,
        }}
        title="Clic para cambiar color"
      />

      {/* Hidden native color input */}
      <input
        ref={inputRef}
        type="color"
        value={hexValue}
        onChange={(e) => onChange(field.key, e.target.value)}
        className="sr-only"
      />

      {/* Label */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-tight" style={{ color: theme.colors.text }}>
          {field.label}
        </p>
        <p className="text-xs font-mono mt-0.5" style={{ color: `${theme.colors.text}60` }}>
          {value}
        </p>
      </div>

      {/* Hex input directo */}
      <input
        type="text"
        value={value}
        onChange={(e) => {
          const v = e.target.value;
          if (/^#[0-9A-Fa-f]{0,8}$/.test(v)) onChange(field.key, v);
        }}
        className="w-24 px-2 py-1 rounded-lg text-xs font-mono border bg-transparent focus:outline-none"
        style={{
          borderColor: theme.colors.border,
          color: theme.colors.text,
        }}
        spellCheck={false}
      />
    </div>
  );
}

// ─── ThemeDrawer principal ───────────────────────────────────────────────────
export default function ThemeDrawer({ open, onClose }) {
  const { theme, activeTheme, customColors, applyPreset, updateColor, resetToPreset } = useTheme();
  const [tab, setTab] = useState("presets"); // "presets" | "custom"

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const hasCustom = !!customColors;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          backdropFilter: open ? "blur(4px)" : "none",
        }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full z-50 flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          width: "360px",
          transform: open ? "translateX(0)" : "translateX(100%)",
          backgroundColor: theme.colors.background,
          borderLeft: `1px solid ${theme.colors.border}`,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b shrink-0"
          style={{ borderColor: theme.colors.border }}
        >
          <div>
            <h2 className="text-base font-bold" style={{ color: theme.colors.text }}>
              🎨 Personalizar tema
            </h2>
            <p className="text-xs font-mono mt-0.5" style={{ color: `${theme.colors.text}55` }}>
              Los cambios aplican en tiempo real
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors text-lg"
            style={{ backgroundColor: theme.colors.surface, color: theme.colors.text }}
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div
          className="flex gap-1 mx-6 mt-4 mb-2 p-1 rounded-xl shrink-0"
          style={{ backgroundColor: theme.colors.surface }}
        >
          {["presets", "custom"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 py-2 rounded-lg text-sm font-mono transition-all duration-200"
              style={
                tab === t
                  ? { backgroundColor: theme.colors.accent, color: "#fff" }
                  : { color: `${theme.colors.text}70` }
              }
            >
              {t === "presets" ? "Predefinidos" : "Personalizar"}
            </button>
          ))}
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">

          {/* ── PRESETS ── */}
          {tab === "presets" && (
            <div className="space-y-3 mt-4">
              {PRESET_THEMES.map((preset) => {
                const isActive = activeTheme.id === preset.id && !hasCustom;
                return (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset)}
                    className="w-full text-left rounded-xl border p-4 transition-all duration-200 hover:scale-[1.01]"
                    style={{
                      borderColor: isActive ? theme.colors.accent : theme.colors.border,
                      backgroundColor: isActive
                        ? `${theme.colors.accent}15`
                        : theme.colors.surface,
                    }}
                  >
                    <ThemePreview colors={preset.colors} />
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <p
                          className="text-sm font-bold"
                          style={{ color: isActive ? theme.colors.accent : theme.colors.text }}
                        >
                          {preset.name}
                        </p>
                        <p
                          className="text-xs font-mono mt-0.5"
                          style={{ color: `${theme.colors.text}55` }}
                        >
                          {preset.description}
                        </p>
                      </div>
                      {isActive && (
                        <span
                          className="text-xs font-mono px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${theme.colors.accent}20`,
                            color: theme.colors.accent,
                          }}
                        >
                          activo
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* ── CUSTOM ── */}
          {tab === "custom" && (
            <div className="mt-4 space-y-2">
              {/* Preview del tema actual */}
              <div className="mb-4">
                <p
                  className="text-xs font-mono uppercase tracking-widest mb-2"
                  style={{ color: `${theme.colors.text}55` }}
                >
                  Vista previa
                </p>
                <ThemePreview colors={theme.colors} />
              </div>

              {/* Separador */}
              <div
                className="h-px mb-4"
                style={{ backgroundColor: theme.colors.border }}
              />

              {/* Color fields */}
              <div className="space-y-2">
                {COLOR_FIELDS.map((field) => (
                  <ColorRow
                    key={field.key}
                    field={field}
                    value={theme.colors[field.key]}
                    onChange={updateColor}
                    theme={theme}
                  />
                ))}
              </div>

              {/* Reset button */}
              {hasCustom && (
                <button
                  onClick={resetToPreset}
                  className="w-full mt-4 py-2.5 rounded-xl text-sm font-mono border transition-all duration-200"
                  style={{
                    borderColor: "rgba(255,100,100,0.3)",
                    color: "rgba(255,120,120,0.8)",
                    backgroundColor: "rgba(255,100,100,0.05)",
                  }}
                >
                  ↺ Restaurar preset "{activeTheme.name}"
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
