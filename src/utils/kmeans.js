// Solo extrae los pixels de la imagen y los devuelve.
// El algoritmo k-means fue movido a kmeans.worker.js para no bloquear el hilo principal.

export function extractPixelsFromImage(img) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const maxSize = 220;
  const scale = Math.min(
    maxSize / img.naturalWidth,
    maxSize / img.naturalHeight,
    1
  );
  canvas.width = Math.floor(img.naturalWidth * scale);
  canvas.height = Math.floor(img.naturalHeight * scale);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const pixels = [];

  for (let i = 0; i < data.length; i += 16) {
    if (data[i + 3] < 128) continue;
    pixels.push([data[i], data[i + 1], data[i + 2]]);
  }

  return pixels;
}