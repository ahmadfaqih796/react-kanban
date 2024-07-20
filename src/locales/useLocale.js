import en_US from "antd/locale/en_US";
import id_ID from "antd/locale/id_ID";
import { useTranslation } from "react-i18next";

import { LocalEnum } from "@/types/enum";

export const LANGUAGE_MAP = {
  [LocalEnum.id_ID]: {
    locale: LocalEnum.id_ID,
    label: "Indonesia",
    icon: "ic-locale_id_ID",
    antdLocal: id_ID,
  },
  [LocalEnum.en_US]: {
    locale: LocalEnum.en_US,
    label: "English",
    icon: "ic-locale_en_US",
    antdLocal: en_US,
  },
};

export default function useLocale() {
  const { i18n } = useTranslation();

  /**
   * localstorage -> i18nextLng change
   */
  const setLocale = (locale) => {
    i18n.changeLanguage(locale);
  };

  const locale = i18n.resolvedLanguage || LocalEnum.en_US;

  const language = LANGUAGE_MAP[locale];

  return {
    locale,
    language,
    setLocale,
  };
}
