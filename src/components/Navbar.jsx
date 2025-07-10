import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartSidebar from './CartSidebar'; // Make sure this path is correct

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Dummy cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'T-Shirt', price: 20, quantity: 1 },
    { id: 2, name: 'Cap', price: 10, quantity: 2 },
  ]);

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  return (
    <>
      <nav className="shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  className="h-8 w-auto"
                  src="https://qtecsolution.com/assets/Frontend/images/logo/logo.svg"
                  alt="MiniShop"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="text-gray-800 hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <button
                  onClick={() => setCartOpen(true)}
                  className="text-gray-800 hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Cart
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={toggleMenu}
                className="text-gray-800 hover:text-sky-400 focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="block text-gray-800 hover:text-sky-400 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <button
                onClick={() => {
                  setCartOpen(true);
                  setMenuOpen(false);
                }}
                className="block w-full text-left text-gray-800 hover:text-sky-400 px-3 py-2 rounded-md text-base font-medium"
              >
                Cart
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Cart Sidebar Component */}
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
      />
    </>
  );
};

export default Navbar;