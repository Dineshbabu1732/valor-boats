import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, ArrowRight, MapPin, X } from "lucide-react";
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
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-12">
          {/* Contact Info Group */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-16 w-full md:w-auto">
            {/* Email Item */}
            <div className="contact-animate flex items-center gap-5 group cursor-pointer w-full md:w-auto">
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
                  className="text-white text-lg md:text-xl font-light hover:opacity-70 transition-opacity block"
                >
                  info@valorboats.com
                </a>
              </div>
            </div>

            {/* Phone Item */}
            <div className="contact-animate flex items-center gap-5 group cursor-pointer w-full md:w-auto">
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
                  className="text-white text-lg md:text-xl font-light hover:opacity-70 transition-opacity block"
                >
                  054 325 8890
                </a>
              </div>
            </div>
          </div>

          {/* Action Button: Toggle Map View */}
          <div className="contact-animate w-full md:w-auto">
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
        </div>

        {/* INTEGRATED GOOGLE MAP SECTION */}
        {showMap && (
          <div className="contact-animate w-full h-[350px] md:h-[500px] rounded-3xl overflow-hidden shadow-inner border-4 border-white/10 animate-in fade-in zoom-in duration-500">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462563.03271722235!2d54.897828656500074!3d25.075658395396644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2smx!4v1767418320806!5m2!1sen!2smx" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
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
