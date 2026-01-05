import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause, Volume2, VolumeX, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Lineup = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const thumbRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        thumbRef.current,
        { clipPath: "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: thumbRef.current,
            start: "top 80%",
          },
        }
      );

      ScrollTrigger.create({
        trigger: videoRef.current,
        start: "top 60%",
        end: "bottom 20%",
        onEnter: () => {
          videoRef.current?.play();
          setIsPlaying(true);
        },
        onEnterBack: () => {
          videoRef.current?.play();
          setIsPlaying(true);
        },
        onLeave: () => {
          videoRef.current?.pause();
          setIsPlaying(false);
        },
        onLeaveBack: () => {
          videoRef.current?.pause();
          setIsPlaying(false);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 md:px-20 bg-[#f4faff] overflow-hidden"
    >
      {/* CUSTOM KEYFRAMES FOR SMOOTH WAVE SLIDING */}
      <style>
        {`
          @keyframes wave-move {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .wave-layer {
            animation: wave-move 4s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
          }
          .wave-layer-slow {
            animation: wave-move 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        {/* Left: Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl md:text-6xl font-bold text-black mb-8 leading-tight tracking-tighter">
            The VALOR <br /> Lineup
          </h2>
          <p className="text-gray-600 text-lg font-light leading-relaxed max-w-md mb-10">
            Each VALOR model is designed for maximum stability, efficiency, and
            performance — powered by advanced composite construction.
          </p>

          {/* CUSTOM SVG WAVE BUTTON */}
          <div className="relative inline-block group">
            <Link
              to="/valor-catalogue"
              className="relative z-10 flex items-center gap-6 bg-black text-white px-8 py-5 rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,119,255,0.4)]"
            >
              <span className="relative z-30 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
                Explore Full Catalog
              </span>

              <div className="relative z-30 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-700 group-hover:rotate-[360deg]">
                <ArrowRight size={16} strokeWidth={3} />
              </div>

              {/* WAVE OVERLAY CONTAINER */}
              <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:translate-y-[-10%] transition-all duration-700 translate-y-[100%]">
                {/* SVG WAVE 1 (Background Layer) */}
                <div className="wave-layer-slow absolute bottom-0 left-0 w-[200%] h-full opacity-60">
                  <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="w-full h-24 fill-blue-400"
                  >
                    <path d="M0,0 C300,0 300,100 600,100 C900,100 900,0 1200,0 L1200,120 L0,120 Z" />
                    <path d="M1200,0 C1500,0 1500,100 1800,100 C2100,100 2100,0 2400,0 L2400,120 L1200,120 Z" />
                  </svg>
                  <div className="bg-blue-400 w-full h-full -mt-1" />
                </div>

                {/* SVG WAVE 2 (Front Layer) */}
                <div className="wave-layer absolute bottom-0 left-0 w-[200%] h-full">
                  <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="w-full h-20 fill-blue-600"
                  >
                    <path d="M0,0 C300,0 300,80 600,80 C900,80 900,0 1200,0 L1200,120 L0,120 Z" />
                  </svg>
                  <div className="bg-blue-600 w-full h-full -mt-1" />
                </div>
              </div>
            </Link>

            {/* Pulsing Outer Ring */}
            <div className="absolute inset-0 rounded-full border border-blue-400/40 animate-ping group-hover:hidden" />
          </div>
        </div>

        {/* Right: Video Section */}
        <div className="w-full md:w-1/2 relative group">
          <div
            ref={thumbRef}
            className="relative overflow-hidden rounded-[2.5rem] shadow-2xl aspect-video bg-black border border-white/20"
          >
            <video
              ref={videoRef}
              muted={isMuted}
              loop
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            >
              <source src="/lineup-video.mp4" type="video/mp4" />
            </video>

            <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex gap-3">
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 hover:bg-white hover:text-black transition-all"
                >
                  {isPlaying ? (
                    <Pause size={20} fill="currentColor" />
                  ) : (
                    <Play size={20} fill="currentColor" className="ml-1" />
                  )}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 hover:bg-white hover:text-black transition-all"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <span className="text-white text-[10px] font-bold uppercase tracking-widest">
                  {isPlaying ? "Live Preview" : "Paused"}
                </span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lineup;
