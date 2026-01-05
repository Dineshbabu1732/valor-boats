import React, { useState, useRef } from "react";
import { gsap } from "gsap";

const BoatConfigurator = () => {
  const FILTER_ID = "boatRecolorFilter";
  const [activeHex, setActiveHex] = useState("#006699");
  const [color, setColor] = useState({ r: 0, g: 102, b: 153 });
  const matrixRef = useRef(null);

  const colors = [
    { name: "Valor Blue", hex: "#006699" },
    { name: "Racing Red", hex: "#cc0000" },
    { name: "Solar Yellow", hex: "#eab308" },
    { name: "White", hex: "#ffffff" },
  ];

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const handleColorChange = (newHex) => {
    setActiveHex(newHex);
    const rgb = hexToRgb(newHex);

    gsap.to(color, {
      r: rgb.r,
      g: rgb.g,
      b: rgb.b,
      duration: 0.6,
      onUpdate: () => {
        const r = (color.r / 255).toFixed(3);
        const g = (color.g / 255).toFixed(3);
        const b = (color.b / 255).toFixed(3);

        if (matrixRef.current) {
          matrixRef.current.setAttribute(
            "values",
            `0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} 0 0 0 1 0`
          );
        }
      },
    });
  };

  return (
    // Outer wrapper remains black for contrast or can be changed to gray/white
    <div className="relative w-full min-h-screen bg-[#f8f8f8] flex flex-col items-center justify-center p-4">
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter
          id={FILTER_ID}
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feColorMatrix
            ref={matrixRef}
            in="SourceGraphic"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.4 0 0 0 0 0.6 0 0 0 1 0"
          />
        </filter>
      </svg>

      {/* Main Visualizer Container - NOW WHITE */}
      <div className="relative w-full max-w-6xl aspect-[16/9] bg-white rounded-[2rem] md:rounded-[4rem] overflow-hidden flex items-center justify-center shadow-xl border border-gray-100">
        {/* Layer 1: Base Image (Always visible, includes tires/windows) */}
        <img
          src="/jettour-base.png"
          className="absolute w-full h-full object-contain z-0"
          alt="Base"
        />

        {/* Layer 2: Hull Cutout (Only this part changes color) */}
        <img
          src="/jettour-hull.png"
          className="absolute w-full h-full object-contain z-10"
          style={{
            filter: `url(#${FILTER_ID})`,
            mixBlendMode: "multiply",
          }}
          alt="Hull Only"
        />
      </div>

      {/* Control Tray with Active State */}
      <div className="mt-12 flex gap-6 bg-white p-6 rounded-full shadow-lg border border-gray-100 px-10">
        {colors.map((c) => (
          <button
            key={c.hex}
            onClick={() => handleColorChange(c.hex)}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full transition-all duration-300 relative ${
              activeHex === c.hex
                ? "scale-125 ring-2 ring-[#006699] ring-offset-4 ring-offset-white"
                : "hover:scale-110 opacity-80 hover:opacity-100"
            }`}
            style={{ backgroundColor: c.hex }}
          >
            {c.hex === "#ffffff" && (
              <div className="absolute inset-0 rounded-full border border-gray-200" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BoatConfigurator;
