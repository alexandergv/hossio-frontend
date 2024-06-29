import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="footer-title">Hossio</h2>
          <p>Descubre y reseña los mejores lugares de ocio en la República Dominicana.</p>
        </div>
        <div className="footer-section">
          <h3 className="footer-subtitle">Enlaces Rápidos</h3>
          <ul className="footer-links">
            <li><a href="#about">Sobre Nosotros</a></li>
            <li><a href="#contact">Contacto</a></li>
            <li><a href="#terms">Términos de Servicio</a></li>
            <li><a href="#privacy">Política de Privacidad</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-subtitle">Síguenos</h3>
          <ul className="footer-social">
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Hossio. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
