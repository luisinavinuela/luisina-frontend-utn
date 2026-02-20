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
    <header className="home-header">
      <h1>Welcome to Our Store</h1>
      <nav>
        <ul>
          <li><Link to="/">About Us</Link></li>

          {!token && <li><Link to="/login">Login</Link></li>}

          {token && <li><Link to="/catalog">Catalog</Link></li>}
        </ul>
        {
          token && <button onClick={handleLogout}>Cerrar sesión</button>
        }
      </nav>
    </header>)
}

export { Header }