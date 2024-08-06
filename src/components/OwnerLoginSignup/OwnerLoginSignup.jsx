import React, { useEffect, useState } from 'react';
import axiosInstance from 'services/axiosConfig';
import './OwnerLoginSignup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

const OwnerLoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [identification, setIdentification] = useState('');

  const checkIfRegistered = async () => {
    try {
      const response = await axiosInstance.post(`/users/check`, { email });
      return response.data.isRegistered;
    } catch (error) {
      console.error('Error checking registration status:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isRegisteredUser = await checkIfRegistered();
    if (isRegisteredUser) {
      axiosInstance.post(`/auth/login`, { email, password }, { withCredentials: true })
        .then(response => {

          if (response.status < 200 || response.status >= 300) {
            throw new Error(`Fallo a la hora de registrarse : ${response.statusText}`);
          }

          // Set the token in a cookie
          Cookies.set('auth_token', response.data.token.access_token, {
            expires: 7, // Cookie expiration in days
            path: '',   // Path where the cookie is accessible
            secure: true,
            sameSite: 'None' // Ensure cross-site cookies are allowed
          });
          console.log('Logged in:', response.data);
          window.location.href = '/owners';
        })
        .catch(error => {
          console.error('Login error:', error);
        });
    } else if (email && password && username) {
      axiosInstance.post(`/auth/signup`, { email, username, password, role: 'owner' }, { withCredentials: true })
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


          console.log('Signed up:', response.data);
          window.location.href = '/owners';
        })
        .catch(error => {
          console.error('Signup error:', error);
        });
    } else {
      setIsLogin(isRegisteredUser);
    }
  };

  const requiredMessage = 'Este campo es requerido.';

  const checkIdValid = (text) => {
    if (text === '') {
      return requiredMessage;
    }
    const pattern = /^[0-9]{11}$/;
    const textIsValidId = pattern.test(text);
    if (!textIsValidId) {
      return "Documento de identificación inválido.";
    }
    return '';
  }

  return (
    <div className="login-signup-owner-container">
      <form onSubmit={handleSubmit}>
        <div className='go-back-btn-container'>
          <a href='/'>
            <FontAwesomeIcon icon={faChevronLeft} />
          </a>
        </div>
        <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'} - Propietarios</h2>
        <div className="form-group">
          <label htmlFor="email">{isLogin ? 'Correo Electrónico/ Documento de identificación' : 'Correo Electrónico'}:</label>
          <input
            type="email"
            id="email"
            onInvalid={e => e.target.setCustomValidity(requiredMessage)}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <>
            <div className="form-group">
              <label htmlFor="username">Nombre de Usuario:</label>
              <input
                type="text"
                id="username"
                value={username}
                onInvalid={e => e.target.setCustomValidity(requiredMessage)}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="identification">Documento de identificación:</label>
              <input
                type="text"
                pattern="[0-9]{11}"
                id="identification"
                maxLength={11}
                placeholder='Introduce tu cédula sin guiones...'
                onInvalid={e => e.target.setCustomValidity(checkIdValid(e.target.value))}
                value={identification}
                onChange={(e) => setIdentification(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onInvalid={e => e.target.setCustomValidity(requiredMessage)}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="on"
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</button>
      </form>
    </div>
  );
};

export default OwnerLoginSignup;