import React from 'react';
import './PlaceCardSkeleton.css';

const PlaceCardSkeleton = () => {
  return (
    <div className="place-card-skeleton">
      <div className="place-card-subContainer">
        <div className="skeleton place-image-skeleton"></div>
        <div className="place-details-skeleton">
          <div className="skeleton place-name-skeleton"></div>
          <div className="skeleton place-description-skeleton"></div>
          <div className="skeleton place-rating-skeleton"></div>
        </div>
      </div>
    </div>
  );
};

export default PlaceCardSkeleton;
