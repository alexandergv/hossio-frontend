const configVariables = {
    apiUrl: import.meta.env.PUBLIC_API_BASE_URL, // URL base de tu API
    jwtSecret: import.meta.env.PUBLIC_JWT_SECRET_KEY,
    mediaServiceUrl: import.meta.env.PUBLIC_MEDIA_SERVICE_URL,
    mediaServiceKey: import.meta.env.PUBLIC_MEDIA_SERVICE_KEY,
    mediaServicePreset: import.meta.env.PUBLIC_MEDIA_SERVICE_PRESET,
    googleClientId: import.meta.env.PUBLIC_GOOGLE_CLIENT_ID
  };
  
  export default configVariables;
  