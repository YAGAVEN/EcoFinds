import React from "react"
import { useNavigate } from "react-router-dom"

export default function PreviousPurchases() {
  const navigate = useNavigate()

  // Redirect to cart page where orders are now displayed
  React.useEffect(() => {
    navigate("/cart")
  }, [navigate])

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔄</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Redirecting...</h3>
        <p className="text-gray-500">Taking you to your cart and orders page.</p>
      </div>
    </div>
  )
}
