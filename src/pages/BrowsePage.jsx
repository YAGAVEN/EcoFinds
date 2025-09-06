
import React, { useState } from 'react'
import ProductCard from '../components/ProductCard'

export default function BrowsePage(){
  // NOTE: products list intentionally left empty for you to fill from API or local data.
  const [products] = useState([])
  const [query,setQuery] = useState('')
  const [category,setCategory] = useState('All')
  const categories = ['All','Clothing','Music','Books','Electronics','Furniture','Misc']

  const filtered = products.filter(p => (category==='All' || p.category===category) && p.title?.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <input value={query} onChange={e=>setQuery(e.target.value)} className="p-2 border rounded" placeholder="Search by title" />
          <div className="hidden md:flex gap-2">
            {categories.map(c => <button key={c} onClick={()=>setCategory(c)} className={`px-3 py-1 rounded ${category===c ? 'bg-emerald-600 text-white' : 'bg-white'}`}>{c}</button>)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {filtered.length===0 ? <div className="text-gray-500">No products — implement your data source.</div> : filtered.map(p => <ProductCard key={p.id} p={p} onClick={()=>{}} />)}
      </div>
    </div>
  )
}
