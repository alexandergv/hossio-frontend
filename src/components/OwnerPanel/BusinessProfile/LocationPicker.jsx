import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import './LocationPicker.css';

// Fix the default icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationPicker = ({ initialLocation, onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  // Función para manejar el click en el mapa y actualizar la ubicación seleccionada
  const handleMapClick = (e) => {
    setSelectedLocation(e.target._latlng);
  };

  // Hook para actualizar la ubicación cuando cambia initialLocation
  useEffect(() => {
    setSelectedLocation(initialLocation);
  }, [initialLocation]);

  // Hook para centrar el mapa en la ubicación seleccionada
  const ChangeView = ({ center }) => {
    const map = useMapEvents({
      dragend: () => {
        map.flyTo(center, map.getZoom());
      },
    });
    return null;
  };

//   // Función para confirmar la ubicación seleccionada y pasarla al padre
  const confirmLocation = () => {
    onLocationSelect(selectedLocation);
  };

  return (
    <div className="location-picker">
      <MapContainer center={selectedLocation} zoom={13} style={{ height: '400px', width: '100%' }}>
        <ChangeView center={selectedLocation} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={selectedLocation} draggable={true} eventHandlers={{
              dragend: handleMapClick,
            }} />
      </MapContainer>
      <div className="location-actions">
        <button onClick={confirmLocation}>Confirmar ubicación</button>
      </div>
    </div>
  );
};

export default LocationPicker;
