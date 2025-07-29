import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      // This will throw if registering fails (non-2xx error)
      const data = await authService.register({
        name,
        email,
        password,
      });
      if (data) {
      navigate("/login");
      }
      
    } catch (error: any) {
      // Attempt to show API-provided error messages, fallback to generic
      let message = "An error occurred during registration.";
      if (error?.response?.data?.message) {
        message = error.response.data.message;
      }
      alert(`Registration failed: ${message}`);
    }
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="flex flex-col bg-white border border-gray-100 p-8 rounded-2xl items-center space-y-5 shadow-lg max-w-sm w-full mx-auto mt-10"
>
  <h1 className="text-3xl text-teal-600 font-bold mb-2">Register</h1>
  <div className="w-full flex flex-col space-y-1">
    <label htmlFor="name" className="font-semibold text-gray-800">Name</label>
    <input
      className="border border-gray-300 p-2 rounded-md focus:border-teal-500 focus:outline-none transition"
      type="text"
      id="name"
      placeholder="Enter your name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      autoComplete="name"
    />
  </div>
  <div className="w-full flex flex-col space-y-1">
    <label htmlFor="email" className="font-semibold text-gray-800">Email</label>
    <input
      className="border border-gray-300 p-2 rounded-md focus:border-teal-500 focus:outline-none transition"
      type="email"
      id="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      autoComplete="email"
    />
  </div>
  <div className="w-full flex flex-col space-y-1">
    <label htmlFor="password" className="font-semibold text-gray-800">Password</label>
    <input
      className="border border-gray-300 p-2 rounded-md focus:border-teal-500 focus:outline-none transition"
      type="password"
      id="password"
      placeholder="Enter password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      autoComplete="new-password"
    />
  </div>
  <div className="w-full flex flex-col space-y-1">
    <label htmlFor="confirmPassword" className="font-semibold text-gray-800">Confirm Password</label>
    <input
      className="border border-gray-300 p-2 rounded-md focus:border-teal-500 focus:outline-none transition"
      type="password"
      id="confirmPassword"
      placeholder="Confirm password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      autoComplete="new-password"
    />
  </div>
  <button className="bg-teal-500 py-2 w-full rounded-lg text-white font-semibold hover:bg-teal-600 transition focus:ring-2 focus:ring-teal-200 focus:outline-none" type="submit">
    Register
  </button>
  <p className="text-gray-700 text-sm ">
    Already have an account?{" "}
    <a className="text-teal-600 hover:underline hover:text-teal-800 font-medium" href="/login">
      Login
    </a>
  </p>
</form>
  );
};

export default RegisterForm;