import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Clean staggered entrance for that luxury feel
      tl.fromTo(
        ".hero-content-item",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, delay: 0.5 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full flex items-center overflow-hidden bg-black"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover shadow-2xl"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Subtle Dark Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
      </div>

      {/* Hero Content aligned to your UI layout */}
      <div className="relative z-10 px-8 md:px-20 lg:px-24 w-full">
        <div className="max-w-3xl">
          <h1 className="hero-content-item text-[42px] md:text-[64px] lg:text-[72px] font-bold text-white leading-[1.1] mb-4 tracking-tight">
            Redefining <br />
            High-Performance <br />
            Boating
          </h1>

          <p className="hero-content-item text-white/90 text-sm md:text-base lg:text-md max-w-lg mb-8 font-light leading-relaxed">
            Precision-engineered catamarans built in Dubai for luxury{" "}
            <br className="hidden md:block" />
            cruising and extreme speed.
          </p>

          <div className="hero-content-item">
            <button className="bg-[#006699] hover:bg-[#005580] text-white px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-300 active:scale-95 shadow-lg">
              Explore Our Boats
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator (Optional, but adds to the high-end look) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
