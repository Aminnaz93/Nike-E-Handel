import { useEffect, useState } from 'react'
import { getOrders } from '../services/api'
import Footer from '../components/Footer'

function Orders() {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders()
        setOrders(data)
      } catch (error) {
        setError('Kunde inte hämta beställningar.')
      }
    }

    fetchOrders()
  }, [])

  return (
    <div className="page">
      <div className="ordersSection">
        <h2 className="checkoutTitle">MINA BESTÄLLNINGAR</h2>

        {error && <p className="authError">{error}</p>}

        {orders.length === 0 ? (
          <p>Du har inga beställningar ännu.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="orderCard">
              <div className="orderHeader">
                <span>Order: {order._id}</span>
                <span>{new Date(order.createdAt).toLocaleDateString('sv-SE')}</span>
              </div>
              <div className="orderItems">
                {order.items.map((item, index) => (
                  <div key={index} className="orderRow">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{item.price * item.quantity} kr</span>
                  </div>
                ))}
              </div>
              <div className="orderTotal">
                <span>Totalt</span>
                <span>{order.totalPrice} kr</span>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Orders