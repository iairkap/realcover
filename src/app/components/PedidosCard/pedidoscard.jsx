import React from "react";
import styles from "./pedidoscard.module.css";
import Image from "next/image";

function PedidosCard({ date, total, status, orderDetails }) {
  // Agrupar detalles por tipo de producto
  const productCountByType = {};
  orderDetails.forEach((detail) => {
    const productType = detail.products.productType;
    if (!productCountByType[productType]) {
      productCountByType[productType] = 0;
    }
    productCountByType[productType] += detail.quantity;
  });
  const imageUrl = orderDetails[0].products.picture;
  const isCubreValijas = imageUrl.includes("CubreValijas%");

  console.log(orderDetails[0].products.picture);

  const statusClass =
    status === "En proceso" ? styles.enProceso : styles.entregado;

  return (
    <div className={styles.contenedorCard}>
      {/* Contenedor para Imagen + Información */}
      <div className={styles.leftContainer}>
        {/* Imagen del primer producto */}
        <div className={styles.contenedorImagen}>
          <img
            src={imageUrl}
            alt={orderDetails[0].products.name}
            className={styles.productImage}
            style={{ height: isCubreValijas ? "130px" : "150px" }}
          />
        </div>
        {/* Status y Detalle General */}
        <div className={styles.orderInfo}>
          <h2 className={statusClass}>{status}</h2>
          {Object.entries(productCountByType).map(([type, count]) => (
            <p key={type} className={styles.detallePedido}>
              {type.replace(/_/g, " ")}: {count} unidades
            </p>
          ))}
        </div>
      </div>

      {/* Contenedor de botones */}
      <div className={styles.contenedorBotones}>
        {/* Botón Ver Detalle */}
        <button className={styles.detailButton}>Ver Detalle</button>
        {/* Botón Repetir Orden */}
        <button className={styles.repeatButton}>Repetir Orden</button>
        {/* Sección Detalle (por ahora oculta) */}
      </div>
    </div>
  );
}

export default PedidosCard;
