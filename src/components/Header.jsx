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

  const navButtonClass =
    "px-3 py-1 md:px-4 md:py-2 bg-white/20 hover:bg-white/30 text-white rounded-md font-medium transition"

  return (
    <header className="bg-emerald-600 text-white px-4 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">EF</div>
        <div className="font-semibold text-lg">EcoFinds</div>
      </Link>

      <nav className="flex items-center gap-3 md:gap-4">
        <Link to="/" className={navButtonClass}>Browse</Link>
        <Link to="/my-listings" className={navButtonClass}>My Listings</Link>
        <Link to="/cart" className={navButtonClass}>Cart</Link>

        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
            >
              <UserCircle className="w-6 h-6" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg overflow-hidden py-2">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition rounded-md mx-2"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={onLogout}
                  className="block w-[calc(100%-1rem)] mx-2 px-4 py-2 text-sm font-medium text-left text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/auth"
            className="px-3 py-1 md:px-4 md:py-2 bg-white text-emerald-600 rounded-md font-medium hover:bg-gray-100 transition"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  )
}
