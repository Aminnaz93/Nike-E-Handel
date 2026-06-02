import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
// Importerar alla sidor och komponenter som ska användas i appen
import Navbar from './components/Navbar'       // navigationsbaren
import Home from './pages/Home'                // startsidan
import ProductLista from './pages/ProductLista' // produktlistan
import Cart from './pages/Cart'                // varukorgen
import Login from './pages/Login'              // inloggning
import Register from './pages/Register'        // registrering
import Checkout from './pages/Checkout'        // betalning
import Confirmation from './pages/Confirmation' // bekräftelse
import Orders from './pages/Orders'            // mina beställningar
import Contact from './pages/Contact'          // kontakt




function App() {
  

  return (
    // browserrouting aktiverar routing i hela appen - så när man bytar sida behöver man inte ladda om!
    <BrowserRouter>
    <Navbar></Navbar>
    {/* Routes är en behållare för att route */}
      <Routes> 

        {/* kopplar en url till komponent sida  */}
        <Route path='/' element={<Home/>}></Route>
        <Route path='/products' element={<ProductLista />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='confirmation' element={<Confirmation />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </BrowserRouter>


  )
}

export default App


