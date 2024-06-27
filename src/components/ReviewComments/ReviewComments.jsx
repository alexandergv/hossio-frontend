import React from 'react';
import './ReviewComments.css';

const ReviewComments = ({ reviews }) => {
  return (
    <div className="review-comments">
      <h3>Reseñas</h3>
      {reviews.map((review, index) => (
        <div key={index} className="review">
          <p className="review-text">{review.text}</p>
          <p className="review-author">- {review.author}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewComments;
