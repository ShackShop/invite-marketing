// Crea un "set" de invitaciones (nombres, color, fecha) con el render REAL de In-Vite, para usar en los reels.
// Uso: node make_set.cjs <nombre-del-set> "<Nombre1,Nombre2>" "<#color>" [fecha AAAA-MM-DD] [quinceañera]
// Mantiene el mismo estilo (Jardín romántico para boda, Gala princesa para XV) para que los toques del reel caigan en su lugar.
const fs = require('fs'); const path = require('path'); const { launch } = require('./_lib.cjs');
const [name, names = 'Valeria,Mateo', color = '', date = '2027-03-13', xvName = 'Renata'] = process.argv.slice(2);
if (!name) { console.log('Uso: node make_set.cjs <set> "<Nombre1,Nombre2>" "<#color>" [fecha] [quinceañera]'); process.exit(1); }
const out = path.join(__dirname, 'sets', name); fs.mkdirSync(out, { recursive: true });
const c = color ? `&colors=${encodeURIComponent(color)}` : '';
const d = `&date=${date}`;
const JOBS = [
  ['inv_es', `mine=1&names=${names}${c}${d}`], ['inv_en', `mine=1&names=${names}${c}${d}&lang=en`],
  ['inv_sample', 'k=jardin-romantico'], ['inv_names', `k=jardin-romantico&names=${names}`],
  ['v_f0', `mine=1&names=${names}${d}&fa=0`], ['v_f1', `mine=1&names=${names}${d}&fa=1`],
  ['v_c_sage_f1', `mine=1&names=${names}${d}&fa=1&colors=%238FA48A`], ['v_c_lilac_f1', `mine=1&names=${names}${d}&fa=1&colors=%237E5AA6`], ['v_c_gold_f1', `mine=1&names=${names}${d}&fa=1&colors=%23A8833F`],
  ['inv_xv', `mine=1&xv=1&k=gala-princesa&names=${xvName}${d}`], ['inv_xv_en', `mine=1&xv=1&k=gala-princesa&names=${xvName}${d}&lang=en`],
];
(async () => {
  const b = await launch(); const p = await b.newPage(); await p.setViewport({ width: 400, height: 900, deviceScaleFactor: 2.78 });
  for (const [file, q] of JOBS) {
    await p.goto(`file://${path.join(__dirname, 'inv.html')}?${q}`); await p.evaluate(() => document.fonts.ready); await new Promise((x) => setTimeout(x, 700));
    const H = await p.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < H; y += 500) { await p.evaluate((y) => window.scrollTo(0, y), y); await new Promise((x) => setTimeout(x, 100)); }
    await p.evaluate(() => window.scrollTo(0, 0)); await new Promise((x) => setTimeout(x, 1200));
    const el = await p.$('#cv'); await el.screenshot({ path: `${out}/${file}.jpg`, type: 'jpeg', quality: 90 });
    console.log(file);
  }
  for (const th of ['th_jardin', 'th_dorado-clasico', 'th_gala-princesa', 'th_encanto-floral']) fs.copyFileSync(path.join(__dirname, 'sets/base', `${th}.jpg`), `${out}/${th}.jpg`);
  await b.close(); console.log('set listo:', out);
})();
