"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import PedidosCard from "./PedidosCard";
import styles from "./pedidoscontainer.module.css";

function PedidosContainer() {
  const [orders, setOrders] = useState([]);
  console.log(orders);

  useEffect(() => {
    const fetchOrders = async () => {
      // 1. Obtener el ID del usuario del localStorage
      const storedUser = localStorage.getItem("user");
      if (!storedUser || storedUser === "undefined") return;

      const userId = JSON.parse(storedUser).id;

      // 2. Enviar este ID al servidor
      try {
        const response = await axios.get(`/api/order?userId=${userId}`);
        if (response.status === 200) {
          // 3. Actualizar el estado orders
          setOrders(response.data);
        }
        console.log("Orders:", response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className={styles.container}>
      {orders.map((order) => (
        <PedidosCard key={order.id} {...order} className={styles.separacion} />
      ))}
    </div>
  );
}

export default PedidosContainer;
