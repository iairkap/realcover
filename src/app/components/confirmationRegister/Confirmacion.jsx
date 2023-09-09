import React from "react";
import Modal from "react-modal";
import styles from "./ForgetPasswordModal.module.css";

function Confirmacion({ isOpen, closeModal, toggleForm }) {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.70)",
      backdropFilter: "blur(5px)",
    },
    content: {
      backgroundColor: "#232323",
      position: "absolute",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
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
        contentLabel="Confirmación de Registro"
        style={customStyles}
      >
        <div className={styles.cuponContainer}>
          <button onClick={closeModal} className={styles.button}>
            X
          </button>
          <h2 className={styles.title}>¡Registro exitoso!</h2>
          <p className={styles.subs}>
            Gracias por registrarte. Ahora puedes proceder con tu compra.
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default Confirmacion;
