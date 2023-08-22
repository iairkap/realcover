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
            position: "fixed",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.829)",
            zIndex: 10,
            backdropFilter: "blur(4.5px)",
          },
          content: {
            backgroundColor: "white",
            position: "fixed",
            top: 0,
            left: "auto", // Añade esta línea
            right: 0,
            padding: "2rem",
            width: "80%",
            maxWidth: "30%",
            maxHeight: "90vh",
            zIndex: 20,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          },
        }}
      >
        <p>Pedido realizado con éxito</p>
        <button
          onClick={() => {
            setIsConfirmModalOpen(false);
            if (typeof window !== "undefined") {
              window.location.reload();
            }
          }}
        >
          Aceptar
        </button>
      </Modal>
    </div>
  );
}

export default ModalRepetirOrder;
