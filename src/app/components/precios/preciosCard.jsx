import React from "react";
import styles from "./preciosCard.module.css";
import Image from "next/image";

function PreciosCard({ product, onPriceUpdateClick }) {
  if (typeof product === "string") {
    return <div>{product}</div>;
  }

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
    [ProductType.NEOPRENE_COVER]: "Fundas",
    [ProductType.MALETINES]: "Valijas",
    [ProductType.MALETINES_FULL_COLOR]: "Full Color",
    [ProductType.TABLET_COVER]: "Fundas Rigidas",
    [ProductType.CUBRE_VALIJAS]: "Cubre Valijas",
    [ProductType.PORTAFOLIOS]: "Portafolios",
    [ProductType.CON_BOLSILLO]: "Con Bolsillo",
  };

  return (
    <div className={styles.cardContainer}>
      <Image src={product.picture} width={200} height={200} />
      <h2 className={styles.prices}>
        {ProductDisplayName[product.productType]}
      </h2>
      <h2 className={styles.prices}>${product.price}</h2>
      <button
        className={styles.button}
        onClick={() => onPriceUpdateClick(product.productType)}
      >
        Actualizar Precio
      </button>
    </div>
  );
}

export default PreciosCard;
