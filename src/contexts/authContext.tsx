import { useRouter } from "next/router";
import { createContext, useState, useEffect } from "react";
import { userService } from "../services/user.services";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authorized: false,
});

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    setUser(userService.userValue);
    const publicPaths = ["/account/login"];
    const path = url.split("?")[0];
    if (!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/account/login",
        query: { returnUrl: router.asPath },
      });
    }
  }

  const login = () => {
    setAuthorized(true);
    //setUser(JSON.stringify(userService.user));
    setUser(userService.userValue);
  };

  const logout = () => {
    setAuthorized(false);
  };

  const value = {
    user,
    login,
    logout,
    authorized,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
