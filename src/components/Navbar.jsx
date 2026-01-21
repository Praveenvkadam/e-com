import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { logoutUser } from "../Service/auth";

const navLinks = [
  { name: "Home", href: "/home" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isAuthenticated = Boolean(user);

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const resetMenus = () => {
    setSidebarOpen(false);
    setUserMenuOpen(false);
  };

  const goTo = (path) => {
    navigate(path);
    resetMenus();
  };

  const handleLogout = async () => {
    await logoutUser();
    resetMenus();
    navigate("/");
  };

  if (loading) return null;

  return (
    <>
      <nav className="bg-gray-800 text-white relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div
            className="text-xl font-bold cursor-pointer"
            onClick={() => goTo("/home")}
          >
            E-Commerce
          </div>

          <ul className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => goTo(link.href)}
                  className="hover:underline"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" onClick={resetMenus} className="relative">
              <button className="p-2 rounded hover:bg-gray-700">
                <FiShoppingCart size={22} />
              </button>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {!isAuthenticated ? (
              <button
                onClick={() => goTo("/")}
                className="bg-green-500 px-4 py-2 rounded"
              >
                Sign In
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => {
                    setUserMenuOpen((p) => !p);
                    setSidebarOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                 <img
                    src={user?.photoURL || "https://via.placeholder.com/40"}
                    alt="User"
                    className="w-9 h-9 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/40";
                    }}
                  />

                  <span className="text-sm font-semibold">
                    {user.displayName || "User"}
                  </span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-gray-700 rounded shadow-lg z-50">
                    <Link to="/profile" onClick={resetMenus}>
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-600">
                        Profile
                      </button>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left hover:bg-gray-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setSidebarOpen(true);
              setUserMenuOpen(false);
            }}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </div>
      </nav>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={resetMenus}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white z-50
        transform transition-transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <span className="font-bold">E-Commerce</span>
          <button onClick={resetMenus}>✕</button>
        </div>

        <ul className="p-4 space-y-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <button
                onClick={() => goTo(link.href)}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-700"
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="p-4 border-t border-gray-700 space-y-3">
          <Link to="/cart" onClick={resetMenus}>
            <button className="flex items-center gap-3 bg-blue-500 px-4 py-2 rounded w-full">
              <FiShoppingCart size={18} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="ml-auto bg-white text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </Link>

          {!isAuthenticated ? (
            <button
              onClick={() => goTo("/")}
              className="bg-green-500 px-4 py-2 rounded w-full"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded w-full"
            >
              Logout
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Navbar;
