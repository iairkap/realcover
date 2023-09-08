"use client";

"use client";

import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../layout";
import CardsContainer from "../../components/cardsContainer/cardsContainer";
import NavBar from "../../components/navBar/navBar";
import Cart from "../../components/cart/cart";
import styles from "./general.module.css";
import LoadingContainer from "../../components/loading/loading";

function Fundas() {
  const {
    isLoading,
    setIsLoading, // Asegúrate de incluir setIsLoading aquí
    globalState,
    setGlobalState,
    userData,
    setUserData,
    isAuthenticated,
  } = useContext(GlobalContext);

  const displayType = globalState.displayType;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Establece isLoading a true antes de iniciar el fetch
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
      } finally {
        setIsLoading(false); // Establece isLoading a false después de que se completa el fetch (incluso si falla)
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
  }, []);

  return (
    <div className={styles.background}>
      <NavBar className={styles.NavBar} />
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <LoadingContainer />
        </div>
      ) : (
        <>
          <CardsContainer isLoading={isLoading} />
          <Cart />
        </>
      )}
    </div>
  );
}

export default Fundas;
