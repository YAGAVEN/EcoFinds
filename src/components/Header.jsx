import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserCircle } from 'lucide-react'

export default function Header({ user, onLogout }) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setOpen(!open)} 
              className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"
            >
              <UserCircle className="w-6 h-6" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-gray-700 rounded shadow-lg overflow-hidden">
                <Link 
                  to="/profile" 
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>
                <button 
                  onClick={onLogout} 
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/auth" className="px-3 py-1 bg-white text-emerald-600 rounded">Login</Link>
        )}
      </nav>
    </header>
  )
}
