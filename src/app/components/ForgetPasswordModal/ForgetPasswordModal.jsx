import React, { useState } from "react";
import Modal from "react-modal";
import styles from "./ForgetPasswordModal.module.css";

function ForgotPasswordModal({ isOpen, closeModal }) {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("api/forget-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      alert(
        "Se ha enviado un correo electrónico con el enlace para restablecer tu contraseña."
      );
    } else {
      alert("Ha ocurrido un error. Por favor, intenta de nuevo.");
    }
  };
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.70)",
      backdropFilter: "blur(5px)", // this will add blur effect
    },
    content: {
      backgroundColor: "#232323",
      position: "absolute",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      height: "16.5625rem", // height
      width: "20rem", // width
      transform: "translate(-50%, -50%)", // centering
      padding: "2rem",
      border: "none",
    },
  };
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.Contenedor}>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Olvidaste tu contraseña"
        style={customStyles}
      >
        <div className={styles.contenedorCierre}>
          <span onClick={closeModal} className={styles.closeModal}>
            x
          </span>
        </div>
        <div className={styles.formContenedor}>
          <h2 className={styles.formSubs}>Olvidaste tu contraseña</h2>
          <div className={styles.formiculo}>
            <form onSubmit={handleSubmit} className={styles.formulario}>
              <input
                type="email"
                placeholder="Ingresa tu email"
                value={email}
                className={styles.input}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className={styles.boton}>
                Enviar enlace de restablecimiento
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ForgotPasswordModal;
