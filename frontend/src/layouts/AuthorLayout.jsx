import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/authorComponents/AuthorNavbar";
import Sidebar from "../components/authorComponents/SideBar";

export default function AuthorLayout() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100 min-h-screen">
        <Navbar />
        <div className="pt-20 px-4">
          <Outlet /> {/* This is where child route components will render */}
        </div>
      </div>
    </>
  );
}
