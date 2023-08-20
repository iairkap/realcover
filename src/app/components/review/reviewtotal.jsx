"use client";
import cubrevalijas from "../../../../cubrevalijas.json";
import fullcolor from "../../../../fullcolorrev.json";
import fundas from "../../../../fundaestampadarev.json";
import maletines from "../../../../maletin.json";
import portafolios from "../../../../portafolio.json";

export const getReviewTotal = () => {
  const dataSources = [cubrevalijas, fullcolor, fundas, maletines, portafolios];

  let totalKvs = 0;
  let totalRating = 0;
  let excellentReviews = [];

  dataSources.forEach((source) => {
    // Sumamos los kvs_total si existen en el JSON
    if (source.paging && source.paging.kvs_total) {
      totalKvs += source.paging.kvs_total;
    }

    // Sumamos los ratings para luego obtener un promedio
    if (source.rating_average) {
      totalRating += source.rating_average;
    }

    // Filtramos los comentarios excelentes y muy buenos
    if (source.reviews) {
      const goodReviews = source.reviews.filter(
        (review) => review.rate === 4 || review.rate === 5
      );
      excellentReviews.push(...goodReviews);
    }
  });

  // Calculamos el rating promedio
  const averageRating = totalRating / dataSources.length;

  return {
    totalKvs,
    averageRating,
    excellentReviews,
  };
};
