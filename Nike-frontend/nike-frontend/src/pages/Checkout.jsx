import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { createOrder } from '../services/api'
import Footer from '../components/Footer'

function Checkout() {
  const navigate = useNavigate()
  const { cartItems, totalPrice, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState('kontokort')
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const moms = Math.round(totalPrice * 0.25)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const orderData = {
        items: cartItems.map(item => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalPrice,
        paymentMethod,
      }

      await createOrder(orderData)
      clearCart()
      navigate(`/confirmation?total=${totalPrice}`)
    } catch (error) {
      setError('Något gick fel... Du måste vara inloggad för att betala!')
    }
  }

  return (
    <div className="page">
      <div className="checkoutSection">
        <h2 className="checkoutTitle">BETALNING</h2>

        {error && <p className="authError">{error}</p>}

        <div className="checkoutGrid">
          <form onSubmit={handleSubmit} className="checkoutForm">
            <div className="formGroup">
              <label className="formLabel">Namn</label>
              <input
                className="formInput"
                type="text"
                name="name"
                placeholder="Förnamn Efternamn"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">E-post</label>
              <input
                className="formInput"
                type="email"
                name="email"
                placeholder="din@email.se"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Mobilnummer</label>
              <input
                className="formInput"
                type="tel"
                name="phone"
                placeholder="070-000 00 00"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <label className="formLabel">Betalsätt</label>
              <div className="paymentOptions">
                <button
                  type="button"
                  className={paymentMethod === 'kontokort' ? 'payBtn active' : 'payBtn'}
                  onClick={() => setPaymentMethod('kontokort')}
                >KONTOKORT</button>
                <button
                  type="button"
                  className={paymentMethod === 'swish' ? 'payBtn active' : 'payBtn'}
                  onClick={() => setPaymentMethod('swish')}
                >SWISH</button>
              </div>
            </div>

            {paymentMethod === 'kontokort' && (
              <div className="cardDetails">
                <div className="formGroup">
                  <label className="formLabel">Kortnummer</label>
                  <input className="formInput" type="text" placeholder="•••• •••• •••• ••••" />
                </div>
                <div className="cardRow">
                  <div className="formGroup">
                    <label className="formLabel">Giltig till</label>
                    <input className="formInput" type="text" placeholder="MM/ÅÅ" />
                  </div>
                  <div className="formGroup">
                    <label className="formLabel">CVV</label>
                    <input className="formInput" type="text" placeholder="•••" />
                  </div>
                </div>
              </div>
            )}

            <div className="checkoutTotal">
              <div className="summaryRow">
                <span>Frakt</span>
                <span>Gratis</span>
              </div>
              <div className="summaryRow">
                <span>Moms (25%)</span>
                <span>{moms} kr</span>
              </div>
              <div className="summaryTotal">
                <span>ATT BETALA</span>
                <span>{totalPrice} kr</span>
              </div>
            </div>

            <button type="submit" className="authBtn">BEKRÄFTA BETALNING</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Checkout