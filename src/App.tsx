import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import Layout from "./components/common/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import HumanFeaturesForm from "./pages/HumanFeaturesForm";
import AuditoryTest from "./pages/AuditoryTest";
import VisualTestLayout from "./pages/VisualTestLayout";
import LanguageTestLayout from "./pages/LanguageTestLayout";
import SelectProfile from "./pages/SelectProfile";

// --- 1. IMPORT MINIGAME MỚI TẠI ĐÂY ---
import SpaceRescueGame from "./minigame4"; 

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

                        {/* Chọn profile trực tiếp */}
                        <Route path="profile/select" element={<SelectProfile />} />

                        {/* Protected Routes */}
                        <Route path="me" element={<Profile />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="human" element={<HumanFeaturesForm />} />
                        <Route path="test/auditory" element={<AuditoryTest />} />

                        <Route path="test/visual" element={<VisualTestLayout />}>
                            <Route path="instruction" element={<VisualTestLayout />} />
                            <Route path=":type/:cardQuantity" element={<VisualTestLayout />} />
                            <Route path="rating" element={<VisualTestLayout />} />
                        </Route>

                        <Route path="test/language" element={<LanguageTestLayout />}>
                            <Route path="instruction" element={<LanguageTestLayout />} />
                            <Route path=":type" element={<LanguageTestLayout />} />
                            <Route path="rating" element={<LanguageTestLayout />} />
                        </Route>

                        {/* --- 2. THÊM ROUTE CHO GAME TẠI ĐÂY --- */}
                        {/* Đường dẫn sẽ là: http://localhost:3000/test/writing */}
                        <Route 
                            path="test/writing" 
                            element={
                                <SpaceRescueGame 
                                    studentName="Bé Bi" 
                                    onExit={() => window.location.href = "/dashboard"} 
                                />
                            } 
                        />

                        {/* 404 */}
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;