import React, { useState, useEffect } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("cart"); // "cart" or "orders"

  // Fetch cart items and orders on mount
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("Please login to view your cart and orders");
        setLoading(false);
        return;
      }
      
      try {
        // Fetch cart
        const cartRes = await fetch("http://localhost:8000/cart/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!cartRes.ok) throw new Error("Failed to fetch cart");
        const cartData = await cartRes.json();
        console.log("Cart data received:", cartData);
        setCartItems(cartData.cart_items || []);

        // Fetch orders
        const ordersRes = await fetch("http://localhost:8000/orders/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          console.log("Orders data received:", ordersData);
          setOrders(ordersData);
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Add one quantity (calls /cart/add/{product_id})
  const addQuantity = async (productId) => {
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`http://localhost:8000/cart/add/${productId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to add quantity");
      // Refresh cart after update
      await refreshCart();
    } catch (error) {
      alert(error.message);
    }
  };

  // Decrease quantity by removing one item
  const decreaseQuantity = async (productId) => {
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`http://localhost:8000/cart/remove/${productId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to decrease quantity");
      // Refresh cart after update
      await refreshCart();
    } catch (error) {
      alert(error.message);
    }
  };

  // Remove the product completely from cart
  const removeProduct = async (productId) => {
    if (!window.confirm("Remove this item from cart?")) return;
    
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`http://localhost:8000/cart/remove/${productId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to remove product");
      // Refresh cart after update
      await refreshCart();
    } catch (error) {
      alert(error.message);
    }
  };

  // Refresh cart items and orders from backend
  const refreshCart = async () => {
    const token = localStorage.getItem("access_token");
    
    // Refresh cart
    const cartRes = await fetch("http://localhost:8000/cart/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const cartData = await cartRes.json();
    setCartItems(cartData.cart_items || []);

    // Refresh orders
    const ordersRes = await fetch("http://localhost:8000/orders/my", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (ordersRes.ok) {
      const ordersData = await ordersRes.json();
      setOrders(ordersData);
    }
  };

  // Checkout function
  const handleCheckout = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Please login to checkout");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (!window.confirm("Proceed to checkout?")) return;

    try {
      const res = await fetch("http://localhost:8000/orders/checkout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Checkout failed");
      }

      const data = await res.json();
      alert(`Order placed successfully! Order ID: ${data.order_id}, Total: $${data.total}`);
      
      // Refresh cart (should be empty now)
      await refreshCart();
    } catch (error) {
      alert("Checkout error: " + error.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  const total = cartItems
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">My Cart & Orders</h3>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("cart")}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === "cart"
                ? "bg-white text-emerald-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Cart ({cartItems.length})
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === "orders"
                ? "bg-white text-emerald-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Orders ({orders.length})
          </button>
        </div>
      </div>

      {activeTab === "cart" && (
        <div>
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🛒</div>
              <h4 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h4>
              <p className="text-gray-500">Add some products to get started!</p>
            </div>
          ) : (
            <div>
              <div className="space-y-4">
                {cartItems.map(({ product, quantity }) => (
                  <div
                    key={product.product_id}
                    className="border rounded-xl p-4 flex items-center gap-4 shadow-sm bg-white"
                  >
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-lg">{product.title}</div>
                      <div className="text-gray-600">${product.price}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => decreaseQuantity(product.product_id)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="px-3">{quantity}</span>
                        <button
                          onClick={() => addQuantity(product.product_id)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeProduct(product.product_id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-6 p-4 border rounded-xl bg-white shadow-sm flex justify-between items-center">
                  <div className="font-semibold text-lg">Total: ${total}</div>
                  <button
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "orders" && (
        <div>
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <h4 className="text-xl font-semibold text-gray-600 mb-2">No orders yet</h4>
              <p className="text-gray-500">Your order history will appear here after you make a purchase.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.order_id}
                  className="border rounded-xl p-6 bg-white shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold">Order #{order.order_id}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                        order.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-emerald-600">
                        ${order.total_price}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-700">Items:</h5>
                    {order.items?.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <div className="flex-1">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-gray-500">
                            Quantity: {item.quantity} × ${item.price}
                          </div>
                        </div>
                        <div className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
