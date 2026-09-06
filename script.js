document.getElementById('year').textContent = new Date().getFullYear();

const appClock = document.getElementById('app-clock');
function updateAppClock() {
  appClock.textContent = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date());
}
updateAppClock();
setInterval(updateAppClock, 30_000);

const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');
const themeButtons = document.querySelectorAll('[data-theme-choice]');

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#0c111d' : '#f3f1ec';
  themeButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme));
  });
}

applyTheme(document.documentElement.dataset.theme || (themeMedia.matches ? 'dark' : 'light'));

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const theme = button.dataset.themeChoice;
    localStorage.setItem('crewdeck-theme', theme);
    applyTheme(theme);
  });
});

themeMedia.addEventListener('change', (event) => {
  if (!localStorage.getItem('crewdeck-theme')) applyTheme(event.matches ? 'dark' : 'light');
});

const appSectionButtons = document.querySelectorAll('[data-app-section]');
const appViews = document.querySelectorAll('[data-app-view]');

appSectionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const section = button.dataset.appSection;
    appViews.forEach((view) => { view.hidden = view.dataset.appView !== section; });
    appSectionButtons.forEach((item) => {
      const selected = item.dataset.appSection === section;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
  });
});

const layers = document.querySelector('.layers');
if (layers && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('pointermove', (event) => {
    if (window.innerWidth < 760) return;
    const x = (event.clientX / window.innerWidth - 0.5) * 5;
    const y = (event.clientY / window.innerHeight - 0.5) * -3;
    layers.style.translate = `${x}px ${y}px`;
  }, { passive: true });
}
