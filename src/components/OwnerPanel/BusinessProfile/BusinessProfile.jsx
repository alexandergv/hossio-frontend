import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './BusinessProfile.css';

const BusinessProfile = ({ business }) => {
  const [businessInfo, setBusinessInfo] = useState(business || {
    name: '',
    address: '',
    phone: '',
    email: '',
    description: ''
  });

  const [isEditing, setIsEditing] = useState(!business);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusinessInfo({ ...businessInfo, [name]: value });
  };

  const handleSave = () => {
    // Implement save logic (e.g., API call to save business info)
    console.log('Business info saved:', businessInfo);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    // Implement delete logic (e.g., API call to delete business)
    console.log('Business deleted:', businessInfo.id);
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
