import jwt from 'jsonwebtoken';
import configVariables from 'configVariables';
import { setAuthStatus, getAuthStatus } from 'services/authService';

// Clave secreta usada para firmar el JWT
const JWT_SECRET = configVariables.jwtSecret; // Asegúrate de usar una clave secreta segura y almacenarla de manera segura

type AuthObj = {
  authenticated : boolean, 
  user: string | jwt.JwtPayload | null | any
}

// Función para decodificar y verificar el JWT
export function getSession(token: string | undefined)
: AuthObj
{
  let authObj: AuthObj = { authenticated: false, user: null };
  
  if (token) {
    try {
      // Decodifica el JWT y verifica su validez
      const decoded = jwt.verify(token, JWT_SECRET);
      authObj = { authenticated: true, user: decoded };
    } catch (err) {
      // Token inválido o expirado
      console.error(err);
      authObj = { authenticated: false, user: null };
    }
  }
  
  return authObj;
}
