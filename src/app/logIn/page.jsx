"use client";
import React, { useState } from "react";
import styles from "./Signin.module.css";
import NavBar from "../components/navBar/navBar";
import Fondo from "../components/fondo/fondo";
import FormSignIn from "../components/formSignIn/form";
import LogIn from "../components/formLogIn/logIn";
import ResetPassword from "../reset-password/[token]/page";

import { GlobalContext } from "../store/layout";
import { useContext } from "react";
import Image from "next/image";
function SignIn(props) {
  const [showForm, setShowForm] = useState("LogIn"); // Inicialmente mostramos el formulario de inicio de sesión
  /*   const { setCheckoutVisible } = useContext(GlobalContext);
   */
  const toggleForm = () => {
    // Cambiamos el formulario que se muestra cuando se hace click en "Crear Cuenta Nueva"
    setShowForm(showForm === "LogIn" ? "FormSignIn" : "LogIn");
  };

  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const toggleResetPasswordModal = () => {
    setShowResetPasswordModal(!showResetPasswordModal);
  };
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.generalContainer}>
        <Image
          src={"/DSC_8736.png"}
          width={617}
          height={925}
          className={styles.picture}
        />
        <div className={styles.mainContent}>
          {/*    {showForm === "LogIn" ? (
          <h1 className={styles.titulo}>INICIAR SESION</h1>
          ) : (
            <h1 className={styles.titulo}>CREAR USUARIO</h1>
          )} */}

          <div className={styles.signInFormContainer}>
            {showForm === "LogIn" ? (
              <LogIn className={styles.formLogIn} toggleForm={toggleForm} />
            ) : (
              <FormSignIn
                className={styles.formSignIn}
                toggleForm={toggleForm}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
