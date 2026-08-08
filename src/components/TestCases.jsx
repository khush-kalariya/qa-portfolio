import { useEffect, useState, useRef } from "react";
import { FaCheckCircle, FaTimesCircle, FaPlus, FaMinus, FaFilter } from "react-icons/fa";
import { gsap } from "gsap";
import BackgroundBugs from "./BackgroundBugs";

const testCases = [
  {
    id: "TC-AUTH-001",
    title: "Session Persistence on Page Refresh",
    requirement: "REQ-012: The application must store and persist the authenticated user session tokens across hard browser reloads.",
    scenario: "Verify session validation and header state persistence after reloading.",
    priority: "HIGH",
    severity: "CRITICAL",
    steps: [
      "Navigate to login URL and enter valid user credentials.",
      "Click Submit and verify dashboard page renders.",
      "Trigger browser page refresh (Command+R / F5).",
      "Assert authentication header still contains profile avatar and username."
    ],
    expected: "User session remains active. The header resolves and displays username 'Khush Kalariya'.",
    actual: "Session persisted. Header username remains 'Khush Kalariya'.",
    status: "PASS",
  },
  {
    id: "TC-CART-042",
    title: "Concurrent Coupon Code Reductions",
    requirement: "REQ-088: System must block user from stacking multiple high-value discount coupons concurrently.",
    scenario: "Verify discount calculations when sending stack discount requests sequentially.",
    priority: "CRITICAL",
    severity: "MAJOR",
    steps: [
      "Add item of value $100.00 to cart.",
      "Apply 20% discount coupon code 'SAVE20' and wait for request.",
      "Apply 30% discount coupon code 'DEAL30' concurrently via simulated API payload triggers.",
      "Assert total cart price discount is capped at single maximum coupon ($30.00)."
    ],
    expected: "Second coupon rejected. Cart applies maximum single coupon resulting in final price $70.00.",
    actual: "System stacked both coupon codes, resulting in 50% discount and final price $50.00.",
    status: "FAIL",
  },
  {
    id: "TC-CHECK-109",
    title: "Payment Card Fields Validation Errors",
    requirement: "REQ-105: UI forms must trigger direct validation warning tags for card expiration parameters in the past.",
    scenario: "Submit expired date inputs and verify inline validation error banner visibility.",
    priority: "MEDIUM",
    severity: "MINOR",
    steps: [
      "Select item and proceed to Checkout page.",
      "Input valid 16-digit credit card number.",
      "Input card expiry date as '06/23' (Expired).",
      "Assert inline warnings read: 'Card has expired'."
    ],
    expected: "Form submission is blocked. Warns inline: 'Card has expired' in red font color.",
    actual: "Warning banner popped up with text 'Card has expired' and form submission blocked.",
    status: "PASS",
  }
];

