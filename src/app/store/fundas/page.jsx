"use client";

import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../layout";
import { getLayout } from "../layout";
import CardsContainer from "../../components/cardsContainer/cardsContainer";
import NavBar from "../../components/navBar/navBar";
import Cart from "../../components/cart/cart";
import styles from "./general.module.css";
import { useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
function Fundas() {
  const {
    covers,
    isLoading,
    fullColor,
    cubrevalijas,
    maletines,
    tablets,
  } = useContext(GlobalContext);

  const { data: session, status: loading } = useSession();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user && user !== "undefined") {
      console.log("Usuario desde localStorage:", JSON.parse(user));
    } else {
      console.log("No se encontró ningún usuario en localStorage");
    }
  }, []);

  // rest of your code

  return (
    <div className={styles.background}>
      <NavBar className={styles.NavBar} />
      <CardsContainer
        covers={covers}
        isLoading={isLoading}
        maletines={maletines}
        fullColor={fullColor}
        cubrevalijas={cubrevalijas}
        tablets={tablets}
      />
      <Cart />
    </div>
  );
}

const FundasWrapper = () => (
  <SessionProvider>
    <Fundas />
  </SessionProvider>
);

FundasWrapper.displayName = "FundasWrapper";

export default FundasWrapper;

//
