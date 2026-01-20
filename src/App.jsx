import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Merge from './pages/Merge'
import Split from './pages/Split'
import Compress from './pages/Compress'
import Convert from './pages/Convert'
import Edit from './pages/Edit'
import Security from './pages/Security'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/merge" element={<Merge />} />
            <Route path="/split" element={<Split />} />
            <Route path="/compress" element={<Compress />} />
            <Route path="/convert" element={<Convert />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/security" element={<Security />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
