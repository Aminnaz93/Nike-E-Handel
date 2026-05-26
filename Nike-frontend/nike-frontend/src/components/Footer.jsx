import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="footerTop">
        <div className="footerLogo">NIKE</div>
        <div className="footerNav">
          <p className="footerNavTitle">Navigation</p>
          <Link to="/" className="footerLink">Hem</Link>
          <Link to="/products" className="footerLink">Produkter</Link>
          <Link to="/contact" className="footerLink">Kontakt</Link>
        </div>
        <div className="footerSocial">
          <p className="footerNavTitle">Följ oss</p>
          <Link to="#" className="footerLink">Instagram</Link>
          <Link to="#" className="footerLink">TikTok</Link>
          <Link to="#" className="footerLink">X</Link>
        </div>
      </div>
      <div className="footerBottom">
        <p>© 2026 Nike, Inc. All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer