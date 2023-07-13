"use client";
import React, { useState, useContext, useEffect } from "react";
import styles from "./Card.module.css";
import { GlobalContext } from "../../store/layout";
const imagenDefaultCover =
  "https://firebasestorage.googleapis.com/v0/b/real-cover.appspot.com/o/imagenDefault.jpg?alt=media";

const imagenDefaultFullColor =
  "https://firebasestorage.googleapis.com/v0/b/real-cover.appspot.com/o/imagenDefaultFullColor.jpg?alt=media";

function CardComponent({
  id,
  picture,
  price,
  sizes,
  imageName,
  cleanImageName,
  fullColor = false,
}) {
  const sizeNames = sizes.map((sizeObject) => sizeObject.size.size);

  const [imageSrc, setImageSrc] = useState(
    fullColor ? imagenDefaultFullColor : imagenDefaultCover
  );

  const { addToCart, removeFromCart } = useContext(GlobalContext);
  const [addedSizes, setAddedSizes] = useState([]);

  const [selectedSizes, setSelectedSizes] = useState([
    { size: "", quantity: "" },
  ]);

  useEffect(() => {
    if (
      selectedSizes.every(
        (selectedSize) => selectedSize.size && selectedSize.quantity
      )
    ) {
      setSelectedSizes([...selectedSizes, { size: "", quantity: "" }]);
    }
  }, [selectedSizes]);

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
        addToCart(id, picture, price, imageName, selectedSize);
        const newAddedSizes = [...addedSizes];
        newAddedSizes.push(idx);
        setAddedSizes(newAddedSizes);
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
    setImageSrc(picture);
  };

  const mainImageSrc = picture;

  useEffect(() => {
    const mainImage = new Image();
    mainImage.src = mainImageSrc;
    mainImage.onload = () => {
      setImageSrc(picture);
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
          e.target.src = fullColor
            ? imagenDefaultFullColor
            : imagenDefaultCover;
        }}
        className={styles.image}
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
                className={`styles.input ${
                  addedSizes.includes(idx) ? "addedToCart" : ""
                }`}
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

export default CardComponent;
