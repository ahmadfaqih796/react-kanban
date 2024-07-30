import MotionContainer from "@/components/animate/motion-container";
import { varSlide } from "@/components/animate/variants";
import { AnimatePresence, m } from "framer-motion";
import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

export const LoginStateEnum = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  RESET_PASSWORD: "RESET_PASSWORD",
  MOBILE: "MOBILE",
  QR_CODE: "QR_CODE",
};

const LoginStateContext = createContext({
  loginState: LoginStateEnum.LOGIN,
  setLoginState: () => {},
  backToLogin: () => {},
});

export function useLoginStateContext() {
  const context = useContext(LoginStateContext);
  return context;
}

export function LoginStateProvider({ children }) {
  const [loginState, setLoginState] = useState(LoginStateEnum.LOGIN);

  function backToLogin() {
    setLoginState(LoginStateEnum.LOGIN);
  }

  const value = useMemo(
    () => ({ loginState, setLoginState, backToLogin }),
    [loginState]
  );

  return (
    <LoginStateContext.Provider value={value}>
      <MotionContainer className="flex flex-col items-center justify-center px-2">
        <AnimatePresence mode="wait">
          <m.div
            key={loginState}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={
              varSlide({
                distance: 500,
              }).inLeft
            }
          >
            {children}
          </m.div>
        </AnimatePresence>
      </MotionContainer>
    </LoginStateContext.Provider>
  );
}

LoginStateProvider.propTypes = {
  children: PropTypes.node,
};
