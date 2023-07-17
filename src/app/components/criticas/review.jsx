import styles from "./criticas.module.css";
import Image from "next/image";
import estrellas from "../../../../public/estrellas.svg";
import estrellahalf from "../../../../public/estrellahalf.svg";

function Review({ rating, ratingCount, title, date, content }) {
  const ratingStars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    ratingStars.push(
      <Image src={estrellas} className={styles.estrellas}></Image>
    );
  }

  if (halfStar) {
    ratingStars.push(
      <Image src={estrellahalf} className={styles.estrellasB}></Image>
    );
  }

  return (
    <div className={styles.contenedorDeB}>
      <div className={styles.staContenedor}>
        <div className={styles.contenedorEstrellas}>{ratingStars}</div>
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
  );
}

export default Review;
