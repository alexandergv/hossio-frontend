import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import axios from 'axios';
import './ImageUploader.css';

const ImageUploader = forwardRef(({ onImagesUploaded, imagesUrls }, ref) => {
  const [imageFiles, setImageFiles] = useState([]);
  const [urls, setUrls] = useState(imagesUrls ?? []);

  const handleImageChange = (e) => {
    setImageFiles([...e.target.files]);
  };

  useEffect(() => {
    console.log(imagesUrls);
  },[])

  const handleUpload = async () => {
    return new Promise((resolve, reject) => {
      const uploaders = imageFiles.map((image) => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'ml_default');
        formData.append('api_key', '314479846384867');
        formData.append('timestamp', (Date.now() / 1000) | 0);

        return axios
          .post(
            `https://api.cloudinary.com/v1_1/dq5xhipwo/image/upload`,
            formData,
            { headers: { 'X-Requested-With': 'XMLHttpRequest' } }
          )
          .then((response) => {
            const { secure_url } = response.data;
            setUrls((prevUrls) => [...prevUrls, secure_url]);
            return secure_url;
          });
      });

      axios.all(uploaders)
        .then((urls) => {
          onImagesUploaded(urls);
          resolve(urls);
        })
        .catch(reject);
    });
  };

  useImperativeHandle(ref, () => ({
    handleUpload
  }));

  return (
    <div className="container">
      <h2 className="title">Subir Imágenes</h2>
      <input
        type="file"
        multiple
        onChange={handleImageChange}
        className="input"
      />
      <div className="image-preview">
        {urls.map((url, index) => (
          <img key={index} src={url} alt={`Imagen ${index}`} className="image" />
        ))}
      </div>
    </div>
  );
});

export default ImageUploader;
