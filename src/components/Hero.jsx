
import React from 'react'
import { Link } from 'react-router-dom'

export default function Hero(){
  return (
    <section className="bg-emerald-50 py-8">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-3xl font-extrabold">EcoFinds — Sustainable Second-Hand Marketplace</h1>
          <p className="mt-3 text-gray-700">Join a community that values reuse. Browse and list pre-owned items easily.</p>
          <div className="mt-4 flex gap-3">
            <Link to="/" className="px-4 py-2 bg-emerald-600 text-white rounded">Browse</Link>
            <Link to="/add-product" className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded">Create Listing</Link>
          </div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="h-48 rounded bg-gradient-to-br from-emerald-200 to-emerald-100 flex items-center justify-center text-2xl font-semibold text-emerald-800">Find unique second-hand treasures</div>
        </div>
      </div>
    </section>
  )
}
