import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddProduct() {
  const location = useLocation();
  const navigate = useNavigate();

  const { product: editProduct } = location.state || {};

  const [form, setForm] = useState({
    title: "",
    description: "",
    category_id: "",
    price: "",
    image_url: "",
    status: "active",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (editProduct) {
      setForm(editProduct);
    }
  }, [editProduct]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("http://localhost:8000/categories/");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Please log in to add or update products.");
      return;
    }

    try {
      const response = await fetch(
        editProduct
          ? `http://localhost:8000/products/${editProduct.product_id}`
          : "http://localhost:8000/products/",
        {
          method: editProduct ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        alert(`Error: ${error.detail || "Failed to save product."}`);
        return;
      }

      alert(editProduct ? "Product updated successfully!" : "Product added successfully!");
      navigate("/my-listings");
    } catch (error) {
      alert("Network or server error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">{editProduct ? "Edit Product" : "Add Product"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Product title"
            className="w-full p-2 border rounded-lg"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Product description"
            className="w-full p-2 border rounded-lg"
            rows={4}
          />
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            step="0.01"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="text"
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-2 border rounded-lg"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            {editProduct ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
