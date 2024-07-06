import { useCallback, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

import PageError from "@/pages/sys/error/PageError";
import { useUserToken } from "@/store/userStore";

import { useRouter } from "../hooks";

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const { accessToken } = useUserToken();

  const check = useCallback(() => {
    if (!accessToken) {
      router.replace("/login");
    }
  }, [router, accessToken]);

  useEffect(() => {
    check();
  }, [check]);

  return (
    <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>
  );
};

export default AuthGuard;
