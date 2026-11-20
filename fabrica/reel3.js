// Reel 3 · "Escribe 2 líneas, la IA arma la invitación": asistente → creando → recorrido → bilingüe
REELS['3'] = (() => {
  const END = 14.9, DUR = 17.9;
  // h1 de este reel es texto plano (se escribe letra por letra)
  const PROMPT = T('prompt', 'XV años de Renata, sábado 13 de marzo en Jardín Los Olivos. Elegante, en vino y dorado ✨');
  const STEPS = ['Eligiendo el estilo', 'Ajustando colores y letras', 'Escribiendo los textos', 'Acomodando cada sección'];
  const CHIPS = [['Itinerario', 40, 760, 9.3], ['Ubicación y mapa', 610, 900, 10.0], ['Mesa de regalos', 40, 1060, 10.7], ['Confirmaciones', 640, 1220, 11.4]];
  const FP = [[5.35, 6.0, 260, 668, 5.75], [12.75, 13.5, 120, 88, 13.15]];
  function build() {
    $('hook').innerHTML = `
      <div id="h1" class="abs H" style="left:70px;right:70px;top:560px;font-size:132px;text-align:center"><span id="h1t"></span><span id="h1c" style="display:inline-block;width:10px;height:120px;background:#3fa58e;vertical-align:-14px;margin-left:6px"></span></div>
      <div id="h1b" class="abs H" style="left:70px;right:70px;top:930px;font-size:96px;text-align:center">${T('h1b', '…y recibe tu invitación <span class="hl">completa.</span>')}</div>
      <div id="spk" class="abs" style="left:465px;top:380px">${ic('sparkles', 150, '#e98a9e', 1.6)}</div>`;
    $('scr').innerHTML = `
      <div class="layer" id="asst" style="background:linear-gradient(180deg,#f4fbf9,#fff 40%)">
        <div class="bar">${ic('sparkles', 28, '#3fa58e')}<span>Asistente IA</span></div>
        <div class="abs H" style="left:28px;right:28px;top:140px;font-size:40px">Cuéntanos de tu evento</div>
        <div class="abs" style="left:28px;right:28px;top:200px;font-size:20px;color:#7a878b;font-weight:600">Escríbelo como se lo dirías a una amiga</div>
        <div class="abs" style="left:24px;right:24px;top:252px;height:300px;border-radius:24px;background:#fff;border:2px solid #7ac9b8;box-shadow:0 18px 40px -26px rgba(63,165,142,.7);padding:22px;font-size:27px;line-height:1.4;font-weight:500"><span id="pt"></span><span class="caret" id="pc"></span></div>
        <div class="abs" style="left:24px;right:24px;top:574px;display:flex;gap:10px;flex-wrap:wrap">${['💍 Boda', '👑 XV años', '🕊️ Bautizo', '🎂 Cumpleaños'].map((x, i) => `<span style="padding:8px 16px;border-radius:999px;font-size:19px;font-weight:700;${i === 1 ? 'background:#34424a;color:#fff' : 'background:#fff;border:1px solid #e3e6e8;color:#5a6a6e'}">${x}</span>`).join('')}</div>
        <div id="go" class="btn abs" style="left:24px;right:24px;top:630px;height:80px;font-size:27px;background:linear-gradient(135deg,#7ac9b8,#3fa58e)">${ic('wand-sparkles', 28, '#fff')}Crear mi invitación</div>
      </div>
      <div class="layer" id="mk" style="background:#fff;display:flex;flex-direction:column;align-items:center;padding-top:250px">
        <div id="mks">${ic('sparkles', 110, '#3fa58e', 1.6)}</div>
        <div class="H" style="font-size:38px;margin-top:26px">Creando tu invitación…</div>
        <div style="width:380px;height:12px;border-radius:6px;background:#eef1f2;margin-top:26px;overflow:hidden"><div id="pbar" style="height:100%;width:0;background:linear-gradient(90deg,#7ac9b8,#e98a9e)"></div></div>
        <div style="margin-top:36px;width:380px">${STEPS.map((s, i) => `<div id="st${i}" style="display:flex;align-items:center;gap:16px;font-size:24px;font-weight:600;margin:16px 0;color:#34424a"><span id="sc${i}" style="width:38px;height:38px;border-radius:50%;border:3px solid #dfe4e6;display:flex;align-items:center;justify-content:center"></span>${s}</div>`).join('')}</div>
      </div>
      <div class="layer" id="rv" style="background:#fbf5ee">
        <div id="rw" class="abs" style="left:0;top:0;width:520px">${inv(IM('inv_xv.jpg'), 'id="xa"')}${inv(IM('inv_xv_en.jpg'), 'id="xb"')}</div>
        <div id="lt" class="abs" style="left:22px;top:66px;display:flex;padding:5px;border-radius:999px;background:rgba(255,255,255,.92);box-shadow:0 8px 20px -10px rgba(0,0,0,.4);font-weight:800;font-size:20px;z-index:20">
          <span id="les" style="padding:8px 16px;border-radius:999px">ES</span><span id="len" style="padding:8px 16px;border-radius:999px">EN</span></div>
      </div>`;
    $('side').innerHTML = CHIPS.map(([txt, x, y], i) => `<div class="pillc" id="ch${i}" style="left:${x}px;top:${y}px"><b>${ic('check', 24, '#fff', 3)}</b>${txt}</div>`).join('');
    CAPS.push([2.5, 6.1, 'Paso único', 'Cuéntale tu evento <span class="hl">a la IA</span>'], [6.1, 8.2, '', 'Elige estilo, colores <span class="hl">y escribe por ti</span>'],
      [8.2, 12.4, '', 'Lista <span class="hl">en segundos</span>', 'Con todo lo que tu evento necesita'], [12.4, END, '', 'Y <span class="hl">bilingüe</span>', 'Cada invitado la lee en su idioma']);
    cue(0, 'whoosh', .4); for (let t = .1; t < 1.1; t += .08) cue(t, 'tick', .8); cue(1.25, 'boom'); cue(1.3, 'shimmer'); cue(2.3, 'whoosh', .6);
    for (let t = 3.0; t < 5.2; t += .06) cue(t, 'tick', .5); tapsToCues(FP); cue(5.9, 'swipe');
    STEPS.forEach((s, i) => cue(6.45 + i * .42, 'pop', .8)); cue(8.1, 'whoosh'); cue(8.25, 'shimmer');
    CHIPS.forEach(([, , , d]) => cue(d, 'pop', .9)); cue(13.3, 'swipe'); cue(13.35, 'chime', .6); endCues(END);
  }
  function render(t) {
    const h = vis($('h1'), t, 0, 2.45, 0, .25); $('h1t').textContent = typed(T('h1', 'Escribe 2 líneas…'), P(t, .1, 1.1)); $('h1c').style.opacity = Math.floor(t * 3) % 2 && t < 1.2 ? 1 : (t < 1.2 ? .2 : 0);
    vis($('h1b'), t, 1.2, 2.45, .2, .25); $('h1b').style.transform = `translateY(${(1 - eo(P(t, 1.2, 1.6))) * 50}px)`;
    vis($('spk'), t, 1.25, 2.45, .15, .25); $('spk').style.transform = `scale(${back(P(t, 1.25, 1.6))}) rotate(${t * 40}deg)`;
    phone(t, 2.3, END + .4); capAt(t);
    vis($('asst'), t, 0, 6.1, 0, .25);
    $('pt').textContent = typed(PROMPT, P(t, 3.0, 5.2)); $('pc').style.opacity = t < 5.4 && Math.floor(t * 3) % 2 ? 1 : 0;
    $('go').style.transform = `scale(${t > 5.65 && t < 5.85 ? .96 : 1})`;
    vis($('mk'), t, 5.95, 8.4, .2, .3);
    $('mks').style.transform = `rotate(${t * 90}deg) scale(${1 + Math.sin(t * 6) * .06})`;
    $('pbar').style.width = `${eio(P(t, 6.1, 8.0)) * 100}%`;
    STEPS.forEach((s, i) => { const on = t > 6.45 + i * .42; const c = $(`sc${i}`); c.style.background = on ? '#3fa58e' : 'transparent'; c.style.borderColor = on ? '#3fa58e' : '#dfe4e6'; c.innerHTML = on ? ic('check', 22, '#fff', 3) : ''; $(`st${i}`).style.opacity = .35 + .65 * P(t, 6.2 + i * .42, 6.45 + i * .42); });
    const rv = vis($('rv'), t, 8.1, 99, .01, 0); $('rv').style.clipPath = `inset(${(1 - eio(P(t, 8.1, 8.6))) * 100}% 0 0 0)`;
    const sc = eio(P(t, 8.8, 12.0)) * (4355 * S - 240) * (1 - eio(P(t, 12.05, 12.55)));
    $('rw').style.transform = `translateY(${-sc}px)`;
    $('xb').style.opacity = P(t, 13.25, 13.6);
    vis($('lt'), t, 12.5, 99, .25, 0);
    const en = t > 13.15; $('les').style.background = en ? 'transparent' : '#34424a'; $('les').style.color = en ? '#5a6a6e' : '#fff'; $('len').style.background = en ? '#34424a' : 'transparent'; $('len').style.color = en ? '#fff' : '#5a6a6e';
    CHIPS.forEach(([, , , d], i) => { const e = $(`ch${i}`); vis(e, t, d, 12.3, .01, .3); e.style.transform = `scale(${back(P(t, d, d + .35))})`; });
    finger(t, FP);
    endCard(t, END);
  }
  return { dur: DUR, build, render };
})();
