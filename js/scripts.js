// Fetch and apply language strings from the JSON file
const loadLanguage = async (lang) => {
  try {
    const response = await fetch(`/locales/${lang}.json`);
    if (!response.ok) throw new Error(`Failed to load ${lang}.json: ${response.statusText}`);

    const strings = await response.json();
    
    document.querySelectorAll('[data-locale]').forEach(element => {
      const key = element.getAttribute('data-locale');
      if (strings[key]) {
        element.textContent = strings[key];
      }
    });
  } catch (error) {
    console.error("Error loading language file:", error);
  }
};

// Function to switch language and save user preference
const switchLanguage = (lang) => {
  window.history.replaceState(null, null, `/${lang}/`); // Update URL
  localStorage.setItem('preferredLanguage', lang);      // Save preference
  loadLanguage(lang);                                   // Load new language
};

// Add event listeners to the language switcher buttons
document.getElementById('switch-en').addEventListener('click', () => switchLanguage('en'));
document.getElementById('switch-fr').addEventListener('click', () => switchLanguage('fr'));

// Check for a saved language preference or use the URL to determine language
const savedLanguage = localStorage.getItem('preferredLanguage');
const currentLang = window.location.pathname.includes('/fr') ? 'fr' : savedLanguage || 'en';

// Load the appropriate language on page load
loadLanguage(currentLang);