// Language toggle button logic

document.addEventListener('DOMContentLoaded', function() {
  const langBtn = document.getElementById('lang-toggle-btn');
  const langFlag = document.getElementById('lang-flag');
  const langLabel = document.getElementById('lang-label');

  if (langBtn && langFlag && langLabel) {
    langBtn.addEventListener('click', function() {
      // Get current language from html lang attr or localStorage
      let current = document.documentElement.lang || localStorage.getItem('language') || 'en';
      let next = current === 'en' ? 'es' : 'en';
      // Update flag and label
      langFlag.src = `Assets/img/flags/${next}.png`;
      langFlag.alt = next === 'en' ? 'English' : 'Español';
      langLabel.textContent = next.toUpperCase();
      // Update language in localStorage and trigger i18n
      if (typeof updatePageLanguage === 'function') {
        updatePageLanguage(next);
      } else {
        localStorage.setItem('language', next);
        location.reload();
      }
    });
    // On load, set correct flag/label
    let current = document.documentElement.lang || localStorage.getItem('language') || 'en';
    langFlag.src = `Assets/img/flags/${current}.png`;
    langFlag.alt = current === 'en' ? 'English' : 'Español';
    langLabel.textContent = current.toUpperCase();
  }
});
