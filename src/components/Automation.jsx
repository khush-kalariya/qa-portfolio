import { useEffect, useRef } from "react";
import { SiSelenium, SiCypress } from "react-icons/si";
import { FaCheckCircle, FaExchangeAlt, FaBolt, FaFileSignature, FaNetworkWired, FaRunning } from "react-icons/fa";
import { gsap } from "gsap";


const SiPlaywright = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={props.style}>
    <title>Playwright</title>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <path d="M9 10l2 2 4-4" />
  </svg>
);


const frameworks = [
  {
    name: "Selenium",
    icon: SiSelenium,
    color: "#00B200", // Greenish
    accentBg: "bg-[#FFD600]", // Yellow accent
    tagColor: "bg-[#FFD600] text-black",
    details: [
      { label: "Architecture", val: "WebDriver W3C Standard Protocol API" },
      { label: "Preferred Language", val: "Java / Python / JavaScript / C#" },
      { label: "Execution Speed", val: "Moderate (Standard HTTP REST requests)" },
      { label: "Reporting", val: "ExtentReports / TestNG Custom XML integrations" },
      { label: "CI/CD Integration", val: "Fully Ready (Jenkins, GitLab CI, Maven setups)" },
    ],
    summary: "The industry pioneer. Best suited for legacy cross-browser grid automation and multi-language enterprise software systems."
  },
  {
    name: "Cypress",
    icon: SiCypress,
    color: "#17202C", // Dark Slate
    accentBg: "bg-[#00E5FF]", // Cyan accent
    tagColor: "bg-[#00E5FF] text-black",
    details: [
      { label: "Architecture", val: "In-Browser Execution Loop Engine" },
      { label: "Preferred Language", val: "JavaScript (ES6) / TypeScript" },
      { label: "Execution Speed", val: "Fast (Direct DOM injection & event control)" },
      { label: "Reporting", val: "Mochawesome Reports / Cypress Cloud Dashboard" },
      { label: "CI/CD Integration", val: "Ready (Cypress GitHub Action, Docker containers)" },
    ],
    summary: "The developer's favorite. Excellent for fast modern React, Vue front-end component integration, and reliable local test debugging."
  },
  {
    name: "Playwright",
    icon: SiPlaywright,
    color: "#2EAD33", // Green
    accentBg: "bg-[#FF2D75]", // Pink accent
    tagColor: "bg-[#FF2D75] text-white",
    details: [
      { label: "Architecture", val: "Direct CDPs (Chrome DevTools Protocol)" },
      { label: "Preferred Language", val: "TypeScript / JavaScript / Python / Java" },
      { label: "Execution Speed", val: "Ultra-Fast (Native browser websockets)" },
      { label: "Reporting", val: "Playwright HTML Trace Viewer & JSON Reporters" },
      { label: "CI/CD Integration", val: "Fully Ready (Orchestrated parallel worker pools)" },
    ],
    summary: "The modern automation powerhouse. Ideal for lightning-fast cross-browser parallel runs, visual regression checks, and flaky-free pipelines."
  }
];

export default function Automation() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        ".automation-title",
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", y: 30 },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".automation-title",
            start: "top 85%",
          },
        }
      );

      // Card staggered slide reveal
      gsap.fromTo(
        ".automation-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".automation-grid-trigger",
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
      id="automation-testing"
      className="py-24 bg-[#FAFAFA] border-b-4 border-black relative overflow-hidden brutal-grid"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-left">
          <p className="font-mono text-sm font-bold uppercase tracking-widest text-[#FF2D75] mb-2">
            [SECTION_09] // ENGINE_SELECTION
          </p>
          <h2 className="automation-title text-5xl md:text-7xl font-black font-display uppercase tracking-tight text-black inline-block border-b-8 border-[#FFD600] pb-2">
            AUTOMATION ENGINES
          </h2>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 automation-grid-trigger">
          {frameworks.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="automation-card bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000000] hover:-translate-y-2 hover:shadow-[12px_12px_0px_#000000] transition-all flex flex-col justify-between text-left"
              >
                <div>
                  {/* Brand Row */}
                  <div className="flex items-center justify-between border-b-4 border-black pb-4 mb-6">
                    <h3 className="font-display font-black text-2xl uppercase text-black">
                      {f.name}
                    </h3>
                    <div
                      className="w-14 h-14 border-4 border-black flex items-center justify-center shadow-[3px_3px_0px_rgba(0,0,0,1)] bg-white"
                      style={{ borderColor: f.color }}
                    >
                      <Icon className="w-8 h-8" style={{ color: f.color }} />
                    </div>
                  </div>

                  {/* Summary paragraph */}
                  <p className="font-mono text-xs text-gray-500 mb-6 leading-relaxed bg-gray-50 p-3 border-2 border-black border-dashed">
                    {f.summary}
                  </p>

                  {/* Spec Sheets Details */}
                  <div className="space-y-4">
                    <span className="font-display font-black text-xs uppercase tracking-wider text-black block mb-2 border-b-2 border-black pb-1">
                      TECHNICAL PARAMETERS:
                    </span>
                    {f.details.map((detail, dIdx) => (
                      <div key={dIdx} className="font-mono text-xs">
                        <span className="text-gray-500 block uppercase font-bold text-[10px]">
                          {detail.label}
                        </span>
                        <span className="font-bold text-black text-xs leading-tight block mt-0.5">
                          {detail.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Integration Status Footer Banner */}
                <div className={`mt-8 border-3 border-black p-3 flex items-center gap-2 shadow-[2px_2px_0px_rgba(0,0,0,1)] ${f.accentBg} text-black font-mono text-[10px] font-black uppercase`}>
                  <FaCheckCircle className="flex-shrink-0" />
                  <span>CI/CD PIPELINE_INTEGRATED: OK</span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
