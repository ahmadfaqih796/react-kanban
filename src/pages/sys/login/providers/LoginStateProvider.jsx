import { createContext, useContext, useMemo, useState } from "react";

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
      {children}
    </LoginStateContext.Provider>
  );
}
