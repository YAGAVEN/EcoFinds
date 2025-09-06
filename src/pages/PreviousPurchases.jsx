import React from "react"

export default function PreviousPurchases({ purchases = [] }) {
  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-4">Previously Purchased Items</h3>
      {purchases.length === 0 ? (
        <div className="text-gray-500">No previous purchases.</div>
      ) : (
        <div className="space-y-3">
          {purchases.map((p, i) => (
            <div
              key={i}
              className="border rounded-lg p-3 flex items-center gap-3 bg-white shadow-sm"
            >
              <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div>
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-gray-500">
                  Purchased: {new Date(p.purchasedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
