import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, Play, Maximize2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_DATA = [
  {
    id: 1,
    type: "video",
    src: "/gallery-video-1.mp4",
    title: "Power in Motion",
    size: "large",
  },
  {
    id: 2,
    type: "image",
    src: "/gallery-img-1.jpeg",
    title: "V38 Cockpit Detail",
    size: "small",
  },
  {
    id: 3,
    type: "image",
    src: "/gallery-img-2.jpeg",
    title: "Evening Cruise",
    size: "small",
  },
  {
    id: 4,
    type: "image",
    src: "/gallery-img-3.jpg",
    title: "Aerodynamic Hull",
    size: "medium",
  },
  {
    id: 5,
    type: "image",
    src: "/gallery-img-4.jpg",
    title: "Precision Engineering",
    size: "medium",
  },
  {
    id: 6,
    type: "video",
    src: "/gallery-video-2.mp4",
    title: "Open Water Sprint",
    size: "full",
  },
];

const GalleryPage = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Clear any existing ScrollTriggers to prevent ghosting
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const ctx = gsap.context(() => {
      // Reveal items: Ensure they start from 0 and go to 1
      gsap.fromTo(
        ".gallery-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".gallery-grid",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // Changed bg to a slightly darker off-white to make the cards stand out
    <div
      ref={sectionRef}
      className="min-h-screen bg-[#f3f3f3] pt-40 pb-32 px-6 md:px-20 relative"
    >
      <div className="max-w-7xl mx-auto mb-20 gallery-header">
        <h1 className="text-6xl md:text-8xl font-bold text-black tracking-tighter mb-6">
          The Gallery
        </h1>
        <p className="text-gray-500 text-lg max-w-xl font-light italic">
          High-performance engineering, captured in high-definition.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 gallery-grid">
        {GALLERY_DATA.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedMedia(item)}
            className={`gallery-item relative overflow-hidden rounded-[1.5rem] bg-black group cursor-pointer shadow-lg
              ${item.size === "large" ? "md:col-span-8 aspect-video" : ""}
              ${item.size === "medium" ? "md:col-span-6 aspect-video" : ""}
              ${item.size === "small" ? "md:col-span-4 aspect-square" : ""}
              ${item.size === "full" ? "md:col-span-12 aspect-[21/9]" : ""}
            `}
          >
            {/* The "Faded" Fix: We use absolute 100% opacity here */}
            <div className="w-full h-full opacity-100 group-hover:opacity-90 transition-opacity duration-500">
              {item.type === "video" ? (
                <video
                  muted
                  loop
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={item.src} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Subtle Gradient Overlay (Only visible on hover) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <h3 className="text-white text-xl font-light italic">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX: Dark version to prevent white "haze" */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-[99999] bg-black flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <button className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors">
            <X size={40} strokeWidth={1} />
          </button>

          <div
            className="w-full max-w-6xl max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMedia.type === "video" ? (
              <video
                controls
                autoPlay
                className="max-w-full max-h-full rounded-lg"
              >
                <source src={selectedMedia.src} type="video/mp4" />
              </video>
            ) : (
              <img
                src={selectedMedia.src}
                alt={selectedMedia.title}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
