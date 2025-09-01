document.addEventListener('DOMContentLoaded', () => {
  /* Rotación de fondos */
  const themes = ['theme-1','theme-2','theme-3','theme-4','theme-5'];
  let idx = 0;
  setInterval(() => {
    document.body.classList.remove(...themes);
    idx = (idx + 1) % themes.length;
    document.body.classList.add(themes[idx]);
  }, 5000);

  /* Overlay */
  const overlay = document.getElementById('overlay');
  const startBtn = document.getElementById('startBtn');
  startBtn.addEventListener('click', () => {
    overlay.classList.add('hide');
    document.querySelectorAll('.revealable').forEach(card => {
      const delay = +card.dataset.delay || 0;
      setTimeout(() => card.classList.add('show'), delay);
    });
    loadImage();
  });

  /* Imagen aleatoria */
  const img = document.getElementById('randomImg');
  const skeleton = document.getElementById('skeleton');
  const btnNew = document.getElementById('btnNew');
  const btnDownload = document.getElementById('btnDownload');
  const meta = document.getElementById('meta');

  function newSeed(){ return Date.now() + '-' + Math.random().toString(36).slice(2,7); }

  function loadImage(){
    const url = `https://picsum.photos/seed/${newSeed()}/600/600`;
    skeleton.style.display = 'block';
    const pre = new Image();
    pre.onload = () => {
      img.src = url;
      skeleton.style.display = 'none';
      meta.textContent = `Fuente: picsum.photos · ${new Date().toLocaleTimeString()}`;
      btnDownload.dataset.url = url;
    };
    pre.src = url;
  }

  btnNew.addEventListener('click', loadImage);
  btnDownload.addEventListener('click', () => {
    const url = btnDownload.dataset.url || img.src;
    if(!url) return;
    const a = document.createElement('a');
    a.href = url; a.download = 'imagen-picsum.jpg';
    document.body.appendChild(a);
    a.click(); a.remove();
  });
});
