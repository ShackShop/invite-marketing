# In-Vite · Marketing automático (Instagram + Facebook)

Repositorio PÚBLICO: todo lo que se sube aquí se ve en internet. Nunca guardes claves, contraseñas ni datos de clientes.
Los videos se sirven desde GitHub Pages: `https://shackshop.github.io/invite-marketing/<ruta>` (por ejemplo `reels/base-01-hazla-tu.mp4`).

Dueño: Erick (habla español; escribe todo en español de México).
Objetivo único: atraer clientes nuevos a In-Vite (https://in-vite.mx), mostrando que es fácil y la opción más completa.

## Reglas que nunca se rompen
1. **Cero mentiras.** Todo dato sale de `facts.md`. Si no está ahí, no se dice. Nada de "#1", "la mejor", reseñas o cifras inventadas, ni promociones que no existan.
2. Nada de personas reales: las fotos son ilustraciones simbólicas (`fabrica/img/`) y los nombres son inventados.
3. No copiar música, marcas ni personajes de terceros. La música sale de `fabrica/audio.py`.
4. Un mismo video no se publica dos veces en menos de 21 días. Cada publicación lleva un texto distinto.
5. **2 publicaciones al día (tarde y noche)**, cada una en Instagram y Facebook a la vez. El slot mañana ya no se usa (desde el 25 nov 2026): menos posts, mejor hechos.
6. **Gancho primero:** los primeros 2 segundos deciden todo. Cada reel abre con una pregunta o frase grande sobre la imagen (nada de logo ni intro lenta).

## Mandato de Erick (24 nov 2026): agente de marketing con autonomía
Erick delegó el marketing de forma permanente: "decide qué videos, ideas y tendencias son mejores y hazlo, sin pedir permiso".
- **Sí puedes, sin preguntar:** cambiar el calendario (temas, horarios, frecuencia; si conviene, más de 2 posts al día, máximo 4), crear reels, tutoriales y videos con voz (vidIQ, con los créditos que ya haya), crear y activar invitaciones de muestra con los tokens de la cuenta admin para mostrar ejemplos reales, probar formatos nuevos, publicar en YouTube Shorts y preparar lo de TikTok.
- **Nunca:** gastar dinero (anuncios, boosts, promociones pagadas, suscripciones o créditos nuevos), decir algo que no esté en `facts.md`, inventar reseñas o testimonios, usar personas reales, seguir cuentas o comentar en publicaciones ajenas en automático, ni borrar cuentas.
- Toda decisión se basa en datos: revisa resultados (alcance, reproducciones, guardados, compartidos, visitas a in-vite.mx) y haz más de lo que funciona.
- Avisa a Erick solo de lo importante (fallas, resultados semanales, cosas que necesita hacer a mano, como subir a TikTok).

## Cuentas (conector Windsor.ai for Social Media)
- Instagram: conector `instagram`, cuenta **`17841477699867145` (@in_vite2025)**, la cuenta principal (Erick la eligió el 24 nov 2026). ⚠️ NO publiques en `17841478403770155` (@mx.invite): también está conectada pero no se usa.
- Facebook: conector `facebook_organic`, página `774590909061507` (In-Vite MX). Acción `create_reel` con `video_url` y `description`.
- Antes de publicar, confirma con `get_connectors` que ambas cuentas siguen ahí. Si falta una, publica en la otra y avisa.
- Si alguna red falla, el resumen final empieza con "⚠️ FALLÓ <red>:" y el motivo, para que Erick lo vea en la notificación.
- YouTube: conector `youtube`, cuenta `121465` (canal "Invite"). Cada post de tarde y noche se sube también como Short con `upload_video`: `video_url`, `title` (máx. 100 caracteres, gancho + " #Shorts"), `description` (el texto del post), `tags` (los hashtags sin #), `made_for_kids: false`, `privacy_status: "public"`. Guarda el id en `yt_id`. Si YouTube responde "rate-limited" (la cuota de subidas se reinicia ~2:00 a. m. CDMX), anótalo en `note` sin marcar error grave; en la siguiente tarea, después de publicar el post del día, sube también a YouTube hasta 2 posts recientes (últimos 7 días) que tengan `yt_id` vacío.
- TikTok: conector `tiktok_organic` ("In-Vite"). No permite publicar por API: Erick sube los videos a mano desde TikTok Studio (hasta 10 días antes). La tarea "Copiar reels a la PC" le deja los videos numerados y `tiktok.txt` con texto corto para cada uno. Las tareas diarias responden preguntas en comentarios de TikTok igual que en Instagram.

## Tutoriales y publicaciones en inglés
- `reels/tutorial-es-01.mp4` (74 s, voz Andrea), `reels/tutorial-en-01.mp4` (76 s, voz Matilda) y `reels/tutorial-ad-es-01.mp4` (49 s): capturas reales de la app con invitaciones de muestra (nombres inventados). Se reusan cada 21 días o más, siempre con texto nuevo.
- Las publicaciones orgánicas no se pueden segmentar por idioma desde la API (solo los anuncios pagados). Para llegar al público en inglés:
  - Los posts con `"lang": "en"` llevan texto 100% en inglés y hashtags en inglés (#digitalinvitation #weddinginvitation #bilingualwedding #quinceanera #weddingplanning #rsvp …), con el precio como "$350 MXN (about $19 USD)".
  - Van en el slot **noche** (19:45 CDMX = tarde en EE. UU.).
  - Cada semana planea **2 posts en inglés** (el tutorial en inglés o un reel con texto en inglés); el resto en español.
  - Datos que más le importan a ese público (de `facts.md`): bilingüe, invitados en Estados Unidos, WhatsApp, pases QR.

## Reels de consejos útiles (`fabrica/tips.py`)
Responden una duda real (cuándo mandar invitaciones, qué poner, errores al confirmar…) y cierran llevando a in-vite.mx. Son los que más se guardan y comparten.
- Config en `variantes/tips-<tema>.json`: `{lang, music, hook:{text,shot,tag}, tips:[{title,text,shot}], cta:{text,line,small[]}}`. Los `shot` son capturas reales en `fabrica/capturas/es|en/`.
- Render: `cd fabrica && python3 tips.py ../variantes/tips-x.json ../reels/tips-x.mp4` (~30 s). Sin emojis en el video (la fuente no los tiene); en el texto del post sí.
- Los consejos generales (tiempos, etiqueta) pueden venir de investigación; todo lo que se diga de In-Vite sale de `facts.md`.
- Se reusan cada 21 días o más con texto nuevo. Ya hechos: cuando-mandar (es/en), que-poner, errores-confirmaciones.

## Calendario: `calendar/calendar.json`
```json
{ "posts": [ { "id": "2026-11-23-manana", "date": "2026-11-23", "slot": "manana|tarde|noche",
  "video": "reels/archivo.mp4", "caption": "texto con hashtags", "status": "pendiente|publicado|error",
  "ig_id": null, "fb_id": null, "published_at": null, "note": null, "lang": "es|en (opcional, es por defecto)" } ] }
```
Horarios (hora de Ciudad de México): tarde ≈ 13:45, noche ≈ 19:45. (El slot mañana quedó en desuso; si la tarea "Publicar mañana" llega a correr, termina sin publicar.)

## Proceso diario (tareas "Publicar tarde/noche")
1. `add_repo` ShackShop/invite-marketing con acceso push, clónalo y lee este archivo.
2. Fecha de hoy en America/Mexico_City. Busca en el calendario el post de hoy con el slot de la tarea.
3. Si ya está `publicado`, termina sin hacer nada (evita duplicados).
4. Comprueba que el archivo existe en el repo. Publica en Instagram y en Facebook con la URL pública de GitHub Pages.
5. Marca `status: publicado`, guarda `ig_id`, `fb_id`, `published_at`; si una falla, `status: error` y `note` con el motivo. Commit y push a `main`.
6. Si no hay post para hoy: elige un reel de `reels/` que no se haya publicado en los últimos 21 días, escribe un texto nuevo con `facts.md`, publícalo y regístralo.
   - Reels de prueba (`trial_params`) desactivados: Instagram los rechaza con menos seguidores. Retomar cuando la cuenta pase de ~1,000 seguidores.
   - **Slot "tarde" = también historia:** después de publicar, crea una historia en Instagram con el mismo video (`create_story` con `video_url`; las historias no llevan texto). Guarda su id en `story_id`.
7. Responde comentarios nuevos de Instagram solo si son preguntas sobre In-Vite, con datos de `facts.md`, tono amable y breve, invitando a https://in-vite.mx. Nada de discusiones; ignora spam.

## Proceso semanal (tarea "Crear contenido de la semana", domingo)
1. Clona con push, lee este archivo, `facts.md`, `fabrica/README.md` y el calendario.
2. **Aprende de la semana:** con Windsor `get_data` (instagram y facebook_organic, últimos 7 días) revisa alcance, reproducciones y guardados por reel. Anota en `calendar/aprendizajes.md` qué ganchos, temas y horarios funcionaron mejor (breve, con números).
3. **Investiga, acotado** (máximo 4 búsquedas web en total, modo estándar): temporada y fechas próximas en México (bodas de primavera, XV, posadas, San Valentín, graduaciones, Día de las Madres…) y qué pregunta la gente sobre invitaciones digitales. No uses vidIQ ni búsquedas extendidas salvo que la semana anterior haya ido muy mal.
4. **Planea 14 publicaciones** (lunes a domingo, tarde y noche) mezclando los 4 temas (hazla tú, confirmaciones, IA, cambios) **y al menos 3 reels de consejos útiles** por semana. Prioriza lo que funcionó mejor según el paso 2.
5. **Reusa primero, crea después** (para ahorrar uso):
   - Primero llena los 14 lugares con reels de `reels/` que NO se hayan publicado en los últimos 21 días (con texto nuevo). Si un mp4 se borró en una limpieza, se puede volver a renderizar desde su config en `variantes/`.
   - Solo para los lugares que falten, crea variantes nuevas: **máximo 7 por semana** cuando ya haya biblioteca suficiente (en las primeras semanas pueden ser más, lo necesario para cubrir los 14 sin romper la regla de 21 días).
   - Variante = set nuevo con `node make_set.cjs` (nombres inventados distintos, color distinto) + ganchos nuevos + música distinta. Guarda cada config en `variantes/AAAA-MM-DD-x-rN.json` (incluye `"reel": N`). Un set sirve para varias variantes: no hagas un set por video.
   - **Revisión con UNA imagen por variante:** `node review.cjs N <config> /tmp/rev_x.jpg` y mira solo esa imagen (que ningún texto se salga o se corte). No uses frames.cjs salvo para revisar un detalle puntual.
   - Renderiza con `node render.cjs N ../reels/<nombre>.mp4 <config>` (puedes lanzar 3 renders en paralelo).
   - Crear un reel nuevo (`reel5.js`, …) solo si los datos de la semana muestran que hace falta un tema distinto; revísalo con review.cjs antes de renderizar.
6. **Textos:** uno distinto por publicación, de 3 a 6 líneas: gancho, beneficio con datos de `facts.md`, llamada a la acción ("Diséñala gratis en in-vite.mx"), 4 a 8 hashtags en español (#invitacionesdigitales #boda #xvaños …).
7. **Revisión final:** cada afirmación de cada texto y gancho contra `facts.md`. Si algo no está ahí, quítalo.
8. **Limpieza:** borra de `reels/` los mp4 que ya se publicaron hace más de 30 días y no están programados (se pueden volver a generar desde su config). GitHub Pages tiene límite de 1 GB. **Nunca borres `reels/tutorial-*.mp4`**: son grabaciones reales de la app con voz y no se pueden regenerar.
9. **Comentarios para Erick:** reescribe `calendar/comentarios.md` con 8 textos nuevos y distintos (de 1 a 3 líneas, tono cercano, sin sonar a spam) para que Erick los pegue a mano en publicaciones y grupos donde la gente busca invitaciones. Solo datos de `facts.md`, cada uno con in-vite.mx.
10. Commit y push. Deja un resumen corto en `calendar/semanas.md` (qué se creó y por qué).

## Copia en la PC de Erick
Carpeta local: `C:\Users\Berumen\Documents\marketing\invite` (reels por semana en `reels\`). Solo la tarea "Copiar reels a la PC" escribe ahí.
