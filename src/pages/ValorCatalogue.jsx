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
      rotateY: xPos * 20,
      rotateX: -yPos * 20,
      transformPerspective: 1200,
      ease: "power1.out",
    });
  };

  return (
    <div ref={containerRef} className="bg-white text-black">
      {/* V38 SECTION */}
      <section
        className="boat-section py-24 px-10 border-b border-gray-100"
        onMouseMove={(e) => handleMouseMove(e, 0)}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
            <div className="reveal-block">
              <span className="text-xs font-black uppercase tracking-[0.5em] text-blue-600 mb-6 block">
                Elite Catamaran Series
              </span>
              <h2 className="text-8xl font-black italic uppercase tracking-tighter mb-8 leading-[0.85]">
                Valor V38
              </h2>
              <p className="text-xl text-gray-500 leading-relaxed mb-10">
                The flagship of the Valor fleet. Designed for those who refuse
                to compromise between luxury and lethal performance. The V38's
                aerodynamic tunnel design creates a cushion of air, allowing the
                boat to literally fly over open water.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-12 border-t border-gray-100 pt-10">
                <div>
                  <h4 className="text-3xl font-black">100+</h4>
                  <p className="text-[10px] uppercase font-bold text-gray-400">
                    Top Speed (MPH)
                  </p>
                </div>
                <div>
                  <h4 className="text-3xl font-black">1000</h4>
                  <p className="text-[10px] uppercase font-bold text-gray-400">
                    Total Horsepower
                  </p>
                </div>
                <div>
                  <h4 className="text-3xl font-black">38' 3"</h4>
                  <p className="text-[10px] uppercase font-bold text-gray-400">
                    Length Overall
                  </p>
                </div>
                <div>
                  <h4 className="text-3xl font-black">8</h4>
                  <p className="text-[10px] uppercase font-bold text-gray-400">
                    Passenger Capacity
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                ref={(el) => (boatRefs.current[0] = el)}
                src="/v38-yellow.png"
                className="w-full z-10 relative drop-shadow-2xl"
                alt="V38"
              />
            </div>
          </div>
        </div>

        {/* Feature strip for V38 */}
        <div className="feature-strip flex gap-20 whitespace-nowrap opacity-10">
          {[
            "MERCURY RACING 500R",
            "CARBON INFUSED HULL",
            "SIMRAD DUAL DASH",
            "8 PASSENGER COCKPIT",
          ].map((text) => (
            <span
              key={text}
              className="text-8xl font-black italic uppercase tracking-tighter"
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
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-24 lg:flex-row-reverse">
            <div className="relative order-2 lg:order-1">
              <img
                ref={(el) => (boatRefs.current[1] = el)}
                src="/v27-f27.png"
                className="w-full z-10 relative drop-shadow-2xl"
                alt="V27"
              />
            </div>
            <div className="reveal-block order-1 lg:order-2">
              <span className="text-xs font-black uppercase tracking-[0.5em] text-yellow-500 mb-6 block">
                Agile Widebody Series
              </span>
              <h2 className="text-8xl font-black italic uppercase tracking-tighter mb-8 leading-[0.85]">
                Valor V27
              </h2>
              <p className="text-xl text-gray-500 leading-relaxed mb-10">
                Precision engineering packed into a 27-foot frame. The V27
                Widebody offers a footprint that rivals larger vessels while
                maintaining the agility of a race boat. It is the perfect entry
                point into the world of high-performance marine power.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-12 border-t border-gray-200 pt-10">
                <div>
                  <h4 className="text-3xl font-black">90+</h4>
                  <p className="text-[10px] uppercase font-bold text-gray-400">
                    Projected Speed (MPH)
                  </p>
                </div>
                <div>
                  <h4 className="text-3xl font-black">600</h4>
                  <p className="text-[10px] uppercase font-bold text-gray-400">
                    Total Horsepower
                  </p>
                </div>
                <div>
                  <h4 className="text-3xl font-black">27' 0"</h4>
                  <p className="text-[10px] uppercase font-bold text-gray-400">
                    Length Overall
                  </p>
                </div>
                <div>
                  <h4 className="text-3xl font-black">6</h4>
                  <p className="text-[10px] uppercase font-bold text-gray-400">
                    Passenger Capacity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature strip for V27 */}
        <div className="feature-strip flex gap-20 whitespace-nowrap opacity-10">
          {[
            "TWIN 300R PROPULSION",
            "9FT BEAM WIDEBODY",
            "COMPOSITE CORE CONSTRUCTION",
            "HIGH PERFORMANCE STEERING",
          ].map((text) => (
            <span
              key={text}
              className="text-8xl font-black italic uppercase tracking-tighter"
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
