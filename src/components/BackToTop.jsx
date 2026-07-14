import { useEffect, useState, useRef } from "react";
import { FaArrowUp } from "react-icons/fa";
import { gsap } from "gsap";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    if (isVisible) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0, rotation: -45, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.35, ease: "back.out(1.7)" }
      );
    }
  }, [isVisible]);

  const scrollToTop = () => {
    // Smooth scroll through window API (which Lenis intercepts and smooths out)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      data-magnetic
      aria-label="Back to Top"
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40 w-14 h-14 bg-[#FFD600] text-black border-4 border-black font-bold flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-[0px_0px_0px_rgba(0,0,0,1)] transition-all select-none"
    >
      <FaArrowUp className="w-6 h-6 stroke-[2]" />
    </button>
  );
}
