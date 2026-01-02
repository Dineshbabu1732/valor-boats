import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ChevronRight, ArrowLeft } from "lucide-react";

const MODELS = [
  {
    id: "v38",
    name: "Valor V38",
    tagline: "The Pinnacle of Offshore Power",
    image: "/v38-yellow.png", // Ensure these are in your public folder
    specs: ["38' Length", "5000+ HP Capable", "Luxury Cabin"],
    color: "bg-[#003366]",
  },
  {
    id: "v27",
    name: "Valor V27",
    tagline: "Agility Meets Unmatched Speed",
    image: "/v27-f28.png",
    specs: ["27' Length", "Precision Handling", "Day Cruiser"],
    color: "bg-[#006699]",
  },
];

const ChangeModelPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      gsap.from(".model-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      });

      gsap.from(".bg-text", {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        delay: 0.5,
        ease: "expo.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSelect = (id) => {
    // Transition before navigation
    gsap.to(".model-card", {
      opacity: 0,
      y: -50,
      duration: 0.5,
      stagger: 0.1,
      onComplete: () => navigate(`/configure/${id}`),
    });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <h1 className="bg-text text-[30vw] font-black text-white/[0.03] tracking-tighter leading-none select-none">
          VALOR
        </h1>
      </div>

      {/* Header Navigation */}
      <header className="relative z-20 p-8 flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
        <img src="/logo.svg" alt="VALOR" className="h-6 brightness-0 invert" />
        <div className="w-24 hidden md:block" /> {/* Spacer */}
      </header>

      {/* Main Selection Area */}
      <main className="flex-1 flex flex-col md:flex-row items-stretch relative z-10">
        {MODELS.map((model) => (
          <div
            key={model.id}
            onClick={() => handleSelect(model.id)}
            className="model-card group relative flex-1 flex flex-col items-center justify-center p-12 cursor-pointer border-white/5 border-b md:border-b-0 md:border-r last:border-0 hover:bg-white/5 transition-colors duration-500"
          >
            {/* Model Image - Hover Lift Effect */}
            <div className="relative w-full max-w-2xl transform transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-10">
              <img
                src={model.image}
                alt={model.name}
                className="w-full h-auto object-contain drop-shadow-[0_35px_35px_rgba(255,255,255,0.1)]"
              />
            </div>

            {/* Model Info */}
            <div className="mt-12 text-center max-w-xs">
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-2 transform transition-transform duration-500 group-hover:scale-105">
                {model.id.toUpperCase()}
              </h2>
              <p className="text-[#00B4FF] font-bold uppercase tracking-widest text-xs mb-6">
                {model.tagline}
              </p>

              <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                {model.specs.map((spec) => (
                  <li
                    key={spec}
                    className="text-[10px] uppercase border border-white/20 px-3 py-1 rounded-full whitespace-nowrap"
                  >
                    {spec}
                  </li>
                ))}
              </ul>

              <button className="flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full text-xs font-black uppercase tracking-widest mx-auto transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                Configure Now <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Bottom Status */}
      <footer className="relative z-20 p-8 flex justify-center border-t border-white/5">
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/30">
          Selected Model will determine available performance packages
        </p>
      </footer>
    </div>
  );
};

export default ChangeModelPage;
