"use client";

import React from "react";
import { useState } from "react";
import styles from "./contactanos.module.css";
import whatsapp from "../../../../public/whatsapp.svg";
import whatsappverde from "../../../../public/whatsapp-verde.svg";
import email from "../../../../public/email.svg";
import emailverde from "../../../../public/emailverde.svg";
import Image from "next/image";
import trapecio from "../../../../public/trapecio.svg";
function Contactanos(props) {
  const [state, setState] = useState({ nombre: "", email: "", mensaje: "" });
  const [error, setError] = useState({ nombre: "", email: "", mensaje: "" });
  const [isWhatsappHovered, setIsWhatsappHovered] = useState(false);
  const [isEmailHovered, setIsEmailHovered] = useState(false);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const validarEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const validarFormulario = () => {
    let errores = {};
    if (!state.nombre) errores.nombre = "El nombre es obligatorio.";
    if (!state.email || !validarEmail(state.email))
      errores.email = "Ingresa un correo electrónico válido.";
    if (!state.mensaje) errores.mensaje = "El mensaje es obligatorio.";
    setError(errores);
    return errores;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errores = validarFormulario();
    if (Object.keys(errores).length === 0) {
      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(state),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  return (
    <div>
      <div className={styles.generalContainer}>
        <div className={styles.izqContainer}>
          <h1 className={styles.titulo}>CONTACTANOS!</h1>
          <p className={styles.parrafo}>
            En caso de que estés interesado en nuestras fundas de notebook de
            neoprene, cubrevalijas, portafolios y más, nos encantaría hablar con
            vos. Ofrecemos excelentes oportunidades para ventas mayoristas con
            condiciones atractivas. No dudes en contactarnos para descubrir cómo
            nuestros productos pueden mejorar tu oferta comercial.
          </p>
          <div className={styles.iconosForm}>
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

        <div className={styles.derContainer}>
          <div className={styles.formContainer}>
            <h1 className={styles.titleForm}>ESTAMOS PARA AYUDAR!</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Ingresa tu nombre"
                name="nombre"
                value={state.nombre}
                onChange={handleChange}
                className={styles.inputs}
              />
              <p>{error.nombre}</p>
              <input
                type="text"
                placeholder="Ingresa tu email"
                name="email"
                value={state.email}
                onChange={handleChange}
                className={styles.inputsb}
              />
              <p>{error.email}</p>
              <input
                type="text"
                placeholder="Mensaje..."
                name="mensaje"
                value={state.mensaje}
                onChange={handleChange}
                className={styles.mensaje}
              />
              <p>{error.mensaje}</p>
              <button type="submit" className={styles.enviar}>
                ENVIAR
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactanos;
