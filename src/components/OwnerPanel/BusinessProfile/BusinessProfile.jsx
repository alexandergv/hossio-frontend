import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Map from '../../Map/Map'; // Needed for LocationPicker(?);
import LocationPicker from './LocationPicker';
import axiosInstance from 'services/axiosConfig'
import './BusinessProfile.css';
import ImageUploader from '../../ImageUploader/ImageUploader';
import { showSuccessAlert, showErrorAlert, showConfirmationAlert } from '../../../utils/alerts';

const BusinessProfile = ({userId}) => {
  const businessInfoDefault = 
  {userId,
    name : '',
    address : '',
    phone : '',
    email : '',
    description : ''
  }
  const defaultLocation = [18.47619001344168, -69.91351604461671];

  const [businessInfo, setBusinessInfo] = useState(businessInfoDefault);
  const [placeInfo, setPlaceInfo] = useState({});
  const [location, setLocation] = useState(defaultLocation); // Ubicación inicial
  const [isEditing, setIsEditing] = useState(!businessInfo);
  const [imagesUrls, setImagesUrls] = useState([])
  const imageUploaderRef = useRef(null);
  
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
      setImagesUrls(placeInfo.images)
    } else {
      let userInfo = (await axiosInstance.get(`/users/getById/${userId}`)).data;
      setBusinessInfo({...businessInfoDefault, email: userInfo.email})
    }
  }

  useEffect(() => {
    if(!userId)
      throw new Error("User Id was not defined"); 

    getBusiness();
  },[])

  const handleCancel = async () => {
    await getBusiness();
    setIsEditing(false);
  }

  useEffect(() => {
   
  },[location]);

  const handleBusinessChange = (e) => {
    e.target.setCustomValidity(''); 
    const { name, value } = e.target;
    setBusinessInfo({ ...businessInfo, [name]: value });
  };

  const handlePlaceChange = (e) => {
    e.target.setCustomValidity(''); 
    const { name, value } = e.target;
    setPlaceInfo({ ...placeInfo, [name.replace('place','')]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if(location[0] == defaultLocation[0] && location[1] == defaultLocation[1])
          throw new Error("Debe seleccionar la ubicación del lugar.");

      const confirmed = await showConfirmationAlert('¿Estás seguro de que deseas guardar la información de este negocio?');
     if(confirmed) {
      if (imageUploaderRef.current) {
        await imageUploaderRef.current.handleUpload()
          .then(async (urls) => {
            // Sending new place first;
            let placeInfoTemp = placeInfo;
            placeInfoTemp.images = [...urls, ...imagesUrls];
            placeInfoTemp.location = {
              coordinates: location
            }
            console.log(placeInfoTemp);
            const placesResponse = await axiosInstance.post(`/places/AddOrUpdate`, placeInfoTemp);
            if (placesResponse.status < 200 || placesResponse.status >= 300) {
              throw new Error(`Fallo a la hora de guardar información del lugar.: ${placesResponse.statusText}`);
            }
            
            console.log(placesResponse);
            
            let businessInfoTemp = businessInfo;
            businessInfoTemp.place = placesResponse.data._id;
            console.log('businessInfoTemp', businessInfoTemp);
            const BusinessResponse = await axiosInstance.post(`/business/AddOrUpdate`, businessInfoTemp);
            
            if (BusinessResponse.status < 200 || BusinessResponse.status >= 300) {
              throw new Error(`Fallo a la hora de guardar información del negocio.: ${BusinessResponse.statusText}`);
            }
            console.log('Business info saved:', BusinessResponse.data);            
           
            setIsEditing(false);
            showSuccessAlert('Información de negocio guardada con éxito.');
          })
          .catch((error) => {
             throw new Error(error);
          });
      }
     }  

    } catch (error) {
      showErrorAlert(error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    const confirmed = await showConfirmationAlert('¿Estás seguro de que deseas borrar la información de este negocio?');
    if(confirmed) {
      if(placeInfo._id) {
        const placesResponse = await axiosInstance.delete(`/places/${placeInfo._id}`);
      }
  
      if(businessInfo._id) {
        const BusinessResponse = await axiosInstance.delete(`/business/${businessInfo._id}`);
      } else {
        throw "Executed function without a business id.";
      }
      showSuccessAlert('Información de negocio borrada con éxito.');
      await getBusiness();
    }


    // // Implement delete logic (e.g., API call to delete business)
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


  const checkIdValid = (text) => {
    console.log();
    if(text == '') {
      return requiredMessage;
    }
    const pattern = /^[0-9]{11}$/;
    let textIsValidId = pattern.test(text);
    if(!textIsValidId) {
      return "Documento de identificación inválido.";
    }
    return '';
  }
  const requiredMessage = "Este campo es requerido."

  const handleInvalid = (e) => {
    const requiredMessage = "Este campo es requerido.";
    e.target.setCustomValidity(requiredMessage);
  };
  
  return (
    <div className="business-profile">
      <h2>Perfil del Negocio</h2>
      {isEditing ? (
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="name">Nombre del negocio</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={businessInfo.name}
              onInvalid={handleInvalid}
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
              required
              onInvalid={handleInvalid}
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
              required
              onInvalid={handleInvalid}
              value={placeInfo.name}
              onChange={handlePlaceChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="placedescription">Descripcion del lugar</label>
            <textarea
              id="placedescription"
              name="placedescription"
              required
              onInvalid={handleInvalid}
              value={placeInfo.description}
              onChange={handlePlaceChange}
            />
          </div>
          <div className="form-group">
          {/* <label htmlFor="images">imágenes del lugar</label> */}
          <ImageUploader ref={imageUploaderRef} onImagesUploaded={handleImagesUploaded} imagesUrls={imagesUrls}/>
          </div>
          <div className="form-group">
          <label htmlFor="locationPicker">Ubicacion del lugar</label>
          <LocationPicker initialLocation={location} onLocationSelect={handleLocationSelect} />
          </div>
          <div className="actions">
            <button className="save-button" type="submit">Guardar</button>
            {businessInfo && (
              <button className="delete-button" type="button" onClick={handleCancel}>
                <FontAwesomeIcon icon={faTrash} /> Cancelar
              </button>
            )}
          </div>
        </form>
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
          {businessInfo._id && (
              <button className="delete-button" onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} /> Eliminar
              </button>
            )}
        </div>
      )}
    </div>
  );
};

export default BusinessProfile;
