import { useState, useRef } from "react";
import { useTheme } from "../hooks/useTheme";

export default function DropZone({ onFile }) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const { theme } = useTheme();
  const t = theme.colors;

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError(`"${file.name}" no es una imagen válida. Usá JPG, PNG, WEBP, GIF o SVG.`);
      setTimeout(() => setError(null), 4000);
      return;
    }
    setError(null);
    onFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="space-y-3">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className="cursor-pointer border-2 border-dashed rounded-2xl p-16 text-center select-none"
        style={{
          borderColor: error ? "#ff6b6b" : dragging ? t.accent : t.border,
          backgroundColor: error
            ? "rgba(255,107,107,0.05)"
            : dragging
              ? `${t.accent}0A`
              : t.surface,
          transform: dragging ? "scale(1.01)" : "scale(1)",
          transition: "all 0.3s ease",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
            style={{
              background: error
                ? "linear-gradient(135deg, #ff6b6b, #ee5a24)"
                : `linear-gradient(135deg, ${t.accent} 0%, ${t.accentSecondary} 100%)`,
              transform: dragging ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.3s ease",
            }}
          >
            {error ? "⚠️" : "🎨"}
          </div>
          <div>
            <p className="text-xl font-semibold mb-1" style={{ color: t.text }}>
              {dragging ? "Suelta la imagen aquí" : "Arrastra tu imagen aquí"}
            </p>
            <p className="text-sm font-mono" style={{ color: `${t.text}50` }}>
              o haz clic para seleccionar · JPG, PNG, WEBP, GIF, SVG
            </p>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-mono"
          style={{
            backgroundColor: "rgba(255,107,107,0.1)",
            border: "1px solid rgba(255,107,107,0.3)",
            color: "#ff6b6b",
          }}
        >
          <span className="shrink-0">✕</span>
          {error}
        </div>
      )}
    </div>
  );
}