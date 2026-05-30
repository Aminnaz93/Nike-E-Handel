import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/api'
import Footer from '../components/Footer'

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await registerUser(formData)
      navigate('/login')
    } catch (error) {
      setError('Något gick fel. Försök igen.')
    }
  }

  return (
    <div className="page">
      <div className="authSection">
        <div className="authCard">
          <h2 className="authTitle">NIKE</h2>
          <p className="authSubtitle">Registrera dig</p>

          {error && <p className="authError">{error}</p>}

          <form onSubmit={handleSubmit}>
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
              <label className="formLabel">Email</label>
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
              <label className="formLabel">Lösenord</label>
              <input
                className="formInput"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="authBtn">SKAPA KONTO</button>
          </form>

          <p className="authLink">
            Redan medlem? <Link to="/login">Logga in här</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Register