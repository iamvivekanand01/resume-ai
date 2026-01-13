import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-24 bg-slate-950 text-slate-300">
      {/* Accent Line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-green-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-slate-800 pb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition">
                R
              </div>
              <span className="text-xl font-semibold text-white tracking-wide">
                ResumeAI
              </span>
            </Link>

            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-sm">
              A modern resume builder that helps you create clean, professional,
              and ATS-friendly resumes using AI guidance.
            </p>

            {/* Social */}
            <div className="flex gap-3 mt-5">
              <a
                href="https://github.com/iamvivekanand01"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-green-500 hover:text-green-400 transition-all"
              >
                <Github size={18} />
              </a>

              <a
                href="https://linkedin.com/in/iamvivekanand01"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-green-500 hover:text-green-400 transition-all"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-green-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/app?state=login"
                  className="hover:text-green-400 transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/app?state=register"
                  className="hover:text-green-400 transition"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">
              Capabilities
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>AI writing assistance</li>
              <li>ATS-compliant formatting</li>
              <li>Live resume preview</li>
              <li>One-click PDF export</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="hover:text-green-400 transition cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-green-400 transition cursor-pointer">
                Terms of Service
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
          <p>
            Designed & built by{" "}
            <span className="text-green-400 font-medium">Vivekanand</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
