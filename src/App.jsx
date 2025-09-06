
import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import AuthPage from './pages/AuthPage'
import BrowsePage from './pages/BrowsePage'
import AddProduct from './pages/AddProduct'
import MyListings from './pages/MyListings'
import ProductDetail from './pages/ProductDetail'
import Profile from './pages/Profile'
import CartPage from './pages/CartPage'
import PreviousPurchases from './pages/PreviousPurchases'

import useAuth from './hooks/useAuth'

export default function App(){
  const auth = useAuth()
  const navigate = useNavigate()
  function handleLogout(){ auth.logout?.(); navigate('/'); }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={auth.user} onLogout={handleLogout} />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<BrowsePage />} />
          <Route path="/auth" element={<AuthPage auth={auth} />} />
          <Route path="/add-product" element={<AddProduct auth={auth} />} />
          <Route path="/my-listings" element={<MyListings auth={auth} />} />
          <Route path="/product/:id" element={<ProductDetail auth={auth} />} />
          <Route path="/profile" element={<Profile auth={auth} />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/previous-purchases" element={<PreviousPurchases />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
