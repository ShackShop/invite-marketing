// Reel 2 · "Deja que tu invitación conteste por ti": confirmación → aviso → lista y mesas → acceso con QR
REELS['2'] = (() => {
  const END = 17.0, DUR = 20.0;
  const MSGS = [
    ['Tía Rosa', '¿Siempre sí es el sábado?', '#c2185b'], ['Primo Luis', '¿Cuántos podemos ir? 👀', '#1565c0'], ['Sra. Paty', '¿A qué hora empieza? 🙏', '#6a1b9a'],
    ['Compadre Beto', 'Pásame la ubicación', '#2e7d32'], ['Tía Rosa', '¿Y puedo llevar a mis nietos?', '#c2185b'], ['Andrea', 'Yo sí voy!! apúntame 💃', '#ef6c00'], ['Don Arturo', '¿Hay que llevar algo?', '#00838f'],
  ];
  const S0 = 4300; const y = (Y) => (Y - S0) * S;
  const FP = [
    [3.95, 4.55, 260, y(4449), 4.3], [5.05, 5.6, 260, y(4534), 5.4], [6.05, 6.55, 429, y(4594), 6.4], [6.55, 7.05, 260, y(4785), 6.85],
    [11.45, 12.05, 250, 323, 11.8], [12.1, 12.75, 279, 871, 12.5],
  ];
  const ROWS = [['Ana y Luis Torres', 2, 'Mesa 1'], ['Fam. Ramírez López', 4, 'Mesa 2'], ['Sofía Méndez', 1, 'Mesa 3'], ['Carlos y Paty', 2, 'Mesa 1'], ['Fam. Gómez', 3, 'Mesa 5'], ['Jimena Ruiz', 1, 'Mesa 3']];
  const pass = (k = 1) => `<div style="width:${380 * k}px;padding:${26 * k}px ${24 * k}px;border-radius:${26 * k}px;background:#fffdfb;box-shadow:0 30px 60px -24px rgba(80,40,50,.55);text-align:center;font-family:Raleway">
      <div style="font-size:${13 * k}px;letter-spacing:.3em;color:#b9767a;font-weight:700">PASE DE ACCESO</div>
      <div style="font-family:'Great Vibes';font-size:${50 * k}px;color:#b9767a;line-height:1.1;margin-top:${6 * k}px">${T('names', 'Valeria & Mateo')}</div>
      <div style="font-family:Lora;font-size:${24 * k}px;color:#4a4040;margin-top:${4 * k}px">Familia Pérez</div>
      <div style="font-size:${16 * k}px;color:#8c7f7c;margin:${4 * k}px 0 ${14 * k}px">2 lugares · Mesa 4</div>
      <div style="display:inline-block;padding:${12 * k}px;background:#fff;border-radius:${12 * k}px;box-shadow:0 0 0 2px #f0e2e0">${qrSvg(220 * k, '#4a4040')}</div>
      <div style="font-size:${14 * k}px;color:#8c7f7c;margin-top:${12 * k}px">Presenta este pase en la entrada</div></div>`;
  const row = (n, c, m, id = '') => `<div ${id} style="display:flex;align-items:center;gap:12px;background:#fff;border-radius:18px;padding:0 18px;height:76px;margin-bottom:10px"><span style="flex:1;font-size:22px;font-weight:600">${n}</span><span style="width:38px;height:38px;border-radius:50%;background:#34424a;color:#fff;font-weight:800;display:flex;align-items:center;justify-content:center;font-size:19px">${c}</span><span style="padding:6px 14px;border-radius:999px;background:#e3f4ef;color:#2f7f6c;font-size:17px;font-weight:800;min-width:96px;text-align:center">${m}</span></div>`;
  function build() {
    $('hook').innerHTML = `
      <div id="chat" class="chat">
        <div class="abs" style="left:0;right:0;top:0;height:230px;background:#f7f5f3;border-bottom:1px solid #e2dcd5;display:flex;align-items:flex-end;padding:0 40px 30px;gap:24px">
          ${ic('arrow-left', 44, '#34424a')}<div style="width:86px;height:86px;border-radius:50%;background:linear-gradient(135deg,#fbb4c0,#7ac9b8);display:flex;align-items:center;justify-content:center;font-size:44px">💍</div>
          <div style="flex:1"><div style="font-size:40px;font-weight:700">${T('chat_title', 'Boda Valeria & Mateo 💒')}</div><div style="font-size:28px;color:#3fa58e;font-weight:600">Tía Rosa está escribiendo…</div></div>
          <div id="badge" style="min-width:86px;height:64px;border-radius:32px;background:#25d366;color:#fff;font-size:34px;font-weight:800;display:flex;align-items:center;justify-content:center;padding:0 18px">12</div></div>
        <div id="msgs" class="abs" style="left:0;right:0;top:230px;bottom:0;overflow:hidden"></div>
      </div>
      <div id="hq" class="abs" style="left:50px;right:50px;top:300px;padding:44px 40px;border-radius:44px;background:rgba(255,255,255,.97);box-shadow:0 40px 80px -30px rgba(52,66,74,.55);text-align:center">
        <div class="H" style="font-size:92px">${T('hq', '¿Así se pone tu <span style="color:#25a35a">WhatsApp</span> antes del evento?')}</div></div>
      <div id="h2" class="abs H" style="left:60px;right:60px;top:690px;font-size:124px;text-align:center">${T('h2', 'Deja que tu invitación <span class="hl">conteste por ti.</span>')}</div>`;
    $('msgs').innerHTML = MSGS.map(([who, txt, col], i) => `<div class="msg in" id="m${i}" style="left:50px"><small style="color:${col}">${who}</small>${txt}</div>`).join('');
    const box = (id, Y) => `<div class="abs" style="left:${48 * S}px;top:${y(Y)}px;width:${304 * S}px;height:${48 * S}px;border-radius:${10 * S}px;background:rgb(247,241,242);font-family:Raleway;font-size:${16 * S}px;color:#3f3a36;display:flex;align-items:center;padding-left:${16 * S}px"><span id="t${id}"></span><span class="caret" id="c${id}" style="background:#b9767a;height:24px"></span></div>`;
    $('scr').innerHTML = `
      <div class="layer" id="guest" style="background:#efdfdb">
        <div class="abs" style="left:0;top:${-S0 * S}px;width:520px">${inv(IM('inv_es.jpg'))}</div>
        ${box('N', 4425)}${box('P', 4510)}
        <div id="cnt" class="abs" style="left:${258 * S}px;top:${y(4576)}px;width:${40 * S}px;height:${36 * S}px;background:#fff;font-family:Raleway;font-weight:700;font-size:${20 * S}px;color:#3f3a36;display:flex;align-items:center;justify-content:center">2</div>
        <div id="ok" class="abs" style="inset:0;background:rgba(239,223,219,.97);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px">
          <div style="font-family:'Great Vibes';font-size:54px;color:#b9767a;margin-top:40px">¡Gracias por confirmar!</div><div id="pass">${pass(.84)}</div></div>
      </div>
      <div class="layer" id="host" style="background:#f6f7f8">
        <div class="bar" style="flex-direction:column;align-items:flex-start;gap:0;height:126px;padding-top:56px"><span style="font-size:24px">Confirmaciones</span><span style="font-size:18px;color:#7a878b;font-weight:600">${T('names', 'Valeria & Mateo')} · ${T('date_short', '13 mar')}</span></div>
        <div class="abs" style="left:20px;right:20px;top:142px;display:flex;gap:10px">
          ${[['cA', 85, 'Confirmados'], ['cB', 211, 'Lugares'], ['cC', 7, 'No asistirán']].map(([id, n, l], i) => `<div style="flex:1;background:#fff;border-radius:20px;padding:16px 0;text-align:center;box-shadow:0 10px 24px -18px rgba(52,66,74,.6)"><div id="${id}" class="H" style="font-size:44px;color:${i === 2 ? '#e98a9e' : '#34424a'}">${n}</div><div style="font-size:16px;color:#7a878b;font-weight:700">${l}</div></div>`).join('')}</div>
        <div class="abs" style="left:20px;right:20px;top:282px">
          <div id="newrow" style="overflow:hidden"><div id="nr" style="display:flex;align-items:center;gap:12px;background:#fff;border-radius:18px;padding:0 18px;height:76px;margin:3px 3px 10px;box-shadow:0 0 0 3px #7ac9b8"><span style="flex:1;font-size:22px;font-weight:700">Familia Pérez</span><span style="width:38px;height:38px;border-radius:50%;background:#34424a;color:#fff;font-weight:800;display:flex;align-items:center;justify-content:center;font-size:19px">2</span><span id="nrm" style="padding:6px 14px;border-radius:999px;font-size:17px;font-weight:800;min-width:96px;text-align:center">Sin mesa</span></div></div>
          ${ROWS.map(([n, c, m]) => row(n, c, m)).join('')}</div>
        <div class="abs" style="left:0;right:0;bottom:0;height:200px;background:#fff;border-top:1px solid #eceaf0;padding:18px 20px">
          <div style="display:flex;justify-content:space-between;align-items:center"><span class="lbl">Mesas</span><span style="font-size:18px;font-weight:700;color:#3fa58e">Descargar Excel</span></div>
          <div style="display:flex;gap:14px;margin-top:16px">${[1, 2, 3, 4, 5].map((n) => `<div id="t${n}" style="width:80px;height:80px;border-radius:50%;border:3px solid #dfe4e6;display:flex;flex-direction:column;align-items:center;justify-content:center"><b class="H" style="font-size:30px">${n}</b><span id="to${n}" style="font-size:14px;color:#7a878b;font-weight:700">${[8, 10, 6, 6, 9][n - 1]}/10</span></div>`).join('')}</div></div>
        <div id="shM" class="sheet" style="height:300px"><div class="grab"></div><div style="padding:0 26px" class="lbl">Asignar mesa · Familia Pérez</div>
          <div style="display:flex;gap:12px;padding:24px 26px;flex-wrap:wrap">${[1, 2, 3, 4, 5, 6].map((n) => `<div id="mc${n}" style="width:62px;height:62px;border-radius:16px;background:#f1f4f4;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:800">${n}</div>`).join('')}</div></div>
        <div id="noti" class="abs" style="left:14px;right:14px;top:60px;z-index:70;background:rgba(255,255,255,.98);border-radius:28px;padding:18px 20px;box-shadow:0 24px 50px -16px rgba(0,0,0,.45);display:flex;gap:16px">
          <div style="width:58px;height:58px;border-radius:16px;background:#25d366;display:flex;align-items:center;justify-content:center;flex:none">${ic('message-circle', 34, '#fff', 2.4)}</div>
          <div style="font-size:19px;line-height:1.3;flex:1"><div style="display:flex;justify-content:space-between;color:#7a878b;font-weight:700"><span>WhatsApp · In-Vite</span><span>ahora</span></div><b style="font-size:20px">Buenas noticias</b><br>Familia Pérez ha confirmado su asistencia. 🎉 para 2 personas.</div></div>
      </div>
      <div class="layer" id="scan" style="background:#111">
        <img src="img/candles.jpg" class="abs" style="left:0;top:0;width:100%;height:100%;object-fit:cover;filter:blur(14px) brightness(.55)">
        <div class="abs" style="left:0;right:0;top:70px;text-align:center;color:#fff;font-size:24px;font-weight:700">Escáner de accesos</div>
        <div id="pcard" class="abs" style="left:70px;top:180px">${pass(1)}</div>
        <div class="abs" style="left:80px;top:395px;width:360px;height:360px">${['left:0;top:0;border-left:8px solid;border-top:8px solid', 'right:0;top:0;border-right:8px solid;border-top:8px solid', 'left:0;bottom:0;border-left:8px solid;border-bottom:8px solid', 'right:0;bottom:0;border-right:8px solid;border-bottom:8px solid'].map((s) => `<div class="abs" style="${s};width:70px;height:70px;border-color:#7ac9b8;border-radius:10px"></div>`).join('')}
          <div id="sline" class="abs" style="left:14px;right:14px;height:5px;border-radius:3px;background:#7ac9b8;box-shadow:0 0 22px #7ac9b8"></div></div>
        <div id="welcome" class="sheet" style="height:420px;text-align:center;padding-top:34px">
          <div style="width:110px;height:110px;margin:0 auto;border-radius:50%;background:#3fa58e;display:flex;align-items:center;justify-content:center">${ic('check', 66, '#fff', 3.4)}</div>
          <div class="H" style="font-size:48px;margin-top:20px">¡Bienvenidos!</div>
          <div style="font-size:30px;font-weight:700;margin-top:8px">Familia Pérez</div>
          <div style="font-size:24px;color:#5a6a6e;margin-top:6px">2 lugares · Mesa 4</div></div>
      </div>`;
    CAPS.push([3.8, 8.3, 'Tus invitados', 'Confirman <span class="hl">en un toque</span>', 'y reciben su pase con código QR'], [8.3, 11.35, 'Tú', 'Te avisa por <span style="color:#25a35a">WhatsApp</span>', 'cada vez que alguien confirma'],
      [11.35, 14.15, '', 'Lista y mesas <span class="hl">en un solo lugar</span>', 'Descárgala en Excel cuando quieras'], [14.15, 17.0, 'El día del evento', 'Escaneas su pase <span class="hl">en la entrada</span>']);
    MSGS.forEach((m, i) => cue(.15 + i * .3, 'blip', .8)); cue(2.55, 'whoosh'); cue(2.7, 'boom'); cue(3.7, 'whoosh', .6);
    tapsToCues(FP); for (let t = 4.5; t < 5.3; t += .07) cue(t, 'tick', .6); for (let t = 5.6; t < 6.2; t += .07) cue(t, 'tick', .6);
    cue(7.05, 'shimmer'); cue(7.15, 'swipe'); cue(8.35, 'whoosh', .5); cue(8.95, 'notif'); cue(9.45, 'pop'); cue(12.55, 'pop'); cue(14.2, 'whoosh', .5); cue(15.6, 'ding'); endCues(END);
  }
  function render(t) {
    vis($('chat'), t, 0, 2.75, 0, .25);
    const shown = Math.floor(Math.max(0, (t - .15) / .3)) + 1;
    MSGS.forEach((m, i) => { const e = $(`m${i}`); const d = .15 + i * .3; e.style.display = t < d ? 'none' : ''; e.style.top = `${1450 - (Math.min(shown, MSGS.length) - 1 - i) * 178}px`; e.style.transformOrigin = '0 100%'; e.style.transform = `scale(${.8 + .2 * back(P(t, d, d + .25))})`; });
    $('badge').textContent = String(12 + Math.floor(C(t / 2.2) * 35));
    vis($('hq'), t, .9, 2.75, .25, .25); $('hq').style.transform = `translateY(${(1 - eo(P(t, .9, 1.3))) * -60}px)`;
    vis($('h2'), t, 2.75, 3.9, .05, .3); $('h2').style.transform = `scale(${1.2 - .2 * eo(P(t, 2.75, 3.1))})`;
    phone(t, 3.65, END + .4); capAt(t);
    vis($('guest'), t, 0, 8.6, 0, .3);
    $('tN').textContent = typed('Familia Pérez', P(t, 4.5, 5.3)); $('cN').style.opacity = t > 4.35 && t < 5.4 && Math.floor(t * 3) % 2 ? 1 : 0;
    $('tP').textContent = typed('33 1234 5678', P(t, 5.6, 6.2)); $('cP').style.opacity = t > 5.45 && t < 6.4 && Math.floor(t * 3) % 2 ? 1 : 0;
    $('cnt').style.opacity = t > 6.45 ? 1 : 0;
    vis($('ok'), t, 7.05, 99, .25, 0); $('pass').style.transform = `translateY(${(1 - eo(P(t, 7.15, 7.6))) * 500}px) rotate(${(1 - eo(P(t, 7.15, 7.7))) * 8}deg)`;
    vis($('host'), t, 8.35, 14.45, .3, .25);
    const n = $('noti'); n.style.display = t > 8.9 && t < 11.2 ? '' : 'none'; n.style.transform = `translateY(${(1 - back(P(t, 8.9, 9.3))) * -200 - eio(P(t, 10.8, 11.2)) * 230}px)`;
    const bump = t > 9.45 ? 1 : 0;
    $('cA').textContent = 85 + bump; $('cB').textContent = 211 + bump * 2;
    $('newrow').style.height = `${eo(P(t, 9.45, 9.8)) * 89}px`;
    const m4 = t > 12.55;
    $('nrm').textContent = m4 ? 'Mesa 4' : 'Sin mesa'; $('nrm').style.background = m4 ? '#e3f4ef' : '#fdecc8'; $('nrm').style.color = m4 ? '#2f7f6c' : '#8a6417';
    $('nr').style.boxShadow = t > 13.7 ? 'none' : '0 0 0 3px #7ac9b8';
    const sm = $('shM'); sm.style.display = t > 11.95 && t < 13.15 ? '' : 'none'; sm.style.transform = `translateY(${(1 - eo(P(t, 11.95, 12.25))) * 300 + eio(P(t, 12.85, 13.15)) * 300}px)`;
    $('mc4').style.background = t > 12.5 ? '#3fa58e' : '#f1f4f4'; $('mc4').style.color = t > 12.5 ? '#fff' : '#34424a';
    $('t4').style.borderColor = t > 12.9 ? '#3fa58e' : '#dfe4e6'; $('to4').textContent = t > 12.9 ? '8/10' : '6/10';
    vis($('scan'), t, 14.3, 99, .3, 0);
    $('pcard').style.transform = `translate(${Math.sin(t * 2.2) * 8}px, ${(1 - eo(P(t, 14.4, 15.0))) * 800 + Math.cos(t * 1.7) * 6}px) rotate(${-4 + Math.sin(t * 1.3) * 2}deg) scale(.9)`;
    $('sline').style.top = `${18 + (Math.sin(t * 4) * .5 + .5) * 320}px`; $('sline').style.opacity = t < 15.6 ? 1 : 0;
    const w = $('welcome'); w.style.display = t > 15.6 ? '' : 'none'; w.style.transform = `translateY(${(1 - back(P(t, 15.6, 16.0))) * 420}px)`;
    finger(t, FP);
    endCard(t, END);
  }
  return { dur: DUR, build, render };
})();
