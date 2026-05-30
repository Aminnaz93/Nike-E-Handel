import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/api'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await loginUser(formData)
      login(response.accessToken, {
        name: response.name,
        email: response.email
      })
      navigate('/')
    } catch (error) {
      setError('Fel email eller lösenord')
    }
  }

  return (
    <div className="page">
      <div className="authSection">
        <div className="authCard">
          <h2 className="authTitle">NIKE</h2>
          <p className="authSubtitle">Logga in på ditt konto</p>

          {error && <p className="authError">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label className="formLabel">Email</label>
              <input className="formInput" type="email" name="email"
                placeholder="din@email.se" value={formData.email}
                onChange={handleChange} required />
            </div>
            <div className="formGroup">
              <label className="formLabel">Lösenord</label>
              <input className="formInput" type="password" name="password"
                placeholder="••••••••" value={formData.password}
                onChange={handleChange} required />
            </div>
            <button type="submit" className="authBtn">LOGGA IN</button>
          </form>

          <p className="authLink">
            Inget konto? <Link to="/register">Registrera dig</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login