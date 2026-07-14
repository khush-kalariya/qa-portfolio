import { useEffect, useRef } from "react";
import { 
  FaFileAlt, FaMap, FaDraftingCompass, FaPenNib, FaPlay, FaBug, FaSync, FaRedo, FaCloudUploadAlt, FaArrowRight 
} from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const workflowSteps = [
  {
    num: "01",
    title: "Requirement Analysis",
    icon: FaFileAlt,
    bg: "bg-[#FF2D75]",
    textColor: "text-white",
    desc: "Analyzing user stories, software requirements, and design specs to identify gaps, ambiguities, and testable requirements.",
  },
  {
    num: "02",
    title: "Test Planning",
    icon: FaMap,
    bg: "bg-[#FFD600]",
    textColor: "text-black",
    desc: "Defining scope, resources, automated vs. manual split, test environments, entry/exit criteria, and milestone scheduling.",
  },
  {
    num: "03",
    title: "Test Scenario Design",
    icon: FaDraftingCompass,
    bg: "bg-[#00E5FF]",
    textColor: "text-black",
    desc: "Mapping high-level end-to-end user paths, operational parameters, and risk-based validation flows.",
  },
  {
    num: "04",
    title: "Test Case Writing",
    icon: FaPenNib,
    bg: "bg-white",
    textColor: "text-black",
    desc: "Drafting micro-steps, positive/negative assertions, boundary parameters, preconditions, and expected outputs.",
  },
  {
    num: "05",
    title: "Test Execution",
    icon: FaPlay,
    bg: "bg-[#111111]",
    textColor: "text-white",
    desc: "Running manual suites, triggering local/CI automation rigs (Selenium, Cypress, Playwright), and inspecting console outputs.",
  },
  {
    num: "06",
    title: "Bug Reporting",
    icon: FaBug,
    bg: "bg-[#FF2D75]",
    textColor: "text-white",
    desc: "Filing high-quality bug cards with reproducible steps, logs, video capture, environments, and priority tags in Jira.",
  },
  {
    num: "07",
    title: "Retesting",
    icon: FaSync,
    bg: "bg-[#FFD600]",
    textColor: "text-black",
    desc: "Verifying fixed tickets in target environments using exact steps from bug report to ensure the issue is resolved.",
  },
  {
    num: "08",
    title: "Regression Testing",
    icon: FaRedo,
    bg: "bg-[#00E5FF]",
    textColor: "text-black",
    desc: "Executing complete smoke/regression suites to ensure new code fixes did not break pre-existing system behaviors.",
  },
  {
    num: "09",
    title: "Release & Sign-off",
    icon: FaCloudUploadAlt,
    bg: "bg-white",
    textColor: "text-black",
    desc: "Final QA sign-off reporting, production deployment smoke check, and live health sanity verification.",
  },
];

export default function Workflow() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    // GSAP ScrollTrigger Horizontal Pinning
    const scrollEl = scrollRef.current;
    const containerEl = containerRef.current;
    
    if (!scrollEl || !containerEl) return;

    const ctx = gsap.context(() => {
      const pinWidth = scrollEl.scrollWidth;
      const getScrollAmount = () => -(pinWidth - window.innerWidth);

      gsap.to(scrollEl, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: containerEl,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${pinWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Simple heading animation inside pinning
      gsap.fromTo(
        ".workflow-heading",
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", y: 30 },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerEl,
            start: "top 60%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} id="testing" className="relative bg-[#FAFAFA] border-b-4 border-black select-none">
      {/* Sticky Content Window */}
      <div className="h-screen w-full flex flex-col justify-between py-12 md:py-16 overflow-hidden relative brutal-grid">
        
        {/* Top Title Section */}
        <div className="px-6 md:px-12 flex justify-between items-end flex-shrink-0">
          <div className="text-left">
            <p className="font-mono text-sm font-bold uppercase tracking-widest text-[#FF2D75] mb-2">
              [SECTION_04] // THE_QA_CYCLE
            </p>
            <h2 className="workflow-heading text-4xl md:text-6xl font-black font-display uppercase tracking-tight text-black inline-block border-b-6 border-[#FFD600] pb-1">
              TESTING WORKFLOW
            </h2>
          </div>
          <span className="font-mono text-xs md:text-sm font-bold opacity-60 hidden sm:block">
            SCROLL DOWN FOR TIMELINE →
          </span>
        </div>

        {/* Scrolling Step Row */}
        <div className="flex-1 flex items-center">
          <div
            ref={scrollRef}
            className="flex items-center gap-8 pl-6 md:pl-12 pr-[15vw]"
            style={{ width: "max-content" }}
          >
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex items-center">
                  
                  {/* Step Card */}
                  <div className="w-80 md:w-96 bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000000] flex flex-col justify-between h-80 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_#000000] transition-all">
                    
                    {/* Top Row: Number and Icon */}
                    <div className="flex justify-between items-start">
                      <span className="font-display font-black text-4xl opacity-20">
                        {step.num}
                      </span>
                      <div className={`w-14 h-14 border-4 border-black flex items-center justify-center shadow-[3px_3px_0px_#000000] ${step.bg} ${step.textColor}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="my-6 text-left">
                      <h3 className="font-display font-black text-xl md:text-2xl uppercase mb-3 text-black">
                        {step.title}
                      </h3>
                      <p className="font-mono text-xs md:text-sm text-gray-700 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    {/* Bottom Status bar */}
                    <div className="font-mono text-[10px] text-gray-400 border-t-2 border-dashed border-gray-300 pt-2 flex justify-between uppercase">
                      <span>VERIFICATION_RUN</span>
                      <span>Ready for step</span>
                    </div>

                  </div>

                  {/* Connector Arrow (omit on last item) */}
                  {idx !== workflowSteps.length - 1 && (
                    <div className="mx-6 md:mx-8 flex flex-col items-center justify-center flex-shrink-0 text-black">
                      <FaArrowRight className="w-8 h-8 animate-pulse" />
                      <span className="font-mono text-[9px] uppercase font-black tracking-widest mt-1">NEXT</span>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar Info */}
        <div className="px-6 md:px-12 flex justify-between items-center text-xs font-mono opacity-50 flex-shrink-0">
          <span>PIPELINE_STATUS: SECURE</span>
          <span>CYCLE: REQUIREMENT → RELEASE</span>
        </div>

      </div>
    </div>
  );
}
