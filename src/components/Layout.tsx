import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="
      min-h-screen 
      flex flex-col 
      bg-gradient-to-br from-yellow-100 via-pink-50 to-purple-100
      font-[Fredoka,Comic Sans MS,Arial Rounded,sans-serif]
    ">
      <Header />
      <main
        className="
          flex-grow 
          container mx-auto 
          p-4 md:p-8 
          my-4 md:my-8 
          rounded-[2.5rem] 
          bg-white/80 
          shadow-xl
          border-4 border-pink-100
          min-h-[350px]
          flex flex-col justify-center
        "
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;