import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/features/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
            R
          </div>
          <span className="text-xl font-semibold text-gray-900">ResumeAI</span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4 text-sm">
          <p className="max-sm:hidden text-gray-600">
            Hi, <span className="font-medium text-gray-900">{user?.name}</span>
          </p>

          <button
            onClick={logoutUser}
            className="bg-white hover:bg-slate-50 border border-gray-300 px-6 py-1.5 rounded-full text-sm font-medium active:scale-95 transition-all"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
