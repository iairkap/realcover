"use client";

import React from "react";
import StarRating from "./starRating";
import ReviewCard from "./reviewCard";
import { getReviewTotal } from "./reviewtotal";
function ReviewCardContainer(props) {
  const { totalKvs, averageRating, excellentReviews } = getReviewTotal();

  console.log(getReviewTotal());

  return (
    <div>
      <h5>
        <StarRating rating={averageRating} />
      </h5>
      <h5>{totalKvs} Reviews</h5>
    </div>
  );
}

export default ReviewCardContainer;
