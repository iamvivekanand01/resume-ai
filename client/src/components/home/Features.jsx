import React from "react";
import { FileText, Brain, ShieldCheck, Download, Sparkles } from "lucide-react";
import Title from "./Title";

const features = [
  {
    icon: FileText,
    title: "Structured Resume Builder",
    desc: "A clean and guided resume editor that keeps your education, projects, skills, and experience perfectly organized.",
  },
  {
    icon: Brain,
    title: "AI Content Optimization",
    desc: "Improve clarity, wording, and impact with AI while keeping your information honest and accurate.",
  },
  {
    icon: ShieldCheck,
    title: "ATS-Ready Formatting",
    desc: "Resumes are designed to work seamlessly with real applicant tracking systems used by hiring companies.",
  },
  {
    icon: Download,
    title: "Professional PDF Export",
    desc: "Export a high-quality PDF that is ready for job portals, emails, and recruiter sharing.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="relative py-28 bg-gradient-to-b from-white via-emerald-50/40 to-white overflow-hidden"
    >
      {/* Soft background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-3xl -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-sm text-emerald-700 bg-emerald-100/80 backdrop-blur rounded-full px-4 py-1.5 border border-emerald-200">
            <Sparkles className="size-4" />
            Core Features
          </span>

          <Title
            title="Everything you need to build a job-ready resume"
            description="ResumeAI combines intelligent writing, structured design, and professional formatting to help you create resumes that truly stand out."
          />
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="
                  group relative p-6 rounded-2xl
                  bg-white/80 backdrop-blur
                  border border-gray-200/70
                  hover:border-emerald-300
                  hover:shadow-[0_12px_40px_rgba(16,185,129,0.25)]
                  transition-all duration-300
                "
              >
                {/* Icon */}
                <div
                  className="
                    w-12 h-12 rounded-xl
                    bg-gradient-to-br from-emerald-100 to-emerald-200
                    flex items-center justify-center
                    mb-5
                    group-hover:scale-105
                    transition-transform
                  "
                >
                  <Icon className="size-5 text-emerald-700" />
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-gray-900 tracking-tight">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
