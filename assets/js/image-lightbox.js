(() => {
  const HIDE_CLASS = "jd-hidden-by-js";

  const getTargetedLightbox = () => {
    const id = (location.hash || "").slice(1);
    if (!id) return null;

    const el = document.getElementById(id);
    return el && el.classList.contains("jd-lightbox") ? el : null;
  };

  const closeLightbox = () => {
    const lb = getTargetedLightbox();
    if (!lb) return;

    // Save scroll to prevent jump (some browsers can still adjust)
    const y = window.scrollY;

    // Force-hide immediately
    lb.classList.add(HIDE_CLASS);

    // Clear hash without adding history entry
    history.replaceState(null, "", location.pathname + location.search);

    // Restore scroll position
    window.scrollTo(0, y);
  };

  // Re-enable a lightbox when it becomes targeted again
  const syncHiddenWithHash = () => {
    const targeted = getTargetedLightbox();
    if (!targeted) return;
    targeted.classList.remove(HIDE_CLASS);
  };

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" && e.key !== "Esc") return;
    if (!getTargetedLightbox()) return;

    e.preventDefault();
    closeLightbox();
  });

  // Click-to-close:
  // - overlay click (background) closes
  // - image click closes (optional; remove that branch if you don't want it)
  document.addEventListener("click", (e) => {
    const lb = getTargetedLightbox();
    if (!lb) return;

    const clickedOverlay = e.target.classList.contains("jd-lightbox-close");
    const clickedImage = e.target.matches(".jd-lightbox img");

    if (clickedOverlay || clickedImage) {
      e.preventDefault();
      closeLightbox();
    }
  });

  window.addEventListener("hashchange", syncHiddenWithHash);
  syncHiddenWithHash();
})();
