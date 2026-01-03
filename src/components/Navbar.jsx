import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { X, ChevronDown, Facebook, Instagram, Twitter } from "lucide-react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";

const BOAT_DATA = [
  {
    id: "v38",
    name: "Valor V38",
    tagline: "38 Feet of Performance Dominance",
    image: "/v38-render.png",
  },
  {
    id: "v27",
    name: "Valor V27",
    tagline: "Performance in Every Foot",
    image: "/v27-render.png",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBoatsExpanded, setIsBoatsExpanded] = useState(false);

  const menuRef = useRef(null);
  const itemsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  useEffect(() => {
    if (!menuRef.current) return;
    if (open) {
      gsap.to(menuRef.current, { x: "0%", duration: 0.4, ease: "power4.out" });
      gsap.fromTo(
        itemsRef.current,
        { x: -15, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.03, delay: 0.1 }
      );
    } else {
      gsap.to(menuRef.current, {
        x: "-100%",
        duration: 0.3,
        ease: "power2.in",
      });
      setIsBoatsExpanded(false);
    }
  }, [open]);

  const handleConfigure = (id) => {
    setOpen(false);
    navigate(`/configure/${id}`);
  };

  const getLinkClass = (isActive) =>
    `text-xl font-semibold transition-colors ${
      isActive && !isBoatsExpanded ? "text-[#006699]" : "text-black"
    }`;

  return (
    <>
      <header
        className={`!fixed !top-0 left-0 w-full z-[9999] transition-all duration-300 ${
          !isHomePage
            ? "bg-[#006699] py-3 shadow-lg"
            : isScrolled
            ? "bg-[#006699] backdrop-blur-md py-3 shadow-lg"
            : "bg-transparent py-6"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 max-w-[1440px] mx-auto">
          <Link to="/">
            <img src="/logo.svg" alt="VALOR" className="h-5 md:h-6" />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden md:block bg-white text-black px-6 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
            >
              Contact Us
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-all shadow-md"
            >
              <img src="/hamburger.svg" alt="Menu" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Menu Overlay */}
      <div
        ref={menuRef}
        className={`!fixed !inset-y-0 !left-0 z-[10000] bg-white shadow-2xl flex flex-col md:flex-row transition-all duration-400 ease-in-out ${
          isBoatsExpanded ? "w-full" : "w-full md:w-[450px]"
        }`}
      >
        <div
          className={`w-full md:w-[450px] flex flex-col h-full border-r border-gray-50 flex-shrink-0 ${
            isBoatsExpanded ? "overflow-y-auto" : ""
          }`}
        >
          <div className="flex justify-end p-6">
            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-black"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 pt-4 pb-10">
            <ul className="space-y-6 px-8 md:px-10">
              <li
                ref={(el) => (itemsRef.current[0] = el)}
                className="border-b border-gray-100 pb-4"
              >
                <NavLink
                  to="/"
                  end
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => getLinkClass(isActive)}
                >
                  Home
                </NavLink>
              </li>

              <li
                ref={(el) => (itemsRef.current[1] = el)}
                className="border-b border-gray-100 pb-4"
              >
                <button
                  onClick={() => setIsBoatsExpanded(!isBoatsExpanded)}
                  className={`w-full flex items-center justify-between transition-colors ${
                    isBoatsExpanded ? "text-[#006699]" : "text-black"
                  }`}
                >
                  <span
                    className={`text-xl font-semibold ${
                      location.pathname === "/boats" && !isBoatsExpanded
                        ? "text-[#006699]"
                        : ""
                    }`}
                  >
                    Valor Boats
                  </span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${
                      isBoatsExpanded
                        ? "rotate-180 text-[#006699]"
                        : "text-gray-400"
                    }`}
                  />
                </button>

                {/* MOBILE FULL-WIDTH BOAT DISPLAY */}
                <div
                  className={`md:hidden overflow-hidden transition-all duration-500 ${
                    isBoatsExpanded ? "max-h-[1500px] mt-8" : "max-h-0"
                  }`}
                >
                  <div className="space-y-16 -mx-8">
                    {" "}
                    {/* Negative margin to bleed to the edge of the sidebar */}
                    {BOAT_DATA.map((boat) => (
                      <div key={boat.id} className="group px-8">
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-black mb-1">
                          {boat.id}
                        </h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">
                          {boat.tagline}
                        </p>

                        <div className="w-full h-auto py-6 flex items-center justify-center">
                          <img
                            src={boat.image}
                            alt={boat.name}
                            className="w-full h-auto object-contain drop-shadow-xl transform active:scale-95 transition-transform duration-300"
                          />
                        </div>

                        <button
                          onClick={() => handleConfigure(boat.id)}
                          className="w-full bg-[#006699] text-white py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg mt-2"
                        >
                          Configure {boat.name}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </li>

              <li
                ref={(el) => (itemsRef.current[2] = el)}
                className="border-b border-gray-100 pb-4"
              >
                <NavLink
                  to="/gallery"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => getLinkClass(isActive)}
                >
                  Gallery
                </NavLink>
              </li>
              <li
                ref={(el) => (itemsRef.current[3] = el)}
                className="border-b border-gray-100 pb-4"
              >
                <NavLink
                  to="/about"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => getLinkClass(isActive)}
                >
                  About
                </NavLink>
              </li>
              <li
                ref={(el) => (itemsRef.current[4] = el)}
                className="border-b border-gray-100 pb-4"
              >
                <NavLink
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => getLinkClass(isActive)}
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>

            <div className="px-8 md:px-10 mt-20 flex gap-6 text-black/30">
              <Facebook
                size={20}
                className="hover:text-black cursor-pointer transition-colors"
              />
              <Instagram
                size={20}
                className="hover:text-black cursor-pointer transition-colors"
              />
              <Twitter
                size={20}
                className="hover:text-black cursor-pointer transition-colors"
              />
            </div>
          </nav>
        </div>

        {/* DESKTOP MEGA MENU */}
        {isBoatsExpanded && (
          <div className="hidden md:flex flex-1 bg-white p-12 lg:p-20 flex-col justify-center gap-16 animate-in fade-in slide-in-from-left-4 duration-300">
            {BOAT_DATA.map((boat) => (
              <div
                key={boat.id}
                className="flex flex-col lg:flex-row items-center gap-12 group"
              >
                <div className="max-w-xs text-black">
                  <h3 className="text-xl font-bold">{boat.name}</h3>
                  <p className="text-sm font-bold mb-3 uppercase tracking-wide">
                    {boat.tagline}
                  </p>
                  <button
                    onClick={() => handleConfigure(boat.id)}
                    className="bg-[#006699] text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg"
                  >
                    Configure Your {boat.id.toUpperCase()}
                  </button>
                </div>
                <div className="flex-1">
                  <img
                    src={boat.image}
                    alt={boat.name}
                    className="w-[300px] h-auto object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
