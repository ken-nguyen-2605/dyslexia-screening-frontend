import { useAuth } from "../hooks/useAuth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import ProfileSelection from "../components/ProfileSelection";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";
import HumanFeaturesForm from "../pages/HumanFeaturesForm";
import AuditoryTestLayout from "../pages/AuditoryTestLayout";
import TestDispatcher from "../components/TestDispatcher";
import VisualTestLayout from "../pages/VisualTestLayout";
import TestTypeSelection from "../pages/TestTypeSelection";
import DyslexiaChildTestPage from "../pages/DyslexiaChildTestPage";
import BasicTestLayout from "../pages/BasicTestLayout";

const MainApp = () => {
  const { token, user, hasProfiles, loading } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user has a token but no profiles, or has profiles but no selected profile, show profile selection
  if (token && (!hasProfiles || !user)) {
    return <ProfileSelection />;
  }

  // Main app routes
  return (
    <Router>
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
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="human" element={<HumanFeaturesForm />} />

            {/* -------- Test Eureka Layout -------- */}
            <Route path="test/selection" element={<TestTypeSelection />} />

            {/* -------- Auditory Test Layout -------- */}
            <Route path="test/auditory" element={<AuditoryTestLayout />}>
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
            <Route path="test/visual" element={<VisualTestLayout />}>
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

            {/* -------- Basic Test Layout -------- */}
            <Route path="test/basic" element={<BasicTestLayout />}>
              <Route
                path="instruction"
                element={<TestDispatcher testType="basic" />}
              />
              <Route
                path=":type/:cardQuantity"
                element={<TestDispatcher testType="basic" />}
              />
              <Route
                path="rating"
                element={<TestDispatcher testType="basic" />}
              />
            </Route>

            {/* -------- Dyslexia Child Test (4-5 years old) -------- */}
            <Route
              path="test/dyslexia-child"
              element={<DyslexiaChildTestPage />}
            />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default MainApp;
