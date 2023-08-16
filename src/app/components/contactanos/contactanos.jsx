import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import styles from "./contactanos.module.css";
import Image from "next/image";
import whatsapp from "../../../../public/whatsapp.svg";
import whatsappverde from "../../../../public/whatsapp-verde.svg";
import email from "../../../../public/email.svg";
import emailverde from "../../../../public/emailverde.svg";

function Contactanos(props) {
  const [state, handleSubmit] = useForm("xzbleqar");
  const [isWhatsappHovered, setIsWhatsappHovered] = useState(false);
  const [isEmailHovered, setIsEmailHovered] = useState(false);

  if (state.succeeded) {
    return <p>¡Gracias por contactarnos! Hemos recibido tu mensaje.</p>;
  }

  return (
    <div className={styles.generalContainer}>
      <div className={styles.contactanosInfo}>
        <div className={styles.textContainer}>
          <h1 className={styles.titulo}>CONTACTANOS!</h1>
          <p className={styles.parrafo}>
            Completa el formulario y con gusto te responderemos en las proximas
            24 horas.
          </p>
        </div>
        <div className={styles.iconsContainer}>
          <a
            className={styles.whatsappContainer}
            href="https://wa.me/5491154231080?text=Hola%20estoy%20interesado%20en%20hacer%20un%20pedido"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsWhatsappHovered(true)}
            onMouseLeave={() => setIsWhatsappHovered(false)}
          >
            <Image
              src={isWhatsappHovered ? whatsappverde : whatsapp}
              className={`${styles.icon} ${
                isWhatsappHovered ? styles.animatedIcon : ""
              }`}
            />
            <p className={styles.number}>+5491154231080</p>
          </a>
          <div
            className={styles.whatsappContainer}
            onMouseEnter={() => setIsEmailHovered(true)}
            onMouseLeave={() => setIsEmailHovered(false)}
          >
            <Image
              src={isEmailHovered ? emailverde : email}
              className={`${styles.icon} ${
                isEmailHovered ? styles.animatedIcon : ""
              }`}
            />
            <p className={styles.number}>realcover@gmail.com</p>
          </div>
        </div>
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputsContainerGeneral}>
            <div className={styles.inputContainer}>
              <h4 className={styles.naming}>Nombre</h4>
              <input
                type="text"
                name="nombre"
                id="nombre"
                className={styles.inputs}
              />
              <ValidationError
                prefix="Nombre"
                field="nombre"
                errors={state.errors}
              />
            </div>
            <div className={styles.inputContainer}>
              <h4 className={styles.naming}>Email</h4>

              <input
                type="text"
                name="email"
                id="email"
                className={styles.inputs}
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </div>
            <div className={styles.inputContainer}>
              <h4 className={styles.naming}>Mensaje</h4>
              <textarea
                type="text"
                name="mensaje"
                id="mensaje"
                className={styles.mensaje}
              />
              <ValidationError
                prefix="Mensaje"
                field="mensaje"
                errors={state.errors}
              />
            </div>
          </div>
          <br />
          <div className={styles.botonContenedor}>
            <button
              type="submit"
              className={styles.enviar}
              disabled={state.submitting}
            >
              ENVIAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contactanos;
