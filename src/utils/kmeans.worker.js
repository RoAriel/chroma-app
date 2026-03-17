// kmeans.worker.js
// Este archivo corre en un hilo separado (Web Worker).
// No tiene acceso a DOM, window ni React.

function dist(a, b) {
    return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
}

function luminanceRaw([r, g, b]) {
    return 0.299 * r + 0.587 * g + 0.114 * b;
}

function kMeans(pixels, k, iterations = 25) {
    const step = Math.max(1, Math.floor(pixels.length / k));
    let centers = Array.from(
        { length: k },
        (_, i) => [...pixels[(i * step) % pixels.length]]
    );

    for (let iter = 0; iter < iterations; iter++) {
        const clusters = Array.from({ length: k }, () => []);

        for (const p of pixels) {
            let minD = Infinity, idx = 0;
            for (let c = 0; c < k; c++) {
                const d = dist(p, centers[c]);
                if (d < minD) { minD = d; idx = c; }
            }
            clusters[idx].push(p);
        }

        let moved = false;
        for (let c = 0; c < k; c++) {
            if (!clusters[c].length) continue;
            const nc = [
                clusters[c].reduce((s, p) => s + p[0], 0) / clusters[c].length,
                clusters[c].reduce((s, p) => s + p[1], 0) / clusters[c].length,
                clusters[c].reduce((s, p) => s + p[2], 0) / clusters[c].length,
            ];
            if (dist(nc, centers[c]) > 1) moved = true;
            centers[c] = nc;
        }

        if (!moved) break;
    }

    return centers
        .map(([r, g, b]) => ({ r, g, b }))
        .sort((a, b) => luminanceRaw([a.r, a.g, a.b]) - luminanceRaw([b.r, b.g, b.b]));
}

// Escuchar mensajes del hilo principal
self.onmessage = (e) => {
    const { pixels, k } = e.data;
    const colors = kMeans(pixels, k);
    self.postMessage(colors);
};