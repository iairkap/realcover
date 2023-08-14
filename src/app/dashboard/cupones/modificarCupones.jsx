"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios"; // Para hacer las llamadas a la API.
import styles from "./cupon.module.css";

function UpdateCoupon({ isOpen, onRequestClose, onUserChange }) {
  const [discountValue, setDiscountValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("/api/update-discount-value", {
        discountValue: discountValue,
      }); // Asumiendo que tu nuevo endpoint es '/api/update-discount-value'.
      if (response.status === 200) {
        alert("Discount value updated successfully!");
        onRequestClose(); // Cierra el modal.
        if (onUserChange) onUserChange(); // Si proporcionaste alguna función de callback para ser ejecutada después de cambiar el user, será ejecutada aquí.
      }
    } catch (error) {
      console.error("There was an error updating the discount value:", error);
      alert("There was an error updating the discount value.");
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Crear un nuevo Cupón"
      ariaHideApp={false}
      style={{
        overlay: {
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.829)",
          zIndex: 10,
          backdropFilter: "blur(4.5px)",
        },
        content: {
          left: "40%",
          top: "15%",
          width: "fit-content",
          height: "fit-content",
          backgroundColor: "#F5F5F5",
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className={styles.Contenedor}>
          <h2 className={styles.titleModal}>Modificar Cupon</h2>
          <label className={styles.label}>
            Valor de Descuento Cupon Sign In
            <br />
            <input
              className={styles.inpub}
              type="number"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
            />
          </label>
          <br />
          <button type="submit" className={styles.button}>
            Actualizar
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default UpdateCoupon;
