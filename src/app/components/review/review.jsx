"use client";

import React from "react";
import ReviewTotal from "./reviewtotal";
import ElegirnosMotivos from "./elegirnos";
import styles from "./elegirnos.module.css";
import Marcas from "./marcas";
import ReviewCardContainer from "./reviewCardContainer";
import Image from "next/image";
import { useState } from "react";
import Contactanos from "../contactanos/contactanos";

function Review(props) {
  const [zoom, setZoom] = useState("none");

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const isTopHalf = e.clientY < rect.top + rect.height / 2;

    // Set zoom based on mouse position
    setZoom(isTopHalf ? "out" : "in");
  };

  const handleMouseLeave = () => {
    setZoom("none");
  };

  return (
    <div className={styles.generalContainer}>
      <div className={styles.containerG}>
        <div className={styles.firstPart}>
          <div className={styles.divisor}></div>
          <h1 className={styles.titlebc}>Por qué Elegirnos?</h1>
          <div className={styles.motivosContainer}>
            <Image
              src={"/portafolio/portafolio6.png"}
              width={1171}
              height={818}
              alt={"portafolio9.png"}
              className={styles.picture}
            />
            <div className={styles.mots}>
              {ElegirnosMotivos.map((motivo) => (
                <div
                  key={motivo.id}
                  className={`${styles.motivoIndividual} ${styles.card}`}
                >
                  <div className={styles.cardFront}>
                    <h3 className={styles.titleDescription}>{motivo.title}</h3>
                    <p className={styles.description}>{motivo.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={styles.contenedorImagenes}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        ></div>

        <div className={styles.downContainer}>
          <div className={styles.divisor}></div>
          <ReviewCardContainer className={styles.reviewCardContainer} />
        </div>
        <div className={styles.marcasContainerb}>
          <h1 className={styles.titleb}>Marcas que confiaron en nosotros</h1>
          <div className={styles.marcasContainer}>
            <Marcas />
          </div>
        </div>
      </div>
      <Contactanos />
    </div>
  );
}

export default Review;

{
  /*        <br />
        <br />
        <div className={styles.marcasContainer}>
                  <h1 className={styles.titleb}>Marcas que nos han elegido</h1>

          <Marcas />
        </div>
        <br />
        <br />
        <br /> */
}
