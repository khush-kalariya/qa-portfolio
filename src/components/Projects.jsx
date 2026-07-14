import { useEffect, useRef } from "react";
import { FaGithub, FaExternalLinkAlt, FaTools, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import { gsap } from "gsap";
import BackgroundBugs from "./BackgroundBugs";
import qashieldImg from "../assets/project_qashield.png";
import mockdeployImg from "../assets/project_mockdeploy.png";
import a11ywatchImg from "../assets/project_a11ywatch.png";

const projects = [
  {
    name: "TestMap - Manual Test Case Repository",
    image: qashieldImg,
    type: "Test Case Design & Management",
    desc: "A comprehensive test case repository and test plan architecture covering an enterprise e-commerce platform across functional, regression, and UAT scenarios.",
    responsibilities: [
      "Designed 500+ structured test cases in TestRail covering all major user flows, edge cases, and negative scenarios.",
      "Built module-wise regression test suites ensuring repeatable execution across releases without test case overlap.",
      "Coordinated with developers and product managers to align test coverage directly with new feature acceptance criteria."
    ],
    tools: ["TestRail", "Jira", "Confluence", "Figma"],
    challenge: "Maintaining test case relevance as product requirements shifted across 8 iterative sprints.",
    result: "Achieved full test coverage parity with acceptance criteria across 12 core modules, reducing UAT rejection rate by 60%.",
    githubLink: "#",
    liveLink: "#"
  },
  {
    name: "APIGuard - REST API Manual Verification",
    image: mockdeployImg,
    type: "API Validation & Data Integrity",
    desc: "A structured Postman collection suite for manual API verification, including functional endpoint testing, schema validation, and database state checks.",
    responsibilities: [
      "Built 200+ organized Postman request collections verifying API response status codes, payloads, and error handling paths.",
      "Cross-validated API transaction states against MySQL database records using SQL query scripts to detect data inconsistencies.",
      "Documented all API validation findings in Jira bug reports with detailed request/response logs as evidence attachments."
    ],
    tools: ["Postman", "SQL", "MySQL", "Jira", "Swagger"],
    challenge: "Verifying complex multi-step transaction flows where mid-chain failures caused cascading state inconsistencies.",
    result: "Identified 45+ critical data integrity bugs before deployment, ensuring zero downtime during API rollouts.",
    githubLink: "#",
    liveLink: "#"
  },
  {
    name: "A11yAudit - Accessibility Manual Audit",
    image: a11ywatchImg,
    type: "Accessibility & UI Compliance",
    desc: "A thorough manual WCAG 2.1 AA accessibility audit and UI compliance review of a public-facing SaaS dashboard product.",
    responsibilities: [
      "Executed screen-reader testing using NVDA and VoiceOver across key user flows to validate ARIA label accuracy.",
      "Manually audited color contrast ratios, keyboard navigation order, and focus indicator visibility against WCAG guidelines.",
      "Logged 80+ accessibility defects in Jira with WCAG criterion references, severity ratings, and visual evidence screenshots."
    ],
    tools: ["Chrome DevTools", "NVDA", "Jira", "Figma", "Lighthouse"],
    challenge: "Identifying dynamic component accessibility failures that only manifested under specific user interaction sequences.",
    result: "Enforced 100% compliance with WCAG 2.1 AA rules, enabling the product to pass an external accessibility certification audit.",
    githubLink: "#",
    liveLink: "#"
  }
];

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        ".projects-title",
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", y: 30 },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-title",
            start: "top 85%",
          },
        }
      );

      // Card staggered slide reveal
      gsap.fromTo(
        ".project-card-item",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".projects-grid-trigger",
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
      id="projects"
      className="py-24 bg-[#FAFAFA] border-b-4 border-black relative overflow-hidden brutal-grid"
    >
      <BackgroundBugs count={4} />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-left">
          <p className="font-mono text-sm font-bold uppercase tracking-widest text-[#FF2D75] mb-2">
            [SECTION_06] // VERIFIED_DELIVERABLES
          </p>
          <h2 className="projects-title text-5xl md:text-7xl font-black font-display uppercase tracking-tight text-black inline-block border-b-8 border-[#FFD600] pb-2">
            PORTFOLIO PROJECTS
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 projects-grid-trigger">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="project-card-item bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000000] hover:-translate-y-2 hover:rotate-[1deg] hover:shadow-[12px_12px_0px_#000000] transition-all flex flex-col justify-between"
            >
              
              {/* Project Image and Type badge */}
              <div>
                <div className="relative border-4 border-black mb-6 bg-gray-100 overflow-hidden h-48 sm:h-56">
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-[#FF2D75] text-white border-2 border-black px-2 py-0.5 font-mono text-[10px] font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)] uppercase">
                    {proj.type}
                  </div>
                </div>

                {/* Project Header */}
                <h3 className="font-display font-black text-xl md:text-2xl uppercase text-left text-black mb-3 leading-tight">
                  {proj.name}
                </h3>
                
                {/* Description */}
                <p className="font-mono text-xs md:text-sm text-gray-700 text-left mb-6 leading-relaxed">
                  {proj.desc}
                </p>

                {/* Responsibilities list */}
                <div className="mb-6 text-left border-t-2 border-dashed border-gray-300 pt-4">
                  <span className="font-display font-black text-xs uppercase text-[#FF2D75] tracking-wider mb-2 block">
                    QA RESPONSIBILITIES:
                  </span>
                  <ul className="list-disc pl-4 space-y-1.5 font-mono text-xs text-gray-600">
                    {proj.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx}>{resp}</li>
                    ))}
                  </ul>
                </div>

                {/* Challenge & Result Boxes */}
                <div className="space-y-3 mb-6 text-left">
                  {/* Challenge */}
                  <div className="border-2 border-black bg-orange-50 p-3 shadow-[2px_2px_0px_#000000] flex gap-2">
                    <FaExclamationTriangle className="text-orange-600 w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-display font-black text-[9px] uppercase tracking-wider text-orange-700 leading-none block">
                        CHALLENGE
                      </span>
                      <p className="font-mono text-xs text-gray-700 mt-1 leading-snug">
                        {proj.challenge}
                      </p>
                    </div>
                  </div>
                  {/* Result */}
                  <div className="border-2 border-black bg-[#00E5FF]/10 p-3 shadow-[2px_2px_0px_#000000] flex gap-2">
                    <FaCheckCircle className="text-teal-600 w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-display font-black text-[9px] uppercase tracking-wider text-teal-800 leading-none block">
                        VERIFIED RESULT
                      </span>
                      <p className="font-mono text-xs font-bold text-black mt-1 leading-snug">
                        {proj.result}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Tools tags and Buttons */}
              <div className="border-t-2 border-dashed border-gray-300 pt-4 flex flex-col gap-4">
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5">
                  <FaTools className="w-3.5 h-3.5 text-gray-500 mr-1 mt-0.5" />
                  {proj.tools.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-mono text-[10px] font-bold uppercase bg-gray-100 border border-black px-1.5 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href={proj.githubLink}
                    data-magnetic
                    className="brutal-btn-primary py-2 px-3 text-xs flex items-center justify-center gap-1.5 font-bold border-2"
                  >
                    <FaGithub />
                    <span>GITHUB</span>
                  </a>
                  <a
                    href={proj.liveLink}
                    data-magnetic
                    className="brutal-btn-secondary py-2 px-3 text-xs flex items-center justify-center gap-1.5 font-bold border-2"
                  >
                    <FaExternalLinkAlt />
                    <span>DEMO</span>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
