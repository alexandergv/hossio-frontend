import React, { useState, useEffect } from 'react';
import ReviewComments from "./ReviewComments/ReviewComments";
import ReviewInput from './ReviewInput/ReviewInput';
import axiosInstance from 'services/axiosConfig';

const ReviewContainer = ({isAuthenticated, placeId, userId}) => {
  const [reviews, setReviews] = useState([]);

  const onReviewPosted = async () => {
    await fetchReviews();
  }

  const fetchReviews = async () => {
    try {
      const response = await axiosInstance.get(`/reviews/byPlaceId/${placeId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    if (placeId) {
      fetchReviews();
    }
  }, [placeId]);


  return (
    <>
    { isAuthenticated ? 
        <ReviewInput placeId={placeId} userId={userId} onReviewPosted={onReviewPosted}/>
        : <p className="review">Inicia sesión para poder dejar una reseña.</p> 
        }
        <ReviewComments reviews={reviews}/>
    </>
  )
}

export default ReviewContainer;