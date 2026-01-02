import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textContainerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Image Reveal (Curtain effect + subtle scale down)
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(0% 0% 100% 0%)", scale: 1.2 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // 2. Text Stagger Reveal
      gsap.from(".about-animate", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-20 md:py-32 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* LEFT: IMAGE SECTION */}
        <div className="w-full md:w-1/2">
          <div className="overflow-hidden rounded-[2rem] shadow-2xl aspect-[4/3] bg-gray-100">
            <img
              ref={imageRef}
              src="/about.jpg" // Make sure this Burj Al Arab image is in your public folder
              alt="Built in Dubai"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT: CONTENT SECTION */}
        <div ref={textContainerRef} className="w-full md:w-1/2">
          <h2 className="about-animate text-3xl md:text-5xl font-bold text-black mb-8 leading-tight tracking-tighter">
            Built in Dubai. <br />
            Engineered for the World.
          </h2>

          <div className="about-animate space-y-6 text-gray-600 text-sm md:text-base leading-relaxed font-light">
            <p>
              Founded in 2022,{" "}
              <span className="font-semibold text-black">
                VALOR Power Boats
              </span>{" "}
              is a UAE-based manufacturer dedicated to transforming the
              high-performance marine industry.
            </p>
            <p>
              We design and build world-class catamaran-style vessels that
              combine luxury, stability, and remarkable speed — all crafted on
              home soil in Dubai.
            </p>
            <p>
              With a vision to make Dubai a regional hub for advanced marine
              engineering, VALOR blends innovation with craftsmanship,
              delivering boats that exceed global performance and quality
              standards.
            </p>
          </div>

          {/* OPTIONAL CTA Link */}
          <div className="about-animate mt-10">
            <a
              href="#about"
              className="inline-block text-black font-bold text-xs uppercase tracking-widest border-b-2 border-black pb-1 hover:opacity-50 transition-opacity"
            >
              Our Vision
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
