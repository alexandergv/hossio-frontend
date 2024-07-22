import jwt from 'jsonwebtoken';
import cookie from 'cookie';

// Clave secreta usada para firmar el JWT
const JWT_SECRET = 'hossio'; // Asegúrate de usar una clave secreta segura y almacenarla de manera segura

// Función para decodificar y verificar el JWT
export async function getSession(token) {
  if (token) {
    try {
      // Decodifica el JWT y verifica su validez
      const decoded = jwt.verify(token, JWT_SECRET);
      return { authenticated: true, user: decoded };
    } catch (err) {
      // Token inválido o expirado
      return { authenticated: false, user: null };
    }
  }
  
  return { authenticated: false, user: null };
}
