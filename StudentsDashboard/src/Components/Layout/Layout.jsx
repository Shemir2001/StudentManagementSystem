import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Navbar/Navbar";
import Sidebar from "../Leftbar/Leftbar";

const Layout = () => {
  return (
    <>
      <Navigation />
<div className="flex h-screen pt-16 overflow-auto">
  {/* Sidebar takes full screen height */}
  <Sidebar className="h-full" />
  
  {/* Main content container */}
  <div >
    <Outlet/>
  </div>
</div>

    </>
  );
};

export default Layout;
