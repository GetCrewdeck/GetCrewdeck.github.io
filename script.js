document.getElementById('year').textContent = new Date().getFullYear();

const layers = document.querySelector('.layers');
if (layers && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('pointermove', (event) => {
    if (window.innerWidth < 760) return;
    const x = (event.clientX / window.innerWidth - 0.5) * 5;
    const y = (event.clientY / window.innerHeight - 0.5) * -3;
    layers.style.translate = `${x}px ${y}px`;
  }, { passive: true });
}
