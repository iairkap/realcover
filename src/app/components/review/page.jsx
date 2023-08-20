import React from "react";
import ReviewTotal from "./reviewtotal";
import ElegirnosMotivos from "./elegirnos";
import styles from "./elegirnos.module.css";

function Review(props) {
  return (
    <div className={styles.generalContainer}>
      <div className={styles.containerG}>
        <h1 className={styles.title}>Por qué Elegirnos?</h1>
        <br />
        <br />
        <div className={styles.motivosContainer}>
          {ElegirnosMotivos.map((motivo) => (
            <div key={motivo.id} className={styles.motivoIndividual}>
              <h3 className={styles.titleDescription}>{motivo.title}</h3>
              <p className={styles.description}>{motivo.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Review;
