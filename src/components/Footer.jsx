
import React from 'react'
export default function Footer(){
  return (
    <footer className="bg-gray-50 text-gray-600 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex justify-between">
        <div>© {new Date().getFullYear()} EcoFinds</div>
        <div>Built for sustainable shopping</div>
      </div>
    </footer>
  )
}
