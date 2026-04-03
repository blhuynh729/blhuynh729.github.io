// Show "Last updated" date at the bottom of each page
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var content = document.querySelector('.main-content main, .main-content');
    if (!content) return;

    // Use the document's last modified date (set by the server)
    var modified = document.lastModified;
    if (!modified) return;

    var date = new Date(modified);
    // Skip if the date is clearly invalid
    if (isNaN(date.getTime())) return;

    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var formatted = date.toLocaleDateString('en-US', options);

    var footer = document.createElement('div');
    footer.className = 'page-last-updated';
    footer.textContent = 'Last updated: ' + formatted;
    content.appendChild(footer);
  });
})();
