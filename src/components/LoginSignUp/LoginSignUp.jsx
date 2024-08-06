import React, { useEffect, useState } from 'react';
import axiosInstance from 'services/axiosConfig'
import { auth, googleProvider, appleProvider } from '../../../firebaseConfig'; 
import GoogleSignButton from 'components/signInButtons/GoogleSignButton';
import Cookies from 'js-cookie';
import './LoginSign.css';
import { showErrorAlert } from 'utils/alerts';


const LoginSignup = ({isLoginProp}) => {
  const [isLogin, setIsLogin] = useState(isLoginProp);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [isRegistered, setIsRegistered] = useState(null);

  const checkIfRegistered = async () => {
    try {
      const response = await axiosInstance.post(`/users/check`, { email });
      return(response.data.isRegistered);
    } catch (error) {
      showErrorAlert(error);
      console.error('Error checking registration status:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isRegisteredUser = await checkIfRegistered();
    if (isRegisteredUser) {
      // Handle login
      axiosInstance.post(`/auth/login`, { email, password }, { withCredentials: true })
        .then(response => {
          if (response.status < 200 || response.status >= 300) {
            throw new Error(`Fallo a la hora de iniciar sesion : ${response.statusText}`);
          }
          
          // Set the token in a cookie
          Cookies.set('auth_token', response.data.token.access_token, {
            expires: 7, // Cookie expiration in days
            path: '',   // Path where the cookie is accessible
            secure: true,
            sameSite: 'None' // Ensure cross-site cookies are allowed
          });

          console.log('Logged in:', response.data);
          // Handle successful login
          window.location.href = '/';
        })
        .catch(error => {
          showErrorAlert(error);
          console.error('Login error:', error);
        });
    } else if (email && password && username) {
      console.log('No se ha registrado.')
      // Handle signup
      axiosInstance.post(`/auth/signup`, { email, username, password, role: 'user' },  { withCredentials: true })
        .then(response => {
          if (response.status < 200 || response.status >= 300) {
            throw new Error(`Fallo a la hora de iniciar sesion : ${response.statusText}`);
          }

          // Set the token in a cookie
          Cookies.set('auth_token', response.data.token.access_token, {
            expires: 7, // Cookie expiration in days
            path: '',   // Path where the cookie is accessible
            secure: true,
            sameSite: 'None' // Ensure cross-site cookies are allowed
          });
          // redirect to home.
          window.location.href = '/';
        })
        .catch(error => {
          showErrorAlert(error);
          console.error('Signup error:', error);
        });
    } else {
      setIsLogin(isRegisteredUser);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
      // Redirige o muestra mensaje de éxito
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      await auth.signInWithPopup(appleProvider);
      // Redirige o muestra mensaje de éxito
    } catch (error) {
      console.error('Error al iniciar sesión con Apple:', error);
    }
  };


  return (
    <div className="login-signup-container">
      <form onSubmit={handleSubmit}>
        <h2>{(isLogin ? '¡Bienvenido/a!' : 'Registrate')}</h2>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Continuar' : 'Registrarse'}</button>
      </form>
      {isLogin && <p>¿Usuario nuevo? <span onClick={() => setIsLogin(false)} className='pseudo-link'>Registrate</span>.</p>}
      {!isLogin && <p>¿ya tienes una cuenta? <span onClick={() => setIsLogin(true)} className='pseudo-link'>Inicia sesión</span>.</p>}
      <hr />
      <div className="social-login-buttons">
        <GoogleSignButton/>
      </div>
    </div>
  );
};

export default LoginSignup;