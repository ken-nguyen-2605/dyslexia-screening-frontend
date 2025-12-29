import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
// import ProfileProtectedRoute from "./components/auth/ProfileProtectedRoute";
// import AccountProtectedRoute from "./components/auth/AccountProtectedRoute";

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
import MiniGame2Layout from "./pages/Minigame2Layout.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* 👉 Cho chạy thẳng không cần đăng nhập: */}
          <Route path="profile/select" element={<SelectProfile />} />

          {/* Protected Routes (Sử dụng tạm thời cho chạy thẳng) */}
          <Route path="me" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="human" element={<HumanFeaturesForm />} />
          <Route path="test/auditory" element={<AuditoryTest />} />

          <Route path="test/visual" element={<VisualTestLayout />}>
            <Route
              path="instruction"
              element={<TestDispatcher testType="visual" />}
            />
            {/* Visual Test sử dụng params cho các bước */}
            <Route
              path=":type/:cardQuantity"
              element={<TestDispatcher testType="visual" />}
            />
            <Route
              path="rating"
              element={<TestDispatcher testType="visual" />}
            />
          </Route>

          <Route path="test/language" element={<LanguageTestLayout />}>
            <Route
              path="instruction"
              element={<TestDispatcher testType="language" />}
            />
            {/* Language Test sử dụng params cho các loại câu hỏi */}
            <Route
              path=":type"
              element={<TestDispatcher testType="language" />}
            />
            <Route
              path="rating"
              element={<TestDispatcher testType="language" />}
            />
          </Route>

          {/* 🚀 ROUTE CHO MINIGAME 2 🚀 */}
          {/* Sử dụng Minigame2Layout để cung cấp TestStepProvider và steps */}
          <Route path="test/minigame2" element={<MiniGame2Layout />}>
            <Route
              path="instruction"
              element={<TestDispatcher testType="minigame2" />}
            />
            <Route
              path="start" // Game chính
              element={<TestDispatcher testType="minigame2" />}
            />
            <Route
              path="rating"
              element={<TestDispatcher testType="minigame2" />}
            />
          </Route>
          {/* ------------------------------------- */}

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
