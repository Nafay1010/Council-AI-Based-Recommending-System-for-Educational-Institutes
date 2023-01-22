import React from 'react';
import Navbar from '../Login&Register/Navbar';
import { Outlet } from 'react-router';

const NotLoggedInTemplate = () => {
  return (
    <>
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
}

export default NotLoggedInTemplate