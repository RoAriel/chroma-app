import { useState, useCallback, createElement } from "react";
import { ThemeContext } from "./themeContext";
import { PRESET_THEMES, isColorDark } from "./themePresets";

export default function ThemeProvider({ children }) {
    const [activeTheme, setActiveTheme] = useState(PRESET_THEMES[0]);
    const [customColors, setCustomColors] = useState(null);

    const theme = customColors
        ? { ...activeTheme, colors: { ...activeTheme.colors, ...customColors } }
        : activeTheme;

    const applyPreset = useCallback((preset) => {
        setActiveTheme(preset);
        setCustomColors(null);
    }, []);

    const updateColor = useCallback((key, value) => {
        setCustomColors((prev) => ({
            ...(prev ?? activeTheme.colors),
            [key]: value,
        }));
    }, [activeTheme.colors]);

    const resetToPreset = useCallback(() => setCustomColors(null), []);

    const isDarkTheme = isColorDark(theme.colors.background);

    return createElement(
        ThemeContext.Provider,
        { value: { theme, activeTheme, customColors, applyPreset, updateColor, resetToPreset, isDarkTheme } },
        children
    );
}