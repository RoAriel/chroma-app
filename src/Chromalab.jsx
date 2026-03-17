import { useState, useRef, useCallback, useEffect, lazy, Suspense } from "react";
import AppHeader from "./components/AppHeader";
import ImagePreview from "./components/ImagePreview";
import DropZone from "./components/DropZone";
import PaletteResults from "./components/PaletteResults";
import PaletteHistory from "./components/PaletteHistory";
import SkeletonCard from "./components/SkeletonCard";
import { useColorExtractor } from "./hooks/useColorExtractor";
import { usePaletteHistory } from "./hooks/usePaletteHistory";
import { useTheme } from "./hooks/useTheme";
import { decodePaletteFromUrl, clearPaletteFromUrl } from "./utils/paletteUrl";

const ThemeDrawer = lazy(() => import("./components/ThemeDrawer"));

export default function Chromalab() {
  const [imageUrl, setImageUrl] = useState(null);
  const [colorCount, setColorCount] = useState(6);
  const [showHistory, setShowHistory] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const imgRef = useRef(null);
  const { colors, loading, extract, reset, setColors } = useColorExtractor();
  const { history, savePalette, deletePalette, clearHistory } = usePaletteHistory();
  const { theme } = useTheme();
  const t = theme.colors;
  const mutedText = `${t.text}55`;

  // Al montar, leer paleta desde URL si existe
  useEffect(() => {
    const urlColors = decodePaletteFromUrl();
    if (urlColors) {
      setColors(urlColors);
      clearPaletteFromUrl();
    }
  }, [setColors]);

  const handleFile = useCallback((file) => {
    setImageUrl(URL.createObjectURL(file));
    reset();
  }, [reset]);

  const handleClearImage = useCallback(() => {
    setImageUrl(null);
    reset();
  }, [reset]);

  const handleImageLoad = useCallback(() => {
    extract(imgRef.current, colorCount);
  }, [extract, colorCount]);

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: t.background, color: t.text }}
    >
      {/* Decoración de fondo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full opacity-[0.07]"
          style={{ background: `radial-gradient(circle, ${t.accent}, transparent 70%)` }}
        />
        <div
          className="absolute bottom-[-15%] right-[-10%] w-[40vw] h-[40vw] rounded-full opacity-[0.07]"
          style={{ background: `radial-gradient(circle, ${t.accentSecondary}, transparent 70%)` }}
        />
      </div>

      {/* ThemeDrawer — lazy loaded */}
      {drawerOpen && (
        <Suspense fallback={null}>
          <ThemeDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </Suspense>
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 pb-24">

        <AppHeader
          showHistory={showHistory}
          historyCount={history.length}
          onToggleHistory={() => setShowHistory((v) => !v)}
          onOpenDrawer={() => setDrawerOpen(true)}
        />

        {/* Panel de historial */}
        {showHistory && (
          <div
            className="mb-8 rounded-2xl border p-6"
            style={{ borderColor: t.border, backgroundColor: t.surface }}
          >
            <PaletteHistory
              history={history}
              onDelete={deletePalette}
              onClear={clearHistory}
              onLoad={() => setShowHistory(false)}
            />
          </div>
        )}

        {/* Drop zone — solo si no hay imagen ni colores cargados */}
        {!imageUrl && colors.length === 0 && (
          <div className="mb-8">
            <DropZone onFile={handleFile} />
          </div>
        )}

        {/* Preview + controles */}
        {imageUrl && (
          <ImagePreview
            imgRef={imgRef}
            imageUrl={imageUrl}
            colorCount={colorCount}
            loading={loading}
            onImageLoad={handleImageLoad}
            onClear={handleClearImage}
            onCountChange={setColorCount}
            onExtract={() => extract(imgRef.current, colorCount)}
          />
        )}

        {/* Skeleton mientras procesa */}
        {loading && (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mb-8"
            aria-label="Cargando colores"
            aria-busy="true"
          >
            {Array.from({ length: colorCount }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Resultados */}
        {!loading && colors.length > 0 && (
          <PaletteResults colors={colors} onSave={savePalette} />
        )}

        {/* Si los colores vienen de URL, mostrar opción de cargar imagen */}
        {!loading && colors.length > 0 && !imageUrl && (
          <div className="mt-8 text-center">
            <button
              onClick={() => reset()}
              aria-label="Volver al inicio para cargar una nueva imagen"
              className="text-xs font-mono transition-colors underline"
              style={{ color: mutedText }}
            >
              ← Cargar una nueva imagen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}