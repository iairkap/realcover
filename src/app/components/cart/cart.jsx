"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { GlobalContext } from "../../store/layout";
import Image from "next/image";
import axios from "axios";
import ModalApply from "../applyCoupon/Coupon";

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
  const [isOpen, setIsOpen] = useState(false);

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

  const handleModalOpen = () => {
    setIsOpen(true);
  };

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

    updatedCart[itemIndex].selectedSizes[sizeIndex].quantity =
      Number(updatedCart[itemIndex].selectedSizes[sizeIndex].quantity) +
      Number(quantityChange);

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
      userId: JSON.parse(userData.id),
      total: calculateTotals(),
      status: "En proceso",
      products,
    };
    console.log("Sending order data to /api/order:", orderData);

    try {
      const response = await axios.post("/api/order", orderData);
      if (response.status === 200) {
        console.log("Order successfully dispatched", response.data);
        setOrderSuccess(true); // Mostrar mensaje de éxito
        const emailData = {
          cartData: cart,
          email: userData.email,
          orderId: response.data.order.id,
          total: totalAfterDiscount,
          name: userData.name,
          //   couponCode: coupon.id ? coupon.id : null, // Código del cupón aplicado (si existe)
        };

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
  console.log(itemsToDisplay);
  const sizeMapping = {
    Size7: '7"',
    Size8: '8"',
    Size9: '9"',
    Size10: '10"',
    Size12: '12"',
    Size14: '14"',
    Size14_1: '14.1"',
    Size15_6: '15.6"',
    Size17: '17"',
    S: "S",
    M: "M",
    L: "L",
  };
  const ProductType = {
    NEOPRENE_COVER: "NEOPRENE_COVER",
    MALETINES: "MALETINES",
    MALETINES_FULL_COLOR: "MALETINES_FULL_COLOR",
    TABLET_COVER: "TABLET_COVER",
    CUBRE_VALIJAS: "CUBRE_VALIJAS",
    PORTAFOLIOS: "PORTAFOLIOS",
    CON_BOLSILLO: "CON_BOLSILLO",
  };

  const ProductDisplayName = {
    [ProductType.NEOPRENE_COVER]: "Funda de neoprene",
    [ProductType.MALETINES]: "Maletin",
    [ProductType.MALETINES_FULL_COLOR]: "Full Color",
    [ProductType.TABLET_COVER]: "Fundas Rigidas",
    [ProductType.CUBRE_VALIJAS]: "Cubre Valijas",
    [ProductType.PORTAFOLIOS]: "Portafolios",
    [ProductType.CON_BOLSILLO]: "Con Bolsillo",
  };

  if (orderSuccess) {
    return <div className={styles.modal}>Orden realizada con éxito!</div>;
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modalBackground} onClick={handleModalClose} />
      <div className={styles.modalContent}>
        <div className={styles.nameContainer}>
          {userData && (
            <h2 className={styles.name}>
              Hola {userData.name} {userData.lastName}
            </h2>
          )}
          <button onClick={handleClearCart} className={styles.button}>
            Borrar Carrito
          </button>
        </div>
        <h1 className={styles.titulo}>CARRITO DE COMPRA</h1>
        <div className={styles.line}></div>
        <div className={styles.subtitulos}>
          <h2 className={styles.subs}>Producto</h2>
          <h2 className={styles.subs}>Subtotal</h2>
        </div>
        <div className={styles.line}></div>

        {Object.values(itemsToDisplay).map((item, index) => (
          <div key={index} className={styles.ab}>
            <div className={styles.contenedorImagen}>
              <Image src={item.picture} width={100} height={100} alt={"fa"} />
              <h2 className={styles.nombre}>
                {ProductDisplayName[item.productType] || item.productType}
              </h2>
            </div>

            {item.selectedSizes.map((sizeItem, sizeIndex) => (
              <div key={sizeIndex} className={styles.palurdo}>
                <div className={styles.containerGen}>
                  <p className={styles.sub}>
                    {sizeMapping[sizeItem.size] || sizeItem.size}
                  </p>
                  <p className={styles.sub}>{item.price}$</p>
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
                <div className={styles.price}>
                  <p className={styles.subtotal}>
                    {item.price * sizeItem.quantity}$
                  </p>
                </div>
              </div>
            ))}
            <div className={styles.line2}></div>
          </div>
        ))}

        <br />
        <br />
        <div className={styles.generalAbajo}>
          <div className={styles.abajo}>
            <button onClick={dispatchOrder} className={styles.button2}>
              Ordenar
            </button>
            <p className={styles.total}> {calculateTotals()}$</p>
          </div>

          {discount > 0 && (
            <>
              <div className={styles.discount}>
                <p>Descuento:</p>
                <p className={styles.numberdisc}>-{discount}$</p>
              </div>
              <div className={styles.discount}>
                <p>Total después del descuento:</p>
                <p> {totalAfterDiscount}$</p>
              </div>
              <br />
            </>
          )}
        </div>
        <button onClick={handleModalOpen} className={styles.codigo}>
          + CODIGO PROMOCION
        </button>
        <ModalApply
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          handleCouponApply={handleCouponApply}
        />
      </div>
    </div>
  );
}

export default Cart;
