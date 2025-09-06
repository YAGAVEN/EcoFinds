
import React from 'react'
import { Link } from 'react-router-dom'

export default function MyListings({ auth }){
  // TODO: fetch user's listings from API
  const my = []

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">My Listings</h3>
        <Link to="/add-product" className="px-3 py-2 bg-emerald-600 text-white rounded">+ Add Product</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {my.length===0 && <div className="text-gray-500">You have no listings. Implement your backend to show listings.</div>}
      </div>
    </div>
  )
}
