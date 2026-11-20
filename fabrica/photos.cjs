// Regenera las fotos simbólicas de img/ (anillos, copas, ramo, velas).
const fs = require('fs'); const path = require('path'); const { launch } = require('./_lib.cjs');
(async () => {
  const b = await launch(); const p = await b.newPage();
  await p.goto(`file://${path.join(__dirname, 'photos.html')}`);
  for (const n of ['rings', 'toast', 'bouquet', 'candles']) {
    await p.evaluate((n) => window.draw(n), n);
    const data = await p.evaluate(() => document.getElementById('c').toDataURL('image/jpeg', 0.9));
    fs.writeFileSync(path.join(__dirname, 'img', `${n}.jpg`), Buffer.from(data.split(',')[1], 'base64')); console.log(n);
  }
  await b.close();
})();
