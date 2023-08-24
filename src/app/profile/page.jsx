"use client";

import React, { useState } from "react";
import PedidosContainer from "../components/PedidosCard/pedidoscardcontainer";
import { GlobalContext } from "../store/layout";
import dynamic from "next/dynamic";
import CuponContainer from "../components/miscupones/cuponContainer";
import { useEffect } from "react";
import styles from "./profile.module.css";
const DynamicNavBar = dynamic(() => import("../components/navBar/navBar"), {
  ssr: false,
});

function Profile() {
  const [activeContent, setActiveContent] = useState("pedidos");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/fafa");
        const data = await response.json();

        if (response.ok) {
          setUserData(data);
        } else {
          console.log("Error fetching user data");
        }
      } catch (error) {
        console.error("Error during the request:", error.message);
      }
    };

    fetchUserData();
  }, []);

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
        {activeContent === "pedidos" && (
          <PedidosContainer userData={userData} setUserData={setUserData} />
        )}
        {activeContent === "cupones" && (
          <CuponContainer userData={userData} setUserData={setUserData} />
        )}
      </div>
      <br />
      <br />
    </div>
  );
}

export default Profile;
