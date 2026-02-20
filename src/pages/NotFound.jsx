
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {

  return (
    <div className="notfound-container">
      <div className="notfound-background">
        <div className="grid-pattern"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      <div className="notfound-content">
        <div className="error-animation">
          <div className="glitch-wrapper">
            <div className="glitch" data-text="404">404</div>
          </div>
        </div>

        <div className="error-message">
          <h1>Página No Encontrada</h1>
          <p>Oops! Parece que te has perdido en el espacio digital.</p>
          <p className="sub-message">La página que buscas no existe o ha sido movida.</p>
        </div>

        <div className="error-actions">
          <Link to='/catalog'
            className="btn-home"
          >
            <span className="btn-icon">🏠</span>
            Volver al Inicio
          </Link>
          <button
            className="btn-back"
          >
            <span className="btn-icon">←</span>
            Página Anterior
          </button>
        </div>

        <div className="help-links">
          <h3>¿Necesitas ayuda?</h3>
          <div className="links-grid">
            <a href="/catalog" className="help-link">
              <span className="link-icon">📦</span>
              <span>Ver Catálogo</span>
            </a>
            <a href="/contact" className="help-link">
              <span className="link-icon">💬</span>
              <span>Contacto</span>
            </a>
            <a href="/faq" className="help-link">
              <span className="link-icon">❓</span>
              <span>FAQ</span>
            </a>
            <a href="/support" className="help-link">
              <span className="link-icon">🆘</span>
              <span>Soporte</span>
            </a>
          </div>
        </div>
      </div>

      <div className="astronaut">
        <div className="astronaut-body">🧑‍🚀</div>
      </div>
    </div>
  );
};

export { NotFound };