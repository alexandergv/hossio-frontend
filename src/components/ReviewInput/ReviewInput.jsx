import React, { useState } from 'react';
import ReviewStars from '../ReviewStars/ReviewStars'
import './ReviewInput.css';

const ReviewInput = ({ placeId, onSubmit }) => {
  const [reviewText, setReviewText] = useState('');

  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ text: reviewText, rating });
    setReviewText('');
    setRating(0);
  };

  return (
    <div className="review-input-container">
      <h3>Deja una reseña</h3>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="input-with-button">
          <textarea
            value={reviewText}
            onChange={handleInputChange}
            placeholder="Escribe tu reseña aquí..."
            required
          ></textarea>
          <ReviewStars/>
          <div className="divider"></div>
          <button type="submit" className="send-button">➤</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewInput;
