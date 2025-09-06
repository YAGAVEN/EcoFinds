
import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({ user, onLogout }){
  return (
    <header className="bg-emerald-600 text-white px-4 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">EF</div>
        <div className="font-semibold text-lg">EcoFinds</div>
      </Link>
      <nav className="flex items-center gap-3">
        <Link to="/" className="hidden md:inline">Browse</Link>
        <Link to="/my-listings" className="hidden md:inline">My Listings</Link>
        <Link to="/cart" className="hidden md:inline">Cart</Link>
        {user ? (
          <div className="flex items-center gap-2">
            <Link to="/profile" className="text-sm">{user.username || user.email}</Link>
            <button onClick={onLogout} className="text-sm">Logout</button>
          </div>
        ) : (
          <Link to="/auth" className="px-3 py-1 bg-white text-emerald-600 rounded">Login</Link>
        )}
      </nav>
    </header>
  )
}
