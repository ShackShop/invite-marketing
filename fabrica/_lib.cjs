// Utilidades compartidas: encontrar puppeteer y Chrome en el entorno.
const fs = require('fs');
function puppeteer() {
  for (const p of ['puppeteer', '/opt/npm-tools/node_modules/puppeteer']) { try { return require(p); } catch (e) { /* siguiente */ } }
  throw new Error('No encuentro puppeteer');
}
function chrome() {
  return ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find((x) => fs.existsSync(x));
}
async function launch() {
  return puppeteer().launch({ executablePath: chrome(), args: ['--no-sandbox', '--allow-file-access-from-files'] });
}
module.exports = { launch };
