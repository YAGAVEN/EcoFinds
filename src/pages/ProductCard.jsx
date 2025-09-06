export default function ProductCard({ p, onAddToCart }) {
  return (
    <div className="border rounded-lg p-4 shadow flex flex-col justify-between bg-white">
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md overflow-hidden">
        {p.image_url ? (
          <img src={p.image_url} alt={p.title} className="object-cover w-full h-full" />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>
      <div className="mt-3">
        <h4 className="font-semibold text-lg">{p.title}</h4>
        <p className="text-sm text-gray-500">Category ID: {p.category_id}</p>
        <p className="text-green-600 font-bold mt-1">${p.price}</p>
      </div>
      <button
        onClick={onAddToCart}
        className="mt-4 px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
