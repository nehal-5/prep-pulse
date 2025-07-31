import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signupWithEmail } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signupWithEmail(email, password);
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      setError(err.message || "Failed to sign up.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center">
      <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative">
        <h1 className="text-4xl text-white font-bold text-center mb-6">
          Sign Up
        </h1>
        {error && (
          <p className="bg-red-500 text-white text-sm text-center p-2 rounded-md mb-4">
            {error}
          </p>
        )}
        <form onSubmit={handleSignup}>
          <div className="relative my-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Your Email
            </label>
          </div>
          <div className="relative my-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Your Password
            </label>
          </div>
          <button
            type="submit"
            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300"
          >
            Create Account
          </button>
          <div>
            <span className="text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-sky-400">
                Log in
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
