import React, { useEffect, useState } from 'react';
import axiosInstance from 'services/axiosConfig'
import './OwnerLoginSignup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const OwnerLoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [identification, setIdentification] = useState('');
  // const [isRegistered, setIsRegistered] = useState(null);

  const checkIfRegistered = async () => {
    try {
      const response = await axiosInstance.post(`/users/check`, { email });
      return(response.data.isRegistered);
    } catch (error) {
      console.error('Error checking registration status:', error);
    }
  };

  // useEffect(() => {
  //   setIsLogin(isRegistered);
  // }, [isRegistered]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isRegisteredUser = await checkIfRegistered();
    console.log(isRegisteredUser);
    if (isRegisteredUser) {
      console.log('Se ha registrado')
      // Handle login
      axiosInstance.post(`/auth/login`, { email, password }, { withCredentials: true })
        .then(response => {
          console.log('Logged in:', response.data);
          // Handle successful login
          window.location.href = '/owners';
        })
        .catch(error => {
          console.error('Login error:', error);
        });
    } else if (email && password && username) {
      console.log('No se ha registrado.')
      // Handle signup
      axiosInstance.post(`/auth/signup`, { email, username, password, role: 'owner' }, { withCredentials: true })
        .then(response => {
          console.log('Signed up:', response.data);
          // redirect to home.
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


  return (
    <div className="login-signup-container">
      <form onSubmit={handleSubmit}>
        <div className='go-back-btn-container'>
          <a href='/'>
            <FontAwesomeIcon icon={faChevronLeft} />
          </a>
        </div>
        <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'} - Propietarios</h2>
        <div className="form-group">
          <label htmlFor="email">{isLogin ? 'Correo Electrónico/ Documento de identificacion' : 'Correo Electrónico'}:</label>
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
        )}
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="identification">Documento de identificacion:</label>
            <input
              type="text"
              pattern="[0-9]{11}"
              id="identification"
              maxLength={11}
              placeholder='Introduce tu cédula sin guiones...'
            onInvalid={e => e.target.setCustomValidity(checkIdValid(e.target.value))}
            // onInvalid={F => F.target.setCustomValidity('Pusite el texto mal mongolo ')}
              value={identification}
              onChange={(e) => setIdentification(e.target.value)}
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
