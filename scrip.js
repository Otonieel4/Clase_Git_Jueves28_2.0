// Aparición suave de las cards con IntersectionObserver
(function(){
  const cards = document.querySelectorAll('.card');

  // Fallback si el navegador no soporta IntersectionObserver
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
})();
