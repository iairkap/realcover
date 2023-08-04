"use client";

import React, { useEffect, useState } from "react";
import PedidosCard from "./PedidosCard";

function PedidosContainer() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Parse the user string back to an object
    const userId = user.id;
    console.log(userId);
    if (userId) {
      fetch(`/api/orders?userId=${userId}`)
        .then((res) => res.json())
        .then(setOrders);
    }
  }, []);

  console.log(orders);

  return (
    <div>
      {orders.map((order) => (
        <PedidosCard key={order.id} {...order} />
      ))}
    </div>
  );
}

export default PedidosContainer;
