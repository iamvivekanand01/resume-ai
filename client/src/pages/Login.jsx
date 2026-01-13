import React from "react";
import { Lock, Mail, User } from "lucide-react";
import { useDispatch } from "react-redux";
import api from "../configs/api";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");

  const [state, setState] = React.useState(urlState || "login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/api/users/${state}`, formData);
      dispatch(login({ token: data.token, user: data.user }));
      localStorage.setItem("token", data.token);

      toast.success(data.message || "Success");

      setFormData({ name: "", email: "", password: "" });
      navigate("/app", { replace: true });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                  R
                </div>
                <span className="text-xl font-semibold text-gray-900">
                  ResumeAI
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px w-12 bg-gray-300"></div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {state === "login" ? "Sign In" : "Create Account"}
              </h1>
              <div className="h-px w-12 bg-gray-300"></div>
            </div>

            <p className="text-sm text-gray-500">
              {state === "login"
                ? "Enter your details to continue."
                : "Fill in your details to get started."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {state !== "login" && (
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <div className="relative mt-1">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 py-2.5 rounded-lg border border-gray-300 outline-none 
             focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600
             placeholder-gray-400"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm text-gray-600">Email Address</label>
              <div className="relative mt-1">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 py-2.5 rounded-lg border border-gray-300 outline-none 
             focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600
             placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <div className="relative mt-1">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 py-2.5 rounded-lg border border-gray-300 outline-none 
             focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600
             placeholder-gray-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-emerald-600 text-white font-semibold 
             hover:bg-emerald-700 transition cursor-pointer"
            >
              {state === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Switch */}
          <div className="mt-6 text-center text-sm text-gray-600">
            {state === "login" ? "New here?" : "Already have an account?"}
            <button
              type="button"
              onClick={() =>
                setState((p) => (p === "login" ? "register" : "login"))
              }
              className="ml-2 font-semibold text-emerald-600 hover:underline cursor-pointer"
            >
              {state === "login" ? "Create an account" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
