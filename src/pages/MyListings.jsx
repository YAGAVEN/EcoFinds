import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MyListings({ auth }) {
  // Use state so we can update the list dynamically
  const [my, setMy] = useState([
    {
      id: 1,
      title: "Acoustic Guitar",
      category: "Music",
      price: 150,
      imageUrl: "https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=400&q=60",
    },
    {
      id: 2,
      title: "Leather Jacket",
      category: "Clothing",
      price: 75,
      imageUrl: "https://images.unsplash.com/photo-1618354691225-19a3b86c9991?auto=format&fit=crop&w=400&q=60",
    },
  ]);

  const handleEdit = (id) => {
    console.log("Edit product with id:", id);
    // TODO: navigate to edit form or prefill AddProduct form
  };

  const handleDelete = (id) => {
    const updated = my.filter((product) => product.id !== id);
    setMy(updated);
    alert("Product deleted successfully!");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">My Listings</h3>
        <Link
          to="/add-product"
          className="px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
        >
          + Add Product
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {my.length === 0 ? (
          <div className="text-gray-500">
            You have no listings. Implement your backend to show listings.
          </div>
        ) : (
          my.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow hover:shadow-md flex flex-col justify-between bg-white"
            >
              {/* Product Image */}
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>

              {/* Product Info */}
              <div className="mt-3">
                <h4 className="font-semibold text-lg">{product.title}</h4>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-green-600 font-bold mt-1">${product.price}</p>
              </div>

              {/* Edit & Delete Buttons */}
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
