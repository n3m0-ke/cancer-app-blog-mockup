import React from "react";
import { Outlet } from "react-router-dom";

import AdminNavbar from "../components/adminComponents/AdminNavbar";
import Sidebar from "../components/adminComponents/SideBar";

export default function AdminLayout() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100 min-h-screen">
        <AdminNavbar />
        <div className="pt-20 px-4">
          <Outlet /> {/* This is where child route components will render */}
        </div>
      </div>
    </>
  );
}
