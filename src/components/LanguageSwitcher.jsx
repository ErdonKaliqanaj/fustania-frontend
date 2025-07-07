import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'sq', label: 'Shqip', flag: '🇦🇱' },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition duration-300">
        <span>{languages.find(lang => lang.code === i18n.language)?.flag || '🌐'}</span>
        <span>{languages.find(lang => lang.code === i18n.language)?.label || 'Select Language'}</span>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg hidden group-hover:block">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-100 transition duration-200 ${
              i18n.language === lang.code ? 'bg-purple-200' : ''
            }`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LanguageSwitcher;