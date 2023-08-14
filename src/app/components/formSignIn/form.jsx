import React, { useState } from "react";
import styles from "./form.module.css";

function FormSignIn({ toggleForm }) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isError = false;

    if (!name) {
      setNameError("Por favor, ingrese su nombre");
      isError = true;
    } else {
      setNameError("");
    }

    if (!lastName) {
      setLastNameError("Por favor, ingrese su apellido");
      isError = true;
    } else {
      setLastNameError("");
    }

    if (!email) {
      setEmailError("Por favor, ingrese su email");
      isError = true;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Por favor, ingrese su contraseña");
      isError = true;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Las contraseñas no coinciden");
      isError = true;
    } else {
      setConfirmPasswordError("");
    }

    if (!phone) {
      setPhoneError("Por favor, ingrese su teléfono");
      isError = true;
    } else {
      setPhoneError("");
    }

    if (isError) return;

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          lastName,
          email,
          password,
          phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.contenedorGeneral}>
        <div className={styles.columna}>
          <div className={styles.inputContenedor}>
            <span className={styles.formSubs}>Nombre</span>
            <input
              type="text"
              placeholder="Ingrese su nombre"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <span>{nameError}</span>}
          </div>
          <div className={styles.inputContenedor}>
            <span className={styles.formSubs}>Apellido</span>
            <input
              type="text"
              placeholder="Ingrese su apellido"
              value={lastName}
              className={styles.input}
              onChange={(e) => setLastName(e.target.value)}
            />
            {lastNameError && <span>{lastNameError}</span>}
          </div>
          <div className={styles.inputContenedor}>
            <span className={styles.formSubs}>Email</span>
            <input
              type="email"
              placeholder="Ingrese su email"
              value={email}
              className={styles.input}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <span>{emailError}</span>}
          </div>
        </div>
        <div className={styles.columna}>
          <div className={styles.inputContenedor}>
            <span className={styles.formSubs}>Contraseña</span>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              className={styles.input}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <span>{passwordError}</span>}
          </div>
          <div className={styles.inputContenedor}>
            <span className={styles.formSubs}>Repita su contraseña</span>
            <input
              type="password"
              placeholder="Confirme su contraseña"
              value={confirmPassword}
              className={styles.input}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPasswordError && <span>{confirmPasswordError}</span>}
          </div>
          <div className={styles.inputContenedor}>
            <span className={styles.formSubs}>Teléfono</span>
            <input
              type="text"
              placeholder="Ingrese su teléfono"
              value={phone}
              className={styles.input}
              onChange={(e) => setPhone(e.target.value)}
            />
            {phoneError && <span>{phoneError}</span>}
          </div>
        </div>
      </div>
      <div className={styles.botonera}>
        <button className={styles.boton} type="submit">
          Crear
        </button>
        <span onClick={toggleForm}>Ya tiene un usuario? ingrese aqui </span>
      </div>
    </form>
  );
}

export default FormSignIn;
