import { useEffect, useRef } from "react";
import { FaCalendarAlt, FaBuilding, FaBullseye } from "react-icons/fa";
import { gsap } from "gsap";
import BackgroundBugs from "./BackgroundBugs";

const experiences = [
  {
    role: "Manual QA Tester",
    company: "ApexFlow Systems",
    duration: "Jan 2024 - Present",
    desc: "Leading comprehensive manual testing strategies for cloud-based workflow management platforms. Owning test plan architecture, exploratory audits, and cross-team defect reporting.",
    bullets: [
      "Designed end-to-end test plans and test case matrices covering 400+ functional, regression, and edge-case scenarios in TestRail.",
      "Executed structured exploratory testing sessions, uncovering 60+ critical bugs across UI workflows and API response inconsistencies.",
      "Verified REST API endpoints manually via Postman, validating request/response schemas, status codes, and payload accuracy.",
      "Triaged and tracked bugs through the full lifecycle in Jira, collaborating directly with developers on root cause analysis and priority escalation."
    ],
    tech: ["Postman", "TestRail", "Jira", "SQL", "Chrome DevTools", "Figma"],
    achievements: "Contributed to a 40% reduction in production-reported bugs through rigorous pre-release exploratory and regression cycles."
  },
  {
    role: "QA Test Engineer",
    company: "PixelSecure Inc.",
    duration: "Jun 2021 - Dec 2023",
    desc: "Executed comprehensive manual test campaigns for secure payment gateway products. Conducted cross-platform audits and accessibility checks on web and mobile interfaces.",
    bullets: [
      "Authored and maintained 600+ detailed manual test cases in TestRail covering functional, regression, UAT, and exploratory scenarios.",
      "Verified API request/response payloads and database transaction states manually using Postman and SQL queries in MySQL.",
      "Performed cross-browser and cross-device compatibility checks on Chrome, Firefox, Safari, and mobile emulators.",
      "Managed complete bug report tracking, ticket prioritizations, and release sign-offs in Jira and Azure DevOps."
    ],
    tech: ["TestRail", "Jira", "SQL", "Postman", "Chrome DevTools", "Azure DevOps"],
    achievements: "Identified 50+ critical payment data integrity defects before release, preventing data exposure risks."
  },
  {
    role: "Junior QA Tester",
    company: "InnoTech Solutions",
    duration: "Mar 2019 - May 2021",
    desc: "Designed and executed manual regression and smoke test runs. Monitored test environments, analyzed database states, and logged bugs through full defect reporting cycles.",
    bullets: [
      "Created 300+ manual test cases in TestRail, documenting test scenarios and expected results for core retail features.",
      "Performed smoke, regression, sanity, and UAT verification tests across staging and production environments.",
      "Validated API responses and verified correct database record updates using Postman and SQL query scripts.",
      "Filed and tracked 200+ defect reports in Bugzilla and Jira with detailed reproduction steps and severity classifications."
    ],
    tech: ["TestRail", "Bugzilla", "Jira", "Postman", "MySQL", "Git"],
    achievements: "Discovered and filed 280+ high-severity bugs, preventing major UI logic malfunctions from reaching production."
  }
];

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        ".experience-title",
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", y: 30 },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".experience-title",
            start: "top 85%",
          },
        }
      );

      // Timeline items slide/fade reveal
      const items = gsap.utils.toArray(".timeline-item");
      items.forEach((item, index) => {
        const direction = index % 2 === 0 ? -40 : 40;
        gsap.fromTo(
          item,
          { opacity: 0, x: direction },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-24 bg-[#FAFAFA] border-b-4 border-black relative overflow-hidden brutal-grid"
    >
      <BackgroundBugs count={4} />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-left">
          <p className="font-mono text-sm font-bold uppercase tracking-widest text-[#FF2D75] mb-2">
            [SECTION_05] // CAREER_CHRONOLOGY
          </p>
          <h2 className="experience-title text-5xl md:text-7xl font-black font-display uppercase tracking-tight text-black inline-block border-b-8 border-[#00E5FF] pb-2">
            EXPERIENCE
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-4 border-black pl-6 md:pl-12 ml-4 md:ml-12 space-y-16">
          
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="timeline-item relative text-left"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[30px] md:-left-[54px] top-1.5 w-6 h-6 rounded-none bg-[#FFD600] border-4 border-black rotate-45 shadow-[2px_2px_0px_#000000] z-20" />

              {/* Experience Card */}
              <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000000] hover:-translate-y-1 hover:shadow-[10px_10px_0px_#000000] transition-all relative">
                
                {/* Meta details banner */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-black pb-4 mb-6">
                  <div>
                    <h3 className="font-display font-black text-2xl md:text-3xl text-black uppercase">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 font-mono text-sm font-bold mt-1 text-[#FF2D75]">
                      <FaBuilding className="flex-shrink-0" />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs md:text-sm bg-[#00E5FF] text-black border-2 border-black px-3 py-1 font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <FaCalendarAlt className="flex-shrink-0" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-800 font-medium text-base mb-6 leading-relaxed">
                  {exp.desc}
                </p>

                {/* Bullet Points */}
                <div className="mb-6 space-y-3">
                  <h4 className="font-display font-black text-sm uppercase text-black">
                    CORE RESPONSIBILITIES:
                  </h4>
                  <ul className="list-none space-y-2.5 font-mono text-xs md:text-sm text-gray-700 pl-4">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="relative before:content-['✓'] before:absolute before:-left-5 before:text-green-600 before:font-bold">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Achievements Box */}
                <div className="border-4 border-black bg-yellow-50 p-4 mb-6 flex items-start gap-3 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                  <FaBullseye className="text-[#FF2D75] w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-display font-black text-xs uppercase text-[#FF2D75] block">
                      KEY ACHIEVEMENT
                    </span>
                    <p className="font-mono text-xs md:text-sm font-bold text-black mt-0.5">
                      {exp.achievements}
                    </p>
                  </div>
                </div>

                {/* Tech Used Tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t-2 border-dashed border-gray-300">
                  {exp.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-mono text-xs font-bold uppercase bg-gray-100 border-2 border-black px-2.5 py-0.5 rounded-none"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
