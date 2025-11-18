import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import Layout from "./components/common/Layout";
import ProfileProtectedRoute from "./components/auth/ProfileProtectedRoute";
import AccountProtectedRoute from "./components/auth/AccountProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import HumanFeaturesForm from "./pages/HumanFeaturesForm";
import AuditoryTest from "./pages/AuditoryTest";
import TestDispatcher from "./components/TestDispatcher";
import VisualTestLayout from "./pages/VisualTestLayout";
import LanguageTestLayout from "./pages/LanguageTestLayout";
import SelectProfile from "./pages/SelectProfile";
import GameCanvas from "./components/GameCanvas";
import Minigame3 from "./pages/Minigame3";

function App() {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route path="/minigame" element={<GameCanvas />} />
					<Route path="/" element={<Layout />}>
						{/* Public Routes */}
						<Route index element={<Home />} />
						<Route path="about" element={<About />} />
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />

						{/* Account Protected Routes */}
						<Route element={<AccountProtectedRoute />}>
							<Route
								path="profile/select"
								element={<SelectProfile />}
							/>
						</Route>

						{/* Protected Routes */}
						{/* <Route element={<ProfileProtectedRoute />}> */}
							<Route path="me" element={<Profile />} />
							<Route path="dashboard" element={<Dashboard />} />
							<Route
								path="human"
								element={<HumanFeaturesForm />}
							/>

							{/* -------- Auditory Test -------- */}
							<Route
								path="test/auditory"
								element={<AuditoryTest />}
							/>

							{/* -------- Visual Test Layout -------- */}
							<Route
								path="test/visual"
								element={<VisualTestLayout />}
							>
								<Route
									path="instruction"
									element={
										<TestDispatcher testType="visual" />
									}
								/>
								<Route
									path=":type/:cardQuantity"
									element={
										<TestDispatcher testType="visual" />
									}
								/>
								<Route
									path="rating"
									element={
										<TestDispatcher testType="visual" />
									}
								/>
							</Route>

							{/* -------- Language Test Layout -------- */}
							<Route
								path="test/language"
								element={<LanguageTestLayout />}
							>
								<Route
									path="instruction"
									element={
										<TestDispatcher testType="language" />
									}
								/>
								<Route
									path=":type"
									element={
										<TestDispatcher testType="language" />
									}
								/>
								<Route
									path="rating"
									element={
										<TestDispatcher testType="language" />
									}
								/>
							</Route>

							
						{/* </Route> */}

						{/* 404 */}
						<Route path="*" element={<NotFound />} />
					</Route>
					{/* -------- Minigame 3 -------- */
							<Route
								path="test/minigame3"
								element={<Minigame3 />}
							/>}
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
