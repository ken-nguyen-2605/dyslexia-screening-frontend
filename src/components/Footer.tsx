const Footer = () => {
  return (
    <footer className="bg-teal-400 text-white py-5 mt-4">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Logo */}
        <div>
          <h2 className="text-xl font-bold text-white mb-2">DyslexiaDetect</h2>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-base font-semibold mb-1">Address</h3>
          <ul className="space-y-0.5 text-sm">
            <li><a href="#" className="hover:underline">Email</a></li>
            <li><a href="#" className="hover:underline">LinkedIn</a></li>
            <li><a href="#" className="hover:underline">Instagram</a></li>
            <li><a href="#" className="hover:underline">Twitter</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-base font-semibold mb-1">Contact</h3>
          <ul className="space-y-0.5 text-sm">
            <li><a href="#" className="hover:underline">Email</a></li>
            <li><a href="#" className="hover:underline">LinkedIn</a></li>
            <li><a href="#" className="hover:underline">Instagram</a></li>
            <li><a href="#" className="hover:underline">Twitter</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-base font-semibold mb-1">Join our newsletter</h3>
          <form className="flex flex-col sm:flex-row items-center gap-2 mt-1">
            <input
              type="email"
              placeholder="Email Address"
              className="px-3 py-1 rounded-full text-teal-700 placeholder-teal-600 bg-teal-50 border border-teal-200 outline-none w-full sm:w-auto text-sm"
            />
            <button
              type="submit"
              className="bg-white text-teal-500 font-semibold px-4 py-1 rounded-full shadow hover:bg-teal-100 transition text-sm"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>

      {/* Copyright dưới cùng */}
      <div className="text-center text-xs mt-4 text-white opacity-70">
        © {new Date().getFullYear()} HCMUT
      </div>
    </footer>
  );
};

export default Footer;


