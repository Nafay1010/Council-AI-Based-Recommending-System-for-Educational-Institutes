import React from "react";
import Navbar from "../Login&Register/Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";

const NotLoggedInTemplate = () => {
  return (
    <>
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default NotLoggedInTemplate;
