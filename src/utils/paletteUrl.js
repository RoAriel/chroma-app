import { toHex } from "./colorUtils";

// Encode: array de colores → query param
// Ej: ?p=1E272E,0984E3,00CEC9
export function encodePaletteToUrl(colors) {
    const param = colors
        .map((c) => toHex(c).toUpperCase().replace("#", ""))
        .join(",");
    const url = new URL(window.location.href);
    url.searchParams.set("p", param);
    return url.toString();
}

// Decode: query param → array de colores { r, g, b }
// Devuelve null si no hay param o es inválido
export function decodePaletteFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const param = params.get("p");
    if (!param) return null;

    try {
        const colors = param.split(",").map((hex) => {
            if (!/^[0-9A-Fa-f]{6}$/.test(hex)) throw new Error("invalid hex");
            return {
                r: parseInt(hex.slice(0, 2), 16),
                g: parseInt(hex.slice(2, 4), 16),
                b: parseInt(hex.slice(4, 6), 16),
            };
        });
        return colors.length > 0 ? colors : null;
    } catch {
        return null;
    }
}

// Limpia el param de la URL sin recargar la página
export function clearPaletteFromUrl() {
    const url = new URL(window.location.href);
    url.searchParams.delete("p");
    window.history.replaceState({}, "", url.toString());
}