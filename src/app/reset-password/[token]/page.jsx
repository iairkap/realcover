"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Cambiado de "next/navigation" a "next/router"
import styles from "./reset-password.module.css";
import NavBar from "../../components/navBar/navBar";
import Image from "next/image";

function ResetPassword() {
  const router = useRouter();
  const { token } = router.query || {}; // Cambio realizado aquí
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Llamar al backend para cambiar la contraseña
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, password }),
    });

    if (res.ok) {
      alert("Contraseña cambiada con éxito");
      router.push("/logIn"); // O donde quieras redirigir al usuario
    } else {
      alert("Hubo un error al cambiar la contraseña");
    }
  };

  return (
    <div>
      <NavBar />
      <div className={styles.generalContainer}>
        <div className={styles.izqContainer}>
          <div className={styles.infoContainer}>
            <h1>Restablecer Contraseña</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputContainer}>
                <span>Nueva Contraseña</span>
                <input
                  className={styles.input}
                  type="password"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Confirmar Contraseña</span>

                <input
                  className={styles.input}
                  type="password"
                  placeholder=""
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button type="submit" className={styles.button}>
                Cambiar Contraseña
              </button>
            </form>
          </div>
        </div>
        <div className={styles.derContainer}></div>
        <Image
          src={"/DSC_8737.png"}
          width={617}
          height={925}
          className={styles.picture}
        />{" "}
      </div>
    </div>
  );
}

export default ResetPassword;
