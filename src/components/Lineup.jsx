import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Lineup = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const thumbRef = useRef(null);

  // Toggle Play/Pause
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
      // 1. Thumbnail Reveal Animation
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

      // 2. Autoplay Logic on Scroll
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
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        {/* Left: Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl md:text-6xl font-bold text-black mb-8 leading-tight tracking-tighter">
            The VALOR <br /> Lineup
          </h2>
          <p className="text-gray-600 text-lg font-light leading-relaxed max-w-md mb-8">
            Each VALOR model is designed for maximum stability, efficiency, and
            performance — powered by advanced composite construction and
            aerodynamic hull engineering.
          </p>

          <button className="flex items-center gap-3 group text-black font-bold uppercase tracking-widest text-xs">
            <span>View Catalog</span>
            <div className="w-8 h-[1px] bg-black group-hover:w-12 transition-all duration-300" />
          </button>
        </div>

        {/* Right: Video Section */}
        <div className="w-full md:w-1/2 relative group">
          <div
            ref={thumbRef}
            className="relative overflow-hidden rounded-[2.5rem] shadow-2xl aspect-video bg-black border border-white/20"
          >
            {/* The Video Element */}
            <video
              ref={videoRef}
              muted={isMuted}
              loop
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            >
              <source src="/lineup-video.mp4" type="video/mp4" />
            </video>

            {/* CONTROL BAR */}
            <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex gap-3">
                {/* Play/Pause Toggle */}
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

                {/* Mute Toggle */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 hover:bg-white hover:text-black transition-all"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>

              {/* Status Tag */}
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <span className="text-white text-[10px] font-bold uppercase tracking-widest">
                  {isPlaying ? "Live Preview" : "Paused"}
                </span>
              </div>
            </div>

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lineup;
