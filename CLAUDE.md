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
5. Máximo 3 publicaciones al día (mañana, tarde, noche), cada una en Instagram y Facebook a la vez.

## Cuentas (conector Windsor.ai for Social Media)
- Instagram: conector `instagram`, cuenta `17841477699867145` (INVITE, @in_vite2025). Acción `create_video_post` con `video_url` y `caption` (máx. 2200 caracteres). Se publica como Reel.
- Facebook: conector `facebook_organic`, página `774590909061507` (In-Vite MX). Acción `create_reel` con `video_url` y `description`.
- Antes de publicar, confirma con `get_connectors` que ambas cuentas siguen ahí. Si falta una, publica en la otra y avisa.

## Calendario: `calendar/calendar.json`
```json
{ "posts": [ { "id": "2026-11-23-manana", "date": "2026-11-23", "slot": "manana|tarde|noche",
  "video": "reels/archivo.mp4", "caption": "texto con hashtags", "status": "pendiente|publicado|error",
  "ig_id": null, "fb_id": null, "published_at": null, "note": null } ] }
```
Horarios (hora de Ciudad de México): mañana ≈ 7:45, tarde ≈ 13:45, noche ≈ 19:45.

## Proceso diario (tareas "Publicar mañana/tarde/noche")
1. `add_repo` ShackShop/invite-marketing con acceso push, clónalo y lee este archivo.
2. Fecha de hoy en America/Mexico_City. Busca en el calendario el post de hoy con el slot de la tarea.
3. Si ya está `publicado`, termina sin hacer nada (evita duplicados).
4. Comprueba que el archivo existe en el repo. Publica en Instagram y en Facebook con la URL pública de GitHub Pages.
5. Marca `status: publicado`, guarda `ig_id`, `fb_id`, `published_at`; si una falla, `status: error` y `note` con el motivo. Commit y push a `main`.
6. Si no hay post para hoy: elige un reel de `reels/` que no se haya publicado en los últimos 21 días, escribe un texto nuevo con `facts.md`, publícalo y regístralo.
7. Responde comentarios nuevos de Instagram solo si son preguntas sobre In-Vite, con datos de `facts.md`, tono amable y breve, invitando a https://in-vite.mx. Nada de discusiones; ignora spam.

## Proceso semanal (tarea "Crear contenido de la semana", domingo)
1. Clona con push, lee este archivo, `facts.md`, `fabrica/README.md` y el calendario.
2. **Aprende de la semana:** con Windsor `get_data` (instagram y facebook_organic, últimos 7 días) revisa alcance, reproducciones y guardados por reel. Anota en `calendar/aprendizajes.md` qué ganchos, temas y horarios funcionaron mejor (breve, con números).
3. **Investiga** (WebSearch): temporada y fechas próximas en México (bodas de primavera, XV, posadas, San Valentín, graduaciones, Día de las Madres…), qué preguntan las personas sobre invitaciones digitales y tendencias de reels. Opcional: vidIQ para formatos que están funcionando.
4. **Planea 21 publicaciones** (lunes a domingo, 3 por día) mezclando los 4 temas (hazla tú, confirmaciones, IA, cambios). Prioriza lo que funcionó mejor según el paso 2.
5. **Crea los videos que hagan falta** para cumplir la regla de 21 días:
   - Variantes: nuevo set con `node make_set.cjs` (nombres inventados distintos, color distinto) + ganchos nuevos + música distinta. Guarda cada config en `variantes/AAAA-MM-DD-x-rN.json` (incluye `"reel": N`).
   - Revisa cada variante con `node frames.cjs` antes de renderizar (que ningún texto se salga o se corte). Mira las capturas.
   - Renderiza con `node render.cjs N ../reels/<nombre>.mp4 <config>`.
   - Puedes crear un reel nuevo (`reel5.js`, …) siguiendo el estilo de los existentes si hay un tema que valga la pena; revísalo con capturas antes de renderizar.
6. **Textos:** uno distinto por publicación, de 3 a 6 líneas: gancho, beneficio con datos de `facts.md`, llamada a la acción ("Diséñala gratis en in-vite.mx"), 4 a 8 hashtags en español (#invitacionesdigitales #boda #xvaños …).
7. **Revisión final:** cada afirmación de cada texto y gancho contra `facts.md`. Si algo no está ahí, quítalo.
8. **Limpieza:** borra de `reels/` los mp4 que ya se publicaron hace más de 30 días y no están programados (se pueden volver a generar desde su config). GitHub Pages tiene límite de 1 GB.
9. Commit y push. Deja un resumen corto en `calendar/semanas.md` (qué se creó y por qué).

## Copia en la PC de Erick
Carpeta local: `C:\Users\Berumen\Documents\marketing\invite` (reels por semana en `reels\`). Solo la tarea "Copiar reels a la PC" escribe ahí.
