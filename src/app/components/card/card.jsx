"use client";
import React, { useState, useContext, useEffect } from "react";
import styles from "./Card.module.css";
import { GlobalContext } from "../../store/layout";
import imagenDefault from "../../../../public/fundas/loading.png";
import NextImage from "next/image";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import tic from "../../../../public/tic.svg";

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
  const [addedSuccessfully, setAddedSuccessfully] = useState([]);

  const cleanImageName = imageName
    ? imageName.replace(/(Fundas%2F|Valijas%2FV20)/, "")
    : "";
  const imagenDefault =
    "https://firebasestorage.googleapis.com/v0/b/real-cover.appspot.com/o/loading.png?alt=media&token=56c478e1-1bd3-45b5-82df-e65695c460f4";

  const [imageSrc, setImageSrc] = useState(imagenDefault);
  const [mainImageSrc, setMainImageSrc] = useState(picture[0]);
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
    const loadImage = async () => {
      try {
        const mainImage = new Image();
        mainImage.src = picture[0];
        mainImage.onload = () => {
          setMainImageSrc(picture[0]);
        };
        mainImage.onerror = () => {
          // Si la primera imagen falla, intentamos con la segunda
          const fallbackImage = new Image();
          fallbackImage.src = picture[1]; // Asegúrate de que picture[1] exista
          fallbackImage.onload = () => {
            setMainImageSrc(picture[1]);
          };
          fallbackImage.onerror = () => {
            console.error("Ambas imágenes fallaron al cargar.");
          };
        };
      } catch (error) {
        console.error("Error cargando la imagen:", error);
      }
    };

    loadImage();
  }, [picture]);

  const handleAddToCart = () => {
    // Filtrar tamaños que no están vacíos
    const sizesToAdd = selectedSizes.filter((ss) => ss.size && ss.quantity);

    if (sizesToAdd.length > 0) {
      addToCart({ id, picture, price, productType, name }, sizesToAdd);
      setSelectedSizeSubmitted(true);

      // Marcamos los ítems que se agregaron con éxito como "true" en la matriz
      setAddedSuccessfully(
        selectedSizes.map((size, index) => sizesToAdd.includes(size))
      );
    }
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
    <div className={styles.cardContainer}>
      <Tooltip />

      <div className={styles.imageContainer}>
        <NextImage
          src={imageSrc}
          alt={cleanImageName}
          onLoad={handleImageLoad}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = imagenDefault;
          }}
          className={styles.image}
          width={290}
          height={290}
        />
      </div>
      <div>
        <div className={styles.details}>
          {selectedSizes.map((selectedSize, idx) => (
            <div key={idx} className={styles.optionContainer}>
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
              {addedSuccessfully[idx] && (
                <div className={styles.ticContainer}>
                  <NextImage
                    src={tic}
                    alt="Item agregado con éxito"
                    width={16}
                    height={16}
                  />
                </div>
              )}
            </div>
          ))}
          <div className={styles.botonera}>
            <button
              onClick={addAnotherSize}
              className={styles.addButton}
              data-tip="Agregar un nuevo tamaño"
            >
              <NextImage
                src={"/size.svg"}
                width={30}
                height={30}
                data-tooltip-id="agregar-size"
                data-tooltip-content=" Agregar un nuevo tamaño"
              />
            </button>
            <button
              onClick={handleAddToCart}
              className={styles.button}
              data-tooltip-id="agregar-carrito"
              data-tooltip-content=" Agregar al carrito"
            >
              <NextImage src={"/agregarcarrito.svg"} width={30} height={30} />
            </button>
          </div>
        </div>
        <Tooltip id="agregar-size" place="right" />
        <Tooltip id="agregar-carrito" place="left" />
      </div>
    </div>
  );
}

export default Card;
