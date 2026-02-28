import Header from "./components/app_components/header";
import Footer from "./components/app_components/Footer";
import { Outlet } from "react-router-dom";
import React from "react";

//layout used only for protected routes

function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default AppLayout;
