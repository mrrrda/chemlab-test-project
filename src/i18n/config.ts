import { use } from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en/translation.json';
import ru from './ru/translation.json';

const i18n = use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
  },
});

export default i18n;
