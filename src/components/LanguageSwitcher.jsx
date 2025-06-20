import { useTranslation } from 'react-i18next';

  const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };

    return (
      <div className="mt-4">
        <button
          onClick={() => changeLanguage('en')}
          className="px-4 py-2 text-blue-600 hover:underline"
        >
          {i18n.t('language.english')}
        </button>
        <button
          onClick={() => changeLanguage('sq')}
          className="px-4 py-2 text-blue-600 hover:underline"
        >
          {i18n.t('language.albanian')}
        </button>
      </div>
    );
  };

  export default LanguageSwitcher;