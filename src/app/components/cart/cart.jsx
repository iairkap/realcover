"use client";
import React, { useContext } from "react";
import styles from "./Cart.module.css";
import { GlobalContext } from "../../store/layout";
import Image from "next/image";
import { useState } from "react";

function Cart() {
  const {
    cart,
    checkoutVisible,
    setCheckoutVisible,
    removeFromCart,
    setCart, // añade esta línea
  } = useContext(GlobalContext);

  const handleModalClose = () => {
    setCheckoutVisible(false);
  };
  const handleClearCart = () => {
    setCart({});
  };
  const handleQuantityChange = (itemId, size, quantityChange) => {
    console.log(
      `itemId: ${itemId}, size: ${size}, quantityChange: ${quantityChange}`
    );

    const updatedCart = { ...cart };

    const key = `${itemId}-${size}`;

    if (!updatedCart[key]) {
      console.log(
        `El ítem con ID ${itemId} y tamaño ${size} no se encontró en el carrito`
      );
      return;
    }

    const updatedItem = {
      ...updatedCart[key],
      quantity: updatedCart[key].quantity + quantityChange,
    };

    if (updatedItem.quantity <= 0) {
      delete updatedCart[key];
    } else {
      updatedCart[key] = updatedItem;
    }

    setCart(updatedCart);
  };

  // Calcula el subtotal para cada ítem y el total del carrito
  const calculateTotals = () => {
    let total = 0;
    Object.values(cart).forEach((item) => {
      total += item.quantity * item.price;
    });

    return total;
  };

  const calculateTotalUnits = () => {
    let totalUnits = 0;
    Object.values(cart).forEach((item) => {
      totalUnits += item.quantity;
    });

    return totalUnits;
  };

  if (!checkoutVisible) {
    return null;
  }

  const [hasAttemptedToOrder, setHasAttemptedToOrder] = useState(false);

  const handleOrderAttempt = () => {
    if (calculateTotalUnits() < 24) {
      const wantsToContinue = window.confirm(
        "La compra mínima mayorista es de 24 unidades, el precio del pedido puede variar. ¿Desea continuar con el pedido igualmente?"
      );

      if (!wantsToContinue) {
        setHasAttemptedToOrder(true);
        return;
      }
    }

    // Aquí es donde iría tu lógica para procesar el pedido, pero la omitiremos por ahora
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalBackground} onClick={handleModalClose} />
      <div className={styles.modalContent}>
        <button onClick={handleClearCart}>Borrar Carrito</button>
        <h1 className={styles.titulo}>CARRITO DE COMPRA</h1>
        <div className={styles.line}></div>
        <div className={styles.subtitulos}>
          <h2>Producto</h2>
          <h2>Subtotal</h2>
        </div>
        <div className={styles.line}></div>
        {Object.values(cart).map((items, index) => {
          const firstItem = Array.isArray(items) ? items[0] : items;
          if (firstItem && firstItem.imageName) {
            console.log(`firstItem: ${JSON.stringify(firstItem)}`);

            const cleanImageName = firstItem.imageName.replace(/%2F/g, " ");
            return (
              <div key={index}>
                <div className={styles.contenedorCard}>
                  <div className={styles.contenedorImagen}>
                    <Image
                      src={firstItem.picture}
                      width={100}
                      height={100}
                      alt={"fa"}
                    />
                  </div>
                  <div className={styles.textoContenedor}>
                    <p className={styles.subs}>{cleanImageName}</p>
                    <div className={styles.textAlign}>
                      <p className={styles.subs}> {firstItem.size}</p>
                      <p className={styles.subs}> {firstItem.price}$</p>
                      {/* Subtotal para cada ítem */}
                      <div className={styles.changeContainer}>
                        <button
                          className={styles.changeButton}
                          onClick={() =>
                            handleQuantityChange(
                              firstItem.id,
                              firstItem.size,
                              -1
                            )
                          }
                        >
                          -
                        </button>
                        <p> {firstItem.quantity}</p>
                        <button
                          className={styles.changeButton}
                          onClick={() =>
                            handleQuantityChange(
                              firstItem.id,
                              firstItem.size,
                              1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <p>{firstItem.price * firstItem.quantity}$</p>{" "}
                </div>
                <div className={styles.line}></div>
              </div>
            );
          }
          return null;
        })}
        <br />
        <br />
        <div className={styles.abajo}>
          <button onClick={handleOrderAttempt}>Ordenar</button>
          {/* Mensaje de error */}
          {/*     {hasAttemptedToOrder && calculateTotalUnits() < 24 && (
            <span style={{ color: "red" }}>
              La compra mínima mayorista es de 24 unidades.
            </span>
          )} */}
          <p>Total: {calculateTotals()}$</p>
        </div>{" "}
        {/* Total del carrito */}
      </div>
    </div>
  );
}

export default Cart;
