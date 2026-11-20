// Capturas de revisión de un reel en ciertos segundos (para revisar antes de renderizar).
// Uso: node frames.cjs <reel 1-4> <carpeta> [config.json] t1 t2 ...
const fs = require('fs'); const path = require('path'); const { launch } = require('./_lib.cjs');
const [r, dir, maybeCfg, ...rest] = process.argv.slice(2);
const hasCfg = maybeCfg && maybeCfg.endsWith('.json'); const cfg = hasCfg ? JSON.parse(fs.readFileSync(maybeCfg, 'utf8')) : {};
const times = hasCfg ? rest : [maybeCfg, ...rest].filter(Boolean);
(async () => {
  fs.mkdirSync(dir, { recursive: true });
  const b = await launch(); const p = await b.newPage(); await p.setViewport({ width: 1080, height: 1920 });
  p.on('pageerror', (e) => console.log('ERR', e.message));
  await p.goto(`file://${path.join(__dirname, 'reels.html')}?r=${r}&c=${encodeURIComponent(JSON.stringify(cfg))}`); await p.evaluate(() => document.fonts.ready); await new Promise((x) => setTimeout(x, 1200));
  for (const t of times) { await p.evaluate((t) => render(+t), t); await new Promise((x) => setTimeout(x, 60)); await p.screenshot({ path: `${dir}/r${r}_${t}.jpg`, type: 'jpeg', quality: 80 }); }
  await b.close(); console.log('capturas en', dir);
})();
