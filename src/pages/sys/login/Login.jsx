import { Layout, Typography } from "antd";
import Color from "color";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";

import DashboardImg from "@/assets/images/background/dashboard.png";
import Overlay2 from "@/assets/images/background/overlay_2.jpg";
import { LocalePicker, ThemePicker } from "@/components/picker";
import { useUserToken } from "@/store/userStore";
import { useThemeToken } from "@/theme/hooks";

import LoginForm from "./LoginForm";
import MobileForm from "./MobileForm";
import { LoginStateProvider } from "./providers/LoginStateProvider";
import QrCodeFrom from "./QrCodeForm";
import RegisterForm from "./RegisterForm";
import ResetForm from "./ResetForm";

const HOMEPAGE = import.meta.env.VITE_APP_HOMEPAGE;

const Login = () => {
  const { t } = useTranslation();
  const token = useUserToken();
  const { colorBgElevated } = useThemeToken();

  // Check if user has a token
  if (token.accessToken) {
    // Redirect to homepage if authorized
    return <Navigate to={HOMEPAGE} replace />;
  }

  const gradientBg = Color(colorBgElevated).alpha(0.9).toString();
  const bg = `linear-gradient(${gradientBg}, ${gradientBg}) center center / cover no-repeat, url(${Overlay2})`;

  return (
    <>
      <Layout className="relative flex !min-h-screen !w-full !flex-row">
        <div className="m-auto flex !h-screen w-full max-w-[480px] flex-col justify-center px-[16px] lg:px-[64px]">
          <LoginStateProvider>
            <LoginForm />
            <MobileForm />
            <QrCodeFrom />
            <RegisterForm />
            <ResetForm />
          </LoginStateProvider>
        </div>

        <div
          className="hidden grow flex-col items-center justify-center gap-[10px] bg-center bg-no-repeat md:flex"
          style={{
            background: bg,
          }}
        >
          <div className="text-3xl font-bold leading-normal text-center lg:text-4xl xl:text-5xl">
            Faqih Admin
          </div>
          <img
            className="max-w-[480px] xl:max-w-[560px]"
            src={DashboardImg}
            alt=""
          />
          <Typography.Text className="flex flex-row gap-[16px] text-2xl">
            {t("sys.login.signInSecondTitle")}
          </Typography.Text>
        </div>

        <div className="flex justify-between absolute right-2 top-0">
          <LocalePicker />
          <ThemePicker />
        </div>
      </Layout>
    </>
  );
};

export default Login;
