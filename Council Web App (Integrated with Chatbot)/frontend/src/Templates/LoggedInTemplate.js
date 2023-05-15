import React from "react";
// import Navbar from "../Dashboard/Navbar";
import { Outlet } from "react-router";
import SidebarComponent from "../Dashboard/SidebarComponent";
import { useEffect } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useAuthContext } from "../hooks/useAuthContext";

const LoggedInTemplate = () => {
  // const { users, dispatch } = useUserContext();
  const { dispatch } = useUserContext();
  const { user } = useAuthContext();
  const { email } = JSON.parse(localStorage.getItem("User"));
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/home" + email, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_USERS", payload: json });
      }
    };

    if (user) {
      fetchUsers();
    }
    // fetchUsers()
  }, [dispatch, user, email]);

  return (
    <>
      <div className="content">
        <SidebarComponent />
        <Outlet />
      </div>
    </>
  );
};

export default LoggedInTemplate;
