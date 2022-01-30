import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Routes } from "../config/routes";
import { UserContext, UserContextProps } from "../context/user-context";

export const useRequireAuth = (redirectUrl = Routes.LOGIN) => {
  const userContext = useContext<UserContextProps>(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userContext.user.value?.uuid === undefined) {
      navigate(redirectUrl);
    }
  }, [userContext, navigate, redirectUrl]);

  return userContext.user;
};
