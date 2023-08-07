"use client";

import React from "react";
import PedidosContainer from "../components/PedidosCard/pedidoscardcontainer";
import { GlobalContext } from "../store/layout";
import dynamic from "next/dynamic";
import styles from "./profile.module.css";
const DynamicNavBar = dynamic(() => import("../components/navBar/navBar"), {
  ssr: false,
});
function Profile() {
  return (
    <div className={styles.background}>
      <DynamicNavBar />
      <br />
      <br />
      <h1 className={styles.titulo}>Mis Pedidos</h1>
      <PedidosContainer />
    </div>
  );
}

export default Profile;
