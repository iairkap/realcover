import styles from "./review.module.css";
import Image from "next/image";
import estrellas from "../../../../public/estrellas.svg";
import estrellahalf from "../../../../public/estrellahalf.svg";

function Review({ rating, ratingCount, title, date, content }) {
  return (
    <div>
      <div className={styles.contenedorParaCentrar}>
        <div className={styles.contenedorDeB}>
          <div className={styles.contenedorEstrellas}>
            <Image src={estrellas} className={styles.estrellas}></Image>
            <Image src={estrellas} className={styles.estrellas}></Image>
            <Image src={estrellas} className={styles.estrellas}></Image>
            <Image src={estrellas} className={styles.estrellas}></Image>
            <Image src={estrellahalf} className={styles.estrellasB}></Image>
          </div>
          <h1>{rating}</h1>
          <h3>({ratingCount})</h3>
        </div>
        <div className={styles.textGeneral}>
          <div className={styles.subtitlos}>
            <h3>{title}</h3>
            <h3>{date}</h3>
          </div>
          <h6 className={styles.parrafo}>{content}</h6>
        </div>
      </div>
    </div>
  );
}

export default Review;
