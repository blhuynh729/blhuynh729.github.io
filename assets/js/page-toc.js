// Auto-generate a sticky "On this page" TOC from h2/h3 headings
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var content = document.querySelector('.main-content');
    if (!content) return;

    var headings = content.querySelectorAll('h1[id], h2[id], h3[id]');
    if (headings.length < 2) return; // not worth showing for short pages

    // Build TOC container
    var toc = document.createElement('nav');
    toc.className = 'page-toc';
    toc.setAttribute('aria-label', 'On this page');

    var title = document.createElement('div');
    title.className = 'page-toc-title';
    title.textContent = 'On this page';
    toc.appendChild(title);

    var ul = document.createElement('ul');

    headings.forEach(function (h) {
      var li = document.createElement('li');
      li.className = h.tagName === 'H1' ? 'toc-h1' : h.tagName === 'H3' ? 'toc-h3' : 'toc-h2';

      var a = document.createElement('a');
      a.href = '#' + h.id;
      // Get text without the anchor link SVG
      a.textContent = h.textContent.trim();
      a.setAttribute('data-target', h.id);

      li.appendChild(a);
      ul.appendChild(li);
    });

    toc.appendChild(ul);
    document.body.appendChild(toc);

    // Highlight current section on scroll
    var links = toc.querySelectorAll('a[data-target]');
    var headingEls = Array.from(headings);

    function updateActive() {
      var scrollY = window.scrollY + 100;
      var current = null;

      for (var i = 0; i < headingEls.length; i++) {
        if (headingEls[i].offsetTop <= scrollY) {
          current = headingEls[i].id;
        }
      }

      links.forEach(function (link) {
        if (link.getAttribute('data-target') === current) {
          link.classList.add('toc-active');
        } else {
          link.classList.remove('toc-active');
        }
      });
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          updateActive();
          ticking = false;
        });
        ticking = true;
      }
    });

    updateActive();
  });
})();
