import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-pink-600 hover:text-pink-700"
      title={i18n.language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
    >
      <span className="text-lg">🌐</span>
      <span className="font-medium text-sm">
        {i18n.language === 'vi' ? 'EN' : 'VI'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
