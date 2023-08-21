import React from "react";
import ReviewTotal from "./reviewtotal";
import ElegirnosMotivos from "./elegirnos";
import styles from "./elegirnos.module.css";
import Marcas from "./marcas";
import ReviewCardContainer from "./reviewCardContainer";

import Contactanos from "../contactanos/contactanos";

function Review(props) {
  return (
    <div className={styles.generalContainer}>
      <div className={styles.containerG}>
        <div className={styles.firstPart}>
          <h1 className={styles.title}>Por qué Elegirnos?</h1>
          <div className={styles.motivosContainer}>
            {ElegirnosMotivos.map((motivo) => (
              <div
                key={motivo.id}
                className={`${styles.motivoIndividual} ${styles.card}`}
              >
                <div className={styles.cardInner}>
                  <div className={styles.cardFront}>
                    <h3 className={styles.titleDescription}>{motivo.title}</h3>
                  </div>
                  <div className={styles.cardBack}>
                    <p className={styles.description}>{motivo.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.downContainer}>
          <ReviewCardContainer className={styles.reviewCardContainer} />
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
          <Marcas />
        </div>
        <br />
        <br />
        <br /> */
}
