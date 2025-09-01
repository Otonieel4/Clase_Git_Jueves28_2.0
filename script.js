// Lógica del botón + animaciones
(function(){
  const startBtn = document.getElementById('startBtn');
  const gallery  = document.getElementById('gallery');
  const body     = document.body;

  let shown = false;  // ¿ya mostramos la galería?
  let theme = 1;      // theme-1..4

  startBtn.addEventListener('click', () => {
    if (!shown) {
      // 1) Mostrar la galería con animación
      gallery.classList.remove('is-hidden');
      startBtn.setAttribute('aria-expanded', 'true');
      revealCards();
      shown = true;

      // Cambia el texto del botón para que sea más claro
      startBtn.textContent = 'Cambiar color del fondo';
    } else {
      // 2) Cambiar la paleta del fondo
      theme = theme % 4 + 1; // 1→2→3→4→1...
      body.className = `theme-${theme}`;
    }
  });

  // IntersectionObserver para activar .show en cada card
  function revealCards(){
    const cards = document.querySelectorAll('.card');

    if (!('IntersectionObserver' in window)) {
      cards.forEach(c => c.classList.add('show'));
      return;
    }
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    cards.forEach(card => obs.observe(card));
  }
})();
