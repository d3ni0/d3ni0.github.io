const supportedLocales = ['pt-BR', 'en-US', 'es-AR'];
const defaultLocale = 'pt-BR';
const localeStorageKey = 'd3ni0:locale';

const selectors = [
  document.getElementById('language-select'),
  document.getElementById('language-select-footer'),
].filter(Boolean);

const getStoredLocale = () => {
  const stored = localStorage.getItem(localeStorageKey);
  if (stored && supportedLocales.includes(stored)) {
    return stored;
  }
  return navigator.language && supportedLocales.includes(navigator.language)
    ? navigator.language
    : defaultLocale;
};

const flattenDictionary = (entry, prefix = '') => {
  return Object.entries(entry).reduce((accumulator, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(accumulator, flattenDictionary(value, path));
    } else {
      accumulator[path] = value;
    }
    return accumulator;
  }, {});
};

const applyDictionary = (dictionary) => {
  const flat = flattenDictionary(dictionary);
  Object.entries(flat).forEach(([key, value]) => {
    const nodes = document.querySelectorAll(`[data-i18n="${key}"]`);
    nodes.forEach((node) => {
      if (node.tagName === 'META') {
        node.setAttribute('content', value);
      } else if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
        node.setAttribute('placeholder', value);
      } else {
        node.innerHTML = value;
      }
    });
  });

  if (flat['meta.title']) {
    document.title = flat['meta.title'];
  }
};

const loadLocale = async (locale) => {
  if (!supportedLocales.includes(locale)) {
    locale = defaultLocale;
  }

  document.documentElement.lang = locale;

  try {
    const response = await fetch(`assets/i18n/${locale}.json`);
    if (!response.ok) {
      throw new Error(`Translation fetch failed: ${response.status}`);
    }
    const dictionary = await response.json();
    applyDictionary(dictionary);
    selectors.forEach((select) => {
      if (select) {
        select.value = locale;
      }
    });
  } catch (error) {
    console.error('Internationalization error:', error);
  }
};

const initI18n = () => {
  const currentLocale = getStoredLocale();
  loadLocale(currentLocale);

  selectors.forEach((select) => {
    if (!select) {
      return;
    }
    select.addEventListener('change', (event) => {
      const nextLocale = event.target.value;
      localStorage.setItem(localeStorageKey, nextLocale);
      selectors.forEach((control) => {
        if (control && control !== event.target) {
          control.value = nextLocale;
        }
      });
      loadLocale(nextLocale);
    });
  });
};

document.addEventListener('DOMContentLoaded', initI18n);

