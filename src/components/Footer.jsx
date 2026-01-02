import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLink, Link } from "react-router-dom"; // Use NavLink for active states
import ContactStrip from "./ContactStrip";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Modern Active Styling Function
  const activeStyle = ({ isActive }) =>
    `text-sm font-light transition-all duration-300 relative py-1 ${
      isActive
        ? "opacity-100 border-b border-white" // Style for the active page
        : "opacity-60 hover:opacity-100" // Style for other pages
    }`;

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
            <div className="footer-item flex flex-col gap-4 items-start">
              <NavLink
                to="/about"
                onClick={handleLinkClick}
                className={activeStyle}
              >
                About
              </NavLink>
              <NavLink
                to="/boats"
                onClick={handleLinkClick}
                className={activeStyle}
              >
                Models
              </NavLink>
              <NavLink
                to="/customization"
                onClick={handleLinkClick}
                className={activeStyle}
              >
                Customization
              </NavLink>
              <NavLink
                to="/gallery"
                onClick={handleLinkClick}
                className={activeStyle}
              >
                Gallery
              </NavLink>
            </div>

            {/* Column 2 */}
            <div className="footer-item flex flex-col gap-4 items-start">
              <NavLink
                to="/blog"
                onClick={handleLinkClick}
                className={activeStyle}
              >
                Blog
              </NavLink>
              <NavLink
                to="/contact"
                onClick={handleLinkClick}
                className={activeStyle}
              >
                Contact
              </NavLink>
              <NavLink
                to="/instagram-feed"
                onClick={handleLinkClick}
                className={activeStyle}
              >
                Instagram
              </NavLink>
            </div>
          </div>

          {/* RIGHT: LOGO & SOCIALS */}
          <div className="flex flex-col items-start md:items-end gap-10">
            <Link to="/" onClick={handleLinkClick}>
              <img
                src="/logo.svg"
                alt="VALOR"
                className="footer-logo h-8 md:h-10 object-contain brightness-0 invert"
              />
            </Link>

            <div className="footer-item flex gap-8 items-center">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:-translate-y-1 transition-transform"
              >
                <img
                  src="/facebook.svg"
                  className="w-6 h-6 invert"
                  alt="Facebook"
                />
              </a>
              <a
                href="https://www.instagram.com/valorpowerboats?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:-translate-y-1 transition-transform"
              >
                <img
                  src="/instagram.svg"
                  className="w-6 h-6 invert"
                  alt="Instagram"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:-translate-y-1 transition-transform"
              >
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
