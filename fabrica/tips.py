#!/usr/bin/env python3
"""Reels de contenido útil ("tips") con capturas REALES de la app.

uso:  python3 tips.py <config.json> <salida.mp4>

Estructura del reel (1080x1920, 30 fps):
  1. Gancho (2.8 s): la pregunta en grande sobre una invitación real que ya se ve terminada
     (el resultado va primero para que no se salten el video).
  2. Tips numerados (≈3.4 s c/u): número + frase corta + captura en un celular, con acercamiento lento.
  3. Cierre (3.5 s): cómo lo resuelve In-Vite + in-vite.mx.

config:
{
  "lang": "es",
  "music": 2,
  "hook": {"text": "¿Cuándo se mandan las invitaciones de boda?", "shot": "es/29_invitado_sobre"},
  "tips": [{"title": "6–8 meses antes", "text": "Save the date si hay invitados de fuera", "shot": "es/20_scroll2"}, ...],
  "cta":  {"text": "En In-Vite pones la fecha límite y te avisa cada confirmación", "line": "Diséñala gratis"}
}
Las capturas viven en fabrica/capturas/<lang>/ (390 o 780 px de ancho).
"""
import json, os, subprocess, sys, tempfile
from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
F = os.path.join(HERE, 'fonts') + '/'
W, H, FPS = 1080, 1920, 30
# Paleta de marca In-Vite (logo): rosa, menta, gris pizarra sobre blanco
BG = (253, 251, 251); MINT_T = (212, 240, 232); PINK_T = (251, 223, 231)
INK = (61, 75, 86); MUTED = (112, 124, 134); MINT = (79, 182, 157); PINK = (238, 146, 170)
B8 = lambda s: ImageFont.truetype(F + 'bricolage-grotesque-latin-800-normal.woff2', s)
B7 = lambda s: ImageFont.truetype(F + 'bricolage-grotesque-latin-700-normal.woff2', s)
B5 = lambda s: ImageFont.truetype(F + 'bricolage-grotesque-latin-500-normal.woff2', s)


def wrap(d, text, f, maxw):
    lines, cur = [], ''
    for w in text.split():
        t = (cur + ' ' + w).strip()
        if d.textlength(t, font=f) <= maxw: cur = t
        else: lines.append(cur); cur = w
    lines.append(cur)
    return lines


def fit(d, text, maker, size, maxw, maxlines):
    while True:
        f = maker(size); lines = wrap(d, text, f, maxw)
        if len(lines) <= maxlines or size <= 40: return f, lines, size
        size -= 4


def bg():
    # Paleta In-Vite: blanco con manchas suaves menta y rosa
    im = Image.new('RGB', (W, H), BG)
    for box, col, a in (((-300, 1100, 1400, 2500), MINT_T, 230), ((500, -500, 1600, 600), PINK_T, 230)):
        g = Image.new('L', (W, H), 0); ImageDraw.Draw(g).ellipse(box, fill=a)
        im.paste(Image.new('RGB', (W, H), col), (0, 0), g.filter(ImageFilter.GaussianBlur(220)))
    return im


def shot(name):
    return Image.open(os.path.join(HERE, 'capturas', name + '.jpg')).convert('RGB')


def phone(im, sc, top, sw=600):
    sh = round(sw * sc.height / sc.width)
    sc = sc.resize((sw, sh), Image.LANCZOS)
    bez = 20; pw, ph = sw + 2 * bez, sh + 2 * bez; x = (W - pw) // 2
    shl = Image.new('L', (W, H), 0); ImageDraw.Draw(shl).rounded_rectangle((x + 10, top + 30, x + pw + 10, top + ph + 30), 76, fill=150)
    im.paste((15, 10, 25), (0, 0), shl.filter(ImageFilter.GaussianBlur(35)))
    ImageDraw.Draw(im).rounded_rectangle((x, top, x + pw, top + ph), 74, fill=(18, 14, 26))
    m = Image.new('L', (sw, sh), 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, sw, sh), 54, fill=255)
    im.paste(sc, (x + bez, top + bez), m)


