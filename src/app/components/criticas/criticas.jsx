import React from "react";

import Image from "next/image";
import styles from "./criticas.module.css";
import Review from "./review";
function Criticas(props) {
  return (
    <div className={styles.contenedor}>
      <div>
        <h1 className={styles.titulo}>NUESTRAS CRITICAS</h1>
      </div>
      <div className={styles.reviewGeneralContenedor}>
        <div className={styles.reviewsContenedor}>
          <Review
            rating={4.8}
            ratingCount={1930}
            title={"Full Color"}
            date={"19 may.2021"}
            content={
              "Excelente en todos los aspectos. Al principio dudaba de comprar por unos comentarios que decían que el cierre era endeble, o que la tela que separaba los compartimentos era finita, o que la notebook entraba demasiado justa. Pero se ve que los fabricantes leyeron todo y lo cambiaron porque el cierre es súper fuerte y resistente, la tela es gruesa, y el tamaño es perfecto. Encima las terminaciones son perfectas también, al igual que el estampado. 10 /10."
            }
          />
          <Review
            rating={4.5}
            ratingCount={1437}
            title={"Fundas de Neoprene"}
            date={"06 sep.2022"}
            content={
              "La verdad, es probablemente la mejor funda que he comprado para una notebook. La calidad del neoprene es excelente, se la nota al tacto que es de muy alta calidad. El estampado del diseño es perfecto; no se deforma, no se estira, no pierde la calidad. Si llegaste hasta esta publicación buscando una funda, no lo dudes y compralo. No te vas a arrepentir."
            }
          />
        </div>
        <div className={styles.reviewsContenedor}>
          <Review
            rating={4.4}
            ratingCount={270}
            title={"Cubrevalija"}
            date={"23 may.2023"}
            content={
              "Muy buen producto, funciona también para una valija más grande porque se estira el material. Súper útil para proteger la valija."
            }
          />
          <Review
            rating={4.5}
            ratingCount={1437}
            title={"Maletines"}
            date={"27 jul.2021"}
            content={
              "Hermoso! muy buena calidad, es más, mejor de lo que en la foto se ve, es tal cual pero mejor. Me encanta!! super práctico, diseño lindo. No es un material que te va a proteger la compu de una caída, pero si de rayas y otras cosas más leves. Me encantó y ya se lo recomendé a todas mis amigas."
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Criticas;
