// Renderiza un reel a MP4 con audio.
// Uso: node render.cjs <reel 1-4> <salida.mp4> [config.json]
//   config.json (opcional): { "set": "base", "music": 0-3, "t": { "h1": "...", ... } }
const { spawn, execFileSync } = require('child_process');
const fs = require('fs'); const path = require('path');
const { launch } = require('./_lib.cjs');
const [r, outFile, cfgFile] = process.argv.slice(2);
if (!r || !outFile) { console.log('Uso: node render.cjs <1-4> <salida.mp4> [config.json]'); process.exit(1); }
const cfg = cfgFile ? JSON.parse(fs.readFileSync(cfgFile, 'utf8')) : {};
const FPS = 30; const tmpDir = fs.mkdtempSync('/tmp/reel-');
(async () => {
  const b = await launch(); const p = await b.newPage(); await p.setViewport({ width: 1080, height: 1920 });
  p.on('pageerror', (e) => console.log('ERR', e.message));
  const url = `file://${path.join(__dirname, 'reels.html')}?r=${r}&c=${encodeURIComponent(JSON.stringify(cfg))}`;
  await p.goto(url); await p.evaluate(() => document.fonts.ready); await new Promise((x) => setTimeout(x, 1500));
  const { dur, cues } = await p.evaluate(() => ({ dur: window.DUR, cues: window.CUES }));
  const music = Number.isInteger(cfg.music) ? cfg.music : (+r - 1) % 4;
  fs.writeFileSync(`${tmpDir}/cues.json`, JSON.stringify({ dur, cues, variant: music, drop: { 1: 2.45, 2: 2.75, 3: 1.25, 4: 2.75 }[r] || 2.5 }));
  const total = Math.round(dur * FPS), SEG = 120; const parts = [];
  for (let f0 = 0, si = 0; f0 < total; f0 += SEG, si++) {
    const f1 = Math.min(total, f0 + SEG); const tmp = `${tmpDir}/s${si}.tmp.mp4`, fin = `${tmpDir}/s${si}.mp4`; parts.push(fin);
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '22', '-pix_fmt', 'yuv420p', '-r', String(FPS), tmp]);
    for (let f = f0; f < f1; f++) {
      await p.evaluate((t) => render(t), f / FPS);
      const buf = await p.screenshot({ type: 'jpeg', quality: 92 });
      if (!ff.stdin.write(buf)) await new Promise((x) => ff.stdin.once('drain', x));
    }
    ff.stdin.end(); const code = await new Promise((x) => ff.on('close', x));
    if (code !== 0) { console.log('ffmpeg falló en el segmento', si); process.exit(1); } fs.renameSync(tmp, fin);
  }
  await b.close();
  fs.writeFileSync(`${tmpDir}/list.txt`, parts.map((x) => `file '${x}'`).join('\n'));
  execFileSync('python3', [path.join(__dirname, 'audio.py'), `${tmpDir}/cues.json`, `${tmpDir}/a.wav`], { stdio: 'inherit' });
  const tmpOut = outFile.replace(/\.mp4$/, '.tmp.mp4');
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', `${tmpDir}/list.txt`, '-i', `${tmpDir}/a.wav`, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', tmpOut]);
  fs.renameSync(tmpOut, outFile); fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log('listo', outFile, `${dur}s`);
})();
