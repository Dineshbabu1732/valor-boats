import React, { useEffect, useRef } from "react";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactStrip = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-animate", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-[#006699] py-16 px-6 md:px-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Contact Info Group */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Email Item */}
          <div className="contact-animate flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#006699] transition-all duration-300">
              <Mail
                size={20}
                className="text-white group-hover:text-[#006699]"
              />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold mb-1">
                Email Us
              </p>
              <a
                href="mailto:info@valorboats.com"
                className="text-white text-lg font-light hover:opacity-70 transition-opacity"
              >
                info@valorboats.com
              </a>
            </div>
          </div>

          {/* Phone Item */}
          <div className="contact-animate flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#006699] transition-all duration-300">
              <Phone
                size={20}
                className="text-white group-hover:text-[#006699]"
              />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold mb-1">
                Call Us
              </p>
              <a
                href="tel:0543258890"
                className="text-white text-lg font-light hover:opacity-70 transition-opacity"
              >
                054 325 8890
              </a>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="contact-animate">
          <button className="flex items-center gap-4 bg-white text-[#006699] px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-all active:scale-95 group shadow-xl">
            Get Directions
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactStrip;
