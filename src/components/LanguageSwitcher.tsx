import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Languages } from 'lucide-react';
import { useEffect } from 'react';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Ensure the language is loaded from localStorage on mount
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
    // Log current language for debugging
    console.log('Current language:', i18n.language);
  }, [i18n]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ro' : 'en';
    console.log('Switching language to:', newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-yellow-500 hover:text-black hover:bg-yellow-500 transition-colors"
    >
      <Languages className="w-4 h-4" />
      {i18n.language.toUpperCase()}
    </Button>
  );
};