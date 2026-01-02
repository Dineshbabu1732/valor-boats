import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, X, Volume2, VolumeX } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Engineering = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const sectionRef = useRef(null);
  const thumbRef = useRef(null);
  const modalRef = useRef(null);

  const handleClose = (e) => {
    e.stopPropagation();
    setIsVideoOpen(false);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Modern Clip-path Reveal for the Video Container
      gsap.fromTo(
        thumbRef.current,
        { clipPath: "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: {
            trigger: thumbRef.current,
            start: "top 85%",
          },
        }
      );

      // Text Entrance Stagger
      gsap.from(".eng-text", {
        x: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".eng-text",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 md:px-20 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        {/* Left: Video Container */}
        <div className="w-full md:w-1/2 relative">
          {!isVideoOpen ? (
            <div
              className="group cursor-pointer overflow-hidden rounded-[2.5rem] shadow-2xl aspect-square md:aspect-[4/5] bg-black"
              onClick={() => setIsVideoOpen(true)}
            >
              <div ref={thumbRef} className="w-full h-full relative">
                {/* Background Loop Video (No Controls) */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[1.5s]"
                >
                  <source src="/engineering-video.mp4" type="video/mp4" />
                </video>

                {/* Aesthetic Play Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500">
                    <Play fill="white" className="text-white ml-1" size={32} />
                  </div>
                </div>

                {/* "Live Process" Tag */}
                <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-white text-[10px] font-bold uppercase tracking-widest">
                    Engineering Process
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Active Video Player with Audio/Controls */
            <div
              ref={modalRef}
              className="relative w-full aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl bg-black"
            >
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <X size={24} />
              </button>

              <video autoPlay controls className="w-full h-full object-cover">
                <source src="/engineering-video.mp4" type="video/mp4" />
              </video>
            </div>
          )}
        </div>

        {/* Right: Content Section */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h2 className="eng-text text-4xl md:text-6xl font-bold text-black mb-8 leading-[1.1] tracking-tighter">
            Engineering <br /> at the Core
          </h2>

          <div className="eng-text space-y-8 text-gray-500 text-lg md:text-xl font-light leading-relaxed">
            <p>
              Every VALOR vessel is built using cutting-edge manufacturing
              technologies, including
              <span className="text-black font-medium italic">
                {" "}
                advanced composite materials
              </span>
              , CNC machining, and precision mold engineering.
            </p>
            <p>
              Our production process merges technical innovation with real-world
              marine expertise — ensuring each boat delivers efficiency, safety,
              and aesthetic excellence.
            </p>

            <div className="pt-4">
              <button className="flex items-center gap-4 group">
                <div className="w-12 h-[1px] bg-black group-hover:w-20 transition-all duration-500" />
                <span className="text-black text-xs font-bold uppercase tracking-[0.3em]">
                  View Specifications
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Engineering;
