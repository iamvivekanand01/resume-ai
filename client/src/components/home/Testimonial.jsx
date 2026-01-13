import React from "react";
import Title from "./Title";
import { Users } from "lucide-react";

const Testimonial = () => {
  const cardsData = [
    {
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "Briar Martin",
      handle: "@briar.dev",
      review:
        "The resume structure is very clean. It helped me organize my projects and skills properly without over-designing."
    },
    {
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Avery Johnson",
      handle: "@avery.codes",
      review:
        "I built my internship resume using ResumeAI. The layout felt professional and easy to customize."
    },
    {
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
      name: "Jordan Lee",
      handle: "@jordan.tech",
      review:
        "The AI suggestions helped improve wording in my experience section without sounding artificial."
    },
    {
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
      name: "Sam Wilson",
      handle: "@samwilson.dev",
      review:
        "Simple UI and practical output. It focuses more on resume structure than visual noise, which is exactly what recruiters want."
    }
  ];

  const CreateCard = ({ card }) => (
    <div className="p-5 rounded-xl mx-4 shadow-sm hover:shadow-md transition-all duration-200 w-72 shrink-0 bg-white border border-gray-100">
      <div className="flex gap-3 items-center">
        <img
          className="size-11 rounded-full object-cover"
          src={card.image}
          alt="User"
        />
        <div>
          <div className="flex items-center gap-1">
            <p className="font-medium text-gray-900">{card.name}</p>
            <span className="text-emerald-500 text-xs">✔</span>
          </div>
          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>

      <p className="text-sm mt-4 text-gray-700 leading-relaxed">
        {card.review}
      </p>
    </div>
  );

  return (
    <>
      <div
        id="testimonials"
        className="flex flex-col items-center my-20 scroll-mt-12"
      >
        <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-400/10 rounded-full px-5 py-1.5">
          <Users className="size-4 stroke-emerald-600" />
          <span>Student Experiences</span>
        </div>

        <Title
          title="What students say about ResumeAI"
          description="Honest feedback from students who used ResumeAI to create resumes for internships and placements."
        />
      </div>

      {/* Marquee */}
      <div className="w-full mx-auto max-w-5xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-white to-transparent"></div>
        <div className="marquee-inner flex min-w-[200%] pt-6 pb-4">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-white to-transparent"></div>
      </div>

      <div className="w-full mx-auto max-w-5xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-white to-transparent"></div>
        <div className="marquee-inner marquee-reverse flex min-w-[200%] pt-6 pb-4">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-white to-transparent"></div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .marquee-inner {
          animation: marqueeScroll 26s linear infinite;
        }

        .marquee-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </>
  );
};

export default Testimonial;
