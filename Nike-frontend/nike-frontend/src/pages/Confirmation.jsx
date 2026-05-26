import { Link, useSearchParams } from 'react-router-dom'
import Footer from '../components/Footer'

function Confirmation() {
  const [searchParams] = useSearchParams()
  const totalPrice = searchParams.get('total')

  return (
    <div className="page">
      <div className="confirmSection">

        <div className="confirmIcon">✓</div>

        <h2 className="confirmTitle">Tack för din beställning!</h2>
        <p className="confirmSub">En bekräftelse skickas till din email.</p>

        <div className="confirmSummary">
          <div className="confirmSummaryTitle">DIN BESTÄLLNING</div>

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