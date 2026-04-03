// Mobile sidebar drawer toggle
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.querySelector('.side-bar');
    if (!sidebar) return;

    // Create hamburger button
    var btn = document.createElement('button');
    btn.className = 'mobile-menu-btn';
    btn.setAttribute('aria-label', 'Open navigation');
    btn.innerHTML = '&#9776;';
    document.body.appendChild(btn);

    // Create overlay
    var overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    document.body.appendChild(overlay);

    function open() {
      sidebar.classList.add('mobile-open');
      overlay.classList.add('active');
      btn.innerHTML = '&#10005;';
    }

    function close() {
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('active');
      btn.innerHTML = '&#9776;';
    }

    btn.addEventListener('click', function () {
      if (sidebar.classList.contains('mobile-open')) {
        close();
      } else {
        open();
      }
    });

    overlay.addEventListener('click', close);

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar.classList.contains('mobile-open')) {
        close();
      }
    });
  });
})();
