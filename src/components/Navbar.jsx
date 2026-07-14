import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { gsap } from "gsap";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Testing", href: "#testing" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const lastScrollY = useRef(0);
  const navRef = useRef(null);

  // 1. Scroll logic: Hide on scroll down, show on scroll up, blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scrolled styling
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide / Show on scroll direction
      if (currentScrollY > 100 && currentScrollY > lastScrollY.current && !mobileMenuOpen) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  // 2. Intersection Observer to highlight active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Detect when section covers major viewport area
      threshold: 0.1,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          const matchedItem = navItems.find((item) => item.href === `#${id}`);
          if (matchedItem) {
            setActiveItem(matchedItem.label);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    navItems.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 3. Mobile menu animation
  useEffect(() => {
    if (mobileMenuOpen) {
      gsap.to(".mobile-nav-link", {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.out",
        delay: 0.1,
      });
    } else {
      gsap.set(".mobile-nav-link", { opacity: 0, y: 15 });
    }
  }, [mobileMenuOpen]);

  const handleLinkClick = (e, label, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveItem(label);

    const targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b-4 border-black select-none
          ${isHidden ? "navbar-hidden" : "navbar-visible"}
          ${isScrolled ? "bg-white/95 backdrop-blur-md py-4" : "bg-[#FAFAFA] py-6"}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo / Name */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "Home", "#home")}
            className="text-2xl md:text-3xl font-black font-display tracking-tight text-black flex items-center gap-2"
          >
            QA_TESTER<span className="w-3 h-3 bg-[#FF2D75] border-2 border-black inline-block animate-pulse"></span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = activeItem === item.label;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.label, item.href)}
                  className={`px-4 py-2 text-sm font-black uppercase border-2 transition-all duration-150
                    ${isActive 
                      ? "bg-[#FFD600] text-black border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] -translate-x-0.5 -translate-y-0.5" 
                      : "border-transparent text-black hover:border-black hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
                    }
                  `}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-11 h-11 border-3 border-black bg-white flex items-center justify-center shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_rgba(0,0,0,1)] transition-all text-black"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer (Neo-Brutalist overlay) */}
      <div
        className={`fixed inset-0 z-40 bg-[#FAFAFA] border-l-8 border-black flex flex-col justify-center items-center p-8 transition-transform duration-500 lg:hidden
          ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col gap-6 text-center">
          {navItems.map((item) => {
            const isActive = activeItem === item.label;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.label, item.href)}
                className={`mobile-nav-link text-3xl font-black uppercase py-2 px-6 border-4 border-black block shadow-[4px_4px_0px_rgba(0,0,0,1)]
                  ${isActive 
                    ? "bg-[#FF2D75] text-white" 
                    : "bg-white text-black hover:bg-[#00E5FF]"
                  }
                `}
                style={{ opacity: 0, transform: "translateY(15px)" }}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Footer info in Mobile menu */}
        <div className="absolute bottom-10 text-center font-mono text-xs opacity-75">
          <p>SYSTEM LOADED // AUTOMATED VERIFICATION</p>
          <p>© {new Date().getFullYear()} QA_ENGINEER_PORTFOLIO</p>
        </div>
      </div>
    </>
  );
}
