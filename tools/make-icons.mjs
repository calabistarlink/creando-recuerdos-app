// Genera los íconos de la app (PNG) sin dependencias: una ampolleta encendida colgando de un cable,
// sobre verde bosque (paleta "Jardín"), como la guirnalda del contador. Uso: node local/tools/make-icons.mjs
import { writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const OUT = fileURLToPath(new URL('..', import.meta.url));
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const INK = hex('#1F3A2E'), GOLD = hex('#F4A259'), LIGHT = hex('#FFD9B0'), CAP = hex('#D3DCCF'), WIRE = hex('#93A39A');

// Forma de la ampolleta (misma proporción que .bulb en el CSS: arriba 58 %, abajo 42 %)
const B = { cx: 0.5, top: 0.40, w: 0.30, h: 0.40 };
const bulbAt = (x, y) => {
  const cy = B.top + 0.58 * B.h, rx = B.w / 2, ry = y < cy ? 0.58 * B.h : 0.42 * B.h;
  return ((x - B.cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1;
};
const capAt = (x, y) => Math.abs(x - 0.5) <= 0.07 && y >= 0.335 && y <= 0.41;
const wireY = x => 0.20 + 0.14 * (1 - ((x - 0.5) / 0.5) ** 2);   // cable que cae hasta la ampolleta
const wireAt = (x, y) => Math.abs(y - wireY(x)) <= 0.011;

function pixel(x, y) {
  let c = INK.slice();
  const d = Math.hypot(x - 0.5, y - 0.6), glow = Math.max(0, 1 - d / 0.42) ** 2 * 0.55;
  c = c.map((v, i) => v + (GOLD[i] - v) * glow);
  if (wireAt(x, y)) c = WIRE;
  if (capAt(x, y)) c = CAP;
  if (bulbAt(x, y)) {
    const hl = Math.max(0, 1 - Math.hypot(x - 0.45, y - 0.56) / 0.12);   // brillo arriba a la izquierda
    c = GOLD.map((v, i) => v + (LIGHT[i] - v) * hl);
  }
  return c;
}

function png(size) {
  const S = 4, raw = Buffer.alloc((size * 4 + 1) * size);
  for (let py = 0; py < size; py++) {
    raw[py * (size * 4 + 1)] = 0;
    for (let px = 0; px < size; px++) {
      const acc = [0, 0, 0];
      for (let sy = 0; sy < S; sy++) for (let sx = 0; sx < S; sx++) {
        const c = pixel((px + (sx + 0.5) / S) / size, (py + (sy + 0.5) / S) / size);
        for (let i = 0; i < 3; i++) acc[i] += c[i];
      }
      const o = py * (size * 4 + 1) + 1 + px * 4;
      for (let i = 0; i < 3; i++) raw[o + i] = Math.round(acc[i] / (S * S));
      raw[o + 3] = 255;
    }
  }
  const crcT = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
  const crc = b => { let c = 0xFFFFFFFF; for (const x of b) c = crcT[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
  const chunk = (type, data) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type), data]), c = Buffer.alloc(4); c.writeUInt32BE(crc(td));
    return Buffer.concat([len, td, c]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4); ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

// El dibujo ocupa el círculo central (zona segura de los íconos "maskable"), así sirve para todos.
for (const [name, size] of [['icon-192.png', 192], ['icon-512.png', 512], ['icon-maskable-512.png', 512], ['icon-180.png', 180]]) {
  writeFileSync(OUT + name, png(size));
  console.log('ok', name);
}
