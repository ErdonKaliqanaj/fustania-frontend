import { useTranslation } from "react-i18next";

function LanguageSwitcher(){
    const {i18n, t} = useTranslation();

    const changeLanguage = (lng) =>{
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    }

    return(
        <div className="inline-block">
            <select value={i18n.language} onChange={(e) => changeLanguage(e.target.value)}
                aria-label={t('select_language')}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm cursor-pointer">
                   <option value="en">{t('english')}</option>
                   <option value="sq">{t('albanian')}</option>

            </select>

        </div>
    )
}

export default LanguageSwitcher;