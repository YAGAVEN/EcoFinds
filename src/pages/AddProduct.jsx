import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddProduct() {
  const location = useLocation();
  const navigate = useNavigate();

  const { product: editProduct, my, setMy } = location.state || {};

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    condition: "",
    year: "",
    brand: "",
    model: "",
    dimensions: "",
    weight: "",
    material: "",
    color: "",
    originalPacking: false,
    manualInstructions: false,
    workingCondition: "",
    imageUrl: "", // NEW FIELD
  });

  // Prefill form if editing
  useEffect(() => {
    if (editProduct) {
      setForm(editProduct);
    }
  }, [editProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editProduct) {
      // Update existing product
      const updated = my.map((p) => (p.id === editProduct.id ? form : p));
      setMy(updated);
      alert("Product updated successfully!");
    } else {
      // Add new product
      const newProduct = { ...form, id: Date.now() };
      setMy([...my, newProduct]);
      alert("Product added successfully!");
    }

    navigate("/my-listings");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">
          {editProduct ? "Edit Product" : "Add a New Product"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Title */}
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Product Title"
            className="w-full p-2 border rounded-lg"
            required
          />

          {/* Category Dropdown */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">Select Category</option>
            <option value="Music">Music</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Misc">Misc</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
          </select>

          {/* Product Description */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="w-full p-2 border rounded-lg"
            rows="3"
            required
          />

          {/* Price & Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Condition & Year */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="condition"
              value={form.condition}
              onChange={handleChange}
              placeholder="Condition"
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="number"
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="Year of Manufacture"
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Brand & Model */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="Brand"
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              name="model"
              value={form.model}
              onChange={handleChange}
              placeholder="Model"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Dimensions & Weight */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="dimensions"
              value={form.dimensions}
              onChange={handleChange}
              placeholder="Dimensions (L x W x H)"
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              placeholder="Weight"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Material & Color */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="material"
              value={form.material}
              onChange={handleChange}
              placeholder="Material"
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              name="color"
              value={form.color}
              onChange={handleChange}
              placeholder="Color"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Image URL */}
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Product Image URL"
            className="w-full p-2 border rounded-lg"
          />

          {/* Boolean Checkboxes */}
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="originalPacking"
                checked={form.originalPacking}
                onChange={handleChange}
              />
              <span>Original Packing</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="manualInstructions"
                checked={form.manualInstructions}
                onChange={handleChange}
              />
              <span>Manual Instructions</span>
            </label>
          </div>

          {/* Working Condition */}
          <textarea
            name="workingCondition"
            value={form.workingCondition}
            onChange={handleChange}
            placeholder="Working Condition Description"
            className="w-full p-2 border rounded-lg"
            rows="3"
          />

          {/* Submit Button */}
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
