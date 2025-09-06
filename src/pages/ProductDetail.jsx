
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function ProductDetail({ auth }){
  const { id } = useParams()
  const nav = useNavigate()
  // TODO: fetch product by id from API
  const p = null

  if(!p) return <div className="p-8">Product not found. Implement API to fetch product details.</div>

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-gray-100 h-96 rounded flex items-center justify-center">Image</div>
      <div>
        <h2 className="text-2xl font-bold">{p.title}</h2>
        <div className="text-emerald-600 font-bold text-xl mt-2">${p.price}</div>
        <div className="text-sm text-gray-500 mt-1">Category: {p.category}</div>
        <p className="mt-4 text-gray-700">{p.desc}</p>
        <div className="mt-6 flex gap-3">
          <button className="px-4 py-2 bg-emerald-600 text-white rounded">Add to Cart</button>
          <button onClick={()=>nav(-1)} className="px-4 py-2 border rounded">Back</button>
        </div>
      </div>
    </div>
  )
}
