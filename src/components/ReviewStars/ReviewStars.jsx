
import React, { useState } from 'react';
import './ReviewStars.css';

const ReviewStars = ({readOnly, ratingScore}) => {
  const [rating, setRating] = useState(ratingScore);

  const handleRatingChange = (newRating) => {
    if (!readOnly) {
      setRating(Math.floor(newRating));
    }
  };


    return(
        <div className={`review-stars ${readOnly ? 'read-only' : 'editable'}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${rating >= star ? 'selected' : ''}`}
            onClick={() =>  handleRatingChange(star)}
            style={{ cursor: readOnly ? 'default' : 'pointer' }}
          >
            ★
          </span>
        ))}
      </div>
    );
}

export default ReviewStars;