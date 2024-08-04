import jwt from 'jsonwebtoken';
import configVariables from 'configVariables';

// Clave secreta usada para firmar el JWT
const JWT_SECRET = configVariables.jwtSecret; // Asegúrate de usar una clave secreta segura y almacenarla de manera segura

// Función para decodificar y verificar el JWT
export function getSession(token: string | undefined)
: {authenticated : boolean, user: any} 
{
  if (token) {
    try {
      // Decodifica el JWT y verifica su validez
      const decoded = jwt.verify(token, JWT_SECRET);
      return { authenticated: true, user: decoded };
    } catch (err) {
      // Token inválido o expirado
      console.error(err);
      return { authenticated: false, user: null };
    }
  }
  
  return { authenticated: false, user: null };
}
