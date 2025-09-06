
import React from 'react'

export default function CartPage(){
  // TODO: show cart items pulled from backend or local state
  const cart = []

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Cart</h3>
      <div className="space-y-4">
        {cart.length===0 ? <div className="text-gray-500">Your cart is empty. Implement cart data source.</div> : cart.map((c,i)=> (
          <div key={i} className="border rounded p-3 flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded">Img</div>
            <div className="flex-1">
              <div className="font-semibold">{c.title}</div>
              <div className="text-sm text-gray-500">${c.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
