import { useState, useCallback } from "react";

const STORAGE_KEY = "chromalab_history";
const MAX_HISTORY = 20;

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(history) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // storage might be unavailable
  }
}

export function usePaletteHistory() {
  const [history, setHistory] = useState(loadFromStorage);

  const savePalette = useCallback((colors, name) => {
    setHistory((prev) => {
      const entry = {
        id: Date.now(),
        name: name || `Paleta ${prev.length + 1}`,
        colors,
        createdAt: new Date().toISOString(),
      };
      const updated = [entry, ...prev].slice(0, MAX_HISTORY);
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const deletePalette = useCallback((id) => {
    setHistory((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    saveToStorage([]);
  }, []);

  return { history, savePalette, deletePalette, clearHistory };
}
