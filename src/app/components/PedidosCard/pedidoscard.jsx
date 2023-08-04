import React from "react";
import styles from "./pedidoscard.module.css";

function PedidosCard({ date, total, status, orderDetails }) {
  // Renderiza los detalles de la orden como desees
  return (
    <div className={styles.contenedorCard}>
      {/* ... */}
      <div>
        {orderDetails.map((detail) => (
          <div key={detail.id}>
            {/* Aquí puedes renderizar los detalles de la orden como desees */}
            <p>Cantidad: {detail.quantity}</p>
            <p>Precio por unidad: {detail.unitPrice}</p>
            {/* ... */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PedidosCard;
