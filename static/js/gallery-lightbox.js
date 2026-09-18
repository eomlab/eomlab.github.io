(function () {
  var links = document.querySelectorAll('[data-gallery-image]');
  if (!links.length) return;

  var overlay = document.createElement('div');
  overlay.className = 'nil-gallery-lightbox';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = '<button type="button" aria-label="Close image">×</button><img alt="">';
  document.body.appendChild(overlay);

  var image = overlay.querySelector('img');
  var close = overlay.querySelector('button');

  function openLightbox(src, alt) {
    image.src = src;
    image.alt = alt || '';
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    image.src = '';
    document.body.style.overflow = '';
  }

  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      var img = link.querySelector('img');
      openLightbox(link.getAttribute('href'), img ? img.alt : '');
    });
  });

  close.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', function (event) {
    if (event.target === overlay) closeLightbox();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeLightbox();
  });
})();