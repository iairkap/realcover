import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import styles from "./contactanos.module.css";
import Image from "next/image";
import whatsapp from "../../../../public/whatsapp.svg";
import whatsappverde from "../../../../public/whatsapp-verde.svg";
import email from "../../../../public/email.svg";
import emailverde from "../../../../public/emailverde.svg";
import facebook from "../../../../public/facebook.svg";
import instagram from "../../../../public/instagram.svg";
import namecontact from "../../../../public/name-contact-form.svg";
import mailcontact from "../../../../public/mail-contact-form.svg";
import namecontactverde from "../../../../public/name-contact-form-verde.svg";
import mailcontactverde from "../../../../public/mail-contact-form-verde.svg";
function Contactanos(props) {
  const [state, handleSubmit] = useForm("xzbleqar");
  const [isWhatsappHovered, setIsWhatsappHovered] = useState(false);
  const [isEmailHovered, setIsEmailHovered] = useState(false);
  const [isFacebookHovered, setIsFacebookHovered] = useState(false);
  const [isInstagramHovered, setIsInstagramHovered] = useState(false);
  const [nombreFocused, setNombreFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  if (state.succeeded) {
    return <p>¡Gracias por contactarnos! Hemos recibido tu mensaje.</p>;
  }

  return (
    <div className={styles.generalContainer}>
      <div className={styles.contactanosInfo}>
        <div className={styles.textContainer}>
          <h1 className={styles.titulo}>Contactanos!</h1>
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
            className={styles.whatsappContainerb}
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
        <div className={styles.socialMedia}>
          <div className={styles.iconFacebookB}>
            <Image src={facebook} className={styles.iconFacebook} />
          </div>
          <div className={styles.iconFacebookB}>
            <Image src={instagram} className={styles.iconInstagram} />
          </div>
        </div>
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputsContainerGeneral}>
            <div className={styles.inputContainer}>
              <h4 className={styles.naming}>Nombre</h4>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  className={styles.inputs}
                  placeholder=""
                  onFocus={() => setNombreFocused(true)}
                  onBlur={() => setNombreFocused(false)}
                />
                <Image
                  src={nombreFocused ? namecontactverde : namecontact}
                  alt="Nombre"
                  className={styles.inputImagePlaceholder}
                />
              </div>
              <ValidationError
                prefix="Nombre"
                field="nombre"
                errors={state.errors}
              />
            </div>
            <div className={styles.inputContainer}>
              <h4 className={styles.naming}>Email</h4>

              <div className={styles.inputContainer}>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className={styles.inputs}
                  placeholder=""
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
                <Image
                  src={emailFocused ? mailcontactverde : mailcontact}
                  alt="Email"
                  className={styles.inputImagePlaceholder}
                />
              </div>
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
