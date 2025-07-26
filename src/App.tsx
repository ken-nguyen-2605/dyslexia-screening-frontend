import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
// import Dashboard from "./pages/Dashboard";

function App() {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Layout />}>
						{/* Public Routes */}
						<Route index element={<Home />} />
						<Route path="about" element={<About />} />
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />

						{/* Protected Routes */}
						<Route element={<ProtectedRoute />}>
							<Route path="me" element={<Profile />} />
							{/* <Route path="dashboard" element={<Dashboard />} /> */}
						</Route>

						{/* A catch-all route for 404 Not Found pages */}
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
