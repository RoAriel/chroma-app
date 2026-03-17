import { useTheme } from "../hooks/useTheme";

const COUNT_OPTIONS = [4, 6, 8, 10, 12];

export default function ImagePreview({ imgRef, imageUrl, colorCount, loading, onImageLoad, onClear, onCountChange, onExtract }) {
    const { theme } = useTheme();
    const t = theme.colors;
    const mutedText = `${t.text}55`;

    return (
        <div className="mb-10">
            {/* Imagen con overlay para cambiarla */}
            <div
                className="rounded-2xl overflow-hidden border mb-2 relative group"
                style={{ borderColor: t.border, backgroundColor: t.surface }}
            >
                <img
                    ref={imgRef}
                    src={imageUrl}
                    alt="Imagen cargada para extraer paleta de colores"
                    className="w-full max-h-80 object-contain"
                    onLoad={onImageLoad}
                />
                <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                    aria-hidden="true"
                >
                    <button
                        onClick={onClear}
                        aria-label="Eliminar imagen actual y cargar una nueva"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
                        style={{ backgroundColor: "rgba(255,107,107,0.9)", color: "#fff" }}
                    >
                        🗑 Cambiar imagen
                    </button>
                </div>
            </div>

            <p className="text-xs font-mono text-center mb-5" style={{ color: mutedText }}>
                Pasá el cursor sobre la imagen para cambiarla
            </p>

            {/* Controles */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                    <span
                        className="text-xs font-mono uppercase tracking-widest"
                        id="color-count-label"
                        style={{ color: mutedText }}
                    >
                        Colores
                    </span>
                    <div
                        className="flex gap-1.5"
                        role="group"
                        aria-labelledby="color-count-label"
                    >
                        {COUNT_OPTIONS.map((n) => (
                            <button
                                key={n}
                                onClick={() => onCountChange(n)}
                                aria-label={`Extraer ${n} colores`}
                                aria-pressed={colorCount === n}
                                className="w-9 h-9 rounded-lg text-sm font-mono font-semibold transition-all duration-200 border"
                                style={
                                    colorCount === n
                                        ? {
                                            backgroundColor: t.accent,
                                            borderColor: t.accent,
                                            color: "#fff",
                                            boxShadow: `0 4px 15px ${t.accent}50`,
                                        }
                                        : {
                                            borderColor: t.border,
                                            backgroundColor: t.surface,
                                            color: mutedText,
                                        }
                                }
                            >
                                {n}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={onExtract}
                    disabled={loading}
                    aria-label="Extraer paleta de colores de la imagen"
                    aria-busy={loading}
                    className="ml-auto flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-105"
                    style={{
                        background: `linear-gradient(135deg, ${t.accent}, ${t.accentSecondary})`,
                        color: "#fff",
                        boxShadow: loading ? "none" : `0 4px 20px ${t.accent}40`,
                    }}
                >
                    {loading ? (
                        <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Analizando…
                        </>
                    ) : (
                        <>
                            <span aria-hidden="true">🎨</span>
                            Extraer paleta
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}