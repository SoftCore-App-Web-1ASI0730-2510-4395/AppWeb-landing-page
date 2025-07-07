// Hamburger menu functionality for responsive navigation

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger-menu');
  const nav = document.getElementById('main-nav');

  if (hamburger && nav) {
    // Cierra el menú al hacer clic fuera
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('show');
        hamburger.classList.remove('active');
      }
    });
    // Toggle menú hamburguesa
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      nav.classList.toggle('show');
      hamburger.classList.toggle('active');
    });
    // Cierra menú al hacer clic en un link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('show');
        hamburger.classList.remove('active');
      });
    });
  }
});
