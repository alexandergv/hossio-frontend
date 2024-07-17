import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Map from '../../Map/Map';
import LocationPicker from './LocationPicker';
import axios from 'axios';
import './BusinessProfile.css';
import config from '../../../config';


const BusinessProfile = ({ business }) => {
  const [businessInfo, setBusinessInfo] = useState(business || {
    name: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    place:  {
      id: 1,
      name: "Plaza Bolera",
      description: "Lugar de bolos.",
      rating: 5,
      images: ["https://fastly.4sqi.net/img/general/600x600/11650357_IYY1ggRVQ-WuoxU63Sm-J8gKB0QXicQzH5uxy5QmTgQ.jpg"],
      reviews: [
          { text: 'Buen ambiente.', author: 'Carlos' },
          { text: 'Servicio excelente.', author: 'Maria' }
        ],
      latitude: "18.468692510573238",
      longitude: "-69.93240723128731"
  }
  });
  const [location, setLocation] = useState([18.468692510573238, -69.93240723128731]); // Ubicación inicial
  const [isEditing, setIsEditing] = useState(!business);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusinessInfo({ ...businessInfo, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(`${config.apiUrl}/business/AddNewBusinness`, businessInfo);
      console.log('Business info saved:', response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving business info:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    // Implement delete logic (e.g., API call to delete business)
    console.log('Business deleted:', businessInfo.id);
  };

  const handleLocationSelect = (newLocation) => {
    setLocation(newLocation);
    console.log('Ubicación seleccionada:', newLocation);
  };

  return (
    <div className="business-profile">
      <h2>Perfil del Negocio</h2>
      {isEditing ? (
        <div>
          <div className="form-group">
            <label htmlFor="name">Nombre del negocio</label>
            <input
              type="text"
              id="name"
              name="name"
              value={businessInfo.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Dirección</label>
            <input
              type="text"
              id="address"
              name="address"
              value={businessInfo.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={businessInfo.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={businessInfo.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={businessInfo.description}
              onChange={handleChange}
            />
          </div>
          <LocationPicker initialLocation={location} onLocationSelect={handleLocationSelect} />
          <div className="actions">
            <button className="save-button" onClick={handleSave}>Guardar</button>
            {business && (
              <button className="delete-button" onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} /> Eliminar
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p><strong>Nombre del negocio:</strong> {businessInfo.name}</p>
          <p><strong>Dirección:</strong> {businessInfo.address}</p>
          <p><strong>Teléfono:</strong> {businessInfo.phone}</p>
          <p><strong>Correo electrónico:</strong> {businessInfo.email}</p>
          <p><strong>Descripción:</strong> {businessInfo.description}</p>
          <button className="edit-button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faEdit} /> Editar
          </button>
        </div>
      )}
    </div>
  );
};

export default BusinessProfile;
