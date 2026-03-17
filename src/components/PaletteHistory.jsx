import { toHex } from "../utils/colorUtils";
import { useTheme } from "../hooks/useTheme";

export default function PaletteHistory({ history, onDelete, onClear, onLoad }) {
  const { theme } = useTheme();
  const t = theme.colors;
  const mutedText = `${t.text}50`;

  if (history.length === 0) {
    return (
      <div className="text-center py-10 text-sm font-mono" style={{ color: mutedText }}>
        No hay paletas guardadas aún
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: t.accent }}>
          {history.length} paleta{history.length !== 1 ? "s" : ""} guardada{history.length !== 1 ? "s" : ""}
        </span>
        <button
          onClick={onClear}
          className="text-xs font-mono transition-colors"
          style={{ color: "rgba(255,100,100,0.7)" }}
        >
          Borrar todo
        </button>
      </div>

      {history.map((entry) => (
        <div
          key={entry.id}
          className="group rounded-xl border p-3 transition-all duration-200"
          style={{ borderColor: t.border, backgroundColor: `${t.accent}08` }}
        >
          {/* Mini strip */}
          <div
            className="flex h-8 rounded-lg overflow-hidden mb-3 cursor-pointer"
            onClick={() => onLoad(entry.colors)}
            title="Cargar esta paleta"
          >
            {entry.colors.map((c, i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: toHex(c) }} />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold leading-tight" style={{ color: t.text }}>
                {entry.name}
              </p>
              <p className="text-xs font-mono mt-0.5" style={{ color: mutedText }}>
                {entry.colors.length} colores ·{" "}
                {new Date(entry.createdAt).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "short",
                })}
              </p>
            </div>
            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onLoad(entry.colors)}
                className="text-xs font-mono transition-colors"
                style={{ color: t.accent }}
              >
                Cargar
              </button>
              <button
                onClick={() => onDelete(entry.id)}
                className="text-xs font-mono transition-colors"
                style={{ color: "rgba(255,100,100,0.7)" }}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
