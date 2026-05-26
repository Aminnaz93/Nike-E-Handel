import Footer from '../components/Footer'

function Contact() {
  return (
    <div className="page">
      <div className="contactSection">
        <h2 className="checkoutTitle">KONTAKT</h2>

        <div className="contactGrid">
          <div className="contactInfo">
            <h3 className="contactInfoTitle">KUNDSERVICE</h3>
            <p className="contactInfoText">Måndag - Fredag: 09:00 - 18:00</p>
            <p className="contactInfoText">Email: kundservice@nike.se</p>
            <p className="contactInfoText">Telefon: 08-000 00 00</p>
          </div>

          <div className="contactForm">
            <div className="formGroup">
              <label className="formLabel">Namn</label>
              <input className="formInput" type="text" placeholder="Förnamn Efternamn" />
            </div>
            <div className="formGroup">
              <label className="formLabel">Email</label>
              <input className="formInput" type="email" placeholder="din@email.se" />
            </div>
            <div className="formGroup">
              <label className="formLabel">Meddelande</label>
              <textarea className="formInput formTextarea" placeholder="Skriv ditt meddelande här..." />
            </div>
            <button className="authBtn">SKICKA</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact