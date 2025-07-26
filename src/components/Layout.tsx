import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
	return (
		<div className="flex flex-col min-h-screen bg-teal-50">
			<Header />
			<main className="flex-grow container mx-auto p-4 ">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
