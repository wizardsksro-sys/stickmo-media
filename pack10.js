/* Stickmo pack 10: Zvieratká – funny animals (22 line-art GIFs; an item may carry its own frame count). Same vector engine as pack 8. */
(() => {
const BASE = ((document.currentScript && document.currentScript.src) || '').replace(/[^/]*$/, '');
const FILES = [BASE + 'pack10.bin'];
const N = 24, DUR = 1.68, DEF = '#192d8c';
const ITEMS = [["pes_bicykel", "animals", "Pes na bicykli", "Pes na kole", "Dog on a bike", "Hund auf dem Rad", "Perro en bici", "Pies na rowerze"], ["macka_vysavac", "animals", "Vozím sa", "Vezu se", "Just cruising", "Ich fahr mit", "De paseo", "Jadę sobie"], ["macka_pohar", "animals", "Ups!", "Jejda!", "Oops!", "Hoppla!", "¡Uy!", "Ups!"], ["pes_vrti", "animals", "Teším sa!", "Těším se!", "So happy!", "Ich freu mich!", "¡Qué ilusión!", "Cieszę się!"], ["kacky", "animals", "Ideme!", "Jdeme!", "Let's go!", "Los geht's!", "¡Vamos!", "Idziemy!"], ["prasiatko_blato", "animals", "Pohoda", "Pohoda", "Chilling", "Entspannt", "Qué gusto", "Luzik"], ["tucniak", "animals", "Juchú!", "Juchů!", "Wheee!", "Juhu!", "¡Yuju!", "Hura!"], ["macka_krabica", "animals", "Kuk!", "Kuk!", "Peekaboo!", "Kuckuck!", "¡Cucú!", "A kuku!"], ["kon", "animals", "Cválam!", "Cválám!", "Giddy up!", "Galopp!", "¡Al galope!", "Galopuję!"], ["korytnacka", "animals", "Pomaly, ale isto", "Pomalu, ale jistě", "Slow and steady", "Langsam, aber sicher", "Despacito", "Powoli, ale do celu"], ["bocian", "animals", "Bábätko je tu!", "Miminko je tu!", "Baby on the way!", "Das Baby ist da!", "¡Llegó el bebé!", "Bobas w drodze!"], ["zaba", "animals", "Mňam!", "Mňam!", "Yum!", "Lecker!", "¡Ñam!", "Mniam!"], ["zajac", "animals", "Hop, hop!", "Hop, hop!", "Hop, hop!", "Hopp, hopp!", "¡Salto, salto!", "Hop, hop!"], ["sova", "animals", "Nočná sova", "Noční sova", "Night owl", "Nachteule", "Búho nocturno", "Nocny marek"], ["krava", "animals", "Múú", "Bůů", "Moo", "Muh", "Muu", "Muu"], ["slon", "animals", "Osvieženie!", "Osvěžení!", "Splash!", "Erfrischung!", "¡Qué fresquito!", "Orzeźwienie!"], ["jezko", "animals", "Pichľavý deň", "Pichlavý den", "Feeling prickly", "Stacheliger Tag", "Día espinoso", "Kolczasty dzień"], ["opica", "animals", "Opičím sa", "Opičím se", "Monkeying around", "Affentheater", "Haciendo el mono", "Małpuję"], ["papagaj", "animals", "Tancujem!", "Tančím!", "Dance time!", "Ich tanze!", "¡A bailar!", "Tańczę!"], ["chobotnica", "animals", "Ahojte!", "Ahojte!", "Hey everyone!", "Hallo zusammen!", "¡Hola a todos!", "Cześć wszystkim!"], ["pes_brzdi", "animals", "Tesne!", "Těsně!", "That was close!", "Knapp!", "¡Por poco!", "Było blisko!"], ["macka_mys", "animals", "Chyť ma, ak vieš!", "Chyť mě, jestli to umíš!", "Catch me if you can!", "Fang mich doch!", "¡Atrápame si puedes!", "Złap mnie, jeśli umiesz!", 60], ["pas_pes", "animals", "Pomalšie!", "Pomaleji!", "Slow down!", "Langsamer!", "¡Más despacio!", "Wolniej!", 48]];
const DATA = {};
async function load(f){
  try{
    const r = await fetch(f); const ds = new DecompressionStream('deflate-raw');
    const txt = await new Response(r.body.pipeThrough(ds)).text();
    const j = JSON.parse(txt); for(const k in j) DATA[k] = expand(j[k]);
  }catch(e){ console.warn('pack10', f, e); }
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
window.PACK10 = items;
const CAT_NAMES = { sk:'Zvieratká', cs:'Zvířátka', en:'Animals', de:'Tiere', es:'Animales', pl:'Zwierzaki' };
for(const l in CAT_NAMES) if(UI[l]) UI[l].animals = CAT_NAMES[l];
if(!CATS.includes('animals')){ const i = CATS.indexOf('hobby'); CATS.splice(i < 0 ? CATS.length : i, 0, 'animals'); }
FILES.forEach(load);
})();
