import React from "react";

import { Typography } from "antd";
import { Helmet } from "react-helmet-async";

// import Character5 from '@/assets/images/characters/character_5.png';
// import MotionContainer from '@/components/animate/motion-container';
// import { varBounce } from '@/components/animate/variants/bounce';
import { useRouter } from "@/router/hooks";
// import { useThemeToken } from '@/theme/hooks';

const HOMEPAGE = import.meta.env.VITE_APP_HOMEPAGE;

const PageError = ({ error, resetErrorBoundary }) => {
  const { replace } = useRouter();
  const goHome = () => {
    resetErrorBoundary();
    replace(HOMEPAGE);
  };
  return (
    <div>
      <Helmet>
        <title>Sorry, Page error occurred!</title>
      </Helmet>
      <div>PageError {error.toString()}</div>
    </div>
  );
};

export default PageError;
