export const PRESET_THEMES = [
    {
        id: "chromalab",
        name: "Chromalab",
        description: "El clásico",
        colors: {
            background: "#1E272E",
            surface: "#243038",
            accent: "#0984E3",
            accentSecondary: "#00CEC9",
            text: "#F5F6FA",
            border: "rgba(9,132,227,0.25)",
        },
    },
    {
        id: "midnight",
        name: "Midnight",
        description: "Profundo y elegante",
        colors: {
            background: "#0D0D1A",
            surface: "#13132A",
            accent: "#7C6AF0",
            accentSecondary: "#F472B6",
            text: "#E8E8FF",
            border: "rgba(124,106,240,0.25)",
        },
    },
    {
        id: "forest",
        name: "Forest",
        description: "Natural y sereno",
        colors: {
            background: "#0F1F17",
            surface: "#162B1F",
            accent: "#00B894",
            accentSecondary: "#55EFC4",
            text: "#F0FFF8",
            border: "rgba(0,184,148,0.25)",
        },
    },
    {
        id: "sunset",
        name: "Sunset",
        description: "Cálido y vibrante",
        colors: {
            background: "#1A0F0F",
            surface: "#2A1515",
            accent: "#E17055",
            accentSecondary: "#FDCB6E",
            text: "#FFF5F0",
            border: "rgba(225,112,85,0.25)",
        },
    },
    {
        id: "arctic",
        name: "Arctic",
        description: "Limpio y frío",
        colors: {
            background: "#F0F4F8",
            surface: "#FFFFFF",
            accent: "#0984E3",
            accentSecondary: "#00CEC9",
            text: "#1E272E",
            border: "rgba(9,132,227,0.2)",
        },
    },
    {
        id: "rose",
        name: "Rose",
        description: "Suave y moderno",
        colors: {
            background: "#1A0F14",
            surface: "#251520",
            accent: "#E84393",
            accentSecondary: "#FF6B9D",
            text: "#FFF0F7",
            border: "rgba(232,67,147,0.25)",
        },
    },
];

function isColorDark(color) {
    const hex = color.replace("#", "");
    if (hex.length < 6) return true;
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return 0.299 * r + 0.587 * g + 0.114 * b < 128;
}

export { isColorDark };