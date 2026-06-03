import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCart } from '../context/CartContext'// hämtar varukorgsdata från den globala CartContext
import { createOrder } from '../services/api' // funktionen som skickar ordern till backend


import Footer from '../components/Footer'

function Checkout() {
    // navigate används för att skicka användaren till en annan sida efter betalnin
  const navigate = useNavigate()
  const { cartItems, totalPrice, clearCart } = useCart()
  // cartItems  = alla produkter i varukorgen
  // totalPrice = redan uträknat totalpris från CartContext
  // clearCart  = tömmer varukorgen efter betalning
  const [paymentMethod, setPaymentMethod] = useState('kontokort')
    // håller koll på vilket betalsätt användaren valt
  // startar på 'kontokort' som default
  const [error, setError] = useState('')
    // håller koll på felmeddelande — t.ex om användaren inte är inloggad



  // håller koll på vad användaren skriver i formuläret
  // namn, email och telefon
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const moms = Math.round(totalPrice * 0.25)   // räknar ut momsen (25%) på totalpriset


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // uppdaterar rätt fält i formData när användaren skriver
    // e.target.name = vilket fält (name/email/phone)
    // e.target.value = vad användaren skrivits
  }



  const handleSubmit = async (e) => {
    e.preventDefault() // denna stoppar sidan från att ladda om när formulärert skickas
    try {
      const orderData = {
        // bygger ihop order-objektet som ska skickas till backend
        items: cartItems.map(item => ({
          product: item._id,    // produktens id
          name: item.name,      // produktens namn
          price: item.price,    // produktens pris
          quantity: item.quantity // antal
        })),
        totalPrice, // total priset
        paymentMethod, // om det är kontokort elker swish 
      }

      await createOrder(orderData)
      // skickar ordern till backend via api.js
      // token läggs till automatiskt i request() — backend vet vem du är
      clearCart()
      //tömmer varukorgen efter att ordern skapats

      navigate(`/confirmation?total=${totalPrice}`)
      // skickar användaren till bekräftelsesidan
      // totalpriset skickas med i URL:en så Confirmation kan visa det
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