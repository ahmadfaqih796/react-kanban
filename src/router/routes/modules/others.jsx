import { Suspense, lazy } from "react";

import Card from "@/components/card";
import { Iconify, SvgIcon } from "@/components/icon";
import { CircleLoading } from "@/components/loading";
import ProTag from "@/theme/antd/components/tag";

// const ExternalLink = lazy(
//   () => import("@/pages/sys/others/iframe/external-link")
// );
// const Iframe = lazy(() => import("@/pages/sys/others/iframe"));
// const Calendar = lazy(() => import("@/pages/sys/others/calendar"));
// const Kanban = lazy(() => import("@/pages/sys/others/kanban"));
const Kanban = lazy(() => import("@/pages/dashboard/analysis"));

function Wrapper({ children }) {
  return <Suspense fallback={<CircleLoading />}>{children}</Suspense>;
}

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
