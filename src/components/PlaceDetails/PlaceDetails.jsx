import React from 'react';
import './PlaceDetails.css';
import ScheduleTable from './ScheduleTable';
import PlaceFeatures from './PlaceFeatures';

const PlaceDetails = ({ placeInfo }) => {
  return (
    <div className="place-details-container">
      <h2>Detalles del lugar</h2>
      <div className="place-info">
        <p>{placeInfo.description}</p>
        <p><strong>Calificación promedio: </strong> {placeInfo.rating.toPrecision(1)} / 5</p>
        <p><strong>Precio promedio: </strong> {placeInfo.averagePrice ?? 'Desconocido.'}</p>
        <div className="place-type-labels">
          {placeInfo.placeDetails.type.map((type, index) => (
            <span key={index} className="place-type">{type}</span>
          ))}
          { placeInfo.placeDetails.type.length == 0 &&
            <span className="place-type-unknown">{'Tipo de lugar desconocido'}</span>
          }
        </div>
        <ScheduleTable schedule={placeInfo.placeDetails.schedule} />
        <PlaceFeatures features={placeInfo.placeDetails.characteristics} />
      </div>
    </div>
  );
};

export default PlaceDetails;
