const html = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const themeText = document.getElementById('theme-text');
const loader = document.getElementById('loading-screen');

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  if (themeText) themeText.textContent = theme === 'light' ? 'Modo oscuro' : 'Modo claro';
  try { localStorage.setItem('libre_theme', theme); } catch (e) {}
}

const savedTheme = (() => { try { return localStorage.getItem('libre_theme'); } catch (e) { return null; } })();
const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
setTheme(savedTheme || (prefersLight ? 'light' : 'dark'));

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    setTheme(html.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  });
}

function dismissLoader() {
  if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
}

document.getElementById('btn-skip-loading')?.addEventListener('click', dismissLoader);
loader?.addEventListener('click', dismissLoader);
window.addEventListener('load', () => setTimeout(dismissLoader, 400));
setTimeout(dismissLoader, 1000);
