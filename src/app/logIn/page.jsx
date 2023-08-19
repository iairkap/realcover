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
        <div className={styles.aspectRatio}>
          <Image
            src={"/DSC_8736.png"}
            width={505}
            height={605}
            className={styles.picture}
          />
        </div>

        <div className={styles.mainContent}>
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
