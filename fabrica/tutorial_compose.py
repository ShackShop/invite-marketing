#!/usr/bin/env python3
# Tutorial "¿No sabes cómo empezar?" — compone tomas (1080x1920) y un mp4 por línea de narración.
# uso: python3 compose2.py config.json   (config: lang, lines, starts, end, shots, endcard)
import subprocess, os, json, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

CFG = json.load(open(sys.argv[1]))
LANG = CFG['lang']; D = f'/tmp/tut2/{LANG}'; OUT = f'/tmp/tut2/out_{LANG}'
F = '/home/claude/invite-marketing/fabrica/fonts/'
W, H = 1080, 1920
# Paleta de marca In-Vite (logo): rosa, menta, gris pizarra sobre blanco
BG = (253, 251, 251); MINT_T = (212, 240, 232); PINK_T = (251, 223, 231)
INK = (61, 75, 86); MUTED = (112, 124, 134); MINT = (79, 182, 157); PINK = (238, 146, 170)
B7 = lambda s: ImageFont.truetype(F + 'bricolage-grotesque-latin-700-normal.woff2', s)
B6 = lambda s: ImageFont.truetype(F + 'bricolage-grotesque-latin-600-normal.woff2', s)
B5 = lambda s: ImageFont.truetype(F + 'bricolage-grotesque-latin-500-normal.woff2', s)

def bg():
    # Paleta In-Vite: blanco con manchas suaves menta y rosa
    im = Image.new('RGB', (W, H), BG)
    for box, col, a in (((-300, 1100, 1400, 2500), MINT_T, 230), ((500, -500, 1600, 600), PINK_T, 230)):
        g = Image.new('L', (W, H), 0); ImageDraw.Draw(g).ellipse(box, fill=a)
        im.paste(Image.new('RGB', (W, H), col), (0, 0), g.filter(ImageFilter.GaussianBlur(220)))
    return im

def wrap(d, text, f, maxw):
    words, lines, cur = text.split(), [], ''
    for w in words:
        t = (cur + ' ' + w).strip()
        if d.textlength(t, font=f) <= maxw: cur = t
        else: lines.append(cur); cur = w
    lines.append(cur); return lines

