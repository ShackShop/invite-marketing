# Fábrica de reels de In-Vite

Reels verticales 1080×1920, 30 fps, 17–20 s, con música y efectos sintetizados (sin derechos de terceros).
Las invitaciones que aparecen son renders REALES de la plataforma (bundle `inv.js`, mismo código que la app).
Las fotos son ilustraciones simbólicas (`img/`), sin personas.

## Requisitos del entorno
- Node + puppeteer (se busca en `node_modules` o `/opt/npm-tools/node_modules`) y Google Chrome (`/usr/bin/google-chrome`).
- ffmpeg y python3 con numpy.
- No necesita internet: las fuentes están en `fonts/`.

## Los 4 reels base (`reels.html?r=N`)
| r | Tema | Gancho por defecto |
|---|------|--------------------|
| 1 | Hazla tú en minutos: estilo → nombres → foto → compartir (cronómetro) | ¿Sigues buscando quién te haga tu invitación digital? |
| 2 | Confirmaciones: el invitado confirma, aviso por WhatsApp, lista y mesas, escáner QR | ¿Así se pone tu WhatsApp antes del evento? |
| 3 | IA: escribe 2 líneas, la IA arma unos XV, recorrido y cambio a inglés | Escribe 2 líneas… |
| 4 | Cambios: letra, colores, agregar módulos, igual en celular y compu | ¿Cada cambio es esperar… y pagar? |

Todos cierran con logo + "Diséñala gratis · $350 MXN solo al activarla" + in-vite.mx.

## Variantes (config JSON)
```json
{
  "set": "base",            // carpeta en sets/ con las invitaciones a usar
  "music": 0,               // 0-3: cuatro pistas distintas
  "t": { "h1": "...", ... } // textos que reemplazan a los de por defecto (HTML permitido salvo donde se indica)
}
```
Claves de texto por reel (`<span class="hl">` = verde de marca, `<span class="pink">` = rosa):
- r1: `h1` (gancho), `h2` (respuesta, usa `<br>`), `bubbles` (lista de 6 preguntas cortas), `names` (lo que se escribe, ej. "Ana & Diego")
- r2: `hq` (gancho), `h2` (respuesta), `chat_title`, `names`, `date_short` (ej. "22 may")
- r3: `h1` (TEXTO PLANO, se escribe letra por letra, máx ~22 caracteres), `h1b` (respuesta), `prompt` (lo que se le escribe a la IA)
- r4: `hq` (gancho), `h2` (respuesta), `chat_out` (mensaje del cliente), `chat_in` (respuesta del diseñador)
- Todos: `end_e1`, `end_e2`, `end_e4` (líneas de la tarjeta final)

Los nombres en `names` deben coincidir con el set (los que se renderizaron en las invitaciones).
Mantén los ganchos cortos: h1/hq ≤ 60 caracteres, h2 ≤ 40.

## Crear un set nuevo de invitaciones
```bash
node make_set.cjs <set> "<Nombre1,Nombre2>" "<#color>" [AAAA-MM-DD] [Quinceañera]
# ej: node make_set.cjs ana-diego "Ana,Diego" "#7E5AA6" 2027-05-22 Sofía
```
Usa siempre el estilo Jardín romántico (boda) y Gala princesa (XV) para que los toques del reel caigan en su lugar.
Nombres cortos (≤ 8 letras cada uno). Colores probados: #B9767A (rosa, base), #8FA48A (salvia), #7E5AA6 (lila), #A8833F (dorado), #5B7FA6 (azul).

## Revisar y renderizar
```bash
node frames.cjs 1 /tmp/rev cfg.json 1.0 3.0 8.6 13.5 17.5   # capturas para revisar (mirar que ningún texto se salga)
node render.cjs 1 ../reels/2026-11-23-ana-diego-r1.mp4 cfg.json   # ~1 min por reel
```
`node render.cjs` sin config = versión base.

## Archivos
- `reels.html` + `reel1..4.js`: escenas animadas por tiempo (render(t)).
- `inv.html` + `inv.js`: render real de invitaciones (parámetros: mine, names, colors, fa, k, xv, lang, date, photos).
- `photos.html` + `photos.cjs`: generador de fotos simbólicas.
- `audio.py`: música (4 variantes) y efectos a partir de las marcas (cues) de cada reel.
