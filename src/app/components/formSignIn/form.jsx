import React, { useState } from "react";
import styles from "./form.module.css";
import Confirmacion from "../confirmationRegister/Confirmacion.jsx";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Importa los iconos que necesitarás

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

  const [isRegistered, setIsRegistered] = useState(false);
  const handleSuccessfulRegistration = () => {
    setIsRegistered(true);
  };
  const [hasStartedTypingPassword, setHasStartedTypingPassword] =
    useState(false);
  const [hasStartedTypingConfirmPassword, setHasStartedTypingConfirmPassword] =
    useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

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

      if (response.ok) {
        // Esta es la línea movida
        handleSuccessfulRegistration();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.tlte}>Bienvenido!</h1>
      <h2 className={styles.subtitles}>
        Cree una cuenta para proseguir con la compra
      </h2>
      <div className={styles.contenedorGeneral}>
        <div className={styles.columna}>
          <div className={styles.inputContenedor}>
            <span className={styles.formSubs}>Nombre</span>
            <input
              type="text"
              placeholder={nameError ? nameError : ""}
              className={`${styles.input} ${nameError ? styles.error : ""}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setNameError("")}
            />
          </div>
          <div className={styles.inputContenedor}>
            <span className={styles.formSubs}>Apellido</span>
            <input
              type="text"
              placeholder={lastNameError ? lastNameError : ""}
              className={`${styles.input} ${lastNameError ? styles.error : ""}`}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onFocus={() => setLastNameError("")}
            />
          </div>
          <div className={styles.inputContenedor}>
            <span className={styles.formSubs}>Email</span>
            <input
              type="text"
              placeholder={emailError ? emailError : ""}
              className={`${styles.input} ${emailError ? styles.error : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailError("")}
            />
          </div>
        </div>
        <div className={styles.columna}>
          <div className={styles.inputContenedor}>
            <span className={styles.formSubs}>Contraseña</span>
            <div style={{ position: "relative" }}>
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder={passwordError ? passwordError : ""}
                className={`${styles.input} ${
                  passwordError ? styles.error : ""
                }`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setHasStartedTypingPassword(true); // Actualización del estado cuando el usuario empieza a escribir
                }}
                onFocus={() => setPasswordError("")}
              />
              {hasStartedTypingPassword && ( // El ícono sólo se mostrará si el usuario ha empezado a escribir
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px", // Ajustado para estar más cerca del borde
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                >
                  {isPasswordVisible ? <FiEyeOff /> : <FiEye />}
                </span>
              )}
            </div>
          </div>

          <div className={styles.inputContenedor}>
            <span className={styles.formSubs}>Repita su contraseña</span>
            <div style={{ position: "relative" }}>
              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                placeholder={confirmPasswordError ? confirmPasswordError : ""}
                className={`${styles.input} ${
                  confirmPasswordError ? styles.error : ""
                }`}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setHasStartedTypingConfirmPassword(true); // Actualización del estado cuando el usuario empieza a escribir
                }}
                onFocus={() => setConfirmPasswordError("")}
              />
              {hasStartedTypingConfirmPassword && ( // El ícono sólo se mostrará si el usuario ha empezado a escribir
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px", // Ajustado para estar más cerca del borde
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
                >
                  {isConfirmPasswordVisible ? <FiEyeOff /> : <FiEye />}
                </span>
              )}
            </div>
          </div>
          <div className={styles.inputContenedor}>
            <span className={styles.formSubs}>Teléfono</span>
            <input
              type="text"
              placeholder={phoneError ? phoneError : ""}
              className={`${styles.input} ${phoneError ? styles.error : ""}`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onFocus={() => setPhoneError("")}
            />
          </div>
        </div>
      </div>
      <br />
      <div className={styles.botonera}>
        <button className={styles.boton} type="submit">
          Crear
        </button>
        <span onClick={toggleForm} className={styles.toggle}>
          Ya tiene un usuario? ingrese aqui{" "}
        </span>
      </div>
      <Confirmacion
        isOpen={isRegistered}
        closeModal={() => setIsRegistered(false)}
        toggleForm={toggleForm}
      />
    </form>
  );
}

export default FormSignIn;
