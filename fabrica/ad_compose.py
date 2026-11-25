#!/usr/bin/env python3
# Compone el tutorial narrado: un PNG por toma (1080x1920) y un mp4 por escena.
import subprocess, os, json
from PIL import Image, ImageDraw, ImageFont, ImageFilter

D = '/tmp/tut'
F = '/home/claude/invite-marketing/fabrica/fonts/'
W, H = 1080, 1920
BG = (253, 251, 251); MINT_T = (212, 240, 232); PINK_T = (251, 223, 231)
INK = (61, 75, 86); MINT = (79, 182, 157); PINK = (238, 146, 170)

def font(name, size): return ImageFont.truetype(F + name, size)
B7 = lambda s: font('bricolage-grotesque-latin-700-normal.woff2', s)
B5 = lambda s: font('bricolage-grotesque-latin-500-normal.woff2', s)
SCRIPT = lambda s: font('great-vibes-latin-400-normal.woff2', s)

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

def caption(im, text, y0=110, size=58):
    d = ImageDraw.Draw(im); f = B7(size)
    lines = wrap(d, text, f, 940)
    while len(lines) > 3: size -= 4; f = B7(size); lines = wrap(d, text, f, 940)
    lh = int(size * 1.22); y = y0 + (3 - len(lines)) * lh // 2
    for ln in lines:
        d.text((W // 2, y), ln, font=f, fill=INK, anchor='ma'); y += lh

def phone(im, shot, mask=None, top=430):
    sc = Image.open(f'{D}/{shot}.jpg').convert('RGB')
    if mask:
        dd = ImageDraw.Draw(sc)
        for box, col in mask: dd.rectangle(box, fill=col)
    sw = 640; sh = round(sw * sc.height / sc.width)
    sc = sc.resize((sw, sh), Image.LANCZOS)
    bez = 22; pw, ph = sw + 2 * bez, sh + 2 * bez
    x = (W - pw) // 2
    # sombra
    sh_l = Image.new('L', (W, H), 0); ImageDraw.Draw(sh_l).rounded_rectangle((x + 10, top + 30, x + pw + 10, top + ph + 30), 80, fill=150)
    im.paste((15, 10, 25), (0, 0), sh_l.filter(ImageFilter.GaussianBlur(35)))
    ImageDraw.Draw(im).rounded_rectangle((x, top, x + pw, top + ph), 78, fill=(18, 14, 26))
    m = Image.new('L', (sw, sh), 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, sw, sh), 58, fill=255)
    im.paste(sc, (x + bez, top + bez), m)

def badge(im, text, y):
    d = ImageDraw.Draw(im); f = B7(54)
    tw = d.textlength(text, font=f); pad = 44
    d.rounded_rectangle(((W - tw) / 2 - pad, y, (W + tw) / 2 + pad, y + 104), 52, fill=PINK)
    d.text((W // 2, y + 52), text, font=f, fill=(255,255,255), anchor='mm')

def end_card(path):
    im = bg(); d = ImageDraw.Draw(im)
    logo = Image.open('/home/claude/invite-marketing/fabrica/logo.png').convert('RGB').resize((300, 300), Image.LANCZOS)
    m = Image.new('L', (300, 300), 0); ImageDraw.Draw(m).ellipse((0, 0, 300, 300), fill=255)
    im.paste(logo, ((W - 300) // 2, 420), m)
    d.text((W // 2, 830), 'Diséñala gratis en', font=B5(64), fill=INK, anchor='ma')
    d.text((W // 2, 930), 'in-vite.mx', font=B7(150), fill=MINT, anchor='ma')
    lines = ['$350 MXN solo al activarla', 'Todo incluido · invitados ilimitados', 'Pases QR · avisos por WhatsApp · bilingüe']
    y = 1200
    for i, ln in enumerate(lines):
        d.text((W // 2, y), ln, font=B5(52 if i == 0 else 44), fill=INK, anchor='ma'); y += 84
    im.save(path, quality=95)

L = ["¿Vas a hacer una invitación digital? Mira lo fácil que es con In-Vite.",
     "Le cuentas todo, como a tu planner: nombres, fecha, lugares y colores.",
     "La inteligencia artificial lo lee y llena cada paso por ti. Tú solo revisas.",
     "Subes tus fotos, eliges tu paleta y uno de los estilos ya hechos con tus datos.",
     "Y listo: tu invitación queda armada, con textos, itinerario, ubicaciones y confirmación de asistencia.",
     "¿Quieres cambiar algo? Tocas la sección y luego Editar. Y si tienes dudas, el asistente de ayuda te guía.",
     "Diseñarla es gratis. Solo pagas $350 MXN al activarla: todo incluido y con invitados ilimitados.",
     None]
START = [0, 4.5976, 10.0833, 15.569, 20.7151, 27.6376, 34.56, 42.3706]
END_T = 49.0
# tomas por escena (nombre, peso relativo)
SHOTS = [[('01_asistente', 1)], [('02_escrito', 1)],
         [('03_detectado', 1), ('04_fecha', 1), ('05_lugares', 1)],
         [('09_fotos_ok', 1), ('10_paleta', 1), ('11_estilos', 1)],
         [('13_armando', .7), ('15_editor', 1.2), ('16_scroll1', 1), ('18_scroll3', 1), ('19_ubicacion', 1), ('20_rsvp', 1.1)],
         [('21_seleccion', 1), ('22_editar', 1.2), ('24_ayuda_resp', 2)],
         [('25_activar', 1)], [('END', 1)]]
MASK = {'25_activar': [((20, 945, 526, 990), (255, 255, 255)), ((226, 16, 404, 72), (165, 159, 173))]}
XF = 0.3

os.makedirs(f'{D}/png', exist_ok=True); os.makedirs(f'{D}/sc', exist_ok=True)
files = []
for i, shots in enumerate(SHOTS):
    t0 = START[i]; t1 = START[i + 1] if i + 1 < len(START) else END_T
    dur = t1 - t0; n = len(shots)
    tot = dur + XF * (n - 1); wsum = sum(w for _, w in shots)
    ds = [tot * w / wsum for _, w in shots]
    pngs = []
    for j, (name, _) in enumerate(shots):
        p = f'{D}/png/s{i}_{j}.jpg'
        if name == 'END': end_card(p)
        else:
            im = bg(); caption(im, L[i]); phone(im, name, MASK.get(name))
            if name == '25_activar': badge(im, '$350 MXN · pago único', 900)
            im.save(p, quality=95)
        pngs.append(p)
    # ffmpeg: cada imagen como clip, cadena de xfade
    args = ['ffmpeg', '-y', '-v', 'error']
    for p, d in zip(pngs, ds): args += ['-framerate', '30', '-t', f'{d:.3f}', '-loop', '1', '-i', p]
    fc = []; last = '[0:v]'; acc = ds[0]
    for j in range(n): fc.append(f'[{j}:v]format=yuv420p,fps=30[v{j}]')
    last = '[v0]'
    for j in range(1, n):
        off = acc - XF
        fc.append(f'{last}[v{j}]xfade=transition=fade:duration={XF}:offset={off:.3f}[x{j}]')
        last = f'[x{j}]'; acc = acc + ds[j] - XF
    if i == 0: fc.append(f'{last}fade=t=in:st=0:d=0.4[o]')
    elif i == len(SHOTS) - 1: fc.append(f'{last}fade=t=out:st={dur-0.6:.3f}:d=0.6[o]')
    else: fc.append(f'{last}null[o]')
    out = f'{D}/sc/s{i}.mp4'; tmp = f'{D}/sc/tmp_s{i}.mp4'
    args += ['-filter_complex', ';'.join(fc), '-map', '[o]', '-t', f'{dur:.3f}', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', '30', tmp]
    subprocess.run(args, check=True); os.rename(tmp, out); files.append(out)
    print('escena', i, f'{dur:.2f}s', n, 'tomas')

with open(f'{D}/sc/list.txt', 'w') as fh:
    for f in files: fh.write(f"file '{f}'\n")
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', f'{D}/sc/list.txt', '-c', 'copy', f'{D}/video_mudo.mp4'], check=True)
print('ok')
