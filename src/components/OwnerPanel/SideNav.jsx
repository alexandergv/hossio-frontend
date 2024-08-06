import axiosInstance from 'services/axiosConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBuilding, faStar, faCalendarAlt, faImages, faEnvelope, faChartLine, faCog, faLifeRing, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


const SideNav = ({ isOpen, setSelectedSection }) => {
  const onLogout = (e) => {
    e.preventDefault();
    console.log(e);
    // Elimina la cookie de autenticación
   axiosInstance.post(`/auth/logout`,{}, { withCredentials: true }).then((response) => {
    // Redirige al usuario a la página de inicio
       window.location.href = '/';
   })
}


  return (
    <nav className={`sidenav ${isOpen ? 'open' : 'closed'}`}>
    <ul>
      <li><a href="#dashboard" onClick={() => setSelectedSection('dashboard')}><FontAwesomeIcon icon={faTachometerAlt} /> <span className="sidenav-icon-text">Dashboard</span></a></li>
      <li><a href="#profile" onClick={() => setSelectedSection('profile')}><FontAwesomeIcon icon={faBuilding} /> <span className="sidenav-icon-text">Perfil del Negocio</span></a></li>
      <li><a href="#reviews" onClick={() => setSelectedSection('reviews')}><FontAwesomeIcon icon={faStar} /> <span className="sidenav-icon-text">Gesti&oacute;n de Rese&ntilde;as</span></a></li>
      <li><a href="#events" onClick={() => setSelectedSection('events')}><FontAwesomeIcon icon={faCalendarAlt} /> <span className="sidenav-icon-text"> Eventos y Promociones</span></a></li>
      <li><a href="#gallery" onClick={() => setSelectedSection('gallery')}><FontAwesomeIcon icon={faImages} /> <span className="sidenav-icon-text">Galer&iacute;a de Im&aacute;genes</span></a></li>
      <li><a href="#messages" onClick={() => setSelectedSection('messages')}><FontAwesomeIcon icon={faEnvelope} /> <span className="sidenav-icon-text">Mensajes</span></a></li>
      <li><a href="#analytics" onClick={() => setSelectedSection('analytics')}><FontAwesomeIcon icon={faChartLine} /> <span className="sidenav-icon-text"></span>An&aacute;lisis y Reportes</a></li>
      <li><a href="#settings" onClick={() => setSelectedSection('settings')}><FontAwesomeIcon icon={faCog} /> <span className="sidenav-icon-text">Configuraci&oacute;n de Cuenta</span></a></li>
      <li><a href="#help" onClick={() => setSelectedSection('help')}><FontAwesomeIcon icon={faLifeRing} /> <span className="sidenav-icon-text">Ayuda y Soporte</span></a></li>
      <li><a href="#" onClick={onLogout}><FontAwesomeIcon icon={faSignOutAlt} /> <span className="sidenav-icon-text">Cerrar Sesi&oacute;n</span></a></li>
    </ul>
    </nav>
  );
};

export default SideNav;