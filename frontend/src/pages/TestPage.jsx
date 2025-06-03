import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AdminNavbar from '../components/adminComponents/AdminNavbar';
import Sidebar from "../components/adminComponents/SideBar";

export default function Test() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
      </div>
    </>
  );
}