import React from "react";
import { Outlet } from "react-router-dom";
import Header from '../Components/Header/Header'
import Styles from "../Layouts/MainLayout.module.css"
import Footer from '../Components/Footer/Footer'
export function MainLayout() {
  return (
    <div className={Styles.Main}>
      <div className={Styles.Outlet}>
        <Header ShowButtons={true} />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
