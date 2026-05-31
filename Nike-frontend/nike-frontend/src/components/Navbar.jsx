import { Link, useNavigate } from 'react-router-dom'
import cartIcon from '../assets/Skärmavbild 2026-05-25 kl. 18.03.19.png'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

function Navbar() {
  const { cartCount } = useCart()
  const { user, isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()
  const [dropdown, setDropdown] = useState(false)

  const handleLogout = () => {
    logout()
    setDropdown(false)
    navigate('/')
  }

  return ( 
    <nav className="navbar">
      <div className="logo">
        <Link to="/">NIKE</Link>
      </div>

      <div className="links">
        <Link to="/" className="link">HEM</Link>
        <Link to="/products" className="link">PRODUKTER</Link>
        <Link to="/contact" className="link">KONTAKT</Link>
      </div>

      <div className="right">
        {isLoggedIn ? (
          <div className="avatarWrapper">
            <div className="loginBtn" onClick={() => setDropdown(!dropdown)}>
              INLOGGAD
            </div>
            {dropdown && (
              <div className="dropdown">
                <div className="dropdownHeader">
                  <p className="dropdownName">{user?.name}</p>
                  <p className="dropdownEmail">{user?.email}</p>
                </div>
                <Link to="/orders" className="dropdownItem" onClick={() => setDropdown(false)}>
                  Mina beställningar
                </Link>
                <button className="dropdownLogout" onClick={handleLogout}>
                  Logga ut
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="loginBtn">LOGGA IN</Link>
            <Link to="/register" className="loginBtn registerBtn">REGISTRERA</Link>
          </>
        )}
        <Link to="/cart" className="cartBtn">
          <img src={cartIcon} alt="Korg" className="cartIcon" />
          <span>({cartCount})</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar