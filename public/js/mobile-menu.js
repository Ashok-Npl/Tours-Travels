(function () {
  const drawer = document.getElementById('mobile-menu-drawer');
  const openButton = document.getElementById('mobile-menu-btn');
  const closeButton = document.getElementById('mobile-menu-close-btn');
  const overlay = document.getElementById('mobile-overlay');

  if (!drawer || !openButton) return;

  const close = () => {
    drawer.classList.add('translate-x-full');
    document.body.style.overflow = '';
  };

  openButton.addEventListener('click', () => {
    drawer.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
  });
  closeButton?.addEventListener('click', close);
  overlay?.addEventListener('click', close);
  drawer.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', close);
  });
})();
