
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function ProductDetail({ auth }){
  const { id } = useParams()
  const nav = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`http://localhost:8000/products/${id}`)
        if (!response.ok) {
          if (response.status === 404) {
            setError('Product not found')
          } else {
            setError('Failed to fetch product')
          }
          return
        }
        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError('Network error')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const addToCart = async () => {
    const token = localStorage.getItem("access_token")
    if (!token) {
      alert("Please login to add products to your cart.")
      return
    }
    try {
      const res = await fetch(`http://localhost:8000/cart/add/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail || "Failed to add product to cart.")
      }
      alert("Product added to cart!")
    } catch (error) {
      alert(error.message)
    }
  }

  if (loading) return <div className="p-8">Loading product details...</div>
  if (error) return <div className="p-8 text-red-600">{error}</div>
  if (!product) return <div className="p-8">Product not found.</div>

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-gray-100 h-96 rounded flex items-center justify-center overflow-hidden">
        {product.image_url ? (
          <img 
            src={product.image_url} 
            alt={product.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <div className="text-emerald-600 font-bold text-xl mt-2">${product.price}</div>
        <div className="text-sm text-gray-500 mt-1">Category ID: {product.category_id}</div>
        <p className="mt-4 text-gray-700">{product.description}</p>
        <div className="mt-6 flex gap-3">
          <button 
            onClick={addToCart}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          >
            Add to Cart
          </button>
          <button 
            onClick={()=>nav(-1)} 
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}