def hook_frame(cfg):
    # Fondo: la invitación real a pantalla completa, oscurecida abajo para el texto.
    sc = shot(cfg['shot']); k = W / sc.width
    im = sc.resize((W, round(sc.height * k)), Image.LANCZOS).crop((0, 0, W, H)) if sc.height * k >= H else bg()
    if sc.height * k < H:
        phone(im, sc, 360)
    grad = Image.new('L', (W, H), 0); gd = ImageDraw.Draw(grad)
    for y in range(H):
        gd.line([(0, y), (W, y)], fill=int(235 * max(0, (y - 900) / 1020) ** 1.2) if y > 900 else 0)
    im.paste(Image.new('RGB', (W, H), (36, 46, 54)), (0, 0), grad)
    d = ImageDraw.Draw(im)
    f, lines, size = fit(d, cfg['text'], B8, 92, 960, 4)
    y = H - 170 - len(lines) * int(size * 1.12)
    for ln in lines:
        d.text((W // 2, y), ln, font=f, fill=(255,255,255), anchor='ma', stroke_width=2, stroke_fill=(36, 46, 54)); y += int(size * 1.12)
    tag = cfg.get('tag')
    if tag:
        tf = B7(40); tw = d.textlength(tag, font=tf)
        d.rounded_rectangle(((W - tw) / 2 - 30, H - 150, (W + tw) / 2 + 30, H - 86), 32, fill=PINK)
        d.text((W // 2, H - 118), tag, font=tf, fill=(255,255,255), anchor='mm')
    return im


def tip_frame(n, tip, total):
    im = bg(); d = ImageDraw.Draw(im)
    # número
    d.ellipse((90, 120, 230, 260), fill=MINT)
    d.text((160, 190), str(n), font=B8(84), fill=(255,255,255), anchor='mm')
    d.text((260, 190), f'/ {total}', font=B5(40), fill=MUTED, anchor='lm')
    f, lines, size = fit(d, tip['title'], B8, 78, 960, 2)
    y = 300
    for ln in lines: d.text((90, y), ln, font=f, fill=INK); y += int(size * 1.12)
    if tip.get('text'):
        f2, l2, s2 = fit(d, tip['text'], B5, 46, 920, 3)
        y += 12
        for ln in l2: d.text((90, y), ln, font=f2, fill=MUTED); y += int(s2 * 1.25)
    phone(im, shot(tip['shot']), max(y + 50, 640), sw=560)
    return im


def cta_frame(cfg):
    im = bg(); d = ImageDraw.Draw(im)
    logo = os.path.join(HERE, 'logo.png')
    if os.path.exists(logo):
        lg = Image.open(logo).convert('RGB').resize((260, 260), Image.LANCZOS)
        m = Image.new('L', (260, 260), 0); ImageDraw.Draw(m).ellipse((0, 0, 260, 260), fill=255)
        im.paste(lg, ((W - 260) // 2, 380), m)
    f, lines, size = fit(d, cfg['text'], B7, 66, 940, 4)
    y = 720
    for ln in lines: d.text((W // 2, y), ln, font=f, fill=INK, anchor='ma'); y += int(size * 1.2)
    y += 60
    d.text((W // 2, y), cfg.get('line', 'Diséñala gratis en'), font=B5(52), fill=MUTED, anchor='ma'); y += 80
    d.text((W // 2, y), 'in-vite.mx', font=B8(128), fill=MINT, anchor='ma'); y += 200
    for ln in cfg.get('small', []):
        d.text((W // 2, y), ln, font=B5(42), fill=INK, anchor='ma'); y += 66
    return im


def main():
    cfg = json.load(open(sys.argv[1])); out = sys.argv[2]
    tmp = tempfile.mkdtemp(prefix='tips_')
    segs = [('hook', hook_frame(cfg['hook']), 2.8)]
    for i, t in enumerate(cfg['tips'], 1): segs.append(('tip', tip_frame(i, t, len(cfg['tips'])), t.get('dur', 3.4)))
    segs.append(('cta', cta_frame(cfg['cta']), 3.6))
    XF = 0.25
    files = []
    for i, (kind, im, dur) in enumerate(segs):
        p = os.path.join(tmp, f'{i:02d}.png'); im.save(p)
        frames = int(round((dur + XF) * FPS))
        # acercamiento lento (el gancho un poco más rápido para dar movimiento desde el primer cuadro)
        z = 0.0011 if kind == 'hook' else 0.0004
        vf = (f"scale={W*2}:{H*2},zoompan=z='min(1+{z}*on,1.2)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={frames}:s={W}x{H}:fps={FPS},format=yuv420p")
        o = os.path.join(tmp, f'{i:02d}.mp4')
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', p, '-vf', vf, '-frames:v', str(frames), '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', str(FPS), o], check=True)
        files.append((o, dur))
    # unir con fundidos cortos
    args = ['ffmpeg', '-y', '-v', 'error']
    for o, _ in files: args += ['-i', o]
    fc = []; last = '[0:v]'; acc = files[0][1]
    for j in range(1, len(files)):
        fc.append(f'{last}[{j}:v]xfade=transition=fade:duration={XF}:offset={acc:.3f}[x{j}]'); last = f'[x{j}]'; acc += files[j][1]
    total = acc + XF
    fc.append(f'{last}fade=t=out:st={total - 0.5:.3f}:d=0.5[v]')
    mudo = os.path.join(tmp, 'mudo.mp4')
    subprocess.run(args + ['-filter_complex', ';'.join(fc), '-map', '[v]', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', mudo], check=True)
    # música con marcas en cada cambio
    starts, t0 = [], 0
    for _, d in files[:-1]: t0 += d; starts.append(t0)
    cues = [[s, 'swipe', 0.5] for s in starts] + [[starts[-1], 'shimmer', 0.8], [0.05, 'ding', 0.45]]
    mj = os.path.join(tmp, 'mus.json'); wav = os.path.join(tmp, 'mus.wav')
    json.dump({'dur': round(total, 2), 'variant': cfg.get('music', 2), 'cues': cues}, open(mj, 'w'))
    subprocess.run(['python3', os.path.join(HERE, 'audio.py'), mj, wav], check=True)
    part = out[:-4] + '.part.mp4'
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', mudo, '-i', wav, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k',
                    '-af', 'loudnorm=I=-16:TP=-1.5', '-shortest', '-movflags', '+faststart', part], check=True)
    os.replace(part, out)
    print('ok', out, f'{total:.1f}s')


if __name__ == '__main__':
    main()
