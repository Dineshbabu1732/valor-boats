import React, { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import gsap from "gsap";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAboveFooter, setIsAboveFooter] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setIsVisible(scrollPercent > 75);

      const footer = document.querySelector("footer");
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        if (footerTop < window.innerHeight) {
          setIsAboveFooter(true);
        } else {
          setIsAboveFooter(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (isVisible) {
      gsap.to(btnRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(btnRef.current, {
        scale: 0,
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isVisible]);

  return (
    <div
      className="fixed right-10 z-[1000] pointer-events-none"
      style={{
        bottom: isAboveFooter ? "340px" : "40px",
        transition: "bottom 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
    >
      <button
        ref={btnRef}
        id="scroll-btn"
        onClick={scrollToTop}
        style={{ opacity: 0, scale: 0 }}
        className="pointer-events-auto w-14 h-14 bg-[#006699] text-white rounded-full shadow-2xl flex items-center justify-center group active:scale-95 transition-all
                   border-2 border-white hover:bg-white hover:text-[#006699]"
        aria-label="Scroll to top"
      >
        <ArrowUp
          size={24}
          className="group-hover:-translate-y-1 transition-transform duration-300"
        />
      </button>
    </div>
  );
};

export default ScrollToTop;
