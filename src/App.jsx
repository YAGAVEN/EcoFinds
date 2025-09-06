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

// 🔔 Toastify imports
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  const auth = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    auth.logout?.()
    navigate('/')
    // 👇 show notification instead of blocking alert
    toast.success('Logged out successfully!')
  }

  // 👇 replace alert globally → auto notification
  window.alert = (msg) => toast.info(msg)

  if (auth.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header user={auth.user} onLogout={handleLogout} />
      <main className="flex-grow max-w-6xl mx-auto px-4 py-6">
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

      {/* 🔔 Toast Container must be included */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  )
}
