/* =========================
   Rotación de fondos (5 s)
   ========================= */
const themes = ["theme-1","theme-2","theme-3","theme-4","theme-5"];
let themeIdx = 0;
function setNextTheme(){
  // preserva otras clases del body y solo cambia el tema
  const body = document.body;
  body.classList.remove(...themes);
  themeIdx = (themeIdx + 1) % themes.length;
  body.classList.add(themes[themeIdx]);
}
setInterval(setNextTheme, 5000);

/* =========================
   Overlay + revelado cards
   ========================= */
const overlay   = document.getElementById('overlay');
const startBtn  = document.getElementById('startBtn');

function revealCards(){
  document.querySelectorAll('.revealable').forEach(card=>{
    const delay = Number(card.dataset.delay || 0);
    setTimeout(()=> card.classList.add('show'), delay);
  });
}

startBtn.addEventListener('click', () => {
  overlay.classList.add('hide');
  overlay.addEventListener('animationend', () => overlay.remove(), { once:true });
  revealCards();
  // si quieres que cargue una foto al iniciar:
  loadImage();
});

/* ==================================
   Imagen aleatoria (Picsum + skeleton)
   ================================== */
const img          = document.getElementById('randomImg');
const skeleton     = document.getElementById('skeleton');
const btnNew       = document.getElementById('btnNew');
const btnDownload  = document.getElementById('btnDownload');
const meta         = document.getElementById('meta');

function newSeed(){
  return `${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
}

function updateMeta(url){
  const t = new Date();
  meta.textContent = `Fuente: picsum.photos · ${t.toLocaleTimeString()} (${t.toLocaleDateString()})`;
  btnDownload.dataset.url = url;
}

function loadImage(){
  if(!img || !skeleton) return;
  const url = `https://picsum.photos/seed/${newSeed()}/600/600`;
  skeleton.style.display = 'block';

  const pre = new Image();
  pre.onload = () => {
    img.src = url;
    // transición suave ya con imagen pintada
    requestAnimationFrame(() => {
      skeleton.style.display = 'none';
      updateMeta(url);
    });
  };
  pre.onerror = () => {
    skeleton.style.display = 'none';
    meta.textContent = 'Ups, no se pudo cargar. Intenta de nuevo.';
  };
  pre.src = url;
}

btnNew.addEventListener('click', loadImage);

btnDownload.addEventListener('click', () => {
  const url = btnDownload.dataset.url || img.src;
  if(!url) return;
  const a = document.createElement('a');
  a.href = url;
  a.download = 'picsum-600x600.jpg';
  document.body.appendChild(a);
  a.click();
  a.remove();
});
