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

  function updateToggle(btn, isDark) {
    var icon = btn.querySelector('.theme-toggle-icon');
    var label = btn.querySelector('.theme-toggle-label');
    icon.innerHTML = isDark ? '&#9788;' : '&#9790;';
    label.textContent = isDark ? 'LIGHT MODE' : 'DARK MODE';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', 'Toggle dark mode');

    var icon = document.createElement('span');
    icon.className = 'theme-toggle-icon';
    btn.appendChild(icon);

    var label = document.createElement('span');
    label.className = 'theme-toggle-label';
    btn.appendChild(label);

    updateToggle(btn, isDark);

    // Insert into sidebar, between site-header and site-nav
    var siteNav = document.querySelector('.side-bar .site-nav');
    if (siteNav) {
      siteNav.parentNode.insertBefore(btn, siteNav);
    } else {
      document.body.appendChild(btn);
    }

    updateLogo();

    btn.addEventListener('click', function () {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
      updateToggle(btn, !isDark);
      updateLogo();
    });
  });
})();
