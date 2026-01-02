import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactStrip from "./ContactStrip";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for footer columns and social icons
      gsap.from(".footer-item", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      });

      // Subtle expansion animation for the main logo
      gsap.from(".footer-logo", {
        letterSpacing: "0.5em",
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".footer-logo",
          start: "top 95%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-[#006699] text-white pt-20 pb-10 px-8 md:px-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0">
          {/* LEFT: LINKS COLUMNS */}
          <div className="grid grid-cols-2 gap-20 md:gap-32">
            {/* Column 1 */}
            <div className="footer-item flex flex-col gap-4">
              <a
                href="#about"
                className="text-sm font-light hover:opacity-60 transition-opacity"
              >
                About
              </a>
              <a
                href="#models"
                className="text-sm font-light hover:opacity-60 transition-opacity"
              >
                Models
              </a>
              <a
                href="#customization"
                className="text-sm font-light hover:opacity-60 transition-opacity"
              >
                Customization
              </a>
              <a
                href="#gallery"
                className="text-sm font-light hover:opacity-60 transition-opacity"
              >
                Gallery
              </a>
            </div>

            {/* Column 2 */}
            <div className="footer-item flex flex-col gap-4">
              <a
                href="#blog"
                className="text-sm font-light hover:opacity-60 transition-opacity"
              >
                Blog
              </a>
              <a
                href="#contact"
                className="text-sm font-light hover:opacity-60 transition-opacity"
              >
                Contact
              </a>
              <a
                href="#instagram"
                className="text-sm font-light hover:opacity-60 transition-opacity"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* RIGHT: LOGO & SOCIALS */}
          <div className="flex flex-col items-start md:items-end gap-10">
            {/* Using your logo.svg with a white filter */}
            <img
              src="/logo.svg"
              alt="VALOR"
              className="footer-logo h-8 md:h-10 object-contain brightness-0 invert"
            />

            <div className="footer-item flex gap-8 items-center">
              <a href="#" className="hover:-translate-y-1 transition-transform">
                <img
                  src="/facebook.svg"
                  className="w-6 h-6 invert"
                  alt="Facebook"
                />
              </a>
              <a href="#" className="hover:-translate-y-1 transition-transform">
                <img
                  src="/instagram.svg"
                  className="w-6 h-6 invert"
                  alt="Instagram"
                />
              </a>
              <a href="#" className="hover:-translate-y-1 transition-transform">
                <img src="/x.svg" className="w-6 h-6 invert" alt="X" />
              </a>
            </div>
          </div>
        </div>
        <ContactStrip />
        {/* BOTTOM DIVIDER & COPYRIGHT */}
        <div className="footer-item mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center items-center">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-light opacity-60">
            Terms & Conditions © 2025 Valor Powerboats
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
