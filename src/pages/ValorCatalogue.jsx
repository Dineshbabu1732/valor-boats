import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ValorDeepCatalogue = () => {
  const containerRef = useRef(null);
  const boatRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal Headlines & Text
      gsap.utils.toArray(".reveal-block").forEach((block) => {
        gsap.from(block, {
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
          },
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });
      });

      // 2. Horizontal Feature Strip Animation
      gsap.utils.toArray(".feature-strip").forEach((strip) => {
        gsap.to(strip, {
          scrollTrigger: {
            trigger: strip,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          x: -300,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, index) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xPos = clientX / innerWidth - 0.5;
    const yPos = clientY / innerHeight - 0.5;

    gsap.to(boatRefs.current[index], {
      duration: 0.6,
      rotateY: xPos * 25,
      rotateX: -yPos * 25,
      transformPerspective: 1200,
      ease: "power1.out",
    });
  };

  return (
    <div ref={containerRef} className="bg-white text-black font-inter">
      {/* V38 SECTION */}
      <section
        className="boat-section py-24 px-10 border-b border-gray-100 overflow-hidden"
        onMouseMove={(e) => handleMouseMove(e, 0)}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
            <div className="reveal-block">
              <span className="text-xs font-black uppercase tracking-[0.5em] text-blue-600 mb-6 block font-poppins">
                Elite Catamaran Series
              </span>
              <h2 className="text-7xl md:text-8xl font-black italic uppercase tracking-tighter mb-8 leading-[0.85] font-poppins">
                Valor V38
              </h2>
              <p className="text-xl text-gray-500 leading-relaxed mb-10">
                The flagship of the Valor fleet. Designed for those who refuse
                to compromise between luxury and lethal performance. Featuring a
                vacuum-infused hull for superior strength and durability.
              </p>

              {/* V38 TECH SPECS GRID */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-4 mb-12 border-t border-gray-100 pt-10">
                <div>
                  <h4 className="text-2xl font-black font-poppins tracking-tight">
                    38' 3"
                  </h4>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                    Length Overall
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-black font-poppins tracking-tight">
                    10' 6"
                  </h4>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                    Beam
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-black font-poppins tracking-tight">
                    1,600 KG
                  </h4>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                    Bare Hull Weight
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-black font-poppins tracking-tight">
                    190 GAL
                  </h4>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                    Fuel (2x85)
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-black font-poppins tracking-tight">
                    1,000 HP
                  </h4>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                    Max Power
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-black font-poppins tracking-tight">
                    8
                  </h4>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                    Seating Capacity
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                ref={(el) => (boatRefs.current[0] = el)}
                src="/v38-yellow.png"
                className="w-full z-10 relative drop-shadow-2xl pointer-events-none"
                alt="Valor V38 High Performance Boat"
              />
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-50/50 rounded-full blur-[120px] -z-10" />
            </div>
          </div>
        </div>

        {/* Dynamic Feature strip for V38 */}
        <div className="feature-strip flex gap-20 whitespace-nowrap opacity-5 select-none">
          {[
            "MERCURY RACING 500R",
            "CARBON INFUSED HULL",
            "VACUUM INFUSED STRENGTH",
            "DUAL FUEL SYSTEM",
            "AERODYNAMIC TUNNEL",
          ].map((text) => (
            <span
              key={text}
              className="text-8xl font-black italic uppercase tracking-tighter font-poppins"
            >
              {text}
            </span>
          ))}
        </div>
      </section>

      {/* V27 SECTION */}
      <section
        className="boat-section py-24 px-10 bg-gray-50 overflow-hidden"
        onMouseMove={(e) => handleMouseMove(e, 1)}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
            <div className="relative order-2 lg:order-1">
              <img
                ref={(el) => (boatRefs.current[1] = el)}
                src="/v27-f27.png"
                className="w-full z-10 relative drop-shadow-2xl pointer-events-none"
                alt="Valor V27 Widebody"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-yellow-50/50 rounded-full blur-[120px] -z-10" />
            </div>

            <div className="reveal-block order-1 lg:order-2">
              <span className="text-xs font-black uppercase tracking-[0.5em] text-yellow-600 mb-6 block font-poppins">
                Agile Widebody Series
              </span>
              <h2 className="text-7xl md:text-8xl font-black italic uppercase tracking-tighter mb-8 leading-[0.85] font-poppins">
                Valor V27
              </h2>
              <p className="text-xl text-gray-500 leading-relaxed mb-10">
                Precision engineering packed into a 27-foot frame. The V27
                Widebody offers vacuum-infused hull construction for a lighter,
                faster, and more rigid vessel that maintains race-boat agility.
              </p>

              {/* V27 TECH SPECS GRID */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-4 mb-12 border-t border-gray-200 pt-10">
                <div>
                  <h4 className="text-2xl font-black font-poppins tracking-tight">
                    27' 0"
                  </h4>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                    Length Overall
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-black font-poppins tracking-tight">
                    9' 0"
                  </h4>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                    Beam
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-black font-poppins tracking-tight">
                    850 KG
                  </h4>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                    Bare Hull Weight
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-black font-poppins tracking-tight">
                    110 GAL
                  </h4>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                    Fuel (2x55)
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-black font-poppins tracking-tight">
                    600 HP
                  </h4>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                    Engine (Twin 300)
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-black font-poppins tracking-tight">
                    5
                  </h4>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                    Seating Capacity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Feature strip for V27 */}
        <div className="feature-strip flex gap-20 whitespace-nowrap opacity-5 select-none">
          {[
            "TWIN 300R OUTBOARDS",
            "WIDEBODY PERFORMANCE",
            "VACUUM INFUSED HULL",
            "RACE AGILITY",
            "DUBAI CRAFTED",
          ].map((text) => (
            <span
              key={text}
              className="text-8xl font-black italic uppercase tracking-tighter font-poppins"
            >
              {text}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ValorDeepCatalogue;
