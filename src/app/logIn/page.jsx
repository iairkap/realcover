"use client";
import React, { useState } from "react";
import styles from "./Signin.module.css";
import NavBar from "../components/navBar/navBar";
import Fondo from "../components/fondo/fondo";
import FormSignIn from "../components/formSignIn/form";
import LogIn from "../components/formLogIn/logIn";
import { GlobalContext } from "../store/layout";
import { useContext } from "react";

function SignIn(props) {
  const [showForm, setShowForm] = useState("LogIn"); // Inicialmente mostramos el formulario de inicio de sesión
  /*   const { setCheckoutVisible } = useContext(GlobalContext);
   */
  const toggleForm = () => {
    // Cambiamos el formulario que se muestra cuando se hace click en "Crear Cuenta Nueva"
    setShowForm(showForm === "LogIn" ? "FormSignIn" : "LogIn");
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <Fondo />
      <div className={styles.mainContent}>
        {showForm === "LogIn" ? (
          <h1 className={styles.titulo}>INICIAR SESION</h1>
        ) : (
          <h1 className={styles.titulo}>CREAR USUARIO</h1>
        )}
        <div className={styles.signInFormContainer}>
          {showForm === "LogIn" ? (
            <LogIn className={styles.formLogIn} toggleForm={toggleForm} />
          ) : (
            <FormSignIn className={styles.formSignIn} toggleForm={toggleForm} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
