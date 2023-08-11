"use client";

import React, { useState, useEffect, useRef } from "react";
import PreciosCard from "./preciosCard";
import axios from "axios";
import styles from "./preciosCardContainer.module.css";
import Modal from "react-modal";

function PreciosCardContainer(props) {
  const [products, setProducts] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/product/firstProductType");
        setProducts(response.data);
        console.log("Fetched products:", response.data);
      } catch (error) {
        console.error("Error fetching first products:", error);
      }
    }
    fetchData();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePriceUpdateClick = (productType) => {
    console.log("Selected product type:", productType);
    setSelectedProductType(productType);
    setIsModalOpen(true);
  };
  const newPriceInputRef = useRef(null); // <-- Crea la referencia aquí

  const handleConfirmPriceUpdate = async () => {
    const newPriceValue = parseFloat(newPriceInputRef.current.value); // <-- Usa la referencia aquí
    console.log("New Price Value:", newPriceValue);
    if (!newPriceValue || newPriceValue <= 0) {
      alert("Por favor, introduce un precio válido.");
      return;
    }

    try {
      const response = await axios.post("/api/product/updatePrice", {
        productType: selectedProductType,
        newPrice: newPriceValue,
      });
      console.log("Price update response:", response.data);

      setProducts((prevState) => ({
        ...prevState,
        [selectedProductType]: {
          ...prevState[selectedProductType],
          price: newPriceValue,
        },
      }));
    } catch (error) {
      console.error("Error updating product price:", error);
    }

    setIsModalOpen(false);
  };

  return (
    <div className={styles.gridContainer}>
      {Object.keys(products).map((productType) => (
        <PreciosCard
          key={productType}
          product={products[productType]}
          onPriceUpdateClick={() => handlePriceUpdateClick(productType)}
        />
      ))}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Actualizar Precio Modal"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.829)",
            zIndex: 10,
            backdropFilter: "blur(4.5px)",
          },
          content: {
            width: "fit-content",
            height: "fit-content",
            backgroundColor: "#232323;",
          },
        }}
      >
        <button onClick={handleCloseModal}>x</button>
        <div className={styles.modalPrices}>
          <input
            type="number"
            pattern="\d*"
            placeholder="Inserte el nuevo precio"
            className={styles.input}
            ref={newPriceInputRef} // <-- Asigna la referencia al elemento input
          />
          <button className={styles.button} onClick={handleConfirmPriceUpdate}>
            Confirmar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default PreciosCardContainer;
