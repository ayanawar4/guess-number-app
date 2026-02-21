import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import * as Localization from 'expo-localization';
import { storageUtils, STORAGE_KEYS } from '@/common/utils/storage';

import en from './locales/en/translation.json';
import ar from './locales/ar/translation.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

// Get saved language from storage, fallback to device locale
const savedLanguage = storageUtils.getString(STORAGE_KEYS.LOCALE);
const deviceLanguage = Localization.getLocales()[0]?.languageCode || 'en';
const initialLanguage = savedLanguage || deviceLanguage;

// Set RTL based on initial language
const isRTL = initialLanguage === 'ar';
I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources,
  lng: initialLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
