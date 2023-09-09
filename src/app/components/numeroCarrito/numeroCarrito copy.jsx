"use client";

import React from "react";
import { GlobalContext } from "../../store/layout";
import styles from "./numeroCarritob.module.css";

import { useContext } from "react";
function NumeroCarrito(props) {
  const { cart } = useContext(GlobalContext);

  // Sumar todas las cantidades de todos los productos
  const totalQuantity = cart.reduce((total, product) => {
    const productTotal = product.selectedSizes.reduce(
      (subtotal, size) => subtotal + parseInt(size.quantity, 10),
      0
    );
    return total + productTotal;
  }, 0);

  return (
    <div className={styles.container}>
      <h2 className={styles.numeros}>{totalQuantity}</h2>
    </div>
  );
}

export default NumeroCarrito;
