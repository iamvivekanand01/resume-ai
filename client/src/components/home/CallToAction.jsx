import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section id="cta" className="w-full max-w-5xl mx-auto mt-24 px-6 sm:px-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-emerald-50 border border-emerald-100 rounded-2xl p-8 sm:p-12">
        <p className="text-lg sm:text-xl font-medium text-slate-800 max-w-md text-center md:text-left">
          Ready to build a clean, ATS-friendly resume that you can confidently
          share with recruiters?
        </p>

        <Link
          to="/app?state=register"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 transition text-white font-medium"
        >
          Get started
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
