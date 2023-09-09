import React from "react";
import Modal from "react-modal";
import styles from "./confrimacionCompra.module.css";
import Image from "next/image";
import Link from "next/link";

function ModalConfirmacion({ isModalOpen, setIsModalOpen }) {
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
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
        }}
      >
        <div className={styles.containerGeneral}>
          <button
            onClick={() => setIsModalOpen(false)}
            className={styles.closeButton}
          >
            X
          </button>
          <div className={styles.containerInfo}>
            <h1 className={styles.titulo}>Pedido realizado con exito!</h1>
            <Link href="/profile" className={styles.center}>
              <button className={styles.button}>
                Agregar Direccion de Envio
              </button>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalConfirmacion;
