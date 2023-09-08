import React from "react";
import Modal from "react-modal";
import styles from "./pedidoscard.module.css";
function ModalRepetirOrder({ isConfirmModalOpen, setIsConfirmModalOpen }) {
  return (
    <div>
      <Modal
        isOpen={isConfirmModalOpen}
        onRequestClose={() => setIsConfirmModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(1px)",
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            background: "#232323",
            overflow: "auto",
            position: "relative",
            top: "auto",
            left: "auto",
            right: "auto",
            bottom: "auto",
            width: "20rem",
            transform: "none",
            padding: "2rem",
            boxSizing: "border-box",
          },
        }}
      >
        <div className={styles.container}>
          <p className={styles.titulo}>Pedido realizado con éxito</p>
          <button
            onClick={() => {
              setIsConfirmModalOpen(false);
              if (typeof window !== "undefined") {
                window.location.reload();
              }
            }}
            className={styles.detailButton}
          >
            Aceptar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalRepetirOrder;
