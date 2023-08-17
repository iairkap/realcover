import React, { useState, useEffect } from "react";
import styles from "./logIn.module.css";
/* import ForgotPasswordModal from "../ForgetPasswordModal/ForgetPasswordModal";
 */
import { useRouter, usePathname } from "next/navigation"; // Importa esto
import { useContext } from "react";
import { GlobalContext } from "./../../store/layout";
import namecontact from "../../../../public/name-contact-form.svg";
import mailcontact from "../../../../public/mail-contact-form.svg";
import namecontactverde from "../../../../public/name-contact-form-verde.svg";
import mailcontactverde from "../../../../public/mail-contact-form-verde.svg";
import Image from "next/image";
function LogIn({ toggleForm }) {
  const { setIsAuthenticated } = useContext(GlobalContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [nombreFocused, setNombreFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  /*  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      try {
        const res = await fetch("/api/login-google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        });

        if (res.status === 200 && data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          console.log("data.user", data.user);
          router.push("/store/fundas");
          setIsAuthenticated(true);
        } else {
          // El inicio de sesión falló. Mostrar un mensaje de error al usuario.
          const resData = await res.json();
          alert(resData.message);
        }
      } catch (error) {
        console.error("Error al iniciar sesión con Google:", error);
        // Mostrar un mensaje de error al usuario.
        alert(`Error al iniciar sesión con Google: ${error.message}`);
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      alert(`Error al iniciar sesión con Google: ${error.message}`);
    }
  }; */

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
      // Aquí se almacena la información en el localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log("data.user", data.user);

      router.push("/store/fundas");
      setIsAuthenticated(true);
    } else {
      // Aquí deberías manejar el error en caso de que la respuesta no sea 200
      console.error(
        "Error en el inicio de sesión:",
        data.message || "Error desconocido"
      ); // Mostramos el error en la consola
    }
  };

  const openModal = () => setIsModalOpen(true);

  return (
    <div>
      <div>
        <div className={styles.inputContenedor}>
          <span className={styles.formSubs}>Email</span>
          <div className={styles.inputContainer}>
            <input
              type="email"
              placeholder=""
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
          <input
            type="password"
            placeholder=""
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
        <div className={styles.botonera}>
          <button onClick={handleSubmit} className={styles.boton}>
            Iniciar Sesion
          </button>
          <button onClick={toggleForm} className={styles.boton2}>
            Crear Cuenta Nueva
          </button>
          <div className={styles.logInContainerThird}>
            {/*             <Image src={Google} alt="image" onClick={handleGoogleLogin} />
             */}{" "}
          </div>
          <div>
            <span onClick={openModal}>Olvidaste la contraseña?</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
