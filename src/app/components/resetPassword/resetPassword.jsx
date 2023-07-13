import React, { useState, useEffect } from "react";
import styles from "./resetPassword.module.css";

function ResetPassword({ toggleForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== verifyPassword) {
      return;
    }

    const res = await fetch("api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.status === 200) {
    } else {
    }
  };

  return (
    <div>
      <div>
        <div className={styles.inputContenedor}>
          <span className={styles.formSubs}>Email</span>
          <input
            type="email"
            placeholder="Ingrese su email"
            value={email}
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputContenedor}>
          <span className={styles.formSubs}>Contraseña</span>
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.inputContenedor}>
          <span className={styles.formSubs}>Verificar Contraseña</span>
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            value={verifyPassword}
            className={styles.input}
            onChange={(e) => setVerifyPassword(e.target.value)}
          />
        </div>
        <div className={styles.botonera}>
          <button onClick={handleSubmit} className={styles.boton}>
            Cambiar Contraseña
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
