import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import roTranslations from './locales/ro.json';

// Define country to language mapping
const COUNTRY_TO_LANGUAGE: { [key: string]: string } = {
  RO: 'ro',
  MD: 'ro', // Moldova also uses Romanian
};

// Custom language detector
const locationDetector = {
  name: 'ipLocation',
  lookup: (options: any): string => {
    // Start async detection
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        const detectedLang = COUNTRY_TO_LANGUAGE[data.country_code] || 'en';
        i18n.changeLanguage(detectedLang);
      })
      .catch(() => i18n.changeLanguage('en'));
    
    // Return default while detection is in progress
    return 'en';
  },
  cacheUserLanguage: (lng: string) => {
    localStorage.setItem('i18nextLng', lng);
  }
};

// Function to update document title based on language
const updateTitle = (lng: string) => {
  document.title = lng === 'ro' ? 'doiplusdoi' : 'twoplustwo';
};

const detector = new LanguageDetector();
detector.addDetector(locationDetector);

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      ro: {
        translation: roTranslations,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['ipLocation', 'localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage']
    }
  }).then(() => {
    updateTitle(i18n.language);
  });

i18n.on('languageChanged', updateTitle);

export default i18n; 