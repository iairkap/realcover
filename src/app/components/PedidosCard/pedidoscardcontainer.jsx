"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import PedidosCard from "./PedidosCard";
import styles from "./pedidoscontainer.module.css";

function PedidosContainer({ user }) {
  const [orders, setOrders] = useState([]);
  console.log(orders);
  useEffect(() => {
    const fetchOrders = async (userId) => {
      try {
        const response = await axios.get(`/api/order?userId=${userId}`);
        if (response.status === 200) {
          setOrders(response.data);
        }
        console.log("Orders:", response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    // Intenta obtener el ID del usuario desde el prop user si está presente.
    if (user && user.id) {
      fetchOrders(user.id);
    } else {
      // Si el ID no está en el prop user, búscalo en localStorage.
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        const userId = JSON.parse(storedUser).id;
        fetchOrders(userId);
      }
    }
  }, [user]);

  return (
    <div className={styles.container}>
      {orders.map((order) => (
        <PedidosCard key={order.id} {...order} className={styles.separacion} />
      ))}
    </div>
  );
}

export default PedidosContainer;
