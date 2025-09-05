import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className="
        sticky top-0 z-10
        bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100
        shadow
        border-b-2 border-pink-200
        font-[Fredoka,Comic Sans MS,Arial Rounded,sans-serif]
      "
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold flex items-baseline">
          <span className="text-pink-500 drop-shadow">Dyslexia</span>
          <span className="text-yellow-500 drop-shadow">Buddy</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="px-4 py-2 text-pink-600 hover:text-yellow-500 font-bold transition"
          >
            Trang chủ
          </Link>
          <Link
            to="/about"
            className="px-4 py-2 text-pink-600 hover:text-yellow-500 font-bold transition"
          >
            Về chúng tôi
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 text-pink-600 font-bold transition hover:text-yellow-400"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 font-bold text-pink-600 bg-yellow-300 rounded-full shadow hover:bg-yellow-400 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="ml-2 px-5 py-2 bg-pink-500 hover:bg-pink-400 text-white rounded-full font-bold shadow transition"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="ml-2 px-5 py-2 border-2 border-pink-400 text-pink-500 hover:bg-pink-100 rounded-full font-bold shadow transition"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-3xl text-pink-500 bg-yellow-200 rounded-full px-3 py-1 shadow hover:bg-yellow-300 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </nav>
      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-3 space-y-2 bg-pink-100 rounded-b-3xl shadow font-[Fredoka,Comic Sans MS,Arial Rounded,sans-serif]">
          <Link
            to="/"
            className="block py-3 text-pink-600 hover:text-yellow-500 text-lg font-bold rounded-full"
            onClick={() => setIsMenuOpen(false)}
          >Home</Link>
          <Link
            to="/about"
            className="block py-3 text-pink-600 hover:text-yellow-500 text-lg font-bold rounded-full"
            onClick={() => setIsMenuOpen(false)}
          >About</Link>
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block py-3 text-pink-600 hover:text-yellow-500 text-lg font-bold rounded-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-3 text-pink-600 hover:text-yellow-500 text-lg font-bold rounded-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block py-3 bg-pink-500 text-white rounded-full text-center shadow font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block py-3 border-2 border-pink-400 text-pink-500 rounded-full text-center shadow font-bold"
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