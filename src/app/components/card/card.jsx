"use client";
import React, { useState, useContext, useEffect } from "react";
import styles from "./Card.module.css";
import { GlobalContext } from "../../store/layout";
import imagenDefault from "../../../../public/fundas/loading.png";
import NextImage from "next/image";

function Card({
  id,
  picture,
  price,
  sizes,
  imageName,
  name,
  size,
  cubreValijaSize,
  productType,
}) {
  const sizeNames = sizes || size || cubreValijaSize || [];

  const cleanImageName = imageName
    ? imageName.replace(/(Fundas%2F|Valijas%2FV20)/, "")
    : "";
  const imagenDefault =
    "https://firebasestorage.googleapis.com/v0/b/real-cover.appspot.com/o/loading.png?alt=media&token=56c478e1-1bd3-45b5-82df-e65695c460f4";

  const [imageSrc, setImageSrc] = useState(imagenDefault);
  const [mainImageSrc, setMainImageSrc] = useState(picture);
  const { addToCart, removeFromCart } = useContext(GlobalContext);
  const [addedSizes, setAddedSizes] = useState([]);
  const [selectedSizeSubmitted, setSelectedSizeSubmitted] = useState(false);

  const [selectedSizes, setSelectedSizes] = useState([
    { size: "", quantity: "" },
  ]);

  useEffect(() => {
    if (selectedSizeSubmitted) {
      // setSelectedSizes([...selectedSizes, { size: "", quantity: "" }]);
      setSelectedSizeSubmitted(false);
    }
    ``;
  }, [selectedSizeSubmitted]);

  const handleSizeChange = (idx, event) => {
    const newSelectedSizes = [...selectedSizes];
    newSelectedSizes[idx].size = event.target.value;
    setSelectedSizes(newSelectedSizes);
  };

  const handleQuantityChange = (idx, event) => {
    const newSelectedSizes = [...selectedSizes];
    newSelectedSizes[idx].quantity = event.target.value;
    setSelectedSizes(newSelectedSizes);
  };
  const handleImageLoad = () => {
    setImageSrc(mainImageSrc);
  };

  useEffect(() => {
    const mainImage = new Image();
    mainImage.src = picture;
    mainImage.onload = () => {
      setMainImageSrc(picture);
    };
  }, [picture]);
  const handleAddToCart = () => {
    // Filtrar tamaños que no están vacíos
    const sizesToAdd = selectedSizes.filter((ss) => ss.size && ss.quantity);

    addToCart({ id, picture, price, productType, name }, sizesToAdd);
    setSelectedSizeSubmitted(true);
  };

  const handleRemoveFromCart = (idx) => {
    const sizeToRemove = selectedSizes[idx].size;
    removeFromCart(id, sizeToRemove);
    const updatedSelectedSizes = [...selectedSizes];
    updatedSelectedSizes.splice(idx, 1);
    setSelectedSizes(updatedSelectedSizes);
  };

  const addAnotherSize = () => {
    setSelectedSizes([...selectedSizes, { size: "", quantity: "" }]);
  };

  return (
    <div className={styles.card}>
      <NextImage
        src={imageSrc}
        alt={cleanImageName}
        onLoad={handleImageLoad}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = imagenDefault;
        }}
        className={styles.image}
        width={250}
        height={250}
      />
      <div className={styles.details}>
        {selectedSizes.map((selectedSize, idx) => (
          <div key={idx} className={styles.optionContainer}>
            <div className={styles.pruebaContenedor}>
              <select
                className={styles.selector}
                style={addedSizes.includes(idx) ? { borderColor: "green" } : {}}
                value={selectedSize.size}
                onChange={(event) => handleSizeChange(idx, event)}
              >
                <option className={styles.option} value="">
                  TAMAÑO
                </option>
                {sizeNames.map((sizeName, sizeIdx) => (
                  <option key={sizeIdx} value={sizeName}>
                    {sizeName}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={selectedSize.quantity}
                onChange={(event) => handleQuantityChange(idx, event)}
                placeholder="Cantidad"
                className={styles.input}
              />
              <button
                onClick={() => handleRemoveFromCart(idx)}
                className={styles.removeButton}
                disabled={selectedSizes.length <= 1}
              >
                X
              </button>
            </div>
          </div>
        ))}
        <button onClick={addAnotherSize} className={styles.addButton}>
          Agregar otro tamaño
        </button>
        <div className={styles.botonera}>
          <button onClick={handleAddToCart} className={styles.button}>
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
