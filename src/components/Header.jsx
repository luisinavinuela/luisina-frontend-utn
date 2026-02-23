import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Header = () => {
  const { authContextLogout, token } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    authContextLogout()
    navigate("/login")
  }

  return (
    <header style={{ 
      backgroundColor: '#ffffff', 
      padding: '15px 40px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      borderBottom: '1px solid #e2ddd9',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      fontFamily: "'Inter', sans-serif"
    }}>

      <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#4a5d4e', letterSpacing: '-1px' }}>
        DECO<span style={{ color: '#a68966' }}>STORE</span>
      </div>

      <nav style={{ display: 'flex', alignItems: 'center' }}>
        <ul style={{ 
          display: 'flex', 
          listStyle: 'none', 
          margin: 0, 
          padding: 0, 
          gap: '25px', 
          alignItems: 'center' 
        }}>
          <li>
            <Link to="/" style={{ textDecoration: 'none', color: '#666', fontWeight: '500', transition: '0.3s' }}
              onMouseOver={(e) => e.target.style.color = '#4a5d4e'}
              onMouseOut={(e) => e.target.style.color = '#666'}>
              About Us
            </Link>
          </li>

          {!token && (
            <li>
              <Link to="/login" style={{ textDecoration: 'none', color: '#666', fontWeight: '500', transition: '0.3s' }}
                onMouseOver={(e) => e.target.style.color = '#4a5d4e'}
                onMouseOut={(e) => e.target.style.color = '#666'}>
                Login
              </Link>
            </li>
          )}

          {token && (
            <li>
              <Link to="/catalog" style={{ textDecoration: 'none', color: '#666', fontWeight: '500', transition: '0.3s' }}
                onMouseOver={(e) => e.target.style.color = '#4a5d4e'}
                onMouseOut={(e) => e.target.style.color = '#666'}>
                Catalog
              </Link>
            </li>
          )}
        </ul>

        {token && (
          <button 
            onClick={handleLogout}
            style={{ 
              marginLeft: '30px',
              backgroundColor: 'transparent', 
              color: '#b07d62', 
              border: '1px solid #b07d62', 
              padding: '8px 18px', 
              borderRadius: '6px', 
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.85rem',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#b07d62';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#b07d62';
            }}
          >
            Cerrar sesión
          </button>
        )}
      </nav>
    </header>
  )
}

export { Header }