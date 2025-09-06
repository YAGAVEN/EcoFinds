import React, { useState, useEffect } from "react";

export default function BrowsePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch products
        const productsRes = await fetch("http://localhost:8000/products/");
        if (!productsRes.ok) throw new Error("Failed to fetch products");
        const productsData = await productsRes.json();
        setProducts(productsData);

        // Fetch categories
        const categoriesRes = await fetch("http://localhost:8000/categories/");
        if (!categoriesRes.ok) throw new Error("Failed to fetch categories");
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);
      } catch (error) {
        alert(error.message);
      }
    }
    fetchData();
  }, []);

  // Function to add product to cart by calling FastAPI cart add endpoint
  const addToCart = async (productId) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Please login to add products to your cart.");
      return;
    }
    try {
      console.log("Adding product to cart:", productId);
      const res = await fetch(`http://localhost:8000/cart/add/${productId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const err = await res.json();
        console.error("Add to cart error:", err);
        throw new Error(err.detail || "Failed to add product to cart.");
      }
      const result = await res.json();
      console.log("Add to cart result:", result);
      alert("Product added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error);
      alert(error.message);
    }
  };

  const filtered = products.filter(
    (p) =>
      (category === "All" || p.category_id === parseInt(category)) &&
      p.title?.toLowerCase().includes(query.toLowerCase())
  );

  // Create category options including "All"
  const categoryOptions = ["All", ...categories.map(cat => ({ id: cat.category_id, name: cat.name }))];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-2 border rounded"
            placeholder="Search by title"
          />
          <div className="hidden md:flex gap-2">
            {categoryOptions.map((c) => (
              <button
                key={typeof c === 'string' ? c : c.id}
                onClick={() => setCategory(typeof c === 'string' ? c : c.id.toString())}
                className={`px-3 py-1 rounded ${
                  category === (typeof c === 'string' ? c : c.id.toString()) ? "bg-emerald-600 text-white" : "bg-white"
                }`}
              >
                {typeof c === 'string' ? c : c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {filtered.length === 0 ? (
          <div className="text-gray-500">No products found for this filter.</div>
        ) : (
          filtered.map((p) => (
            <div
              key={p.product_id}
              className="border rounded-lg p-4 shadow flex flex-col justify-between bg-white"
            >
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
                onClick={() => addToCart(p.product_id)}
                className="mt-4 px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
