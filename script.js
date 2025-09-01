document.addEventListener('DOMContentLoaded', () => {
  const img = document.getElementById('randomImg');
  const skeleton = document.getElementById('skeleton');
  const btn = document.getElementById('btnNew');
  const btnDownload = document.getElementById('btnDownload');
  const meta = document.getElementById('meta');

  function newSeed(){
    return `${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
  }
  function updateMeta(url){
    const t = new Date();
    meta.textContent = `Fuente: picsum.photos · ${t.toLocaleTimeString()} (${t.toLocaleDateString()})`;
    btnDownload.dataset.url = url;
  }
  function loadImage(){
    const url = `https://picsum.photos/seed/${newSeed()}/600/600`;
    skeleton.style.display = 'block';
    img.classList.remove('loaded');

    const pre = new Image();
    pre.onload = () => {
      img.src = url;
      requestAnimationFrame(() => {
        img.classList.add('loaded');
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

  btn.addEventListener('click', loadImage);
  btnDownload.addEventListener('click', () => {
    const url = btnDownload.dataset.url || img.src;
    if(!url) return;
    const a = document.createElement('a');
    a.href = url; a.download = 'imagen-picsum.jpg';
    document.body.appendChild(a);
    a.click(); a.remove();
  });

  // Carga inicial
  loadImage();
});
