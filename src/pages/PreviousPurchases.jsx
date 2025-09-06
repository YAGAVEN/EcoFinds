
import React from 'react'

export default function PreviousPurchases(){
  // TODO: fetch purchases list from backend
  const purchases = []

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Previous Purchases</h3>
      {purchases.length===0 ? <div className="text-gray-500">No previous purchases. Implement backend integration.</div> : purchases.map((p,i)=> (
        <div key={i} className="border rounded p-3 flex items-center gap-3">
          <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center">Img</div>
          <div>
            <div className="font-semibold">{p.title}</div>
            <div className="text-sm text-gray-500">Purchased: {new Date(p.purchasedAt).toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
