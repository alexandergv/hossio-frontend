import React, { useEffect, useState } from 'react';
import axiosInstance from 'services/axiosConfig'
import config from '../../config';
import './LoginSignup.css';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
    if (isRegisteredUser) {
      // Handle login
      axiosInstance.post(`/auth/login`, { email, password }, { withCredentials: true })
        .then(response => {
          console.log('Logged in:', response.data);
          // Handle successful login
          window.location.href = '/';
        })
        .catch(error => {
          console.error('Login error:', error);
        });
    } else if (email && password && username) {
      console.log('No se ha registrado.')
      // Handle signup
      axiosInstance.post(`/auth/signup`, { email, username, password, role: 'user' },  { withCredentials: true })
        .then(response => {
          // redirect to home.
          window.location.href = '/';
        })
        .catch(error => {
          console.error('Signup error:', error);
        });
    } else {
      setIsLogin(isRegisteredUser);
    }
  };

  return (
    <div className="login-signup-container">
      <form onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
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
        <button type="submit">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</button>
      </form>
    </div>
  );
};

export default LoginSignup;
