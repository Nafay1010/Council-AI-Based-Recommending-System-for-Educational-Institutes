import { useAuthContext } from "./useAuthContext";
import { useUserContext } from "./useUserContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: userDispatch } = useUserContext();
  const logout = () => {
    // remove user from local storage
    localStorage.removeItem("User");
    localStorage.removeItem("conversation");

    //dispatch logout action
    dispatch({ type: "LOGOUT" });
    userDispatch({ type: "SET_USERS", payload: null });
  };

  return { logout };
};
