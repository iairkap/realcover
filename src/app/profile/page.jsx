"use client";

import React from "react";
import PedidosContainer from "../components/PedidosCard/pedidoscardcontainer";
import { GlobalContext } from "../store/layout";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import CuponContainer from "../components/miscupones/cuponContainer";
import { useState } from "react";
import styles from "./profile.module.css";
const DynamicNavBar = dynamic(() => import("../components/navBar/navBar"), {
  ssr: false,
});
function Profile() {
  const { data: session } = useSession();
  const [activeContent, setActiveContent] = useState("pedidos");

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
      <div className={styles.titleContainer}>
        <h1
          className={styles.titulo}
          onClick={() => setActiveContent("pedidos")}
        >
          Mis Pedidos
        </h1>
        <h1
          className={styles.titulo}
          onClick={() => setActiveContent("cupones")}
        >
          Mis Cupones
        </h1>
      </div>
      <div className={styles.cardContainer}>
        {activeContent === "pedidos" && <PedidosContainer />}
        {activeContent === "cupones" && <CuponContainer />}
      </div>
      <br />
      <br />
    </div>
  );
}

export default Profile;
