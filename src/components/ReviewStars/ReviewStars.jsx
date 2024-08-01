
import React, { useEffect, useState } from 'react';
import './ReviewStars.css';

const ReviewStars = ({readOnly, ratingScore, rating, setRating= () => console.error('default function setRating shouldnt be called.') 
  , style
}) => {
  useEffect(() => {
    if(ratingScore && !readOnly) {
      setRating(ratingScore);
    } else if(readOnly) {
      rating = ratingScore;
    }
  },[])

  const handleRatingChange = (newRating) => {
    if (!readOnly) {
      setRating(Math.floor(newRating));
    }
  };


    return(
        <div style={style} className={`review-stars ${readOnly ? 'read-only' : 'editable'}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${rating >= star || ratingScore >= star ? 'selected' : ''}`}
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