const configVariables = {
    apiUrl: import.meta.env.VITE_API_BASE_URL, // URL base de tu API
    jwtSecret: import.meta.env.VITE_JWT_SECRET_KEY,
    mediaServiceUrl: import.meta.env.VITE_MEDIA_SERVICE_URL,
    mediaServiceKey: import.meta.env.VITE_MEDIA_SERVICE_KEY,
    mediaServicePreset: import.meta.env.VITE_MEDIA_SERVICE_PRESET
  };
  
  export default configVariables;
  