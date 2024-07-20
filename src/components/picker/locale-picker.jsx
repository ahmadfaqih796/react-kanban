import { Dropdown } from "antd";

import useLocale, { LANGUAGE_MAP } from "@/locales/useLocale";

import { IconButton, SvgIcon } from "../icon";

const items = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: "0",
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];
const LocalePicker = () => {
  const { setLocale, locale } = useLocale();

  const localeList = Object.values(LANGUAGE_MAP).map((item) => {
    return {
      key: item.locale,
      label: item.label,
      icon: <SvgIcon icon={item.icon} size="20" className="rounded-md" />,
    };
  });

  return (
    <Dropdown
      placement="bottomRight"
      key={locale}
      menu={{
        items: localeList,
        onClick: (e) => setLocale(e.key),
      }}
      trigger={["click"]}
    >
      <a
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <IconButton className="h-10 w-10 hover:scale-105">
          <SvgIcon
            icon={`ic-locale_${locale}`}
            size="24"
            className="rounded-md"
          />
        </IconButton>
      </a>
    </Dropdown>
  );
};

export default LocalePicker;
