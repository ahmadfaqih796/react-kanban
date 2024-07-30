// import { lazy } from "react";
import { Iconify } from "@/components/icon";
import Wrapper from "@/components/wrapper";
import { Kanban } from "../pages";

const others = [
  {
    path: "kanban",
    element: (
      <Wrapper>
        <Kanban />
      </Wrapper>
    ),
    meta: {
      label: "sys.menu.kanban",
      icon: <Iconify icon="solar:clipboard-bold-duotone" size={24} />,
      key: "/kanban",
    },
  },
];

export default others;
