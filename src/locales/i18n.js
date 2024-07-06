import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { getStringItem } from "@/utils/storage";

import en_US from "./lang/en_US";
import id_ID from "./lang/id_ID";

import { LocalEnum, StorageEnum } from "@/types/enum";

const defaultLng = getStringItem(StorageEnum.I18N) || LocalEnum.en_US;
i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    debug: true,
    lng: defaultLng, // localstorage -> i18nextLng: en_US
    fallbackLng: LocalEnum.en_US,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en_US: { translation: en_US },
      id_ID: { translation: id_ID },
    },
  });

export default i18n;
export const { t } = i18n;
