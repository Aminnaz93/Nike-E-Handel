import { useState, useEffect } from 'react'
import { getProducts } from '../services/api'
import heroImg from '../assets/002-nike-logos-swoosh-white.jpg'
import Footer from '../components/Footer'

function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        // Visa bara 3 produkter på hemsidan
        setProducts(data.slice(0, 3))
      } catch (error) {
        console.log("Kunde inte hämta produkter", error)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="page">

      {/* Hero */}
      <section className="hero">
        <img src={heroImg} alt="Nike Hero" className="heroImg" />
      </section>

      {/* Populära Produkter */}
      <section className="productsSection">
        <h2 className="sectionTitle">Populära Produkter</h2>
        <div className="productGrid">
          {products.map((product) => (
            <div key={product._id} className="productCard">
              <img src={product.image} alt={product.name} className="productImg" />
              <div className="productInfo">
                <p className="productName">{product.name}</p>
                <p className="productPrice">{product.price}kr</p>
                <button className="addToCartBtn">LÄGG I KORG</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer/>

    </div>
  )
}

export default Home