import React from 'react';
import './PlaceFeatures.css';

const PlaceFeatures = ({ features }) => {
  return (
    <div className="features-container">
      <h3>Características</h3>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceFeatures;