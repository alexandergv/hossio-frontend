import React from 'react';
import './ReviewCommentsSkeleton.css';

const ReviewCommentsSkeleton = () => {
  return (
    <div className="review-comments">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="review skeleton">
          <div className="skeleton-text skeleton-review-text"></div>
          <div className="skeleton-text skeleton-review-author"></div>
          <div className="skeleton-stars"></div>
        </div>
      ))}
    </div>
  );
};

export default ReviewCommentsSkeleton;