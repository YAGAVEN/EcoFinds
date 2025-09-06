import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-emerald-600 text-white py-3 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex justify-between">
        <div>© {new Date().getFullYear()} EcoFinds</div>
        <div>Built for sustainable shopping</div>
        <p>Created By Team Galacticos</p>
      </div>
    </footer>
  )
}
