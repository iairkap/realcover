"use client";

import React from "react";
import PedidosContainer from "../components/PedidosCard/pedidoscardcontainer";
import { GlobalContext } from "../store/layout";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

import styles from "./profile.module.css";
const DynamicNavBar = dynamic(() => import("../components/navBar/navBar"), {
  ssr: false,
});
function Profile() {
  const { data: session } = useSession();

  if (!session) {
    // No hay sesión, redirige o muestra un mensaje al usuario.
    return <p>Please sign in to view this content.</p>;
  }

  console.log(`alooooo ${session}`);
  return (
    <div className={styles.background}>
      <DynamicNavBar />
      <br />
      <br />
      <PedidosContainer />
      <br />
      <br />
    </div>
  );
}

export default Profile;
