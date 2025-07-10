import { useCart } from "../context/CartContext";
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleOrderPlaced = () => {
    setShowCheckout(false);
    setShowSuccess(true);

    
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-160px)]">
          {cartItems.length === 0 && (
            <p className="text-gray-500">Cart is empty.</p>
          )}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 items-center border-b pb-2"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-14 h-14 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium text-sm">{item.title}</h3>
                <p className="text-xs text-gray-600">
                  ${item.price} × {item.quantity}
                </p>
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-2 text-sm bg-gray-200 rounded"
                  >
                    −
                  </button>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-2 text-sm bg-gray-200 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm ml-auto"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <p className="font-bold mb-2">Total: ${cartTotal.toFixed(2)}</p>
          <button
            onClick={() => setShowCheckout(true)}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl text-center">
            <p className="text-green-600 font-semibold text-lg">
              ✅ Order placed successfully!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CartSidebar;
