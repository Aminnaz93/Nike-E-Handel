import { Link } from 'react-router-dom'
import cartIcon from '../assets/Skärmavbild 2026-05-25 kl. 18.03.19.png'

function Navbar() {
    return ( 
    <nav className="navbar">
        {/* Logo */}
        <div className="logo">
          <Link to="/">NIKE</Link>
        </div>

        {/* Navigeringslänkar */}
        <div className="links">
          <Link to="/" className="link">HEM</Link>
          <Link to="/products" className="link">PRODUKTER</Link>
        </div>

        {/* Höger sida */}
        <div className="right">
          <Link to="/login" className="loginBtn">LOGGA IN</Link>
          <Link to="/cart" className="cartBtn">
            <img src={cartIcon} alt="Korg" className="cartIcon" />
            <span>(0)</span>
          </Link>
        </div>
    </nav>
    );
}

export default Navbar;