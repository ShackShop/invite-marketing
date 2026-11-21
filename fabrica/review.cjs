// Una sola imagen de revisión por variante (ahorra uso: revisa 1 imagen en lugar de varias).
// Uso: node review.cjs <reel 1-4> <config.json|-> <salida.jpg>
// Toma cuadros en los momentos clave del reel (gancho, respuesta, pasos y cierre) y los pone en una cuadrícula.
const fs = require('fs'); const path = require('path'); const { launch } = require('./_lib.cjs');
const KEY = { 1: [1.0, 3.0, 5.3, 7.8, 10.6, 12.8, 15.8, 17.8], 2: [1.5, 3.3, 5.0, 7.8, 9.6, 12.5, 15.8, 18.5], 3: [0.8, 1.9, 4.5, 7.3, 10.8, 13.6, 16.0], 4: [0.9, 3.2, 4.6, 8.2, 11.0, 14.0, 16.5] };
const [r, cfgArg, out] = process.argv.slice(2);
if (!r || !out) { console.log('Uso: node review.cjs <1-4> <config.json|-> <salida.jpg>'); process.exit(1); }
const cfg = cfgArg && cfgArg !== '-' ? JSON.parse(fs.readFileSync(cfgArg, 'utf8')) : {};
(async () => {
  const b = await launch(); const p = await b.newPage(); await p.setViewport({ width: 1080, height: 1920 });
  p.on('pageerror', (e) => console.log('ERR', e.message));
  await p.goto(`file://${path.join(__dirname, 'reels.html')}?r=${r}&c=${encodeURIComponent(JSON.stringify(cfg))}`); await p.evaluate(() => document.fonts.ready); await new Promise((x) => setTimeout(x, 1200));
  const shots = [];
  for (const t of KEY[r]) { await p.evaluate((t) => render(+t), t); await new Promise((x) => setTimeout(x, 60)); shots.push((await p.screenshot({ type: 'jpeg', quality: 70 })).toString('base64')); }
  // cuadrícula de 4 columnas, cada cuadro a 300×533
  const cols = 4, w = 300, h = 533, rows = Math.ceil(shots.length / cols);
  await p.setViewport({ width: cols * (w + 8), height: rows * (h + 8) });
  await p.setContent(`<body style="margin:0;background:#fff;display:flex;flex-wrap:wrap;gap:8px">${shots.map((s) => `<img src="data:image/jpeg;base64,${s}" style="width:${w}px;height:${h}px">`).join('')}</body>`);
  await new Promise((x) => setTimeout(x, 300));
  await p.screenshot({ path: out, type: 'jpeg', quality: 72 });
  await b.close(); console.log('revisión en', out);
})();
