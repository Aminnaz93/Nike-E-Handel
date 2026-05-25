import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
  

  return (
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>


  )
}

export default App


