import React from "react";
import styles from "./card.module.css";
import StarRating from "./starRating";

const ReviewCard = (props) => {
  const { review } = props;

  // Función para formatear la fecha
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Los meses en JavaScript van de 0 a 11
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div key={review.id} className={styles.generalContainer}>
      <img
        src={`/fotosRating/${review.reviewable_object.id}.webp`}
        alt="Review"
        style={{ width: "6.8rem", height: "10rem", marginRight: "10px" }}
      />
      <div>
        <div className={styles.cardReviewTitle}>
          <h2 className={styles.title}>{review.title}</h2>
          <StarRating rating={review.rate} />
        </div>
        {/* Aquí usamos la función para formatear la fecha antes de mostrarla */}
        <p className={styles.content}>{review.content}</p>
        <div className={styles.contentB}>
          <p className={styles.contentB}>{formatDate(review.date_created)}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
