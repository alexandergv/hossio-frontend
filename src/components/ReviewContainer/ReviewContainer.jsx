import React, { useState, useEffect } from 'react';
import ReviewComments from "./ReviewComments/ReviewComments";
import ReviewInput from './ReviewInput/ReviewInput';
import axiosInstance from 'services/axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './ReviewContainer.css';

const ReviewContainer = ({isAuthenticated, placeId, userId}) => {
  const [reviews, setReviews] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [userHasCommented, setUserHasCommented] = useState(false);

  const onReviewPosted = async () => {
    await fetchReviews();
  }

  const fetchReviews = async () => {
    try {
      setLoadingComments(true);
      const response = await axiosInstance.get(`/reviews/byPlaceId/${placeId}`);
      setReviews(response.data.reviews);
      setUserHasCommented(response.data.userHasCommented)
      setLoadingComments(false);
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
        <ReviewInput hasCommented={userHasCommented} placeId={placeId} userId={userId} onReviewPosted={onReviewPosted}/>
        : 
        <div className="review-message">
           <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
           <p className="review-text">Inicia sesión para poder dejar una reseña.</p>
        </div>
        }
        <ReviewComments isloading={loadingComments} reviews={reviews}/>
    </>
  )
}

export default ReviewContainer;