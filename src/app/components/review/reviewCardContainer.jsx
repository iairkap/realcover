"use client";
import React, { useState, useEffect } from "react";
import StarRating from "./starRating";
import ReviewCard from "./reviewCard";
import { getReviewTotal } from "./reviewtotal";
import styles from "./cardContainer.module.css";
import Image from "next/image";
import PhotoGrid from "../pictureGrid/pictureGrid";

function ReviewCardContainer(props) {
  const { totalKvs, averageRating, excellentReviews } = getReviewTotal();

  const maxContentLength =
    "Es linda, se adapta bien a la valija por el momento conforme. Veremos después que vuelva del viaje."
      .length;

  const filteredReviews = excellentReviews.filter(
    (review) => review.content.length <= maxContentLength
  );

  const shuffledReviews = [...filteredReviews].sort(() => 0.5 - Math.random());

  const [REVIEWS_PER_PAGE, setREVIEWS_PER_PAGE] = useState(3);

  useEffect(() => {
    const updateReviewsPerPage = () => {
      setREVIEWS_PER_PAGE(window.innerWidth <= 768 ? 1 : 3);
    };

    window.addEventListener("resize", updateReviewsPerPage);

    updateReviewsPerPage();

    return () => {
      window.removeEventListener("resize", updateReviewsPerPage);
    };
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(shuffledReviews.length / REVIEWS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < maxPage) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const getCurrentPageReviews = () => {
    const start = (currentPage - 1) * REVIEWS_PER_PAGE;
    const end = start + REVIEWS_PER_PAGE;
    return shuffledReviews.slice(start, end);
  };

  return (
    <div className={styles.generalContainer}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>
          No solo escuches lo que decimos, <br /> mira lo que nuestros clientes
          opinan
        </h2>
      </div>
      <div className={styles.generalReviews}>
        <h5>
          <StarRating rating={averageRating} />
        </h5>
        <h5>{totalKvs} Reviews</h5>
      </div>
      <div className={styles.cardContainer}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={styles.button}
        >
          {"<"}
        </button>
        {getCurrentPageReviews().map((review, index) => (
          <ReviewCard
            key={index}
            review={review}
            className={styles.reviewCard}
          />
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === maxPage}
          className={styles.button}
        >
          {">"}
        </button>
      </div>
      <div className={styles.containerI}>
        <PhotoGrid />
      </div>
    </div>
  );
}

export default ReviewCardContainer;
