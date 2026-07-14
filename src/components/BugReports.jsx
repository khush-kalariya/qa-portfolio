import { useEffect, useRef } from "react";
import { FaBug, FaChrome, FaMobileAlt, FaServer, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { gsap } from "gsap";
import BackgroundBugs from "./BackgroundBugs";

const bugReports = [
  {
    id: "BUG-2024-08",
    title: "Race Condition in Coupon Applying API Code Block",
    severity: "CRITICAL",
    priority: "P1",
    environment: "Staging (v1.4.0)",
    browser: "Chrome v122.0.x / Safari",
    device: "Desktop / Macbook Pro",
    steps: [
      "Navigate to cart checkout page with items worth $100.00.",
      "Open developer tool networks tab and throttle speed to 3G latency.",
      "Input valid coupon 'SAVE20' in discount entry field.",
      "Input valid coupon 'DEAL30' in entry field and click 'Apply' multiple times concurrently within a 150ms window."
    ],
    expected: "Only a single max coupon is computed. Secondary coupon application returns HTTP 400 validation warning.",
    actual: "Both coupon requests resolve HTTP 200, stacking a 50% discount and reducing order total to $50.00.",
    status: "REPRODUCED"
  },
  {
    id: "BUG-2024-15",
    title: "Mobile Viewport Hamburger Overlaps Auth Header Links",
    severity: "MAJOR",
    priority: "P2",
    environment: "Production (v1.3.8)",
    browser: "Webview / Safari Mobile",
    device: "iPhone 15 Pro Max",
    steps: [
      "Load the homepage URL on iOS mobile device layout.",
      "Scroll page down past 150px to trigger navbar shrinkage.",
      "Tap the mobile hamburger toggle to display navigation menu drawers.",
      "Assert contact and home drawer links do not overlay navigation icons."
    ],
    expected: "Hamburger drawer slides below primary navigation bar overlay without overlap.",
    actual: "Hamburger menu drawer overlay overlaps checkout button, rendering checkout triggers inaccessible.",
    status: "RESOLVED"
  }
];

export default function BugReports() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        ".bugreports-title",
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", y: 30 },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".bugreports-title",
            start: "top 85%",
          },
        }
      );

      // Card staggered slide reveal
      gsap.fromTo(
        ".bug-report-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".bug-reports-trigger",
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
      id="bugreports-showcase"
      className="py-24 bg-[#FAFAFA] border-b-4 border-black relative brutal-grid"
    >
      <BackgroundBugs count={4} />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-left">
          <p className="font-mono text-sm font-bold uppercase tracking-widest text-[#FF2D75] mb-2">
            [SECTION_08] // LOGGED_DEFECTS
          </p>
          <h2 className="bugreports-title text-5xl md:text-7xl font-black font-display uppercase tracking-tight text-black inline-block border-b-8 border-[#00E5FF] pb-2">
            BUG REPORTS
          </h2>
        </div>

        {/* Bug Reports Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bug-reports-trigger">
          {bugReports.map((bug) => (
            <div
              key={bug.id}
              className="bug-report-card bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000000] hover:-translate-y-1 hover:shadow-[10px_10px_0px_#000000] transition-all flex flex-col justify-between text-left"
            >
              
              <div>
                {/* Header Row */}
                <div className="flex flex-wrap justify-between items-center gap-3 border-b-4 border-black pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#FF2D75] text-white border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                      <FaBug className="w-4 h-4 animate-bounce" />
                    </div>
                    <span className="font-mono font-black text-sm text-black">
                      {bug.id}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {/* Status Badge */}
                    <span className={`font-mono font-black text-xs px-2.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] ${
                      bug.status === "RESOLVED" ? "bg-green-500 text-white" : "bg-[#FFD600] text-black"
                    }`}>
                      {bug.status}
                    </span>
                    {/* Priority Badge */}
                    <span className="font-mono font-black text-xs bg-black text-white px-2.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                      {bug.priority}
                    </span>
                  </div>
                </div>

                {/* Bug Title */}
                <h3 className="font-display font-black text-xl md:text-2xl uppercase text-black mb-4 leading-tight">
                  {bug.title}
                </h3>

                {/* QA Environment Info Bar */}
                <div className="grid grid-cols-3 gap-2 bg-[#FAFAFA] border-2 border-black p-3 font-mono text-[10px] sm:text-xs mb-6 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center gap-1.5 border-r border-black/20 pr-1">
                    <FaServer className="text-gray-500 flex-shrink-0" />
                    <span className="truncate" title={bug.environment}>{bug.environment}</span>
                  </div>
                  <div className="flex items-center gap-1.5 border-r border-black/20 px-1">
                    <FaChrome className="text-gray-500 flex-shrink-0" />
                    <span className="truncate" title={bug.browser}>{bug.browser}</span>
                  </div>
                  <div className="flex items-center gap-1.5 pl-1">
                    <FaMobileAlt className="text-gray-500 flex-shrink-0" />
                    <span className="truncate" title={bug.device}>{bug.device}</span>
                  </div>
                </div>

                {/* Steps to Reproduce */}
                <div className="mb-6 border-2 border-black bg-gray-50 p-4 shadow-[2px_2px_0px_#000000]">
                  <span className="font-display font-black text-xs uppercase text-[#FF2D75] tracking-wider block mb-3">
                    STEPS TO REPRODUCE:
                  </span>
                  <ol className="list-decimal pl-4 space-y-2.5 font-mono text-xs md:text-sm text-gray-700">
                    {bug.steps.map((step, idx) => (
                      <li key={idx} className="pl-1">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Expected and Actual Result comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border-2 border-black bg-green-50 p-3 flex gap-2">
                    <FaCheckCircle className="text-green-600 w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-display font-black text-[9px] uppercase tracking-wider text-green-700 block">
                        EXPECTED BEHAVIOR
                      </span>
                      <p className="font-mono text-[11px] text-gray-700 mt-1 leading-normal">
                        {bug.expected}
                      </p>
                    </div>
                  </div>
                  <div className="border-2 border-black bg-red-50 p-3 flex gap-2">
                    <FaExclamationTriangle className="text-[#FF2D75] w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-display font-black text-[9px] uppercase tracking-wider text-red-700 block">
                        ACTUAL OUTCOME
                      </span>
                      <p className="font-mono text-[11px] text-gray-700 mt-1 leading-normal">
                        {bug.actual}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Severity Footer */}
              <div className="border-t-2 border-dashed border-gray-300 pt-4 flex justify-between items-center font-mono text-xs font-bold text-gray-500">
                <span>SEVERITY: <span className="text-[#FF2D75]">{bug.severity}</span></span>
                <span>BUG_VERIFICATION_PASS: {bug.status === "RESOLVED" ? "YES" : "NO"}</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
