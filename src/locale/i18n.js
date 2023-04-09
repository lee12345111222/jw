import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en';
import cn from './cn';

const resources = {
  en,
  cn
};

// export default i18n;

export default function setLn(ln = 'en') {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      lng: ln,
      interpolation: {
        escapeValue: false // react already safes from xss
      }
    });
}
