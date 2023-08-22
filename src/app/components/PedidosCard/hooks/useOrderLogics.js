"use client";

import { useState, useEffect, useContext } from "react";
import styles from "../pedidoscard.module.css";
import { GlobalContext } from "../../../store/layout";

export const useOrderLogic = (
  date,
  total,
  status,
  orderDetails,
  deliveryDate,
  name
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const productCountByType = {};
  const { userData, setUserData } = useContext(GlobalContext);

  orderDetails.forEach((detail) => {
    const productType = detail.products.productType;
    if (!productCountByType[productType]) {
      productCountByType[productType] = 0;
    }
    productCountByType[productType] += detail.quantity;
  });
  const imageUrl = orderDetails[0].products.picture;
  const isCubreValijas = imageUrl.includes("CubreValijas%");

  console.log(orderDetails[0].products.picture);

  const statusClass =
    status === "En proceso" ? styles.enProceso : styles.entregado;

  const formattedDeliveryDate = deliveryDate
    ? new Intl.DateTimeFormat("es-ES", {
        month: "long",
        day: "numeric",
      }).format(new Date(deliveryDate))
    : null;
  const formattedOrderDate = new Intl.DateTimeFormat("es-ES", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  function formatProductName(name) {
    let formattedName = decodeURIComponent(name); // Convertir %2F a "/"
    formattedName = formattedName.replace("/", " "); // Reemplazar "/" con espacio en blanco
    if (formattedName.startsWith("Tablets")) {
      formattedName = formattedName.replace("Tablets", "Funda Rígidas");
    }
    return formattedName;
  }

  const groupedOrderDetails = orderDetails.reduce((acc, detail) => {
    const id = detail.products.id;
    const size = detail.size;

    if (!acc[id]) {
      acc[id] = {
        product: detail.products,
        sizes: {},
      };
    }

    if (!acc[id].sizes[size]) {
      acc[id].sizes[size] = detail.quantity;
    } else {
      acc[id].sizes[size] += detail.quantity;
    }

    return acc;
  }, {});

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

  function formatSize(sizeEnum) {
    return sizeMapping[sizeEnum] || sizeEnum;
  }

  const repeatOrder = async () => {
    setIsLoading(true);
    setError(null);

    const newOrderData = {
      userId: userData.id,
      total: total,
      status: status,
      products: orderDetails.map((detail) => ({
        productId: detail.products.id,
        quantity: detail.quantity,
        unitPrice: detail.products.price,
        size: detail.size,
      })),
    };
    console.log(
      "Enviando orden con datos:",
      JSON.stringify(newOrderData, null, 2)
    );

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrderData),
      });

      if (!response.ok) {
        throw new Error("Error creating the order");
      }

      const data = await response.json();
      console.log(data);

      // Puede que quieras actualizar el UI de alguna manera, por ejemplo mostrando un mensaje de éxito.
      setIsConfirmModalOpen(true);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const [userFormData, setUserFormData] = useState({
    address: userData.address || "",
    city: userData.city || "",
    localidad: userData.localidad || "",
    postalCode: userData.postalCode || "",
    phone: userData.phone || "",
    shopName: userData.shopName || "",
    cuit: userData.cuit || "",
  });

  function updateUserField(fieldName, value) {
    setUserFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  }
  const handleUpdateUserInfo = async (e) => {
    e.preventDefault();
    console.log("Attempting to update user with data:", userFormData);

    try {
      const response = await fetch(`/api/user/fafa`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userFormData),
        credentials: "include", // Include cookies in the request
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("User updated successfully:", responseData);
        setUserFormData({
          address: responseData.address || "",
          city: responseData.city || "",
          localidad: responseData.localidad || "",
          postalCode: responseData.postalCode || "",
          phone: responseData.phone || "",
          shopName: responseData.shopName || "",
          cuit: responseData.cuit || "",
        });
        setIsUpdateSuccess(true);
        setIsShippingModalOpen(false);
      } else {
        console.error("Error updating user:", responseData.message);
        setIsUpdateSuccess(false);
      }
    } catch (error) {
      console.error("Unexpected error during update:", error);
      setIsUpdateSuccess(false);
    }
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      alert("Datos actualizados con éxito!");
      setIsUpdateSuccess(false); // Reinicia el estado tras mostrar el mensaje
    }
  }, [isUpdateSuccess]);

  const handleOpenShippingModal = () => {
    setIsShippingModalOpen(true);
  };

  return {
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
    repeatOrder,
    userFormData,
    setUserFormData,
    handleUpdateUserInfo,
    handleOpenShippingModal,
    setIsModalOpen,
    setIsConfirmModalOpen,
    setIsShippingModalOpen,
    userData,
    setUserData,
  };
};
