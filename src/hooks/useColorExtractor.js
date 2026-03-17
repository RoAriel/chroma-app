import { useState, useCallback, useRef } from "react";
import { extractPixelsFromImage } from "../utils/kmeans";

export function useColorExtractor() {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const workerRef = useRef(null);

  const extract = useCallback((imgElement, colorCount) => {
    if (!imgElement) return;
    setLoading(true);

    if (workerRef.current) {
      workerRef.current.terminate();
    }

    const pixels = extractPixelsFromImage(imgElement);

    const worker = new Worker(
      new URL("../utils/kmeans.worker.js", import.meta.url),
      { type: "module" }
    );
    workerRef.current = worker;

    worker.onmessage = (e) => {
      setColors(e.data);
      setLoading(false);
      worker.terminate();
      workerRef.current = null;
    };

    worker.onerror = (err) => {
      console.error("Worker error:", err);
      setLoading(false);
      worker.terminate();
      workerRef.current = null;
    };

    worker.postMessage({ pixels, k: colorCount });
  }, []);

  const reset = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    setColors([]);
    setLoading(false);
  }, []);

  // setColors expuesto para cargar paletas desde URL u otras fuentes externas
  return { colors, loading, extract, reset, setColors };
}