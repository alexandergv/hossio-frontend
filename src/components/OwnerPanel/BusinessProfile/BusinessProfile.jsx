import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Map from '../../Map/Map';
import LocationPicker from './LocationPicker';
import axiosInstance from 'services/axiosConfig'
import './BusinessProfile.css';
import ImageUploader from '../../ImageUploader/ImageUploader';


const BusinessProfile = ({userId}) => {

  const [businessInfo, setBusinessInfo] = useState(
    {userId,
      name : '',
      address : '',
      phone : '',
      email : '',
      description : '',
    });
  const [placeInfo, setPlaceInfo] = useState({});
  const [location, setLocation] = useState([18.468692510573238, -69.93240723128731]); // Ubicación inicial
  const [isEditing, setIsEditing] = useState(!businessInfo);
  const [ImagesUrls, setImagesUrls] = useState([])
  const imageUploaderRef = useRef(null);
  
  useEffect(() => {
    if(!userId)
      throw new Error("User Id was not defined");

    const getBusiness = async () => {
      let business = (await axiosInstance.get(`/business/getByUserId/${userId}`)).data;

      if(business) {
        console.log(business);
        // Set info for business
        setBusinessInfo(business);
        // Set info for place
        let placeInfo = (await axiosInstance.get(`/places/getById/${business.place}`)).data;
        setPlaceInfo(placeInfo);
        console.log(placeInfo);
        // Set location for map
        setLocation([placeInfo.location.coordinates[0], placeInfo.location.coordinates[1]])
      }
    }
    getBusiness();
  },[])

  


  useEffect(() => {
   
  },[location]);


  const handleBusinessChange = (e) => {
    const { name, value } = e.target;
    setBusinessInfo({ ...businessInfo, [name]: value });
  };

  const handlePlaceChange = (e) => {
    const { name, value } = e.target;
    setPlaceInfo({ ...placeInfo, [name.replace('place','')]: value });
  };

  const handleSave = async () => {
    try {

      if (imageUploaderRef.current) {
        imageUploaderRef.current.handleUpload()
          .then(async (urls) => {
           // Sending new place first;
            let placeInfoTemp = placeInfo;
            placeInfoTemp.images = urls;
            placeInfoTemp.location = {
              coordinates: location
            }
            delete placeInfoTemp._id;
            const placesResponse = await axiosInstance.post(`/places/AddNewPlace`, placeInfoTemp);

            console.log(placesResponse);
            let businessInfoTemp = businessInfo;
            businessInfoTemp.place = placesResponse.data._id;
            console.log('businessInfoTemp',businessInfoTemp);
            delete businessInfoTemp._id;
            const BusinessResponse = await axiosInstance.post(`/business/AddNewBusinness`, businessInfoTemp);
            console.log('Business info saved:', BusinessResponse.data);
            setIsEditing(false);
          })
          .catch((error) => {
            console.error('Error al subir imágenes:', error);
          });
      }

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

  const handleImagesUploaded = (urls) => {
    // Actualiza el estado con las URLs de las imágenes subidas
    setImagesUrls(urls);
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
              onChange={handleBusinessChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Dirección</label>
            <input
              type="text"
              id="address"
              name="address"
              value={businessInfo.address}
              onChange={handleBusinessChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={businessInfo.phone}
              onChange={handleBusinessChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={businessInfo.email}
              onChange={handleBusinessChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={businessInfo.description}
              onChange={handleBusinessChange}
            />
          </div>
          <h2>Datos del lugar</h2>
          <div className="form-group">
            <label htmlFor="placename">Nombre del lugar</label>
            <input
              type="text"
              id="placename"
              name="placename"
              value={placeInfo.name}
              onChange={handlePlaceChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="placedescription">Descripcion del lugar</label>
            <textarea
              id="placedescription"
              name="placedescription"
              value={placeInfo.description}
              onChange={handlePlaceChange}
            />
          </div>
          <div className="form-group">
          {/* <label htmlFor="images">imágenes del lugar</label> */}
          <ImageUploader ref={imageUploaderRef} onImagesUploaded={handleImagesUploaded} />
          </div>
          <div className="form-group">
          <label htmlFor="locationPicker">Ubicacion del lugar</label>
          <LocationPicker initialLocation={location} onLocationSelect={handleLocationSelect} />
          </div>
          <div className="actions">
            <button className="save-button" onClick={handleSave}>Guardar</button>
            {businessInfo && (
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
