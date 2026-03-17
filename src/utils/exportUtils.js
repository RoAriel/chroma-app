import { toHex, toRgb, toHsl } from "./colorUtils";

function downloadFile(filename, content, type) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([content], { type }));
  a.download = filename;
  a.click();
}

export function exportCSS(colors, name = "palette") {
  const lines = [
    `:root {`,
    ...colors.map((c, i) => `  --${name}-${i + 1}: ${toHex(c).toUpperCase()};`),
    `}`,
  ];
  downloadFile(`${name}.css`, lines.join("\n"), "text/css");
}

export function exportJSON(colors, name = "palette") {
  const obj = colors.map((c, i) => ({
    name: `${name}-${i + 1}`,
    hex: toHex(c).toUpperCase(),
    rgb: toRgb(c),
    hsl: toHsl(c),
  }));
  downloadFile(`${name}.json`, JSON.stringify(obj, null, 2), "application/json");
}

export function exportHex(colors, name = "palette") {
  const txt = colors.map((c) => toHex(c).toUpperCase()).join("\n");
  downloadFile(`${name}.txt`, txt, "text/plain");
}

export function exportSVG(colors, name = "palette") {
  const w = 120,
    h = 160,
    gap = 8;
  const total = colors.length * (w + gap) - gap;
  const rects = colors
    .map((c, i) => {
      const x = i * (w + gap);
      const hex = toHex(c).toUpperCase();
      return `<rect x="${x}" y="0" width="${w}" height="${h - 30}" rx="6" fill="${hex}"/>
<text x="${x + w / 2}" y="${h - 8}" text-anchor="middle" font-family="monospace" font-size="11" fill="#888">${hex}</text>`;
    })
    .join("\n");

  downloadFile(
    `${name}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="${total}" height="${h}">\n${rects}\n</svg>`,
    "image/svg+xml"
  );
}
