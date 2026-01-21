import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../Service/auth";

const navLinks = [
  { name: "Home", href: "/home" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);

  const goTo = (href) => {
    navigate(href);
    setSidebarOpen(false);
    setUserMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUserMenuOpen(false);
      setSidebarOpen(false);
      navigate("/");
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  if (loading) return null;

  return (
    <>
      <nav className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div
            className="text-xl font-bold tracking-wide cursor-pointer"
            onClick={() => goTo("/home")}
          >
            E-Commerce
          </div>

          <ul className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => goTo(link.href)}
                  className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>

         
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition">
              Cart
            </button>

            {!user ? (
              <button
                onClick={() => goTo("/")}
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Sign In
              </button>
            ) : (
              /* USER DROPDOWN */
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={user.photoURL || "https://via.placeholder.com/40"}
                    alt="profile"
                    className="w-10 h-10 rounded-full border border-gray-700"
                  />
                  <span className="text-sm font-semibold">
                    {user.displayName || "No Name"}
                  </span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-gray-700 rounded shadow-lg z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="md:hidden text-2xl focus:outline-none"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white z-50
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <span className="text-lg font-bold">E-Commerce</span>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className="text-xl"
          >
            ✕
          </button>
        </div>

        {user && (
          <div className="p-4 border-b border-gray-700 flex items-center gap-3">
            <img
              src={user.photoURL || "https://via.placeholder.com/40"}
              alt="profile"
              className="w-10 h-10 rounded-full border border-gray-700"
            />
            <div>
              <p className="font-semibold">
                {user.displayName || "No Name"}
              </p>
            </div>
          </div>
        )}

        <ul className="flex flex-col p-4 space-y-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <button
                className="w-full text-left block px-3 py-2 rounded hover:bg-gray-700"
                onClick={() => goTo(link.href)}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-auto p-4 border-t border-gray-700 flex flex-col space-y-3">
          <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition">
            Cart
          </button>

          {!user ? (
            <button
              onClick={() => goTo("/")}
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
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
