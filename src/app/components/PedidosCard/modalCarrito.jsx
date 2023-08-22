import React from "react";
import Modal from "react-modal";
import styles from "./pedidoscard.module.css";
import Image from "next/image";
function ModalCarrito({
  isModalOpen,
  formattedOrderDate,
  groupedOrderDetails,
  setIsModalOpen,
  formatProductName,
  formatSize,
}) {
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
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
        <button onClick={() => setIsModalOpen(false)}>Cerrar</button>
        <h1 className={styles.titulo}>
          Pedido realizado el: {formattedOrderDate}
        </h1>
        <div className={styles.line}></div>

        {Object.values(groupedOrderDetails).map((detail) => (
          <div key={detail.product.id}>
            <div className={styles.modalContainer}>
              <div className={styles.contenedorImagen}>
                <Image
                  src={detail.product.picture}
                  alt={detail.product.name}
                  width={100}
                  height={100}
                />
              </div>
              <div className={styles.contenedorTexto}>
                <p>Modelo: {formatProductName(detail.product.name)}</p>
                {Object.entries(detail.sizes).map(([size, quantity]) => (
                  <p key={size}>
                    {formatSize(size)}: {quantity} unidades
                  </p>
                ))}
              </div>
            </div>
            <div className={styles.line}></div>
          </div>
        ))}
      </Modal>
    </div>
  );
}

export default ModalCarrito;
