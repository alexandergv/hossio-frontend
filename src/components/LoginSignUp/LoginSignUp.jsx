import React, { useEffect, useState } from 'react';
import './LoginSignup.css';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true); // Determine whether it's login or signup
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(true);

  const checkIfRegistered = () => {
    // Placeholder for the actual API call
    // This should set `setIsRegistered` based on the response
    setIsRegistered(email === 'registered@example.com'); // Simulated check
  };

  useEffect(() => {
    setIsLogin(isRegistered);
  }, [isRegistered])

  useEffect(() => {
    if (isRegistered) {
      // Handle login
      console.log('Logging in with', { email, password });
    } else if(email !='' && password != ''){
      // Handle signup
      console.log('Signing up with', { email, username, password });
    }
  }, [isLogin])

  const handleSubmit = (e) => {
    e.preventDefault();
    checkIfRegistered();
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
            // check if email is registered after element loses focus
            // onBlur={checkIfRegistered}
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
