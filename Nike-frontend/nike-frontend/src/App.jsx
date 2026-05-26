import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductLista from './pages/ProductLista'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'
import Orders from './pages/Orders'





function App() {
  

  return (
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/products' element={<ProductLista />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='confirmation' element={<Confirmation />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
    </BrowserRouter>


  )
}

export default App


