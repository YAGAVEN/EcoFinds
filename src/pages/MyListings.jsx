import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function MyListings({ auth }) {
  const [my, setMy] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  // Fetch current user info on mount
  useEffect(() => {
    if (auth && auth.getCurrentUser) {
      auth.getCurrentUser().then(user => {
        if (user) setCurrentUserId(user.user_id);
      });
    }
  }, [auth]);

  // Function to fetch user's products
  const fetchMyProducts = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Please login to view your listings");
      return;
    }

    try {
      // First get current user to get their ID
      const userRes = await fetch("http://localhost:8000/users/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!userRes.ok) {
        throw new Error("Failed to get user info");
      }
      
      const user = await userRes.json();
      setCurrentUserId(user.user_id);

      // Then get all products and filter by owner
      const res = await fetch("http://localhost:8000/products/");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      
      // Filter products by current user
      const myProducts = data.filter(product => product.owner_id === user.user_id);
      setMy(myProducts);
    } catch (error) {
      alert(error.message);
    }
  };

  // Fetch user's products on mount
  useEffect(() => {
    fetchMyProducts();
  }, []);

  // Navigate to edit page with product data
  const handleEdit = (product) => {
    navigate("/add-product", { state: { product, my, setMy } });
  };

  // Delete product via API and update UI state
  const handleDelete = async (product) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("You must be logged in to delete products.");
      return;
    }
    if (!window.confirm(`Delete "${product.title}"?`)) return;

    setDeletingId(product.product_id);
    
    try {
      console.log("Deleting product:", product.product_id);
      const res = await fetch(`http://localhost:8000/products/${product.product_id}`, {
        method: "DELETE",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      
      console.log("Delete response status:", res.status);
      
      if (!res.ok) {
        const err = await res.json();
        console.error("Delete error:", err);
        throw new Error(err.detail || "Failed to delete product");
      }
      
      // Refresh the products list to ensure data consistency
      await fetchMyProducts();
      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting product: " + error.message);
    } finally {
      setDeletingId(null);
    }
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {my.length === 0 ? (
          <div className="text-gray-500">No products available.</div>
        ) : (
          my.map((product) => (
            <div
              key={product.product_id}
              className="border rounded-lg p-4 shadow hover:shadow-md flex flex-col justify-between bg-white"
            >
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md overflow-hidden">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>
              <div className="mt-3">
                <h4 className="font-semibold text-lg">{product.title}</h4>
                <p className="text-sm text-gray-500">
                  Category ID: {product.category_id}
                </p>
                <p className="text-green-600 font-bold mt-1">${product.price}</p>
              </div>

              {currentUserId === product.owner_id && (
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    disabled={deletingId === product.product_id}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deletingId === product.product_id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
