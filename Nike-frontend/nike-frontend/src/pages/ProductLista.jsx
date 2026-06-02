import { useState, useEffect } from 'react' // detta är react - hooks
import { getProducts } from '../services/api' // detta är funktion som anropar backend
import heroImg from '../assets/002-nike-logos-swoosh-white.jpg'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext' // kundvagn context importerad


function ProductLista() {


  const { addToCart } = useCart()


  const [products, setProducts] = useState([]) // ALLA produkter från backend
  const [filter, setFilter] = useState('alla') // vilket filter som är valt

  //hämtar produkter 
  //useeffect är som en trigger. gör något mär något händer 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts() // anropar data från backend
        setProducts(data)
      } catch (error) {
        console.log("Kunde inte hämta produkter", error) // om det inte gick att hämta produkterna
      }
    }
    fetchProducts() // kör funktionen - så hämtar alla produkter från backend
  }, [])


  //det här är filtrering
  const filteredProducts = filter === 'alla'
    ? products //Hämtar alla produkter (VISAR ALLA PRODUKTER)
    : products.filter(p => p.category === filter) // Detta visar bara den valda kategorin

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
          {/* Den här loopar igenom alla produkter och ritar ut ett kort för varje produkt. */}
          {filteredProducts.map((product) => (
            <div key={product._id} className="productCard">
              {/* visar produktbilden */}
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