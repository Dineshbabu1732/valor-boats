import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const QuoteForm = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const cardRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    reset();
    alert("Your inquiry has been sent to VALOR.");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal the text content from the left
      gsap.from(textRef.current.children, {
        x: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Reveal the form card from the right
      gsap.from(cardRef.current, {
        x: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 md:px-20 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* LEFT SIDE: CONTENT (Added back) */}
        <div ref={textRef} className="w-full lg:w-1/2">
          <h2 className="text-4xl md:text-6xl font-bold text-black mb-8 leading-tight tracking-tighter">
            The VALOR <br /> Lineup
          </h2>
          <div className="space-y-6 text-gray-500 text-lg md:text-xl font-light leading-relaxed max-w-lg">
            <p>
              Each VALOR model is designed for maximum stability, efficiency,
              and performance — powered by advanced composite construction and
              aerodynamic hull engineering.
            </p>
            <p className="text-sm md:text-base opacity-70">
              Complete the form to receive a personalized quote and technical
              specifications for our current fleet.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: THE FORM CARD */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div
            ref={cardRef}
            className="w-full max-w-[460px] bg-white rounded-[2.5rem] shadow-[0_20px_80px_rgba(0,0,0,0.06)] p-10 md:p-14 border border-gray-100"
          >
            {/* VALOR LOGO in Brand Blue */}
            <div className="flex justify-center mb-12">
              <img
                src="/logo.svg"
                alt="VALOR"
                className="h-6 object-contain "
                style={{
                  filter:
                    "invert(24%) sepia(96%) saturate(1588%) hue-rotate(167deg) brightness(91%) contrast(101%)",
                }}
              />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Full Name */}
              <div className="relative">
                <input
                  {...register("fullName", { required: "Name is required" })}
                  placeholder="Full Name"
                  className="w-full px-0 py-3 border-b border-gray-200 bg-transparent transition-all outline-none text-sm font-light focus:border-[#006699] placeholder:text-gray-300"
                />
                {errors.fullName && (
                  <span className="text-[10px] text-red-500 absolute -bottom-5 left-0 uppercase font-bold tracking-widest">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                  })}
                  placeholder="E-mail"
                  className="w-full px-0 py-3 border-b border-gray-200 bg-transparent transition-all outline-none text-sm font-light focus:border-[#006699] placeholder:text-gray-300"
                />
                {errors.email && (
                  <span className="text-[10px] text-red-500 absolute -bottom-5 left-0 uppercase font-bold tracking-widest">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Phone */}
              <div className="relative">
                <input
                  {...register("phone", { required: "Phone is required" })}
                  placeholder="Phone Number"
                  className="w-full px-0 py-3 border-b border-gray-200 bg-transparent transition-all outline-none text-sm font-light focus:border-[#006699] placeholder:text-gray-300"
                />
                {errors.phone && (
                  <span className="text-[10px] text-red-500 absolute -bottom-5 left-0 uppercase font-bold tracking-widest">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              <div className="pt-4">
                <button
                  disabled={isSubmitting}
                  className="w-full bg-[#006699] text-white py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] transition-all hover:bg-[#005580] hover:shadow-xl active:scale-[0.97] disabled:bg-gray-300"
                >
                  {isSubmitting ? "Submitting..." : "Request a Quote"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
