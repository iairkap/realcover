"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import PedidosCardDashboard from "./pedidoscardDashboard";
import styles from "./pedidoscontainer.module.css";
import Modal from "react-modal";
import Etiquetas from "../etiquetasEnvio/etiquta";

function PedidosContainerDashboard({ setFetchCount, orders }) {
  const [isPDFVisible, setPDFVisible] = useState(false);

  return (
    <div className={styles.container}>
      {/*     <button onClick={handleOpenPDF}>Imprimir Datos de Envio</button>
       */}
      <Modal
        isOpen={isPDFVisible}
        onRequestClose={() => setPDFVisible(false)}
        // el estilo de tu modal...
      >
        <Etiquetas
          orders={orders.filter((order) => order.status === "En proceso")}
        />
      </Modal>

      {orders.map((order) => (
        <PedidosCardDashboard
          key={order.id}
          order={order.id}
          user={order.user} // Pasa el usuario relacionado al pedido
          orderId={order.id}
          {...order}
          className={styles.separacion}
          orders={orders.filter((order) => order.status === "En proceso")}
        />
      ))}
    </div>
  );
}

export default PedidosContainerDashboard;
