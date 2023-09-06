"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import PedidosCardDashboard from "./pedidoscardDashboard";
import styles from "./pedidoscontainer.module.css";
import Modal from "react-modal";
import Etiquetas from "../etiquetasEnvio/etiquta";

function PedidosContainerDashboard({ setFetchCount, orders }) {
  const [isPDFVisible, setPDFVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [filterStatus, setFilterStatus] = useState("");

  // Filtrar pedidos según el estado seleccionado
  const filteredOrders = filterStatus
    ? orders.filter((order) => order.status === filterStatus)
    : orders;

  // Obtener pedidos actuales
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  // Cambiar página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      <div>
        <label className={styles.filter}>Filtrar por estado:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="En proceso">En proceso</option>
          {/* Puedes agregar más opciones si es necesario */}
        </select>
      </div>

      <Modal isOpen={isPDFVisible} onRequestClose={() => setPDFVisible(false)}>
        <Etiquetas
          orders={orders.filter((order) => order.status === "En proceso")}
        />
      </Modal>

      {currentOrders.map((order) => (
        <PedidosCardDashboard
          key={order.id}
          order={order.id}
          user={order.user}
          orderId={order.id}
          {...order}
          className={styles.separacion}
          orders={orders.filter((order) => order.status === "En proceso")}
        />
      ))}

      <div className={styles.pagination}>
        {[
          ...Array(Math.ceil(filteredOrders.length / ordersPerPage)).keys(),
        ].map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={styles.button}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PedidosContainerDashboard;
