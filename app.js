// Rotación de fondos cada 5s
const themes = ["theme-1","theme-2","theme-3","theme-4","theme-5"];
let idx=0;
setInterval(()=>{
  idx=(idx+1)%themes.length;
  document.body.className=themes[idx];
},5000);

// Overlay y revelado progresivo
const overlay=document.getElementById('overlay');
const startBtn=document.getElementById('startBtn');

function revealCards(){
  document.querySelectorAll('.revealable').forEach(card=>{
    const delay=+card.dataset.delay||0;
    setTimeout(()=>card.classList.add('show'),delay);
  });
}

startBtn.addEventListener('click',()=>{
  overlay.classList.add('hide');
  overlay.addEventListener('animationend',()=>overlay.remove(),{once:true});
  revealCards();
});

// Imagen aleatoria con skeleton
const img=document.getElementById('randomImg');
const skeleton=document.getElementById('skeleton');
const btnNew=document.getElementById('btnNew');
const btnDownload=document.getElementById('btnDownload');
const meta=document.getElementById('meta');

function newSeed(){ return Date.now()+"-"+Math.random().toString(36).slice(2,7); }

function updateMeta(url){
  const t=new Date();
  meta.textContent=`Fuente: picsum.photos · ${t.toLocaleTimeString()} (${t.toLocaleDateString()})`;
  btnDownload.dataset.url=url;
}

function loadImage(){
  const url=`https://picsum.photos/seed/${newSeed()}/600/600`;
  skeleton.style.display='block'; img.classList.remove('loaded');
  const pre=new Image();
  pre.onload=()=>{
    img.src=url;
    requestAnimationFrame(()=>{
      skeleton.style.display='none'; img.classList.add('loaded'); updateMeta(url);
    });
  };
  pre.onerror=()=>{ skeleton.style.display='none'; meta.textContent='Error al cargar la imagen.'; };
  pre.src=url;
}

btnNew.addEventListener('click',loadImage);
btnDownload.addEventListener('click',()=>{
  const url=btnDownload.dataset.url||img.src; if(!url) return;
  const a=document.createElement('a'); a.href=url; a.download='picsum.jpg'; document.body.appendChild(a); a.click(); a.remove();
});
