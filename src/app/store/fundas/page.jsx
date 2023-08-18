"use client";

import React, { useEffect, useState, useContext, use } from "react";
import { GlobalContext } from "../layout";
import { getLayout } from "../layout";
import CardsContainer from "../../components/cardsContainer/cardsContainer";
import NavBar from "../../components/navBar/navBar";
import Cart from "../../components/cart/cart";
import styles from "./general.module.css";
import { useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getSession } from "next-auth/react";
function Fundas() {
  const { covers, isLoading, fullColor, cubrevalijas, maletines, tablets } =
    useContext(GlobalContext);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    //peticion para registrar correo de google en bdd
    const fetchData = async () => {
      try {
        const response = await fetch("/api/login-google");
        const data = await response.json();

        if (response.ok) {
          console.log("Login exitoso:", data);
        } else {
          console.error("Error en el login:", data);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/fafa");
        const data = await response.json();

        if (response.ok) {
          console.log("User data:", data);
        } else {
          console.error("Error fetching user data:", data);
        }
      } catch (error) {
        console.error("Error during the request:", error);
      }
      if (response.ok) {
        setUserData(data);
      }
    };

    fetchUserData();
  }, []);
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
