import { useCart } from "../context/CartContext";
import { useState } from "react";

const CheckoutModal = ({ isOpen, onClose, onOrderPlaced }) => {
  const { cartItems, clearCart } = useCart();

  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log("Form submitted:", form);
    console.log("Order placed:", cartItems);
    
    if (!form.name || !form.email || !form.address) {
      setError("Please fill in all fields.");
      return;
    }

    clearCart();
    onOrderPlaced(); 
    onClose(); // ✅ Close modal
    setForm({ name: "", email: "", address: "" });
    setError("");
   // ✅ Trigger success toast

  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg w-full max-w-lg p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Checkout</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows="3"
              value={form.address}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            ></textarea>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sky-500 text-white hover:bg-sky-600 text-sm rounded"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
