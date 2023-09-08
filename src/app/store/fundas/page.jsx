"use client";

import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../layout";
import CardsContainer from "../../components/cardsContainer/cardsContainer";
import NavBar from "../../components/navBar/navBar";
import Cart from "../../components/cart/cart";
import styles from "./general.module.css";

function Fundas() {
  const {
    isLoading,

    globalState,
    setGlobalState,
    userData,
    setUserData,
    isAuthenticated, // Nota que ya no se utiliza setIsAuthenticated aquí, pues no estamos cambiando su valor en este componente.
  } = useContext(GlobalContext);

  const displayType = globalState.displayType;

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
    const savedDisplayType = localStorage.getItem("displayType");

    if (savedDisplayType) {
      setGlobalState((prevState) => ({
        ...prevState,
        displayType: savedDisplayType,
      }));
    }
  }, []); // Nota: el array vacío significa que este efecto se ejecutará sólo una vez, cuando el componente se monte

  return (
    <div className={styles.background}>
      <NavBar className={styles.NavBar} />
      <CardsContainer isLoading={isLoading} />
      <Cart />
    </div>
  );
}

export default Fundas;
