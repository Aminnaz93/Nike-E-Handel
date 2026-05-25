import { useState, useEffect } from 'react'
import { getProducts } from '../services/api'
import heroImg from '../assets/002-nike-logos-swoosh-white.jpg'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'


function ProductLista() {

  const { addToCart } = useCart()


  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState('alla')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.log("Kunde inte hämta produkter", error)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = filter === 'alla'
    ? products
    : products.filter(p => p.category === filter)

  return (
    <div className="page">

      {/* Hero */}
      <section className="hero">
        <img src={heroImg} alt="Nike Hero" className="heroImg" />
      </section>

      {/* Filter + Produkter */}
      <section className="productsSection">

        {/* Filterknappar */}
        <div className="filterRow">
          <button className={filter === 'alla' ? 'filterBtn active' : 'filterBtn'} onClick={() => setFilter('alla')}>ALLA</button>
          <button className={filter === 'skor' ? 'filterBtn active' : 'filterBtn'} onClick={() => setFilter('skor')}>SKOR</button>
          <button className={filter === 'kläder' ? 'filterBtn active' : 'filterBtn'} onClick={() => setFilter('kläder')}>KLÄDER</button>
          <button className={filter === 'shorts' ? 'filterBtn active' : 'filterBtn'} onClick={() => setFilter('shorts')}>SHORTS</button>
        </div>

        {/* Produktgrid */}
        <div className="productGrid">
          {filteredProducts.map((product) => (
            <div key={product._id} className="productCard">
              <img src={product.image} alt={product.name} className="productImg" />
              <div className="productInfo">
                <p className="productName">{product.name}</p>
                <p className="productPrice">{product.price}kr</p>
                <button className="addToCartBtn" onClick={() => addToCart(product)}>LÄGG I KORG</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />

    </div>
  )
}

export default ProductLista