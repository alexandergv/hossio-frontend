import { jsx } from 'react/jsx-runtime';
import { useEffect } from 'react';
/* empty css                         */

const ReviewStars = ({
  readOnly,
  ratingScore,
  rating,
  setRating = () => console.error("default function setRating shouldnt be called."),
  style
}) => {
  useEffect(() => {
    if (ratingScore && !readOnly) {
      setRating(ratingScore);
    } else if (readOnly) {
      rating = ratingScore;
    }
  }, []);
  const handleRatingChange = (newRating) => {
    if (!readOnly) {
      setRating(Math.floor(newRating));
    }
  };
  return /* @__PURE__ */ jsx("div", { style, className: `review-stars ${readOnly ? "read-only" : "editable"}`, children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(
    "span",
    {
      className: `star ${rating >= star || ratingScore >= star ? "selected" : ""}`,
      onClick: () => handleRatingChange(star),
      style: { cursor: readOnly ? "default" : "pointer" },
      children: "★"
    },
    star
  )) });
};

export { ReviewStars as R };
