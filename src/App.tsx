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
import Dashboard from "./pages/Dashboard";
import HumanFeaturesForm from "./pages/HumanFeaturesForm";
import AuditoryTestLayout from "./pages/AuditoryTestLayout";
import TestDispatcher from "./components/TestDispatcher";
import VisualTestLayout from "./pages/VisualTestLayout";
import TestTypeSelection from "./pages/TestTypeSelection";
// import LanguageTestLayout from "./pages/LanguageTestLayout";

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
						{/* <Route element={<ProtectedRoute />}> */}
						<Route path="me" element={<Profile />} />
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="human" element={<HumanFeaturesForm />} />

						{/* -------- Test Euruka Layout -------- */}
						<Route path="test/selection" element={<TestTypeSelection />} />

						{/* -------- Auditory Test Layout -------- */}
						<Route
							path="test/auditory"
							element={<AuditoryTestLayout />}
						>
							<Route
								path="instruction"
								element={<TestDispatcher testType="auditory" />}
							/>
							<Route
								path=":type/:cardQuantity"
								element={<TestDispatcher testType="auditory" />}
							/>
							<Route
								path="rating"
								element={<TestDispatcher testType="auditory" />}
							/>
						</Route>

						{/* -------- Visual Test Layout -------- */}
						<Route
							path="test/visual"
							element={<VisualTestLayout />}
						>
							<Route
								path="instruction"
								element={<TestDispatcher testType="visual" />}
							/>
							<Route
								path=":type/:cardQuantity"
								element={<TestDispatcher testType="visual" />}
							/>
							<Route
								path="rating"
								element={<TestDispatcher testType="visual" />}
							/>
						</Route>

						{/* -------- Language Test Layout -------- */}
						{/* <Route
							path="test/language"
							element={<LanguageTestLayout />}
						>
							<Route
								path="instruction"
								element={<TestDispatcher testType="language" />}
							/>
							<Route
								path=":type/:cardQuantity"
								element={<TestDispatcher testType="language" />}
							/>
							<Route
								path="rating"
								element={<TestDispatcher testType="language" />}
							/>
						</Route> */}

						{/* </Route> */}
						{/* 404 */}
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
