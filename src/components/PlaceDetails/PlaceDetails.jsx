import React from 'react';
import './PlaceDetails.css';
import ScheduleTable from './ScheduleTable';
import PlaceFeatures from './PlaceFeatures';

const PlaceDetails = ({ placeDetails }) => {
  return (
    <div className="place-details-container">
      <h2>Detalles del lugar</h2>
      <div className="place-info">
        <p>{placeDetails.description}</p>
        <p><strong>Calificación promedio: </strong> {placeDetails.rating.toPrecision(1)} / 5</p>
        <p><strong>Precio promedio: </strong> {placeDetails.averagePrice}</p>
        <div className="place-type-labels">
          {placeDetails.types.map((type, index) => (
            <span key={index} className="place-type">{type}</span>
          ))}
        </div>
        <ScheduleTable schedule={placeDetails.schedule} />
        <PlaceFeatures features={placeDetails.features} />
      </div>
    </div>
  );
};

export default PlaceDetails;
