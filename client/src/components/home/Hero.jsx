import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu } from "lucide-react";
import { Plus } from "lucide-react";

const Hero = () => {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative bg-gradient-to-b from-white via-emerald-50/40 to-white overflow-hidden">
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
              R
            </div>
            <span className="text-lg font-semibold text-gray-900">
              ResumeAI
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Link
                  to="/app?state=login"
                  className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                  Login
                </Link>

                <Link
                  to="/app?state=register"
                  className="px-5 py-2 rounded-full text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <Link
                to="/app"
                className="px-5 py-2 rounded-full text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-4 space-y-3">
            {!user ? (
              <>
                <Link
                  to="/app?state=login"
                  className="block w-full text-center py-2 rounded-md bg-gray-100 text-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/app?state=register"
                  className="block w-full text-center py-2 rounded-md bg-emerald-600 text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            ) : (
              <Link
                to="/app"
                className="block w-full text-center py-2 rounded-md bg-emerald-600 text-white"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* ================= HERO ================= */}
      <div className="pt-28 sm:pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
            AI Resume Builder
          </span>

          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
            Create a resume that meets
            <span className="block text-emerald-600">hiring standards</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
            Create clear, well-structured resumes using professionally designed
            templates. Organize your experience, skills, and education in a
            format that aligns with modern hiring practices and works smoothly
            with applicant tracking systems.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to={user ? "/app" : "/app?state=register"}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition shadow-md"
            >
              <Plus className="w-4 h-4" />
              Create Resume
            </Link>
          </div>
        </div>

        {/* Right Preview */}
        <div className="flex justify-center">
          <div
            className="
              relative
              w-full max-w-md lg:max-w-lg
              bg-white rounded-xl border border-gray-200
              shadow-lg p-5
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-2xl
            "
          >
            {/* Badge */}
            <div className="absolute top-4 right-4 px-2 py-1 text-[10px] rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              ATS Ready
            </div>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-600" />
              <div className="flex-1">
                <div className="h-2.5 w-2/3 bg-gray-300 rounded mb-1" />
                <div className="h-2 w-1/2 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Content Blocks */}
            <div className="space-y-2 mb-4">
              <div className="h-2 bg-gray-200 rounded w-full" />
              <div className="h-2 bg-gray-200 rounded w-5/6" />
              <div className="h-2 bg-gray-100 rounded w-4/6" />
            </div>

            <div className="space-y-2 mb-4">
              <div className="h-2 bg-emerald-500 rounded w-1/3" />
              <div className="h-2 bg-gray-200 rounded w-full" />
              <div className="h-2 bg-gray-100 rounded w-5/6" />
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 pt-3 border-t">
              {["React", "Node.js", "MongoDB", "Express", "Java"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
