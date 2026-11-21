/* Stickmo pack 9: "Vytvor si" – own figure, emoji, photo/logo and free drawing (from GIF a Emoji Dielňa).
   Opens in a full-screen sheet; saving/sending is a Pro feature (gated inside dielna.html via STICKMO_PRO). */
(() => {
const BASE = ((document.currentScript && document.currentScript.src) || '').replace(/[^/]*$/, '');
const LBL = { sk:'＋ Vytvor si', cs:'＋ Vytvoř si', en:'＋ Create', de:'＋ Erstellen', es:'＋ Crear', pl:'＋ Stwórz' };
const CLOSE = { sk:'Zavrieť', cs:'Zavřít', en:'Close', de:'Schließen', es:'Cerrar', pl:'Zamknij' };
window.STICKMO_PRO = () => { try{ return !!pro; }catch(e){ return false; } };
window.STICKMO_UNLOCK = () => { try{ openPro(); }catch(e){} };

const btn = document.createElement('button');
btn.className = 'probtn'; btn.id = 'createBtn'; btn.style.background = 'var(--accent)';
const langSel = document.getElementById('lang');
langSel.parentNode.insertBefore(btn, langSel);

const sheet = document.createElement('div');
sheet.hidden = true;
sheet.style.cssText = 'position:fixed;inset:0;z-index:15;background:var(--bg);display:flex;flex-direction:column';
sheet.innerHTML = '<div style="display:flex;align-items:center;gap:10px;padding:calc(8px + env(safe-area-inset-top,0px)) 12px 8px;border-bottom:1px solid var(--line)">' +
  '<b style="font-size:17px">Stickmo</b><span style="flex:1"></span><button id="createClose" class="probtn" style="background:var(--ink)"></button></div>' +
  '<iframe id="createFrame" title="Vytvor si" allow="web-share; clipboard-write" style="flex:1;border:0;width:100%;background:#fff"></iframe>';
document.body.appendChild(sheet);
const frame = sheet.querySelector('#createFrame');
let loaded = false;

function labels(){ const l = (typeof lang !== 'undefined' && LBL[lang]) ? lang : 'sk'; btn.textContent = LBL[l]; sheet.querySelector('#createClose').textContent = '✕ ' + CLOSE[l]; }
async function open(){
  sheet.hidden = false; document.body.style.overflow = 'hidden';
  if(!loaded){ loaded = true;
    try{ const r = await fetch(BASE + 'dielna.html'); frame.srcdoc = await r.text(); }
    catch(e){ loaded = false; frame.srcdoc = '<p style="font:16px sans-serif;padding:20px">Nepodarilo sa načítať. Skús znova.</p>'; } }
  if(!(history.state && history.state.sheet === 'create')) history.pushState({ sheet:'create' }, '');
}
function hide(){ sheet.hidden = true; document.body.style.overflow = ''; }
function close(){ if(history.state && history.state.sheet === 'create') history.back(); else hide(); }
btn.onclick = open;
sheet.querySelector('#createClose').onclick = close;
addEventListener('popstate', () => { if(!(history.state && history.state.sheet === 'create')) hide(); });
langSel.addEventListener('change', labels);
labels();
})();
