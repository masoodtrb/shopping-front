import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { fromRootActions, useRoot } from "../../Context/Root";
import { UserService } from "../../services";

type authStateType = "hasAuth" | "unauthorized" | "noDecide";

const useCheckAuth = () => {
  const {
    state: { token, authLoading, hasAuth, user },
    dispatch
  } = useRoot();

  const history = useHistory();
  const location = useLocation();

  const [authState, setAuthState] = useState<authStateType>();

  const getUser = async () => {
    try {
      dispatch(fromRootActions.setAuthLoading(true));
      const me = await UserService.users.me();
      dispatch(fromRootActions.setUserInfo(me));
      setAuthState("hasAuth");
      dispatch(fromRootActions.setAuthLoading(false));

      if (location.pathname.includes("login")) {
        history.push("/");
      }
    } catch (error) {
      dispatch(fromRootActions.setAuthLoading(false));
      setAuthState("unauthorized");
    }
  };

  useEffect(() => {
    if (!!user) {
      setAuthState("hasAuth");
      if (location.pathname.includes("login")) {
        history.push("/");
      }
    } else if (user === null) {
      setAuthState("unauthorized");
    }
  }, [history, location.pathname, user, hasAuth]);

  useEffect(() => {
    setAuthState("noDecide");
    if (token) {
      getUser();
    } else {
      setAuthState("unauthorized");
    }
  }, [token]);

  return {
    authState,
    authLoading,
    hasAuth
  };
};

export default useCheckAuth;
