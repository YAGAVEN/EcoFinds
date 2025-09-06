import React, { useState } from "react"
import PreviousPurchases from "./PreviousPurchases"

export default function CartPage() {
  const [cart, setCart] = useState([
    { id: 1, title: "Eco-Friendly Bottle", price: 15.99, image: "/images/bottle.jpg", qty: 1 },
    { id: 2, title: "Reusable Bag", price: 7.49, image: "/images/bag.jpg", qty: 2 },
  ])

  // 🔹 Example previous purchases
  const purchases = [
    { title: "Bamboo Toothbrush", purchasedAt: "2024-08-25T10:30:00Z", image: "/images/toothbrush.jpg" },
    { title: "Organic Cotton T-Shirt", purchasedAt: "2024-07-12T14:15:00Z", image: "/images/tshirt.jpg" },
  ]

  function updateQuantity(id, change) {
    setCart(cart.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + change) } : item
    ))
  }

  function handleRemove(id) {
    setCart(cart.filter(item => item.id !== id))
  }

  function handleBuyAll() {
    alert("Proceeding to checkout for all items 🛒")
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-4 gap-6">
      {/* Left Side - Previous Purchases */}
      <div className="col-span-1">
        <PreviousPurchases purchases={purchases} />
      </div>

      {/* Right Side - Cart */}
      <div className="col-span-3">
        <h3 className="text-2xl font-bold mb-6">My Cart</h3>

        {cart.length === 0 ? (
          <div className="text-gray-500">Your cart is empty.</div>
        ) : (
          <div className="space-y-4">
            {cart.map(item => (
              <div
                key={item.id}
                className="border rounded-xl p-4 flex items-center gap-4 shadow-sm bg-white"
              >
                <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold text-lg">{item.title}</div>
                  <div className="text-gray-600">${item.price}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      –
                    </button>
                    <span className="px-3">{item.qty}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Summary */}
            <div className="mt-6 p-4 border rounded-xl bg-white shadow-sm flex justify-between items-center">
              <div className="font-semibold text-lg">Total: ${total}</div>
              <button
                onClick={handleBuyAll}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Buy All Items
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
