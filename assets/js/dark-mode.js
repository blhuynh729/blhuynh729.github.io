// Dark mode toggle with localStorage persistence
(function () {
  var saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  function updateLogo() {
    var logo = document.getElementById('site-logo');
    if (!logo) return;
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    logo.src = isDark ? logo.dataset.darkSrc : logo.dataset.lightSrc;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', 'Toggle dark mode');
    btn.innerHTML = document.documentElement.getAttribute('data-theme') === 'dark' ? '&#9788;' : '&#9790;';
    document.body.appendChild(btn);

    updateLogo();

    btn.addEventListener('click', function () {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        btn.innerHTML = '&#9790;';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        btn.innerHTML = '&#9788;';
      }
      updateLogo();
    });
  });
})();
