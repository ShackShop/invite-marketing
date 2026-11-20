// Reel 4 · "¿Cada cambio es esperar y pagar?": letra → colores → agregar → igual en todos lados
REELS['4'] = (() => {
  const END = 15.5, DUR = 18.5;
  const IMGS = [IM('inv_es.jpg'), IM('v_f0.jpg'), IM('v_f1.jpg'), IM('v_c_lilac_f1.jpg'), IM('v_c_gold_f1.jpg'), IM('v_c_sage_f1.jpg')];
  const AT = [0, 5.25, 6.15, 8.0, 8.75, 9.5]; // momento en que entra cada versión
  const TOOLS = [['plus', 'Agregar'], ['type', 'Letra'], ['palette', 'Color'], ['image', 'Fondo'], ['sparkles', 'Efectos']];
  const FONTS = ['Great Vibes', 'Allura', 'Sacramento', 'Ephesis'];
  const SW = ['#B9767A', '#8FA48A', '#7E5AA6', '#A8833F', '#34424a'];
  const ADD = [['type', 'Texto'], ['image', 'Foto'], ['music', 'Música'], ['clock', 'Cuenta regresiva'], ['calendar', 'Calendario'], ['image', 'Galería'], ['map-pin', 'Ubicación'], ['heart', 'Regalos']];
  const tx = (i) => 52 + i * 104;
  const FP = [
    [4.0, 4.5, 260, 690, 4.3], [4.5, 4.95, tx(1), 1000, 4.75], [4.95, 5.45, 197, 920, 5.2], [5.6, 6.35, 315, 920, 6.1],
    [6.9, 7.45, tx(2), 1000, 7.2], [7.45, 8.05, 252, 920, 7.95], [8.1, 8.8, 348, 920, 8.7], [8.85, 9.6, 156, 920, 9.45],
    [10.05, 10.6, tx(0), 1000, 10.35], [10.75, 11.4, 445, 715, 11.15],
  ];
  function build() {
    $('hook').innerHTML = `
      <div id="chat" class="chat">
        <div class="abs" style="left:0;right:0;top:0;height:230px;background:#f7f5f3;border-bottom:1px solid #e2dcd5;display:flex;align-items:flex-end;padding:0 40px 30px;gap:24px">
          ${ic('arrow-left', 44, '#34424a')}<div style="width:86px;height:86px;border-radius:50%;background:#b9a7d4;display:flex;align-items:center;justify-content:center;font-size:42px">🎨</div>
          <div style="flex:1"><div style="font-size:40px;font-weight:700">Diseño de invitaciones</div><div id="ty" style="font-size:28px;color:#3fa58e;font-weight:600">escribiendo…</div></div></div>
        <div class="msg out" id="mo" style="top:860px;font-size:46px">${T('chat_out', 'Hola! ¿me cambias la hora de la recepción? Siempre sí es a las 7:30 😅')}</div>
        <div class="msg in" id="mi" style="top:1130px;font-size:46px">${T('chat_in', 'Claro 😊 te la mando mañana.<br>Serían <b>$150</b> por el cambio.')}</div>
      </div>
      <div id="hq" class="abs" style="left:50px;right:50px;top:300px;padding:44px 40px;border-radius:44px;background:rgba(255,255,255,.97);box-shadow:0 40px 80px -30px rgba(52,66,74,.55);text-align:center">
        <div class="H" style="font-size:96px">${T('hq', '¿Cada cambio es <span class="pink">esperar… y pagar?</span>')}</div></div>
      <div id="h2" class="abs H" style="left:60px;right:60px;top:690px;font-size:132px;text-align:center">${T('h2', 'Aquí la cambias tú. <span class="hl">Al instante.</span>')}</div>`;
    $('scr').innerHTML = `
      <div class="layer" id="ed" style="background:#f3ece9">
        <div id="iw" class="abs" style="left:0;top:112px;width:520px">${IMGS.map((s, i) => inv(s, `id="v${i}"`)).join('')}</div>
        <div class="bar" style="justify-content:space-between">${ic('chevron-left', 28)}<span style="flex:1">Mi invitación</span><span style="font-size:18px;color:#3fa58e;font-weight:700">✓ Guardado</span></div>
        <div id="selN" class="sel" style="left:52px;top:654px;width:416px;height:74px"><i style="left:-10px;top:-10px"></i><i style="right:-10px;top:-10px"></i><i style="left:-10px;bottom:-10px"></i><i style="right:-10px;bottom:-10px"></i></div>
        <div id="selC" class="sel" style="left:20px;top:339px;width:480px;height:221px"><i style="left:-10px;top:-10px"></i><i style="right:-10px;top:-10px"></i><i style="left:-10px;bottom:-10px"></i><i style="right:-10px;bottom:-10px"></i></div>
        <div class="abs" style="left:0;right:0;bottom:0;height:120px;background:#fff;border-top:1px solid #eceaf0;display:flex;z-index:35">${TOOLS.map(([icn, l], i) => `<div id="tool${i}" style="width:104px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;font-size:16px;font-weight:700;color:#5a6a6e">${ic(icn, 30, '#34424a')}${l}</div>`).join('')}</div>
        <div id="shF" class="sheet" style="height:260px;bottom:120px;border-radius:30px 30px 0 0;z-index:34"><div class="grab"></div><div style="padding:0 26px" class="lbl">Letra de los nombres</div>
          <div style="display:flex;gap:8px;padding:22px 24px">${FONTS.map((f, i) => `<div id="fc${i}" style="width:110px;height:76px;border-radius:16px;background:#f1f4f4;display:flex;align-items:center;justify-content:center;font-family:'${f}';font-size:30px;color:#4a4040">Valeria</div>`).join('')}</div></div>
        <div id="shC" class="sheet" style="height:260px;bottom:120px;border-radius:30px 30px 0 0;z-index:34"><div class="grab"></div><div style="padding:0 26px" class="lbl">Color principal</div>
          <div style="display:flex;gap:26px;padding:28px 25px">${SW.map((c, i) => `<div id="sw${i}" style="width:70px;height:70px;border-radius:50%;background:${c};box-shadow:0 0 0 4px #fff,0 0 0 6px #e3e6e8"></div>`).join('')}</div></div>
        <div id="shA" class="sheet" style="height:470px;z-index:36"><div class="grab"></div><div style="padding:0 26px" class="lbl">Agregar</div>
          <div class="abs" style="left:24px;top:70px;display:grid;grid-template-columns:repeat(4,110px);gap:12px">${ADD.map(([icn, l], i) => `<div id="ad${i}" style="width:110px;height:120px;border-radius:18px;background:#f1f4f4;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;font-size:15px;font-weight:700;text-align:center;line-height:1.1;padding:0 6px">${ic(icn, 32, '#3fa58e')}${l}</div>`).join('')}</div></div>
      </div>`;
    $('side').innerHTML = `
      <div id="lap" class="abs" style="left:110px;top:560px;width:860px">
        <div style="width:860px;height:540px;border-radius:30px;background:#26302f;padding:18px;box-shadow:0 0 0 3px #7ac9b8,0 50px 100px -30px rgba(52,66,74,.5)">
          <div style="width:100%;height:100%;border-radius:14px;overflow:hidden;background:#efdfdb;position:relative">
            <div style="position:absolute;left:0;right:0;top:0;height:34px;background:#fff;display:flex;align-items:center;gap:8px;padding:0 14px"><i style="width:12px;height:12px;border-radius:50%;background:#f28b82"></i><i style="width:12px;height:12px;border-radius:50%;background:#fdd663"></i><i style="width:12px;height:12px;border-radius:50%;background:#81c995"></i><span style="margin-left:20px;font-size:14px;color:#7a878b;background:#f1f3f4;border-radius:8px;padding:3px 14px">in-vite-mx.web.app/ver/?id=VaMa27</span></div>
            <img src="${IM('v_c_sage_f1.jpg')}" style="position:absolute;left:262px;top:34px;width:300px">
          </div></div>
        <div style="width:980px;height:30px;margin-left:-60px;border-radius:0 0 30px 30px;background:linear-gradient(#cfd6d8,#9aa4a8)"></div></div>`;
    CAPS.push([3.8, 6.85, '', 'Cambia la letra', 'con un toque'], [6.85, 9.95, '', 'Cambia los colores', 'y todo combina solo'],
      [9.95, 12.9, '', 'Agrega lo que quieras', 'Fotos, música, cuenta regresiva, mapa…'], [12.9, END, '', 'Se ve igual <span class="hl">en todos lados</span>', 'Y ya activada, tienes 15 días para ajustes']);
    cue(.2, 'blip'); cue(1.35, 'blip'); cue(.55, 'whoosh', .5); cue(2.6, 'whoosh'); cue(2.75, 'boom'); cue(3.7, 'whoosh', .6);
    tapsToCues(FP); AT.slice(1).forEach((a) => cue(a, 'swipe', .5)); cue(11.4, 'whoosh', .5); cue(11.75, 'pop'); cue(12.95, 'whoosh', .6); cue(13.4, 'shimmer'); endCues(END);
  }
  function render(t) {
    vis($('chat'), t, 0, 2.75, 0, .25);
    vis($('mo'), t, .2, 9, .15, 0); $('mo').style.transform = `scale(${.8 + .2 * back(P(t, .2, .45))})`; $('mo').style.transformOrigin = '100% 100%';
    vis($('mi'), t, 1.35, 9, .15, 0); $('mi').style.transform = `scale(${.8 + .2 * back(P(t, 1.35, 1.6))})`; $('mi').style.transformOrigin = '0 100%';
    $('ty').style.opacity = t > .7 && t < 1.35 ? 1 : 0;
    vis($('hq'), t, .55, 2.75, .25, .25); $('hq').style.transform = `translateY(${(1 - eo(P(t, .55, .95))) * -60}px)`;
    vis($('h2'), t, 2.75, 3.9, .05, .3); $('h2').style.transform = `scale(${1.2 - .2 * eo(P(t, 2.75, 3.1))})`;
    // teléfono → se hace a un lado para la laptop
    const m = eio(P(t, 12.95, 13.5)); PH = { x: m * 250, y: m * 360, s: 1 - m * .42 };
    phone(t, 3.65, END + .4); capAt(t);
    IMGS.forEach((s, i) => { $(`v${i}`).style.opacity = i === 0 ? 1 : P(t, AT[i], AT[i] + .25); });
    const sc = eio(P(t, 11.3, 11.75)) * 871;
    const lift = eio(P(t, 4.8, 5.1)) * (1 - eio(P(t, 9.75, 10.05))) * 200;
    $('iw').style.transform = `translateY(${-sc - lift}px)`;
    $('selN').style.marginTop = `${-lift}px`;
    vis($('selN'), t, 4.3, 10.0, .1, .2); vis($('selC'), t, 11.7, 12.9, .1, .2); $('selC').style.transform = `scale(${1 + Math.sin(Math.max(0, t - 11.7) * 8) * .01})`;
    const sheet = (id, a, b, h) => { const e = $(id); e.style.display = t > a && t < b ? '' : 'none'; e.style.transform = `translateY(${(1 - eo(P(t, a, a + .3))) * (h + 120) + eio(P(t, b - .25, b)) * (h + 120)}px)`; };
    sheet('shF', 4.8, 6.85, 260); sheet('shC', 7.25, 9.95, 260); sheet('shA', 10.4, 11.45, 470);
    const fi = t > 6.15 ? 2 : t > 5.2 ? 1 : 0; FONTS.forEach((f, i) => { $(`fc${i}`).style.boxShadow = i === fi ? 'inset 0 0 0 3px #3fa58e' : 'none'; });
    const ci = t > 9.45 ? 1 : t > 8.7 ? 3 : t > 7.95 ? 2 : 0; SW.forEach((c, i) => { $(`sw${i}`).style.boxShadow = i === ci ? '0 0 0 4px #fff,0 0 0 8px #3fa58e' : '0 0 0 4px #fff,0 0 0 6px #e3e6e8'; });
    [1, 2, 0].forEach((ti, k) => { const on = [[4.75, 6.85], [7.2, 9.95], [10.35, 11.45]][k]; $(`tool${ti}`).style.color = t > on[0] && t < on[1] ? '#3fa58e' : '#5a6a6e'; });
    $('ad3').style.background = t > 11.15 ? '#d7f0e9' : '#f1f4f4';
    const lp = $('lap'); vis(lp, t, 12.95, END, .3, .2); lp.style.transform = `translateY(${(1 - eo(P(t, 12.95, 13.5))) * 120}px) scale(${.9 + .1 * eo(P(t, 12.95, 13.5))})`;
    $('phone').style.zIndex = 5; lp.style.zIndex = 4; $('side').style.zIndex = 4;
    finger(t, FP);
    endCard(t, END);
  }
  return { dur: DUR, build, render };
})();
