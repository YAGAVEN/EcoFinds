import React, { useEffect, useState } from "react";
import PreviousPurchases from "./PreviousPurchases";
import { getCart, removeFromCart } from "../api";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      // Assuming backend returns { items: [{ product: {...}, quantity: X, id: Y }] }
      setCart(data.items || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch cart");
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
      fetchCart(); // refresh
    } catch (err) {
      console.error(err);
      alert("Failed to remove item");
    }
  };

  const handleBuyAll = () => {
    alert("Proceeding to checkout for all items 🛒");
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2);

  // Example previous purchases (still local)
  const purchases = [
    { title: "Bamboo Toothbrush", purchasedAt: "2024-08-25T10:30:00Z", image: "/images/toothbrush.jpg" },
    { title: "Organic Cotton T-Shirt", purchasedAt: "2024-07-12T14:15:00Z", image: "/images/tshirt.jpg" },
  ];

  if (loading) return <div>Loading cart...</div>;

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-4 gap-6">
      {/* Left Side - Previous Purchases */}
      <div className="col-span-1">
        <PreviousPurchases purchases={purchases} />
      </div>

      {/* Right Side - Cart */}
      <div className="col-span-3">
        <h3 className="text-2xl font-bold mb-6">My Cart</h3>

        {cart.length === 0 ? (
          <div className="text-gray-500">Your cart is empty.</div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-4 flex items-center gap-4 shadow-sm bg-white"
              >
                <img
                  src={item.product.image || "/images/default-product.jpg"}
                  alt={item.product.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="font-semibold text-lg">{item.product.title}</div>
                  <div className="text-gray-600">${item.product.price}</div>
                  <div className="text-gray-500">Quantity: {item.quantity}</div>
                </div>
                <button
                  onClick={() => handleRemove(item.product_id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Summary */}
            <div className="mt-6 p-4 border rounded-xl bg-white shadow-sm flex justify-between items-center">
              <div className="font-semibold text-lg">Total: ${total}</div>
              <button
                onClick={handleBuyAll}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Buy All Items
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
