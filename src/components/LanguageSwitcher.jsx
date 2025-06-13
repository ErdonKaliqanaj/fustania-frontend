import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="p-4">
      <button
        onClick={() => changeLanguage('en')}
        className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
      >
        {t('english')}
      </button>
      <button
        onClick={() => changeLanguage('sq')}
        className="px-2 py-1 bg-blue-500 text-white rounded"
      >
        {t('albanian')}
      </button>
    </div>
  );
};

export default LanguageSwitcher;