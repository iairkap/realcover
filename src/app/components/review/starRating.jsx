import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars > 0 && rating - fullStars < 1;

  return (
    <div style={{ display: "inline-block", position: "relative" }}>
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return <FaStar key={index} color="#56B947" />;
        } else if (index === fullStars && hasHalfStar) {
          return (
            <div
              key={index}
              style={{ position: "relative", display: "inline-block" }}
            >
              <FaStar color="#6F796E" />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: `${(rating - fullStars) * 100}%`,
                  overflow: "hidden",
                  zIndex: 1,
                }}
              >
                <FaStar color="#56B947" />
              </div>
            </div>
          );
        } else {
          return <FaRegStar key={index} color="#395C34" />;
        }
      })}
    </div>
  );
};

export default StarRating;
