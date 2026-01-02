import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { gsap } from "gsap";
import { ArrowLeft } from "lucide-react";

const MODEL_CONFIG = {
  v38: {
    name: "Valor V38",
    colors: [
      { id: "v38-yellow", bg: "bg-[#EAB308]", label: "Quicksilver Yellow" },
      { id: "v38-white-blue", bg: "bg-[#F0F2F5]", label: "Polar White & Blue" },
      { id: "v38-desert", bg: "bg-[#9B936B]", label: "Desert Sand" },
      { id: "v38-navy", bg: "bg-[#003366]", label: "Valor Deep Blue" },
    ],
  },
  v27: {
    name: "Valor V27",
    colors: [
      { id: "v27-f25", bg: "bg-[#0EA5E9]", label: "Electric Blue (F25)" },
      { id: "v27-f26", bg: "bg-[#A51C30]", label: "Crimson Strike (F26)" },
      { id: "v27-f27", bg: "bg-[#FACC15]", label: "Solar Yellow (F27)" },
      { id: "v27-f28", bg: "bg-[#DC2626]", label: "Racing Red (F28)" },
      { id: "v27-f29", bg: "bg-[#38BDF8]", label: "Sky Blue (F29)" },
      { id: "v27-f30", bg: "bg-[#EF4444]", label: "Lava Red (F30)" },
      { id: "v27-f31", bg: "bg-[#0369A1]", label: "Oceanic Blue (F31)" },
    ],
  },
};

const ConfiguratorPage = () => {
  const { id } = useParams();
  const currentModel = MODEL_CONFIG[id] || MODEL_CONFIG.v38;

  const [activeColor, setActiveColor] = useState(currentModel.colors[0]);
  const [prevColor, setPrevColor] = useState(currentModel.colors[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeImageRef = useRef(null);

  const handleColorChange = (newColor) => {
    if (isTransitioning || newColor.id === activeColor.id) return;

    setPrevColor(activeColor); // Store the old color
    setActiveColor(newColor); // Set the new color
    setIsTransitioning(true);
  };

  useEffect(() => {
    // Every time activeColor changes, fade it in from 0 to 1
    gsap.fromTo(
      activeImageRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => setIsTransitioning(false),
      }
    );
  }, [activeColor]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-black mt-[60px]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <Link
          to="/change-model"
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-tighter hover:text-[#006699] transition-colors group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Change Model
        </Link>
        <div className="flex gap-4">
          <button className="px-8 py-2 border-2 border-[#006699] text-[#006699] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#006699] hover:text-white transition-all shadow-sm">
            Summary
          </button>
          <button className="px-8 py-2 bg-[#006699] text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-[#005580] transition-colors">
            Send to Valor Center
          </button>
        </div>
      </div>

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20">
        {/* THE VISUALIZER: Stacked Layering Technique */}
        <div className="lg:col-span-7 flex items-center justify-center bg-white rounded-[2rem] p-12 shadow-sm min-h-[500px] relative overflow-hidden">
          {/* 1. BOTTOM LAYER: The Previous Color (Static background) */}
          <img
            src={`/${prevColor.id}.png`}
            alt="Previous selection"
            className="absolute w-[85%] h-auto object-contain "
          />

          {/* 2. TOP LAYER: The New Color (Fades in over the old one) */}
          <img
            key={activeColor.id} // Key forces React to treat this as a new element for GSAP
            ref={activeImageRef}
            src={`/${activeColor.id}.png`}
            alt={activeColor.label}
            className="absolute w-[85%] h-auto object-contain  z-10"
          />
        </div>

        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-2 italic uppercase">
              {currentModel.name}
            </h1>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.3em]">
              Precision Engineering
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-gray-100">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-8 border-l-4 border-[#006699] pl-4">
              Exterior Paint
            </h2>

            <div className="flex flex-wrap gap-5">
              {currentModel.colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorChange(color)}
                  className={`w-12 h-12 rounded-full transition-all duration-300 transform hover:scale-110 ${
                    color.bg
                  } ${
                    activeColor.id === color.id
                      ? "ring-2 ring-[#006699] ring-offset-4 scale-110"
                      : "opacity-90 shadow-sm border border-black/5"
                  }`}
                />
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-gray-50">
              <span className="text-[10px] font-bold text-[#006699] uppercase tracking-widest">
                Selected Finish
              </span>
              <p className="text-2xl font-black italic tracking-tight">
                {activeColor.label}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfiguratorPage;
