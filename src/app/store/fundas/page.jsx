"use client";

import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../layout";
import { getLayout } from "../layout";
import CardsContainer from "../../components/cardsContainer/cardsContainer";
import NavBar from "../../components/navBar/navBar";
import Cart from "@/app/components/cart/cart";
import styles from "./general.module.css";
import { useSession } from "next-auth/react";

function Fundas() {
  const [session, loading] = useSession();
  const { covers, isLoading, fullColor, cubrevalijas, maletines } = useContext(
    GlobalContext
  );

  console.log("Datos de la sesión:", session);

  return (
    <div>
      <NavBar className={styles.NavBar} />
      <CardsContainer
        covers={covers}
        isLoading={isLoading}
        maletines={maletines}
        fullColor={fullColor}
        cubrevalijas={cubrevalijas}
      />
      <Cart />
    </div>
  );
}

export default Fundas;
