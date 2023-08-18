"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { GlobalContext } from "../../store/layout";
import Image from "next/image";
import axios from "axios";

function Cart() {
  const {
    cart,
    checkoutVisible,
    setCheckoutVisible,
    setCart,
    currentOrderDetails,
    setCurrentOrderDetails,
    userData,
    setUserData,
  } = useContext(GlobalContext);

  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleCouponApply = async () => {
    try {
      const response = await axios.post("/api/validate-coupon", {
        code: couponCode,
      });
      if (response.data.isValid) {
        setDiscount(response.data.discountValue);
        alert("Cupón aplicado exitosamente!");
      } else {
        alert("Cupón inválido o ya ha sido usado.");
      }
    } catch (error) {
      console.error("Error al validar el cupón:", error);
    }
  };

  /* useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/fafa");
        const data = await response.json();

        if (response.ok) {
          console.log("Esto es el cart:", data);
          setIsUserAuthenticated(true); // Aquí seteamos el valor a true
        } else {
          console.error("Error fetching user data:", data);
          setIsUserAuthenticated(false); // Aquí seteamos el valor a false
        }
      } catch (error) {
        console.error("Error during the request:", error);
        setIsUserAuthenticated(false); // Aquí seteamos el valor a false
      }
    };

    fetchUserData();
  }, []); */

  const handleModalClose = () => {
    setCheckoutVisible(false);
    setCurrentOrderDetails([]);
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

  const totalAfterDiscount = calculateTotals() - discount;

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

  const handleOrderAttempUserInformation = async () => {
    if (
      !userData.address ||
      !userData.city ||
      !userData.localidad ||
      !userData.postalCode ||
      !userData.shopName ||
      !userData.cuit
    ) {
      setInfoModalVisible(true);
      return;
    }
    handleOrderAttempt();
  };

  const handleOrderAttempt = async () => {
    if (calculateTotalUnits() < 24) {
      let wantsToContinue = false;
      if (typeof window !== "undefined") {
        wantsToContinue = window.confirm(
          "La compra mínima mayorista es de 24 unidades, el precio del pedido puede variar. ¿Desea continuar con el pedido igualmente?"
        );
      }

      if (!wantsToContinue) {
        setHasAttemptedToOrder(true);
        return;
      }
    }

    dispatchOrder();
  };
  const dispatchOrder = async () => {
    const userId = localStorage.getItem("user");
    if (!userId) {
      console.error("UserId not found in localStorage");
      return;
    }
    console.log("UserId:", userId);

    const products = cart
      .map((item) => {
        return item.selectedSizes.map((sizeItem) => ({
          productId: item.id,
          quantity: Number(sizeItem.quantity),
          unitPrice: item.price,
          size: sizeItem.size,
        }));
      })
      .flat();

    console.log("Products:", products);

    const orderData = {
      [userData.id]: JSON.parse(userData.id),
      total: calculateTotals(),
      status: "En proceso", // or whatever default status you want to use
      products,
    };
    // Añadiendo el console.log aquí para ver la data de la orden:
    console.log("Sending order data to /api/order:", orderData);

    try {
      const response = await axios.post("/api/order", orderData);
      if (response.status === 200) {
        console.log("Order successfully dispatched", response.data);
        setOrderSuccess(true); // Mostrar mensaje de éxito
        const emailData = {
          cartData: cart,
          email: user.email,
          orderId: response.data.order.id, // Ensure you are accessing the ID correctly based on your response structure
        };

        // Añadiendo el console.log aquí para ver la data del email:
        console.log("Sending email data to /api/emailorder:", emailData);

        axios
          .post("/api/emailorder", emailData)
          .then((res) => {
            console.log("Email dispatched successfully:", res);
          })
          .catch((error) => {
            console.error("Error dispatching the email:", error);
          });
      } else {
        console.error("Error while dispatching the order:", response.data);
      }
    } catch (error) {
      console.error("An error occurred while dispatching the order:", error);
    }
  };

  const itemsToDisplay = currentOrderDetails.length
    ? currentOrderDetails
    : cart;

  if (orderSuccess) {
    return <div className={styles.modal}>Orden realizada con éxito!</div>;
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modalBackground} onClick={handleModalClose} />
      <div className={styles.modalContent}>
        <button onClick={handleClearCart}>Borrar Carrito</button>
        {userData && (
          <h2>
            Hola {userData.name} {userData.lastName}
          </h2>
        )}
        <h1 className={styles.titulo}>CARRITO DE COMPRA</h1>
        <div className={styles.line}></div>
        <div className={styles.subtitulos}>
          <h2>Producto</h2>
          <h2>Subtotal</h2>
        </div>
        <div className={styles.line}></div>
        {Object.values(itemsToDisplay).map((item, index) => (
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
          <button onClick={dispatchOrder}>Ordenar</button>
          <p>Total original: {calculateTotals()}$</p>
          <p>Descuento: {discount}$</p>
          <p>Total después del descuento: {totalAfterDiscount}$</p>{" "}
        </div>
        <div className={styles.couponContainer}>
          <input
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Ingresa tu cupón aquí"
          />
          <button onClick={handleCouponApply}>Aplicar Cupón</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
