/* Stickmo pack 11: Vtipné situácie (22 line-art GIFs). Same vector engine as pack 8. */
(() => {
const BASE = ((document.currentScript && document.currentScript.src) || '').replace(/[^/]*$/, '');
const FILES = [BASE + 'pack11.bin'];
const N = 24, DUR = 1.68, DEF = '#192d8c';
const ITEMS = [["zaspal", "funny", "Zaspal som!", "Zaspal jsem!", "Overslept!", "Verschlafen!", "¡Me dormí!", "Zaspałem!"], ["kluce", "funny", "Kde mám kľúče?", "Kde mám klíče?", "Where are my keys?", "Wo sind meine Schlüssel?", "¿Y mis llaves?", "Gdzie są klucze?"], ["vybity_mobil", "funny", "Vybitý mobil", "Vybitý mobil", "Phone died", "Akku leer", "Sin batería", "Padł mi telefon"], ["pondelok", "funny", "Pondelok…", "Pondělí…", "Monday…", "Montag…", "Lunes…", "Poniedziałek…"], ["lego", "funny", "Au!", "Au!", "Ouch!", "Aua!", "¡Ay!", "Auć!"], ["kychnutie", "funny", "Hapčí!", "Hepčí!", "Achoo!", "Hatschi!", "¡Achís!", "Apsik!"], ["wifi", "funny", "Nejde wifi!", "Nejde wifi!", "No Wi-Fi!", "Kein WLAN!", "¡No hay wifi!", "Nie ma Wi-Fi!"], ["autobus", "funny", "Počkaj!", "Počkej!", "Wait for me!", "Warte!", "¡Espera!", "Zaczekaj!"], ["selfie", "funny", "Pokazené selfie", "Zkažené selfie", "Selfie fail", "Selfie-Fail", "Selfie fallido", "Nieudane selfie"], ["dieta", "funny", "Diéta od zajtra", "Dieta od zítra", "Diet starts tomorrow", "Diät ab morgen", "La dieta, mañana", "Dieta od jutra"], ["okuliare", "funny", "Kde mám okuliare?", "Kde mám brýle?", "Where are my glasses?", "Wo ist meine Brille?", "¿Y mis gafas?", "Gdzie okulary?"], ["chlieb", "funny", "Typické!", "Typické!", "Typical!", "Typisch!", "¡Típico!", "Typowe!"], ["chladnicka", "funny", "Prázdno…", "Prázdno…", "Nothing to eat", "Gähnende Leere", "Nevera vacía", "Pusto…"], ["papier", "funny", "Pomóc!", "Pomoc!", "Help!", "Hilfe!", "¡Socorro!", "Pomocy!"], ["oci", "funny", "No jasné…", "No jasně…", "Yeah, right…", "Na klar…", "Sí, claro…", "No jasne…"], ["pise", "funny", "Píše…", "Píše…", "Typing…", "Schreibt…", "Escribiendo…", "Pisze…"], ["mikrofon", "funny", "A je to!", "A je to!", "Mic drop!", "Und tschüss!", "¡Y punto!", "I tyle!"], ["nechcem", "funny", "Nechcem vstávať", "Nechci vstávat", "Five more minutes", "Noch fünf Minuten", "Cinco minutos más", "Jeszcze 5 minut"], ["karaoke", "funny", "Karaoke!", "Karaoke!", "Karaoke!", "Karaoke!", "¡Karaoke!", "Karaoke!"], ["gril", "funny", "Grilovačka!", "Grilovačka!", "BBQ time!", "Grillparty!", "¡Barbacoa!", "Grill!"], ["gauc", "funny", "Lenivá nedeľa", "Líná neděle", "Lazy Sunday", "Fauler Sonntag", "Domingo de sofá", "Leniwa niedziela"], ["tanec", "funny", "Strýko tancuje", "Strejda tančí", "Dance floor king", "Tanzkönig", "Rey de la pista", "Król parkietu"], ["pas_babka", "funny", "Pomalšie!", "Pomaleji!", "Slow down!", "Langsamer!", "¡Más despacio!", "Wolniej!", 48], ["strbavy_smiech", "funny", "Chi-chi-chi!", "Chi-chi-chi!", "Hee-hee-hee!", "Hihihi!", "¡Jijiji!", "Hi-hi-hi!"]];
const DATA = {};
async function load(f){
  try{
    const r = await fetch(f); const ds = new DecompressionStream('deflate-raw');
    const txt = await new Response(r.body.pipeThrough(ds)).text();
    const j = JSON.parse(txt); for(const k in j) DATA[k] = expand(j[k]);
  }catch(e){ console.warn('pack11', f, e); }
}
function undl(t, c){ if(t !== 'l' || c.length <= 2) return c; const o = c.slice(); for(let i = 2; i < o.length; i++) o[i] += o[i - 2]; return o; }
function full(e){ return [e[0], undl(e[0], e[1]), ...e.slice(2)]; }
function expand(g){
  const s = (g.s || []).map(full), frames = []; let prev = null;
  for(const f of g.f){
    const cur = f.map((e, j) => {
      if(e === 0) return prev[j];
      if(typeof e[0] === 'number'){ const p = prev[j]; return [p[0], p[1].map((v, i) => v + e[i]), ...p.slice(2)]; }
      return full(e);
    });
    frames.push(cur); prev = cur;
  }
  return { s, f: frames };
}
const DEG = Math.PI/180;
function draw(c, ops, ink, bg){
  for(const op of ops){
    const t = op[0], a = op[1], w = op[2];
    c.lineWidth = Math.max(w, .6); c.strokeStyle = ink; c.lineCap = 'round'; c.lineJoin = 'round';
    if(t === 'l'){ c.beginPath(); c.moveTo(a[0], a[1]); for(let i = 2; i < a.length; i += 2) c.lineTo(a[i], a[i + 1]); if(a.length === 2) c.lineTo(a[0] + .01, a[1]); c.stroke(); }
    else if(t === 'e' || t === 'a' || t === 'c'){
      const cx = (a[0] + a[2])/2, cy = (a[1] + a[3])/2, rx = Math.max(.1, Math.abs(a[2] - a[0])/2), ry = Math.max(.1, Math.abs(a[3] - a[1])/2);
      c.beginPath();
      if(t === 'e'){ c.ellipse(cx, cy, rx, ry, 0, 0, Math.PI*2); const f = op[3];
        if(f === 1){ c.fillStyle = ink; c.fill(); } else if(f === 2) fillBg(c, bg); if(f !== 2) c.stroke(); }
      else { c.ellipse(cx, cy, rx, ry, 0, op[3]*DEG, op[4]*DEG); if(t === 'c'){ c.closePath(); const f = op[5]; if(f === 1){ c.fillStyle = ink; c.fill(); } else if(f === 2) fillBg(c, bg); } c.stroke(); }
    }
    else if(t === 'p'){ c.beginPath(); c.moveTo(a[0], a[1]); for(let i = 2; i < a.length; i += 2) c.lineTo(a[i], a[i + 1]); c.closePath(); const f = op[3]; if(f === 1){ c.fillStyle = ink; c.fill(); } else if(f === 2) fillBg(c, bg); }
    else if(t === 'r'){ const f = op[3]; c.beginPath(); c.rect(a[0], a[1], a[2] - a[0], a[3] - a[1]);
      if(f === 1){ c.fillStyle = ink; c.fill(); } else if(f === 2) fillBg(c, bg); else c.stroke(); }
    else if(t === 't'){ const sz = op[3], sw = op[4] || 0; c.font = `900 ${sz}px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle';
      if(sw){ c.lineWidth = sw*2; c.strokeStyle = ink; c.strokeText(op[2], a[0], a[1]); }
      c.fillStyle = bg === 'none' ? '#fff' : bg; c.fillText(op[2], a[0], a[1]); }
  }
}
function fillBg(c, bg){ if(bg === 'none'){ c.save(); c.globalCompositeOperation = 'destination-out'; c.fillStyle = '#000'; c.fill(); c.restore(); } else { c.fillStyle = bg; c.fill(); } }
function scene(id){
  return (c, W, H, t, o) => {
    const bg = o.bg || '#ffffff';
    if(bg !== 'none'){ c.fillStyle = bg; c.fillRect(0, 0, W, H); }
    let ink = o.color && o.color !== 'outline' ? o.color : (o.color === 'outline' ? INK : DEF);
    if(bg === '#1b1e25' && (ink === INK || ink === DEF || ink === '#1b1e25')) ink = '#ffffff';
    const hasText = !!(o.text && o.text.trim());
    const sc = hasText ? Math.min(W, H*.76)/320 : Math.min(W, H)/320;
    const ox = (W - 320*sc)/2, oy = hasText ? 0 : (H - 320*sc)/2;
    const g = DATA[id];
    if(g){ const fi = Math.floor((t/DUR)*N) % g.f.length; c.save(); c.translate(ox, oy); c.scale(sc, sc);
      draw(c, g.s, ink, bg); draw(c, g.f[fi], ink, bg); c.restore(); }
    drawLabel(c, W, H, o.text, t/DUR);
  };
}
const items = ITEMS.map(r => ({ id: 'sm_' + r[0], cat: r[1], dur: DUR*((r[8] || N)/N), scene: scene(r[0]), figs: [{ color: DEF }], fx: [], texts: r.slice(2, 8), gen: false }));
items.forEach(R => { TXT[R.id] = R.texts; REACTS.push(R); });
window.PACK11 = items;
const CAT_NAMES = { sk:'Vtipné', cs:'Vtipné', en:'Funny', de:'Lustig', es:'Divertido', pl:'Śmieszne' };
for(const l in CAT_NAMES) if(UI[l]) UI[l].funny = CAT_NAMES[l];
if(!CATS.includes('funny')){ const i = CATS.indexOf('animals'); CATS.splice(i < 0 ? CATS.length : i + 1, 0, 'funny'); }
FILES.forEach(load);
})();
