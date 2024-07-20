import { Dropdown } from "antd";

import useLocale from "@/locales/useLocale";

import { IconButton, SvgIcon } from "../icon";

/**
 * Locale Picker
 */
const LocalePicker = () => {
  const { setLocale, locale, language } = useLocale();

  const localeList = Object.values(language).map((item) => {
    return {
      key: item.locale,
      label: item.label,
      icon: <SvgIcon icon={item.icon} size="20" className="rounded-md" />,
    };
  });

  return (
    <Dropdown
      placement="bottomRight"
      trigger={["click"]}
      key={locale}
      menu={{ items: localeList, onClick: (e) => setLocale(e.key) }}
    >
      <IconButton className="h-10 w-10 hover:scale-105">
        <SvgIcon
          icon={`ic-locale_${locale}`}
          size="24"
          className="rounded-md"
        />
      </IconButton>
    </Dropdown>
  );
};

export default LocalePicker;
