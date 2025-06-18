import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        className="p-2 border rounded-md bg-white shadow-sm"
        value={i18n.language}
      >
        <option value="en">{t('language.english')}</option>
        <option value="sq">{t('language.albanian')}</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;