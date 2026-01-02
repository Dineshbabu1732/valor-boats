import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { X, ChevronDown, Facebook, Instagram, Twitter } from "lucide-react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";

const BOAT_DATA = [
  {
    id: "v38",
    name: "Valor V38",
    tagline: "38 Feet of Performance Dominance",
    description:
      "A true performance catamaran engineered for offshore confidence.",
    image: "/v38-render.png",
  },
  {
    id: "v27",
    name: "Valor V27",
    tagline: "Performance in Every Foot",
    description:
      "A 27-foot powerhouse created for those who crave speed and style.",
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

  // Check if we are currently on the Home Page
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
          // If not home page, background is always black
          // If home page, background depends on scroll state
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
        className={`!fixed !inset-y-0 !left-0 z-[10000] bg-white shadow-2xl flex transition-all duration-400 ease-in-out ${
          isBoatsExpanded ? "w-full" : "w-full md:w-[450px]"
        }`}
      >
        <div className="w-full md:w-[450px] flex flex-col h-full border-r border-gray-50 flex-shrink-0">
          <div className="flex justify-end p-6">
            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-black hover:bg-gray-50 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-10 pt-4">
            <ul className="space-y-6">
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

            <div className="mt-20 flex gap-6 text-black/30">
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
                  <p className="text-[11px] text-gray-500 leading-relaxed mb-6 font-light">
                    {boat.description}
                  </p>
                  <button
                    onClick={() => handleConfigure(boat.id)}
                    className="bg-[#006699] text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#005580] transition-colors shadow-lg"
                  >
                    Configure Your {boat.id.toUpperCase()}
                  </button>
                </div>
                <div className="flex-1">
                  <img
                    src={boat.image}
                    alt={boat.name}
                    className="w-[200px] h-auto object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
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
