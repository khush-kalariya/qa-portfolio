import { useEffect, useRef } from "react";
import { FaGraduationCap, FaLanguage, FaGlobe, FaSearchPlus, FaHistory } from "react-icons/fa";
import { gsap } from "gsap";
import BackgroundBugs from "./BackgroundBugs";

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        ".about-title",
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", y: 30 },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-title",
            start: "top 85%",
          },
        }
      );

      // Editorial card reveal
      gsap.fromTo(
        ".about-editorial",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-editorial",
            start: "top 80%",
          },
        }
      );

      // Grid stats cards reveal
      gsap.fromTo(
        ".about-stat-card",
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".about-stat-card-trigger",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 bg-[#FAFAFA] border-b-4 border-black relative overflow-hidden brutal-grid"
    >
      <BackgroundBugs count={4} />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-16 text-left">
          <p className="font-mono text-sm font-bold uppercase tracking-widest text-[#FF2D75] mb-2">
            [SECTION_02] // PROFILE_OVERVIEW
          </p>
          <h2 className="about-title text-5xl md:text-7xl font-black font-display uppercase tracking-tight text-black inline-block border-b-8 border-[#FFD600] pb-2 leading-none">
            ABOUT <br /> ME
          </h2>
        </div>

        {/* Editorial Magazine Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Big Editorial Card */}
          <div className="lg:col-span-7 about-editorial bg-white border-4 border-black p-8 shadow-[8px_8px_0px_#000000] text-left">
            <h3 className="font-display font-black text-3xl md:text-4xl text-black mb-6 uppercase">
              CREATIVE TESTING PHILOSOPHY
            </h3>
            
            {/* Bold Quote Block */}
            <div className="bg-[#FF2D75] text-white border-4 border-black p-6 mb-6 shadow-[4px_4px_0px_#000000] rotate-[-1deg]">
              <p className="font-display font-black text-xl md:text-2xl leading-snug">
                "AUTOMATION CHECKS IF THE CODE WORKS. METICULOUS EXPLORATORY TESTING VERIFIES IF IT IS ACTUALLY USABLE AND ROBUST."
              </p>
            </div>

            <div className="space-y-6 text-base md:text-lg leading-relaxed text-[#111111] font-medium">
              <p>
                Hello, I'm Alex. I approach QA Engineering not just as a checklists checker, but as a critical product analyst. I thrive on diving deep into product requirements, identifying logical loopholes, designing extensive test matrices, and running thorough manual regressions.
              </p>
              <p>
                My passion lies in bridging the gap between design specs, developer code, and user expectations. By introducing complete test plan architectures, verifying edge conditions, and running structured UI and exploratory test sweeps, I help teams release high-quality products.
              </p>
              <p>
                Whether it is verifying complex API states in Postman, writing SQL queries to validate database updates, checking responsive rendering on dynamic mobile layouts, or performing exploratory bug hunts, my goal is absolute software stability.
              </p>
            </div>
          </div>

          {/* Right Column: Small Quick-Info Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 about-stat-card-trigger">
            
            {/* Card 1: Experience */}
            <div className="about-stat-card bg-[#FFD600] border-4 border-black p-5 shadow-[4px_4px_0px_#000000] text-left hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000000] transition-all">
              <div className="w-12 h-12 bg-white border-3 border-black flex items-center justify-center mb-4">
                <FaHistory className="w-6 h-6 text-black" />
              </div>
              <h4 className="font-display font-black text-lg uppercase mb-1">EXPERIENCE</h4>
              <p className="font-mono text-sm font-bold text-black">1+ Years Industry</p>
              <p className="font-mono text-xs opacity-75 mt-2">Manual & Functional QA</p>
            </div>

            {/* Card 2: Education */}
            <div className="about-stat-card bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#000000] text-left hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000000] transition-all">
              <div className="w-12 h-12 bg-[#00E5FF] border-3 border-black flex items-center justify-center mb-4">
                <FaGraduationCap className="w-6 h-6 text-black" />
              </div>
              <h4 className="font-display font-black text-lg uppercase mb-1">EDUCATION</h4>
              <p className="font-mono text-sm font-bold">MCA</p>
              <p className="font-mono text-xs opacity-75 mt-2">Master of Computer Applications</p>
            </div>

            {/* Card 3: Location */}
            <div className="about-stat-card bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#000000] text-left hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000000] transition-all">
              <div className="w-12 h-12 bg-[#FF2D75] border-3 border-black flex items-center justify-center mb-4 text-white">
                <FaGlobe className="w-6 h-6" />
              </div>
              <h4 className="font-display font-black text-lg uppercase mb-1">LOCATION</h4>
              <p className="font-mono text-sm font-bold">Ahmedabad, Gujarat</p>
              <p className="font-mono text-xs opacity-75 mt-2">India</p>
            </div>

            {/* Card 4: Languages */}
            <div className="about-stat-card bg-[#00E5FF] border-4 border-black p-5 shadow-[4px_4px_0px_#000000] text-left hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000000] transition-all">
              <div className="w-12 h-12 bg-white border-3 border-black flex items-center justify-center mb-4">
                <FaLanguage className="w-6 h-6 text-black" />
              </div>
              <h4 className="font-display font-black text-lg uppercase mb-1">LANGUAGES</h4>
              <p className="font-mono text-sm font-bold text-black">Gujarati · Hindi · English</p>
              <p className="font-mono text-xs opacity-75 mt-2">Fluent in all three</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
