import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { X, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle state when scrolled more than 20px
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  useEffect(() => {
    if (!menuRef.current) return;
    if (open) {
      gsap.to(menuRef.current, { x: "0%", duration: 0.7, ease: "expo.out" });
      gsap.fromTo(
        itemsRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.05, delay: 0.3 }
      );
    } else {
      gsap.to(menuRef.current, { x: "-100%", duration: 0.5, ease: "expo.in" });
    }
  }, [open]);

  return (
    <>
      {/* STRICT STICKY FIX: 
          - fixed !important
          - top-0 !important
          - z-[9999] (Extreme high priority)
      */}
      <header
        className={`!fixed !top-0 left-0 w-full z-[9999] transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-black/90 backdrop-blur-md py-3 shadow-lg"
            : "bg-transparent py-6"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 max-w-[1440px] mx-auto">
          <img
            src="/logo.svg"
            alt="VALOR"
            className="h-5 md:h-6 object-contain"
          />

          <div className="flex items-center gap-4">
            <button className="hidden md:block bg-white text-black px-6 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
              Contact Us
            </button>

            <button
              onClick={() => setOpen(true)}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-all active:scale-95"
            >
              <img
                src="/hamburger.svg"
                alt="Menu"
                className="w-5 h-5 object-contain"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Menu Overlay */}
      <div
        ref={menuRef}
        className="!fixed !inset-y-0 !left-0 w-full md:w-[400px] bg-white z-[10000] -translate-x-full shadow-2xl flex flex-col"
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => setOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-black"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 px-10 pt-4 text-black">
          <ul className="space-y-6">
            {["Home", "Valor Boats", "Gallery", "About", "Contact Us"].map(
              (item, i) => (
                <li
                  key={item}
                  ref={(el) => (itemsRef.current[i] = el)}
                  className="group flex items-center justify-between cursor-pointer border-b border-gray-100 pb-4"
                >
                  <span className="text-xl font-semibold tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                    {item}
                  </span>
                  {item === "Valor Boats" && (
                    <ChevronRight size={18} className="text-gray-400" />
                  )}
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}
