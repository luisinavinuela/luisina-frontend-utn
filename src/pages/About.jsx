import { useEffect } from 'react';
import { Header } from '../components/Header';
import '../styles/Collection.css';

const collections = [
  {
    title: 'Colección Primavera',
    description: 'Descubre las últimas tendencias de la temporada',
    image: '🌸',
    color: '#FF6B9D'
  },
  {
    title: 'Tech Essentials',
    description: 'Gadgets y accesorios imprescindibles',
    image: '💻',
    color: '#4ECDC4'
  },
  {
    title: 'Lifestyle Premium',
    description: 'Eleva tu estilo de vida diario',
    image: '✨',
    color: '#FFD93D'
  },
  {
    title: 'Outdoor Adventure',
    description: 'Equípate para tu próxima aventura',
    image: '🏔️',
    color: '#95E1D3'
  }
];

const featuredProducts = [
  {
    id: 1,
    name: 'Laptop Pro Max',
    category: 'Technology',
    price: 1299,
    rating: 4.8,
    image: '💻',
    badge: 'Bestseller'
  },
  {
    id: 2,
    name: 'Wireless Earbuds',
    category: 'Audio',
    price: 199,
    rating: 4.6,
    image: '🎧',
    badge: 'New'
  },
  {
    id: 3,
    name: 'Smart Watch Elite',
    category: 'Wearables',
    price: 449,
    rating: 4.9,
    image: '⌚',
    badge: 'Trending'
  },
  {
    id: 4,
    name: 'Camera Pro',
    category: 'Photography',
    price: 899,
    rating: 4.7,
    image: '📷',
    badge: 'Featured'
  },
  {
    id: 5,
    name: 'Gaming Console',
    category: 'Gaming',
    price: 499,
    rating: 4.9,
    image: '🎮',
    badge: 'Hot'
  },
  {
    id: 6,
    name: 'Tablet Ultra',
    category: 'Technology',
    price: 699,
    rating: 4.5,
    image: '📱',
    badge: 'New'
  }
];

const About = () => {
  return (
    <div className="collection-container">
      <Header />
      {/* Hero Section */}
      <section className="collection-hero">
        <div className="hero-content">
          <span className="hero-label">Colecciones 2026</span>
          <h1 className="hero-title">
            Explora Nuestras
            <span className="gradient-text"> Colecciones Exclusivas</span>
          </h1>
          <p className="hero-description">
            Curada especialmente para ti. Diseño, calidad y estilo en cada producto.
          </p>
          <button className="cta-button">
            Ver Colección Completa
            <span className="arrow">→</span>
          </button>
        </div>
        <div className="hero-decoration">
          <div className="floating-card card-1">
            <span className="card-icon">🎨</span>
            <span className="card-text">Diseño Único</span>
          </div>
          <div className="floating-card card-2">
            <span className="card-icon">⚡</span>
            <span className="card-text">Envío Rápido</span>
          </div>
          <div className="floating-card card-3">
            <span className="card-icon">🏆</span>
            <span className="card-text">Top Calidad</span>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="collections-section">
        <div className="section-header">
          <h2>Nuestras Colecciones</h2>
          <p>Explora por categoría</p>
        </div>
        <div className="collections-grid">
          {collections.map((collection, index) => (
            <div key={index} className="collection-card" style={{ '--accent-color': collection.color }}>
              <div className="collection-icon">{collection.image}</div>
              <h3>{collection.title}</h3>
              <p>{collection.description}</p>
              <button className="explore-btn">
                Explorar
                <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Clientes Felices</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Productos</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Satisfacción</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Soporte</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>¿Listo para encontrar tu producto perfecto?</h2>
          <p>Únete a miles de clientes satisfechos y descubre la diferencia</p>
          <div className="cta-buttons">
            <button className="btn-primary">Explorar Catálogo</button>
            <button className="btn-secondary">Contáctanos</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export { About };  