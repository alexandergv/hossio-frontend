import React, { useState } from 'react';
import ReviewStars from '../../ReviewStars/ReviewStars'
import './ReviewInput.css';
import axiosInstance from 'services/axiosConfig';

const ReviewInput = ({ placeId, userId, onReviewPosted }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };

  const onSubmit = async (reviewData) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(`/reviews/newReview`, reviewData);
      onReviewPosted();
      console.log('Review created:', response.data);
    } catch (error) {
      console.error('Error creating review:', error);
    } finally {
      setIsLoading(false);
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let reviewObj = {
      text: reviewText, 
      rating: rating,
      place: placeId, 
      user: userId 
    }
    onSubmit(reviewObj);
    setReviewText('');
    setRating(0);
  };

  return (
    <div className={`review-input-container ${isLoading ? 'loading' : ''}`}>
      <h3>Deja una reseña</h3>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="input-with-button">
          <textarea
            value={reviewText}
            onChange={handleInputChange}
            placeholder="Escribe tu reseña aquí..."
            required
            disabled={isLoading}
          ></textarea>
          <ReviewStars style={{position: 'absolute',
            bottom:'0px', left: '10px', display:'flex'
          }} 
          rating={rating} setRating={setRating} readOnly={isLoading}/>
          <div className="divider"></div>
          <button type="submit" className="send-button" disabled={isLoading}>➤</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewInput;
