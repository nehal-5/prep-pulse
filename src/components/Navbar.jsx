import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav className="bg-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-2xl font-bold text-sky-400">
              PrepPulse 🧠
            </Link>
          </div>
          {currentUser && (
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="text-white text-base font-semibold px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/groups"
                className="text-white text-base font-semibold px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 transition-colors"
              >
                Groups
              </Link>
              <span className="text-gray-300 text-sm hidden sm:block">
                {currentUser.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
