import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, ArrowRight, MapPin, X, Globe } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactStrip = () => {
  const containerRef = useRef(null);
  const [showMap, setShowMap] = useState(false);

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
      className="bg-[#006699] py-16 px-6 md:px-20 overflow-hidden border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* HEADER SECTION */}
        <div className="contact-animate border-b border-white/10 pb-6">
          <h2 className="text-white text-2xl font-black uppercase tracking-tighter italic">
            Inquiry Points
          </h2>
        </div>
        {/* CONTACT GRIDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          {/* DUBAI INQUIRY POINT */}
          <div className="flex flex-col gap-8">
            <div className="contact-animate flex items-center gap-3">
              <Globe size={18} className="text-white/40" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                Dubai HQ
              </span>
            </div>

            <div className="flex flex-col gap-6">
              {/* Dubai Email */}
              <div className="contact-animate flex items-center gap-5 group cursor-pointer">
                <div className="w-12 h-12 shrink-0 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#006699] transition-all duration-300">
                  <Mail
                    size={20}
                    className="text-white group-hover:text-[#006699]"
                  />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/50 font-black mb-1">
                    Email Us
                  </p>
                  <a
                    href="mailto:info@valorboats.com"
                    className="text-white text-lg font-light hover:opacity-70 transition-opacity block"
                  >
                    info@valorboats.com
                  </a>
                </div>
              </div>

              {/* Dubai Phone */}
              <div className="contact-animate flex items-center gap-5 group cursor-pointer">
                <div className="w-12 h-12 shrink-0 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#006699] transition-all duration-300">
                  <Phone
                    size={20}
                    className="text-white group-hover:text-[#006699]"
                  />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/50 font-black mb-1">
                    Call Us
                  </p>
                  <a
                    href="tel:0543258890"
                    className="text-white text-lg font-light hover:opacity-70 transition-opacity block"
                  >
                    +971 054 325 8890
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* US INQUIRY POINT */}
          <div className="flex flex-col gap-8">
            <div className="contact-animate flex items-center gap-3">
              <Globe size={18} className="text-white/40" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                US Inquiry Point
              </span>
            </div>

            <div className="flex flex-col gap-6">
              {/* US Email */}
              <div className="contact-animate flex items-center gap-5 group cursor-pointer">
                <div className="w-12 h-12 shrink-0 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#006699] transition-all duration-300">
                  <Mail
                    size={20}
                    className="text-white group-hover:text-[#006699]"
                  />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/50 font-black mb-1">
                    Email Sales
                  </p>
                  <a
                    href="mailto:sales@manateemarineunlimited.com"
                    className="text-white text-lg font-light hover:opacity-70 transition-opacity block"
                  >
                    sales@manateemarineunlimited.com
                  </a>
                </div>
              </div>

              {/* US Phone */}
              <div className="contact-animate flex items-center gap-5 group cursor-pointer">
                <div className="w-12 h-12 shrink-0 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#006699] transition-all duration-300">
                  <Phone
                    size={20}
                    className="text-white group-hover:text-[#006699]"
                  />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/50 font-black mb-1">
                    US Office
                  </p>
                  <a
                    href="tel:+19417221989"
                    className="text-white text-lg font-light hover:opacity-70 transition-opacity block"
                  >
                    +1 941-722-1989
                  </a>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* <--- Added missing closing US Inquiry Point div */}
        </div>{" "}
        {/* <--- Added missing closing CONTACT GRIDS div */}
        {/* Action Button: Toggle Map View */}
        <div className="contact-animate w-full flex justify-center md:justify-start mt-8">
          <button
            onClick={() => setShowMap(!showMap)}
            className="w-full md:w-auto flex items-center justify-center gap-4 bg-white text-[#006699] px-10 py-5 md:py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-all active:scale-95 group shadow-2xl"
          >
            {showMap ? "Hide Map" : "Get Directions"}
            {showMap ? (
              <X size={16} />
            ) : (
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            )}
          </button>
        </div>
        {/* INTEGRATED GOOGLE MAP SECTION */}
        {showMap && (
          <div className="contact-animate w-full h-[350px] md:h-[500px] rounded-3xl overflow-hidden shadow-inner border-4 border-white/10 animate-in fade-in zoom-in duration-500">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.8546!2d-82.5564!" // Placeholder for US location
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[0.3] contrast-[1.1]"
            ></iframe>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactStrip;
