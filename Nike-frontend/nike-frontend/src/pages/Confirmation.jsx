import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useEffect } from 'react'
import Footer from '../components/Footer'

function Confirmation() {
  const { cartItems, totalPrice, setCartItems } = useCart()

  // Töm varukorgen efter bekräftelse
  useEffect(() => {
    localStorage.removeItem('cart')
  }, [])

  return (
    <div className="page">
      <div className="confirmSection">

        {/* Checkmark */}
        <div className="confirmIcon">✓</div>

        <h2 className="confirmTitle">Tack för din beställning!</h2>
        <p className="confirmSub">En bekräftelse skickas till din email.</p>

        {/* Ordersammanfattning */}
        <div className="confirmSummary">
          <div className="confirmSummaryTitle">DIN BESTÄLLNING</div>

          {cartItems.map((item) => (
            <div key={item._id} className="confirmRow">
              <span>{item.name} × {item.quantity}</span>
              <span>{item.price * item.quantity} kr</span>
            </div>
          ))}

          <div className="confirmRow">
            <span>Frakt</span>
            <span>Gratis</span>
          </div>

          <div className="confirmTotal">
            <span>Totalt</span>
            <span>{totalPrice} kr</span>
          </div>
        </div>

        <Link to="/" className="confirmBtn">← FORTSÄTT SHOPPA</Link>

      </div>
      <Footer />
    </div>
  )
}

export default Confirmation