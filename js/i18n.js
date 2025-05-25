// Internationalization (i18n) functionality

// Default language
let currentLanguage = localStorage.getItem('language') || 'en';

// Translations object to store loaded translations
const translations = {};

// Function to load language file
async function loadLanguage(lang) {
  try {
    const response = await fetch(`js/translations/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load language file: ${lang}`);
    }
    translations[lang] = await response.json();
    return translations[lang];
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Function to update all text elements with translations
function updatePageLanguage(lang) {
  if (!translations[lang]) return;

  document.documentElement.lang = lang;
  
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = getNestedTranslation(translations[lang], key);
    
    if (translation) {
      if (element.tagName === 'INPUT' && element.type === 'placeholder') {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    }
  });

  // Update visual state of toggle
  updateLanguageToggle(lang);

  // Save user preference
  localStorage.setItem('language', lang);
  currentLanguage = lang;
}

// Helper function to get nested translations using dot notation
function getNestedTranslation(obj, path) {
  const keys = path.split('.');
  return keys.reduce((acc, key) => {
    return acc && acc[key] !== undefined ? acc[key] : null;
  }, obj);
}

// Function to update toggle UI
function updateLanguageToggle(lang) {
  const toggleSlider = document.getElementById('language-toggle');
  const langOptions = document.querySelectorAll('.lang-option');
  
  if (toggleSlider) {
    if (lang === 'es') {
      toggleSlider.classList.add('es');
    } else {
      toggleSlider.classList.remove('es');
    }
  }
  
  // Update active state for language options
  langOptions.forEach(option => {
    if (option.getAttribute('data-lang') === lang) {
      option.classList.add('active');
    } else {
      option.classList.remove('active');
    }
  });
}

// Initialize i18n
async function initI18n() {
  // Load the current language
  await loadLanguage(currentLanguage);
  
  // Also load the other language for faster switching
  const otherLang = currentLanguage === 'en' ? 'es' : 'en';
  loadLanguage(otherLang);
  
  // Update the page with the current language
  updatePageLanguage(currentLanguage);
  
  // Set up toggle event listeners
  setupLanguageToggle();
}

// Set up language toggle event listeners
function setupLanguageToggle() {
  const toggleSlider = document.getElementById('language-toggle');
  const langOptions = document.querySelectorAll('.lang-option');
  
  if (toggleSlider) {
    toggleSlider.addEventListener('click', () => {
      const newLang = currentLanguage === 'en' ? 'es' : 'en';
      updatePageLanguage(newLang);
    });
  }
  
  // Allow clicking on language labels too
  langOptions.forEach(option => {
    option.addEventListener('click', () => {
      const newLang = option.getAttribute('data-lang');
      if (newLang !== currentLanguage) {
        updatePageLanguage(newLang);
      }
    });
  });
  
  // Initial toggle state
  updateLanguageToggle(currentLanguage);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initI18n);
