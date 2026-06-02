import { useState, useEffect } from 'react' // detta är react - hooks
import { getProducts } from '../services/api' // detta är funktion som anropar backend
import heroImg from '../assets/002-nike-logos-swoosh-white.jpg' 
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext' // kundvagn context importerad


function Home() {


  const { addToCart } = useCart() // denna hämtar funktion för att lägga till kundvagn


  //usestate kommer ihåg mina produkter. products själva datan. setProducts sätter data
  //get och setter
  const [products, setProducts] = useState([]) //tom lista från början


  //useeffect gör något när det händer - en trigger
  //hämtar produkter när sidan laddas. 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts() //anropar data från backend 
        // Visa bara 3 produkter på hemsidan
        setProducts(data.slice(0, 3)) // sparar bara 3 producter i setProducts.
      } catch (error) {
        console.log("Kunde inte hämta produkter", error) // om något går fel
      }
    }
    fetchProducts() //här startar funktionen 
  }, []) // körs bara vid första remeringen

  return (
    <div className="page">

      {/* Hero */}
      <section className="hero">
        {/* // Visar Nike-bilden */}
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
                <button className="addToCartBtn" onClick={() => addToCart(product)}>LÄGG I KORG</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer  fliken sätts*/}
      <Footer/>

    </div>
  )
}

export default Home