def caption(im, text, y0=100, size=56):
    d = ImageDraw.Draw(im); f = B7(size); lines = wrap(d, text, f, 960)
    while len(lines) > 4: size -= 4; f = B7(size); lines = wrap(d, text, f, 960)
    lh = int(size * 1.2); y = y0 + (4 - len(lines)) * lh // 2
    for ln in lines: d.text((W // 2, y), ln, font=f, fill=INK, anchor='ma'); y += lh

def load_shot(name, fixes):
    sc = Image.open(f'{D}/{name}.jpg').convert('RGB')
    k = sc.width / 390  # capturas a 390 o 780 px de ancho
    dd = ImageDraw.Draw(sc)
    for fx in fixes:
        x0, y0, x1, y1 = [round(v * k) for v in fx['box']]
        col = sc.getpixel((x0 + 2, y0 + 2)) if fx.get('fill') == 'auto' else tuple(fx['fill'])
        dd.rounded_rectangle((x0, y0, x1, y1), round(fx.get('r', 0) * k), fill=col)
        if fx.get('text'):
            if fx.get('left'): dd.text((x0 + 2, (y0 + y1) / 2), fx['text'], font=B6(round(fx.get('size', 14) * k)), fill=tuple(fx.get('ink', (60, 150, 128))), anchor='lm')
            else: dd.text(((x0 + x1) / 2, (y0 + y1) / 2), fx['text'], font=B6(round(fx.get('size', 14) * k)), fill=tuple(fx.get('ink', (60, 150, 128))), anchor='mm')
    return sc, k

def phone(im, sc, taps, top=470):
    sw = 600; sh = round(sw * sc.height / sc.width); s = sw / sc.width
    sc = sc.resize((sw, sh), Image.LANCZOS)
    bez = 20; pw, ph = sw + 2 * bez, sh + 2 * bez; x = (W - pw) // 2
    shl = Image.new('L', (W, H), 0); ImageDraw.Draw(shl).rounded_rectangle((x + 10, top + 30, x + pw + 10, top + ph + 30), 76, fill=150)
    im.paste((15, 10, 25), (0, 0), shl.filter(ImageFilter.GaussianBlur(35)))
    ImageDraw.Draw(im).rounded_rectangle((x, top, x + pw, top + ph), 74, fill=(18, 14, 26))
    m = Image.new('L', (sw, sh), 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, sw, sh), 54, fill=255)
    im.paste(sc, (x + bez, top + bez), m)
    # toques: anillo dorado en coordenadas de la captura (marco de 390 px)
    for tx, ty in taps:
        cx = x + bez + tx * (sw / 390); cy = top + bez + ty * (sw / 390)
        ov = Image.new('RGBA', (W, H), (0, 0, 0, 0)); o = ImageDraw.Draw(ov)
        o.ellipse((cx - 46, cy - 46, cx + 46, cy + 46), fill=(79, 182, 157, 30), outline=(79, 182, 157, 255), width=6)
        im.paste(ov, (0, 0), ov)

def end_card(path, e):
    im = bg(); d = ImageDraw.Draw(im)
    logo = Image.open('/home/claude/invite-marketing/fabrica/logo.png').convert('RGB').resize((300, 300), Image.LANCZOS)
    m = Image.new('L', (300, 300), 0); ImageDraw.Draw(m).ellipse((0, 0, 300, 300), fill=255)
    im.paste(logo, ((W - 300) // 2, 440), m)
    y = 840
    for ln in wrap(d, e['title'], B7(84), 940): d.text((W // 2, y), ln, font=B7(84), fill=INK, anchor='ma'); y += 100
    y += 30
    d.text((W // 2, y), e['site'], font=B7(110), fill=MINT, anchor='ma'); y += 190
    for ln in e['lines']: d.text((W // 2, y), ln, font=B5(46), fill=INK, anchor='ma'); y += 76
    im.save(path, quality=95)

XF = 0.3
os.makedirs(f'{OUT}/png', exist_ok=True); os.makedirs(f'{OUT}/sc', exist_ok=True)
starts = CFG['starts'] + [CFG['end']]; files = []
for i, shots in enumerate(CFG['shots']):
    dur = starts[i + 1] - starts[i]; n = len(shots)
    tot = dur + XF * (n - 1); wsum = sum(s.get('w', 1) for s in shots)
    ds = [tot * s.get('w', 1) / wsum for s in shots]; pngs = []
    for j, s in enumerate(shots):
        p = f'{OUT}/png/s{i:02d}_{j}.jpg'
        if s['n'] == 'END': end_card(p, CFG['endcard'])
        else:
            im = bg(); caption(im, CFG['lines'][i])
            sc, k = load_shot(s['n'], s.get('fix', []))
            phone(im, sc, s.get('tap', []))
            im.save(p, quality=94)
        pngs.append(p)
    args = ['ffmpeg', '-y', '-v', 'error']
    for p, d in zip(pngs, ds): args += ['-framerate', '30', '-t', f'{d:.3f}', '-loop', '1', '-i', p]
    fc = [f'[{j}:v]format=yuv420p,fps=30[v{j}]' for j in range(n)]; last = '[v0]'; acc = ds[0]
    for j in range(1, n):
        fc.append(f'{last}[v{j}]xfade=transition=fade:duration={XF}:offset={acc - XF:.3f}[x{j}]'); last = f'[x{j}]'; acc += ds[j] - XF
    if i == 0: fc.append(f'{last}fade=t=in:st=0:d=0.4[o]')
    elif i == len(CFG['shots']) - 1: fc.append(f'{last}fade=t=out:st={dur - 0.7:.3f}:d=0.7[o]')
    else: fc.append(f'{last}null[o]')
    out = f'{OUT}/sc/s{i:02d}.mp4'; tmp = f'{OUT}/sc/tmp_s{i:02d}.mp4'
    args += ['-filter_complex', ';'.join(fc), '-map', '[o]', '-t', f'{dur:.3f}', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', '30', tmp]
    subprocess.run(args, check=True); os.rename(tmp, out); files.append(out)
with open(f'{OUT}/sc/list.txt', 'w') as fh:
    for f in files: fh.write(f"file '{f}'\n")
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', f'{OUT}/sc/list.txt', '-c', 'copy', f'{OUT}/mudo.mp4'], check=True)
print('ok', f'{OUT}/mudo.mp4')
