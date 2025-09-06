
import React from 'react'

export default function ProductCard({ p, onClick }){
  return (
    <div className="border rounded p-3 hover:shadow cursor-pointer" onClick={onClick}>
      <div className="h-36 bg-gray-100 rounded flex items-center justify-center mb-3">Image</div>
      <div className="font-semibold">{p.title}</div>
      <div className="text-sm text-gray-500">{p.category}</div>
      <div className="mt-2 font-bold">${p.price}</div>
    </div>
  )
}
