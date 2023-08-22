"use client";
import React, { useState, useContext, useEffect } from "react";
import styles from "./pedidoscard.module.css";
import Image from "next/image";
import jwt from "jsonwebtoken";
import ModalDireccion from "./modal";
import Modal from "react-modal";
import ModalCarrito from "./modalCarrito";
import ModalRepetirOrder from "./modalRepetirOrden";
import { useOrderLogic } from "./hooks/useOrderLogics";

function PedidosCard({
  date,
  total,
  status,
  orderDetails,
  deliveryDate,
  name,
  userData,
}) {
  const {
    setIsShippingModalOpen,
    setIsModalOpen,
    setIsConfirmModalOpen,
    isLoading,
    error,
    isConfirmModalOpen,
    isShippingModalOpen,
    isUpdateSuccess,
    productCountByType,
    imageUrl,
    isCubreValijas,
    statusClass,
    formattedDeliveryDate,
    formattedOrderDate,
    isModalOpen,
    handleOpenModal,
    formatProductName,
    groupedOrderDetails,
    formatSize,
    user,
    repeatOrder,
    userFormData,
    setUserFormData,
    handleUpdateUserInfo,
    handleOpenShippingModal,
  } = useOrderLogic(date, total, status, orderDetails, deliveryDate, name);

  function renderProductCounts(productCounts) {
    const counts = Object.entries(productCounts).map(
      ([type, count]) => `${type.replace(/_/g, " ")}: ${count} unidades`
    );
    return <p className={styles.detallePedido}>{counts.join(" | ")}</p>;
  }
  return (
    <div className={styles.contenedorCard}>
      <div className={styles.leftContainer}>
        <div className={styles.contenedorImagen}>
          <Image
            src={imageUrl}
            alt={orderDetails[0].products.name}
            className={styles.productImage}
            style={{ height: isCubreValijas ? "130px" : "150px" }}
            width={isCubreValijas ? 130 : 150}
            height={isCubreValijas ? 130 : 150}
          />
        </div>
        {/* Status y Detalle General */}
        <div className={styles.orderInfo}>
          <h2 className={statusClass}>{status}</h2>
          {formattedDeliveryDate && <h1>Enviado el {formattedDeliveryDate}</h1>}
          {renderProductCounts(productCountByType)}
        </div>
      </div>
      <div>
        <button
          className={styles.repeatButton}
          onClick={handleOpenShippingModal}
        >
          Modificar Datos de Envio{" "}
        </button>
        <p className={styles.detallePedidoB}>
          Direccion: {userData.address},Ciudad: {userData.city},Localidad:{" "}
          {userData.localidad},Codigo Postal: {userData.postalCode},Telefono:{" "}
          {userData.phone},Nombre del Local: {userData.shopName}, CUITL{" "}
          {userData.cuit}
          ,Nombre: {userData.name}, Apellido: {userData.lastname}
        </p>
      </div>
      <ModalDireccion
        userFormData={userFormData}
        setUserFormData={setUserFormData}
        isShippingModalOpen={isShippingModalOpen}
        handleUpdateUserInfo={handleUpdateUserInfo}
        setIsShippingModalOpen={setIsShippingModalOpen}
      />
      <div className={styles.contenedorBotones}>
        <button onClick={handleOpenModal} className={styles.detailButton}>
          Ver Detalle
        </button>
        <ModalCarrito
          isModalOpen={isModalOpen}
          formattedOrderDate={formattedOrderDate}
          groupedOrderDetails={groupedOrderDetails}
          formatProductName={formatProductName}
          formatSize={formatSize}
          setIsModalOpen={setIsModalOpen} // Añade esta línea
        />
        <button className={styles.repeatButton} onClick={repeatOrder}>
          Repetir Orden
        </button>{" "}
        <ModalRepetirOrder
          isConfirmModalOpen={isConfirmModalOpen}
          setIsConfirmModalOpen={setIsConfirmModalOpen}
        />
      </div>
    </div>
  );
}

export default PedidosCard;
