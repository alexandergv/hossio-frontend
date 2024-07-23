import React, { useState, useEffect } from 'react';
import axiosInstance from 'services/axiosConfig'
import config from '../../config';
import './ReviewComments.css';

const ReviewComments = ({ placeId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(`/reviews/byPlaceId/${placeId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    if (placeId) {
      fetchReviews();
    }
  }, [placeId]);


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
