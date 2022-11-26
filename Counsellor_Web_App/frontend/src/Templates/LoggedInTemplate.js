import React from 'react';
import Navbar from '../Dashboard/Navbar';
import { Outlet } from 'react-router';
import SidebarComponent from '../Dashboard/SidebarComponent';

const LoggedInTemplate = () => {
  return (
    <>
      <Navbar />
      <div className="content">
        <SidebarComponent/>
        <Outlet />
      </div>
    </>
  );
}

export default LoggedInTemplate