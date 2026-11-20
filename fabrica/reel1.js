// Reel 1 · "Hazla tú, en minutos": estilo → nombres → foto → lista → compartir
REELS['1'] = (() => {
  const END = 16.4, DUR = 19.4;
  const BUBP = [[70, 300, .15], [330, 1240, .45], [560, 430, .7], [90, 1440, .95], [330, 1640, 1.2], [720, 1060, 1.4]];
  const BUB = T('bubbles', ['¿Cuánto cobras? 🙏', '¿En cuánto me la entregas?', 'Info por favor', '¿Me haces un cambio? 😅', '¿Tienes diseños de XV?', '¿Precio?']).slice(0, 6).map((txt, i) => [txt, ...BUBP[i]]);
  let els = {};
  const FP = [
    [4.6, 5.7, 140, 290, 5.25],
    [6.6, 7.2, 260, 690, 6.95], [8.2, 8.9, 440, 545, 8.6],
    [9.25, 9.95, 260, 395, 9.6], [10.3, 11.0, 99, 745, 10.65],
    [14.2, 15.9, 440, 82, 14.55], [15.15, 15.75, 260, 890, 15.5],
  ];
  function build() {
    const hook = $('hook');
    hook.innerHTML = `
      <div id="h1" class="abs H" style="left:70px;right:70px;top:640px;font-size:104px;text-align:center"></div>
      <div id="bubs"></div>
      <div id="h2" class="abs H" style="left:60px;right:60px;top:700px;font-size:150px;text-align:center">${T('h2', 'Hazla tú.<br><span class="hl">En minutos.</span>')}</div>`;
    $('bubs').innerHTML = BUB.map(([txt, x, y], i) => `<div class="abs bub" id="b${i}" style="left:${x}px;top:${y}px;display:flex;align-items:center;gap:14px;padding:18px 26px 18px 18px;background:#fff;border-radius:34px;box-shadow:0 18px 40px -18px rgba(52,66,74,.5);font-size:42px;font-weight:600;white-space:nowrap"><span style="width:60px;height:60px;border-radius:50%;background:${['#fbb4c0', '#7ac9b8', '#f5d38a', '#b9a7d4', '#9ec9e8', '#f2a97e'][i]}"></span>${txt}</div>`).join('');
    const scr = $('scr');
    const tiles = [[IM('th_jardin.jpg'), 'Jardín romántico'], [IM('th_dorado-clasico.jpg'), 'Dorado clásico'], [IM('th_gala-princesa.jpg'), 'Gala princesa'], [IM('th_encanto-floral.jpg'), 'Encanto floral']];
    scr.innerHTML = `
      <div class="layer" id="kits" style="background:#f7f8f8">
        <div class="bar">${ic('chevron-left', 28)}<span>Elige un estilo</span></div>
        <div class="abs" style="left:24px;right:24px;top:128px;display:flex;gap:10px">${['Boda', 'XV años', 'Bautizo', 'Cumple'].map((x, i) => `<span style="padding:8px 18px;border-radius:999px;font-size:19px;font-weight:700;${i ? 'background:#fff;color:#5a6a6e;border:1px solid #e3e6e8' : 'background:#34424a;color:#fff'}">${x}</span>`).join('')}</div>
        ${tiles.map(([src, n], i) => `<div class="abs" id="tile${i}" style="left:${24 + (i % 2) * 244}px;top:${186 + Math.floor(i / 2) * 372}px;width:228px">
          <div style="width:228px;height:285px;border-radius:20px;overflow:hidden;box-shadow:0 14px 30px -16px rgba(52,66,74,.5)"><img src="${src}" style="width:228px;height:285px;object-fit:cover"></div>
          <div style="margin-top:10px;font-size:21px;font-weight:700">${n}</div><div style="font-size:17px;color:#7a878b">Boda · Jardín</div></div>`).join('')}
        <div id="tring" class="abs" style="left:18px;top:180px;width:240px;height:297px;border-radius:24px;border:5px solid #3fa58e;opacity:0"></div>
      </div>
      <div class="layer" id="ed" style="background:#f3ece9">
        <div id="invw" class="abs" style="left:0;top:112px;width:520px">${inv(IM('inv_sample.jpg'), 'id="ia"')}${inv(IM('inv_names.jpg'), 'id="ib"')}${inv(IM('inv_es.jpg'), 'id="ic"')}</div>
        <div class="bar" style="justify-content:space-between">${ic('chevron-left', 28)}<span style="flex:1">Mi invitación</span><span class="btn" style="padding:12px 20px;font-size:20px">${ic('share-2', 20, '#fff')}Compartir</span></div>
        <div id="selN" class="sel" style="left:52px;top:654px;width:416px;height:74px"><i style="left:-10px;top:-10px"></i><i style="right:-10px;top:-10px"></i><i style="left:-10px;bottom:-10px"></i><i style="right:-10px;bottom:-10px"></i></div>
        <div id="selP" class="sel" style="left:30px;top:130px;width:460px;height:520px"><i style="left:-10px;top:-10px"></i><i style="right:-10px;top:-10px"></i><i style="left:-10px;bottom:-10px"></i><i style="right:-10px;bottom:-10px"></i></div>
        <div id="shN" class="sheet" style="height:560px"><div class="grab"></div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:0 26px"><span class="lbl">Nombres</span><span style="color:#3fa58e;font-weight:800;font-size:24px">Listo</span></div>
          <div class="field" style="margin:16px 24px 18px"><span id="tyN"></span><span class="caret" id="crN"></span></div>
          ${keyboard()}</div>
        <div id="shP" class="sheet" style="height:470px"><div class="grab"></div>
          <div style="padding:0 26px" class="lbl">Elige una foto</div>
          <div class="abs" style="left:24px;top:80px;display:grid;grid-template-columns:repeat(3,150px);gap:11px">
            ${['rings', 'toast', 'bouquet', 'candles'].map((n, i) => `<div style="position:relative;width:150px;height:150px;border-radius:16px;overflow:hidden"><img src="img/${n}.jpg" style="width:100%;height:100%;object-fit:cover">${i === 0 ? '<div id="pchk" style="position:absolute;inset:0;border:5px solid #3fa58e;border-radius:16px;display:flex;align-items:flex-start;justify-content:flex-end;padding:8px"><span style="width:36px;height:36px;border-radius:50%;background:#3fa58e;display:flex;align-items:center;justify-content:center">' + ic('check', 22, '#fff', 3) + '</span></div>' : ''}</div>`).join('')}
            <div style="width:150px;height:150px;border-radius:16px;background:#eef1f2;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;color:#5a6a6e;font-size:17px;font-weight:700">${ic('camera', 34, '#5a6a6e')}Cámara</div>
            <div style="width:150px;height:150px;border-radius:16px;background:#eef1f2;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;color:#5a6a6e;font-size:17px;font-weight:700">${ic('image', 34, '#5a6a6e')}Galería</div>
          </div></div>
        <div id="shS" class="sheet" style="height:430px"><div class="grab"></div>
          <div class="H" style="font-size:38px;text-align:center;margin-top:10px">¡Lista para compartir! 🎉</div>
          <div style="margin:22px 26px 0;padding:16px 20px;border-radius:16px;background:#f1f4f4;display:flex;align-items:center;gap:12px;font-size:21px;font-weight:600;color:#5a6a6e">${ic('link', 24, '#3fa58e')}<span style="flex:1">in-vite-mx.web.app/ver/?id=VaMa27</span>${ic('copy', 24, '#5a6a6e')}</div>
          <div id="wab" class="btn" style="margin:22px 26px 0;height:84px;font-size:27px;background:#25d366">${ic('message-circle', 30, '#fff')}Enviar por WhatsApp</div>
          <div id="sent" style="text-align:center;margin-top:20px;font-size:23px;font-weight:700;color:#3fa58e;opacity:0">✓ Enviada a 48 contactos</div></div>
      </div>`;
    $('side').innerHTML = `<div id="sw" class="abs" style="left:700px;top:448px;display:flex;align-items:center;gap:12px;padding:16px 26px;border-radius:999px;background:#34424a;color:#fff;font-size:38px;font-weight:800;font-family:'Bricolage Grotesque';box-shadow:0 18px 40px -14px rgba(52,66,74,.6);transform:rotate(4deg)">${ic('clock', 34, '#fff', 2.5)}<span id="swt">0:00</span></div>`;
    CAPS.push([3.6, 6.2, 'Paso 1', 'Elige un estilo'], [6.2, 9.2, 'Paso 2', 'Escribe los nombres'], [9.2, 11.8, 'Paso 3', 'Pon tu foto'],
      [11.8, 14.15, '', 'Lo demás <span class="hl">ya viene listo</span>', 'Itinerario, ubicación, confirmaciones…'], [14.15, 16.4, 'Paso 4', 'Compártela']);
    // audio
    BUB.forEach(([, , , d]) => cue(d + .05, 'pop', .7)); cue(0, 'whoosh', .5); cue(2.35, 'whoosh'); cue(2.5, 'boom');
    cue(3.5, 'whoosh', .6); tapsToCues(FP); cue(6.0, 'swipe'); cue(9.95, 'swipe'); cue(11.35, 'shimmer'); cue(12.0, 'whoosh', .5);
    for (let t = 7.2; t < 8.3; t += .075) cue(t, 'tick', .6);
    cue(15.55, 'ding'); cue(14.75, 'swipe'); endCues(END);
  }
  function render(t) {
    vis($('h1'), t, 0, 2.45, .2, .2);
    $('h1').innerHTML = T('h1', '¿Sigues buscando quién te haga tu <span class="hl">invitación digital</span>?');
    $('h1').style.transform = `scale(${.9 + .1 * eo(P(t, 0, .4))})`;
    BUB.forEach(([, , , d], i) => { const b = $(`b${i}`); const o = vis(b, t, d, 2.4, .01, .25); b.style.transform = `scale(${back(P(t, d, d + .35))}) translateY(${Math.sin(t * 2 + i) * 6}px)`; });
    vis($('h2'), t, 2.45, 3.75, .05, .3); $('h2').style.transform = `scale(${1.25 - .25 * eo(P(t, 2.45, 2.8))})`;
    phone(t, 3.45, END + .4);
    capAt(t);
    // capa estilos → editor
    vis($('kits'), t, 0, 6.35, 0, .3);
    $('tring').style.opacity = P(t, 5.25, 5.4);
    $('tile0').style.transform = `scale(${t > 5.2 && t < 5.5 ? .96 : 1})`;
    const ed = vis($('ed'), t, 6.05, 99, .3, 0);
    // invitación: versiones y scroll
    $('ib').style.opacity = P(t, 8.0, 8.35); $('ic').style.opacity = P(t, 11.25, 11.6);
    const sc = eio(P(t, 11.95, 14.0)) * (4177 * S - 260) * (1 - eio(P(t, 15.95, 16.3)));
    const lift = eio(P(t, 6.9, 7.25)) * (1 - eio(P(t, 8.85, 9.15))) * 300;
    $('invw').style.transform = `translateY(${-sc - lift}px)`;
    $('selN').style.transform = `translateY(${-lift}px)`;
    vis($('selN'), t, 6.95, 8.95, .1, .2); vis($('selP'), t, 9.6, 11.2, .1, .2);
    const sheet = (id, a, b, h) => { const e = $(id); e.style.display = t > a && t < b ? '' : 'none'; e.style.transform = `translateY(${(1 - eo(P(t, a, a + .3))) * h + eio(P(t, b - .25, b)) * h}px)`; };
    sheet('shN', 7.0, 8.9, 560); sheet('shP', 9.9, 11.25, 470); sheet('shS', 14.7, 16.4, 430);
    $('tyN').textContent = typed(T('names', 'Valeria & Mateo'), P(t, 7.2, 8.3)); $('crN').style.opacity = Math.floor(t * 3) % 2 ? 1 : .2;
    $('pchk').style.opacity = P(t, 10.65, 10.75);
    $('sent').style.opacity = P(t, 15.55, 15.7); $('wab').style.transform = `scale(${t > 15.42 && t < 15.6 ? .96 : 1})`;
    finger(t, FP);
    // cronómetro
    const sw = $('sw'); const so = vis(sw, t, 3.6, END, .25, .2);
    sw.style.transform = `rotate(4deg) scale(${back(P(t, 3.6, 3.95)) * (t > 15.55 && t < 15.85 ? 1.12 : 1)})`;
    const secs = Math.round(eio(P(t, 3.7, 15.55)) * 292);
    $('swt').textContent = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}${t > 15.55 ? ' ✓' : ''}`;
    sw.style.background = t > 15.55 ? '#3fa58e' : '#34424a';
    endCard(t, END);
  }
  return { dur: DUR, build, render };
})();