export default function TestCases() {
  const [filter, setFilter] = useState("ALL");
  const [expandedId, setExpandedId] = useState("TC-AUTH-001");
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        ".testcases-title",
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", y: 30 },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".testcases-title",
            start: "top 85%",
          },
        }
      );

      // List container trigger fade in
      gsap.fromTo(
        ".testcase-list-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".testcase-list-trigger",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredCases = testCases.filter((tc) => {
    if (filter === "ALL") return true;
    return tc.status === filter;
  });

  const toggleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="testcases-showcase"
      className="py-24 bg-[#FAFAFA] border-b-4 border-black relative brutal-grid"
    >
      <BackgroundBugs count={4} />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="text-left">
            <p className="font-mono text-sm font-bold uppercase tracking-widest text-[#FF2D75] mb-2">
              [SECTION_07] // REPLICABLE_EVIDENCE
            </p>
            <h2 className="testcases-title text-4xl md:text-6xl font-black font-display uppercase tracking-tight text-black inline-block border-b-8 border-[#FFD600] pb-2">
              TEST CASES
            </h2>
          </div>

          {/* Filters Banner */}
          <div className="flex items-center gap-2 border-4 border-black bg-white p-2 shadow-[4px_4px_0px_#000000] font-mono text-xs md:text-sm font-bold">
            <FaFilter className="text-gray-500 ml-1" />
            <span>FILTER:</span>
            {["ALL", "PASS", "FAIL"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 border-2 transition-colors ${
                  filter === f
                    ? f === "PASS"
                      ? "bg-green-500 text-white border-black"
                      : f === "FAIL"
                      ? "bg-[#FF2D75] text-white border-black"
                      : "bg-[#FFD600] text-black border-black"
                    : "border-transparent hover:bg-gray-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Test Cases Accordion Stack */}
        <div className="space-y-6 testcase-list-trigger text-left">
          {filteredCases.map((tc) => {
            const isExpanded = expandedId === tc.id;
            return (
              <div
                key={tc.id}
                className="testcase-list-item bg-white border-4 border-black shadow-[4px_4px_0px_#000000] transition-all hover:shadow-[6px_6px_0px_#000000]"
              >
                {/* Accordion Trigger Header */}
                <div
                  onClick={() => toggleExpand(tc.id)}
                  className="p-5 flex flex-wrap justify-between items-center gap-4 cursor-none select-none border-b-4 border-black bg-gray-50 hover:bg-yellow-50 transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono font-bold text-xs bg-black text-white px-2.5 py-1">
                      {tc.id}
                    </span>
                    <h3 className="font-display font-black text-lg md:text-xl uppercase text-black">
                      {tc.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                    {/* Priority Tag */}
                    <span className={`font-mono text-[10px] font-bold px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] ${
                      tc.priority === "CRITICAL" ? "bg-red-500 text-white" : tc.priority === "HIGH" ? "bg-orange-500 text-white" : "bg-[#FFD600] text-black"
                    }`}>
                      P: {tc.priority}
                    </span>
                    {/* Severity Tag */}
                    <span className={`font-mono text-[10px] font-bold px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] ${
                      tc.severity === "CRITICAL" ? "bg-red-700 text-white" : "bg-white text-black"
                    }`}>
                      S: {tc.severity}
                    </span>
                    {/* Status Badge */}
                    <span className={`font-mono font-bold text-xs px-3 py-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 ${
                      tc.status === "PASS" ? "bg-green-500 text-white" : "bg-[#FF2D75] text-white"
                    }`}>
                      {tc.status === "PASS" ? <FaCheckCircle /> : <FaTimesCircle />}
                      {tc.status}
                    </span>
                    {/* Expand Icon */}
                    <div className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center text-black ml-2 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                      {isExpanded ? <FaMinus className="w-3.5 h-3.5" /> : <FaPlus className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </div>

                {/* Collapsible Content */}
                {isExpanded && (
                  <div className="p-6 md:p-8 space-y-6">
                    {/* Requirement & Scenario Columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="border-3 border-black bg-gray-50 p-4">
                        <span className="font-display font-black text-xs uppercase text-[#FF2D75] tracking-wide block mb-2">
                          [REQUIREMENT_LINKED]
                        </span>
                        <p className="font-mono text-xs md:text-sm text-gray-700 leading-relaxed">
                          {tc.requirement}
                        </p>
                      </div>
                      <div className="border-3 border-black bg-gray-50 p-4">
                        <span className="font-display font-black text-xs uppercase text-[#00E5FF] tracking-wide block mb-2">
                          [TEST_SCENARIO]
                        </span>
                        <p className="font-mono text-xs md:text-sm text-gray-700 leading-relaxed">
                          {tc.scenario}
                        </p>
                      </div>
                    </div>

                    {/* Step-by-Step Test Procedure */}
                    <div className="border-3 border-black p-4">
                      <span className="font-display font-black text-xs uppercase text-black tracking-wide block mb-3">
                        EXECUTION_STEPS (MANUAL / AUTOMATED RUN)
                      </span>
                      <ol className="list-decimal pl-5 space-y-2.5 font-mono text-xs md:text-sm text-gray-700">
                        {tc.steps.map((step, idx) => (
                          <li key={idx} className="pl-1">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Expected and Actual Results Comparison */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border-t-2 border-dashed border-gray-300 pt-6">
                      <div className="bg-green-50/50 border-3 border-black p-4">
                        <span className="font-display font-black text-xs uppercase text-green-700 tracking-wide block mb-2">
                          EXPECTED_RESULT (SYSTEM SPEC)
                        </span>
                        <p className="font-mono text-xs md:text-sm text-gray-800 font-bold leading-relaxed">
                          {tc.expected}
                        </p>
                      </div>
                      <div className={`border-3 border-black p-4 ${
                        tc.status === "PASS" ? "bg-green-50/50" : "bg-red-50"
                      }`}>
                        <span className={`font-display font-black text-xs uppercase tracking-wide block mb-2 ${
                          tc.status === "PASS" ? "text-green-700" : "text-[#FF2D75]"
                        }`}>
                          ACTUAL_RESULT (OBSERVED STATE)
                        </span>
                        <p className="font-mono text-xs md:text-sm text-gray-800 font-bold leading-relaxed">
                          {tc.actual}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
