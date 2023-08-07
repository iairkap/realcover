"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { GlobalContext } from "../../store/layout";
import Image from "next/image";
import axios from "axios";

function Cart() {
  const { cart, checkoutVisible, setCheckoutVisible, setCart } = useContext(
    GlobalContext
  );

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleModalClose = () => {
    setCheckoutVisible(false);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleQuantityChange = (itemId, size, quantityChange) => {
    console.log("Original cart:", cart);

    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) {
      console.log(`El ítem con ID ${itemId} no se encontró en el carrito`);
      return;
    }

    const sizeIndex = updatedCart[itemIndex].selectedSizes.findIndex(
      (s) => s.size === size
    );
    if (sizeIndex === -1) {
      console.log(
        `El tamaño ${size} no se encontró para el ítem con ID ${itemId}`
      );
      return;
    }

    console.log(
      "Before change:",
      updatedCart[itemIndex].selectedSizes[sizeIndex].quantity
    );

    // Asegurarse de que ambos valores sean números antes de sumarlos
    updatedCart[itemIndex].selectedSizes[sizeIndex].quantity =
      Number(updatedCart[itemIndex].selectedSizes[sizeIndex].quantity) +
      Number(quantityChange);

    console.log(
      "After change:",
      updatedCart[itemIndex].selectedSizes[sizeIndex].quantity
    );

    if (updatedCart[itemIndex].selectedSizes[sizeIndex].quantity <= 0) {
      updatedCart[itemIndex].selectedSizes.splice(sizeIndex, 1);
      if (updatedCart[itemIndex].selectedSizes.length === 0) {
        updatedCart.splice(itemIndex, 1);
      }
    }

    setCart(updatedCart);
  };
  const calculateTotals = () => {
    let total = 0;
    cart.forEach((item) => {
      item.selectedSizes.forEach((sizeItem) => {
        total += sizeItem.quantity * item.price;
      });
    });

    return total;
  };

  const calculateTotalUnits = () => {
    let totalUnits = 0;
    cart.forEach((item) => {
      item.selectedSizes.forEach((sizeItem) => {
        totalUnits += sizeItem.quantity;
      });
    });

    return totalUnits;
  };

  const [hasAttemptedToOrder, setHasAttemptedToOrder] = useState(false);
  if (!checkoutVisible) {
    return null;
  }

  const handleOrderAttempt = async () => {
    if (calculateTotalUnits() < 24) {
      const wantsToContinue = window.confirm(
        "La compra mínima mayorista es de 24 unidades, el precio del pedido puede variar. ¿Desea continuar con el pedido igualmente?"
      );

      if (!wantsToContinue) {
        setHasAttemptedToOrder(true);
        return;
      }
    }

    const orderData = {
      userId: user.id,
      cartItems: Object.values(cart).map((item) => ({
        id: item.id,
        sizeId: item.sizeId,
        type: item.type,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const response = await axios.post("/api/orders", orderData);

      if (response.status === 200) {
        const emailData = {
          cartData: cart,
          email: user.email,
          orderId: response.data.id,
        };

        axios
          .post("/api/emailorder", emailData)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalBackground} onClick={handleModalClose} />
      <div className={styles.modalContent}>
        <button onClick={handleClearCart}>Borrar Carrito</button>
        {user && (
          <h2>
            Hola {user.name} {user.lastname}
          </h2>
        )}
        <h1 className={styles.titulo}>CARRITO DE COMPRA</h1>
        <div className={styles.line}></div>
        <div className={styles.subtitulos}>
          <h2>Producto</h2>
          <h2>Subtotal</h2>
        </div>
        <div className={styles.line}></div>
        {Object.values(cart).map((item, index) => (
          <div key={index}>
            <div className={styles.contenedorImagen}>
              <Image src={item.picture} width={100} height={100} alt={"fa"} />
            </div>
            <p className={styles.subs}>{item.name}</p>
            {item.selectedSizes.map((sizeItem, sizeIndex) => (
              <div key={sizeIndex} className={styles.contenedorCard}>
                <div className={styles.textAlign}>
                  <p className={styles.subs}>{sizeItem.size}</p>
                  <p className={styles.subs}>{item.price}$</p>
                  <div className={styles.changeContainer}>
                    <button
                      className={styles.changeButton}
                      onClick={() =>
                        handleQuantityChange(item.id, sizeItem.size, -1)
                      }
                    >
                      -
                    </button>
                    <p>{sizeItem.quantity}</p>
                    <button
                      className={styles.changeButton}
                      onClick={() =>
                        handleQuantityChange(item.id, sizeItem.size, 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className={styles.subtotal}>
                  {item.price * sizeItem.quantity}$
                </p>
              </div>
            ))}
          </div>
        ))}
        <br />
        <br />
        <div className={styles.abajo}>
          <button onClick={handleOrderAttempt}>Ordenar</button>
          <p>Total: {calculateTotals()}$</p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
