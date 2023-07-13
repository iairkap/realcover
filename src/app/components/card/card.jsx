"use client";
import React, { useState, useContext, useEffect } from "react";
import styles from "./Card.module.css";
import { GlobalContext } from "../../store/layout";

function Card({ id, picture, price, sizes, imageName, size, cubreValijaSize }) {
  const sizeNames = sizes
    ? sizes.map((sizeObject) => sizeObject.size.size)
    : size
    ? size.map((sizeObject) => sizeObject.size.size)
    : cubreValijaSize
    ? cubreValijaSize
        .filter((sizeObject) => sizeObject.size.id !== 4) // Excluye el objeto de tamaño con id 4
        .map((sizeObject) => sizeObject.size.size)
    : [];
  const cleanImageName = imageName.replace(/(Fundas%2F|Valijas%2FV20)/, "");
  const imagenDefault =
    "https://firebasestorage.googleapis.com/v0/b/real-cover.appspot.com/o/imagenDefault.jpg?alt=media";

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
      setSelectedSizes([...selectedSizes, { size: "", quantity: "" }]);
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
  const handleAddToCart = () => {
    selectedSizes.forEach((selectedSize, idx) => {
      if (selectedSize.size !== "" && selectedSize.quantity !== "") {
        const cartItem = { id, picture, price, sizes, imageName, selectedSize };
        addToCart(cartItem);
        const newAddedSizes = [...addedSizes];
        newAddedSizes.push(idx);
        setAddedSizes(newAddedSizes);
        setSelectedSizeSubmitted(true);
      }
    });
  };

  const handleRemoveFromCart = (idx) => {
    removeFromCart(id, selectedSizes[idx].size);
    const newSelectedSizes = [...selectedSizes];
    newSelectedSizes.splice(idx, 1);
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

  return (
    <div className={styles.card}>
      <img
        src={imageSrc}
        alt={cleanImageName}
        onLoad={handleImageLoad}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = imagenDefault;
        }}
        className={styles.image}
      />
      <div className={styles.details}>
        {/*         <h1>{cleanImageName}</h1>
         */}{" "}
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
                  TAMAÑO{" "}
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
