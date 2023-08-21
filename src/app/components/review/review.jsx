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
        <h1 className={styles.title}>Por qué Elegirnos?</h1>
        <div className={styles.motivosContainer}>
          {ElegirnosMotivos.map((motivo) => (
            <div key={motivo.id} className={styles.motivoIndividual}>
              <h3 className={styles.titleDescription}>{motivo.title}</h3>
              <p className={styles.description}>{motivo.description}</p>
            </div>
          ))}
        </div>
        <br />
        <br />
        <div className={styles.marcasContainer}>


          <Marcas />
        </div>
        <br />
        <br />
        <br />
        <div className={styles.downContainer}>
          <ReviewCardContainer className={styles.reviewCardContainer} />
        </div>

      </div>
      <br />
      <br />

        <Contactanos />
    </div>
  );
}

export default Review;
