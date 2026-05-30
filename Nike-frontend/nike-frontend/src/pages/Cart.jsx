import { useCart } from '../context/CartContext' // kundvagn context importerad
import { Link } from 'react-router-dom' 
import heroImg from '../assets/002-nike-logos-swoosh-white.jpg'
import Footer from '../components/Footer'

function Cart() {

  //hämtar fyra olika funktioner från global CartContext( det är typ som en delad butik för hela appen.)
  // cartItems = arrayen med alla produkter i varukorgen
  // removeFromCart = funktion för att ta bort en produkt
  // updateQuantity = funktion för att ändra antal
  // totalPrice = redan uträknat totalpris
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart()

  // Beräkna momsen (25%)
  const moms = Math.round(totalPrice * 0.25)

  return (
    <div className="page">

      {/* Hero */}
      <section className="hero">
        <img src={heroImg} alt="Nike Hero" className="heroImg" />
      </section>

      <section className="cartSection">

        {/* Om varukorgen är tom */}
        {cartItems.length === 0 ? (
          <div className="emptyCart">
            <p>Din varukorg är tom</p>
            <Link to="/products" className="continueShopping">Fortsätt shoppa</Link>
          </div>
        ) : (
          <>
            {/* Varukorg items */}
            <div className="cartItems">
              {cartItems.map((item) => (
                <div key={item._id} className="cartItem">
                  <img src={item.image} alt={item.name} className="cartItemImg" />
                  <div className="cartItemInfo">
                    <p className="cartItemName">{item.name}</p>
                    <div className="quantityControl">
                      <button className="qtyBtn" onClick={() => updateQuantity(item._id, -1)}>-</button>
                      <span className="qtyNum">{item.quantity}</span>
                      <button className="qtyBtn" onClick={() => updateQuantity(item._id, 1)}>+</button>
                    </div>
                  </div>
                  <button className="removeBtn" onClick={() => removeFromCart(item._id)}>x</button>
                </div>
              ))}
            </div>

            {/* Summering */}
            <div className="cartSummary">
              <div className="summaryRow">
                <span>Frakt</span>
                <span>Gratis</span>
              </div>
              <div className="summaryRow">
                <span>Moms (25%)</span>
                <span>{moms} kr</span>
              </div>
              <div className="summaryTotal">
                <span>Totalt</span>
                <span>{totalPrice} kr</span>
              </div>
              <Link to="/checkout" className="checkoutBtn">GÅ TILL BETALNING</Link>
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  )
}

export default Cart