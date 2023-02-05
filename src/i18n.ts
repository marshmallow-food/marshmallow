import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {NativeModules, Platform} from 'react-native';
import {initReactI18next} from 'react-i18next';

export const defaultNS = 'translation';

export const resources = {
  en: {
    translation: {
      home: 'Home',
      settings: 'Settings',
    },
  },
  ru: {
    translation: {
      home: 'Главная',
      settings: 'Настройки',
    },
  },
  kz: {
    translation: {
      home: 'Басты бет',
      settings: 'Параметрлері',
    },
  },
} as const;

const language =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;

i18n.language = language;

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: ['translation'],
    defaultNS,
    resources,
    lng: language,
    fallbackLng: {
      default: ['en'],
      kk_KZ: ['kz'],
      ru_KZ: ['ru'],
      ru_RU: ['ru']
    },
    keySeparator: '.',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    compatibilityJSON: 'v3', // hermes compatible
  });

export default i18n;
