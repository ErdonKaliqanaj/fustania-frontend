import i18next from 'i18next';
import { initReactI18next } from "react-i18next";
import enTranslation from './assets/i18n/en.json';
import sqTranslation from './assets/i18n/sq.json';

i18next.use(initReactI18next).init({
    resources:{
        en:{translation: enTranslation},
        sq:{translation: sqTranslation},
    },
    lng:'en',
    fallbackLng:'en',
    interpolation:{escapeValue: false},
});

export default i18next;