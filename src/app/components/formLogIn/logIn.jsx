import React, { useState, useContext } from "react";
import styles from "./logIn.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Cambiado de "next/navigation" a "next/router"
import { GlobalContext } from "./../../store/layout";
import ForgotPasswordModal from "./../ForgetPasswordModal/ForgetPasswordModal";
import namecontact from "../../../../public/name-contact-form.svg";
import mailcontact from "../../../../public/mail-contact-form.svg";
import namecontactverde from "../../../../public/name-contact-form-verde.svg";
import mailcontactverde from "../../../../public/mail-contact-form-verde.svg";
import { auth, googleProvider } from "../../../../pages/api/firebase/firebase";
import { signInWithPopup } from "firebase/auth"; // Ensure you've imported this function

function LogIn({ toggleForm }) {
  const { setIsAuthenticated } = useContext(GlobalContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [nombreFocused, setNombreFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [user, setUser] = useState(null);
  const signInWithGoogle = async () => {
    try {
      // Authenticate with Firebase
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      const [firstName, ...lastNameParts] = (
        firebaseUser.displayName || ""
      ).split(" ");
      const lastName = lastNameParts.join(" ") || "Not provided";
      // Call your API endpoint to register/get the user
      const response = await fetch("/api/fire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          lastName: lastName,
          provider: "GOOGLE", // Make sure this is correct; using "floripondio" as provider is unusual
        }),
      });

      // Ensure the response is valid before parsing
      if (response.ok) {
        const data = await response.json();
        // Save data to your local/global state or handle it however you want
        setUser(data);
        setIsAuthenticated(true);
        router.push("/store/fundas");
      } else {
        const data = await response.text(); // Attempt to get the response text in case it's not JSON
        console.error("Error registering/logging in via your API:", data);
      }
    } catch (error) {
      console.error("Error authenticating with Google:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.status === 200) {
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/store/fundas");
      setIsAuthenticated(true);
    } else {
      console.error(
        "Error en el inicio de sesión:",
        data.message || "Error desconocido"
      );
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  return (
    <div className={styles.generalContainer}>
      <h1 className={styles.tlte}>Bienvenido!</h1>
      <div className={styles.inputContenedor}>
        <h2 className={styles.subtitles}>
          Inicia sesion para proseguir con la compra
        </h2>
        <span className={styles.formSubs}>Email</span>
        <div className={styles.inputContainer}>
          <input
            type="email"
            value={email}
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
          <Image
            src={emailFocused ? mailcontactverde : mailcontact}
            alt="Email"
            className={styles.inputImagePlaceholder}
          />
        </div>
      </div>
      <div className={styles.inputContenedor}>
        <span className={styles.formSubs}>Contraseña</span>
        <div className={styles.inputContainer}>
          <input
            type="password"
            value={password}
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setNombreFocused(true)}
            onBlur={() => setNombreFocused(false)}
          />
          <Image
            src={nombreFocused ? namecontactverde : namecontact}
            alt="Nombre"
            className={styles.inputImagePlaceholder}
          />
        </div>
        <span className={styles.olvidaste} onClick={openModal}>
          Olvidaste la contraseña?
        </span>
      </div>
      <div className={styles.botoneraGeneral}>
        <div className={styles.botonera}>
          <button onClick={handleSubmit} className={styles.boton}>
            Iniciar Sesion
          </button>
          {/*   <button onClick={toggleForm} className={styles.boton2}>
            Crear Cuenta Nueva
          </button> */}
          <br />
          <div className={styles.orContainer}>
            <div className={styles.line}></div>
            <span className={styles.center}>O Ingresa con</span>
            <div className={styles.line}></div>
          </div>
          <br />
          <div className={styles.authcontainer}>
            <button className={styles.button3} onClick={signInWithGoogle}>
              <Image src={"./googlelog.svg"} width={25} height={25} />
              Google
            </button>
          </div>
          <br />
          <br />
          <button onClick={toggleForm} className={styles.botonNuevo}>
            Todavia no tienes ninguna cuenta? Haz click aqui{" "}
          </button>
        </div>
      </div>
      <div></div>
      <ForgotPasswordModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default LogIn;
