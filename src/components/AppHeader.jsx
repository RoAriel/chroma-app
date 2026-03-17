import { useTheme } from "../hooks/useTheme";

export default function AppHeader({ showHistory, historyCount, onToggleHistory, onOpenDrawer }) {
    const { theme } = useTheme();
    const t = theme.colors;
    const mutedText = `${t.text}55`;

    return (
        <header className="mb-14 relative flex flex-col items-center text-center">

            {/* Botones top-right */}
            <div className="absolute top-0 right-0 flex gap-2">
                <button
                    onClick={onToggleHistory}
                    aria-label={showHistory ? "Cerrar historial de paletas" : "Abrir historial de paletas"}
                    aria-expanded={showHistory}
                    className="px-3 py-2 rounded-xl border text-xs font-mono transition-all duration-200"
                    style={{
                        borderColor: showHistory ? t.accent : t.border,
                        backgroundColor: showHistory ? `${t.accent}20` : t.surface,
                        color: showHistory ? t.accent : mutedText,
                    }}
                >
                    🗂 <span className="hidden sm:inline">Historial </span>
                    {historyCount > 0 && `(${historyCount})`}
                </button>

                <button
                    onClick={onOpenDrawer}
                    aria-label="Abrir panel de personalización de tema"
                    className="px-3 py-2 rounded-xl border text-xs font-mono transition-all duration-200 hover:scale-105"
                    style={{ borderColor: t.border, backgroundColor: t.surface, color: mutedText }}
                >
                    🎨
                </button>
            </div>

            {/* Badge */}
            <div
                className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border text-xs font-mono tracking-widest uppercase"
                style={{
                    borderColor: `${t.accent}40`,
                    backgroundColor: `${t.accent}10`,
                    color: t.accent,
                }}
            >
                <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    aria-hidden="true"
                    style={{ backgroundColor: t.accentSecondary }}
                />
                Color Harvest Tool
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-3">
                <span style={{ color: t.accent }}>Chroma</span>
                <span style={{ color: t.accentSecondary }}>lab</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base font-mono" style={{ color: mutedText }}>
                Extrae paletas de color perfectas de cualquier imagen
            </p>
        </header>
    );
}