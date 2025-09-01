// Activa el modo .js y aplica la animación cuando las cards entren al viewport
(function () {
  // Marca <html> con .js para habilitar estilos de animación
  document.documentElement.classList.add('js');

  // Espera a que el DOM esté listo (extra robusto)
  const ready = () => {
    const cards = document.querySelectorAll('.card');

    // Fallback si IntersectionObserver no existe
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
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }
})();

