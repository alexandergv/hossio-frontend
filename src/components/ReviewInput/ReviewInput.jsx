import React, { useState } from 'react';
import './ReviewInput.css';

const ReviewInput = ({ placeId, onSubmit }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
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
          <div className="review-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? 'selected' : ''}`}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </span>
            ))}
          </div>
          <div className="divider"></div>
          <button type="submit" className="send-button">➤</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewInput;
