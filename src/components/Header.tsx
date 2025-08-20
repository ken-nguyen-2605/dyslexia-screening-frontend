import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <nav className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-teal-700 font-sans"
        >
          <span className="text-teal-700">Dyslexia</span>
          <span className="text-teal-500">Detect</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/"
            className="px-4 py-2 text-gray-700 hover:text-teal-700 font-medium transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="px-4 py-2 text-gray-700 hover:text-teal-700 font-medium transition"
          >
            About
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="font-medium hover:text-gray-300"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="font-medium hover:text-gray-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="ml-2 px-5 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md font-semibold shadow-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="ml-1 px-3 py-1.5 border-2 border-teal-500 text-teal-500 hover:bg-teal-50 rounded-md font-semibold shadow-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile button */}
        <button
          className="md:hidden p-2 text-gray-700 hover:text-teal-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-3 space-y-2 bg-white shadow-md">
          <Link
            to="/"
            className="block py-2 text-gray-700 hover:text-teal-700"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block py-2 text-gray-700 hover:text-teal-700"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block py-2 text-gray-700 hover:text-teal-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-gray-700 hover:text-teal-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block py-2 bg-teal-500 text-white rounded-md text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block py-2 border-2 border-teal-500 text-teal-500 rounded-md text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
