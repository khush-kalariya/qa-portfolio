import { useEffect, useRef } from "react";
import { 
  FaBug, FaHistory, FaFire, FaShieldAlt, FaDesktop, FaUserCheck, FaPuzzlePiece, 
  FaCompass, FaServer, FaDatabase, FaTasks, FaMobileAlt, FaClipboardList
} from "react-icons/fa";
import { 
  SiPostman, SiSwagger, SiMysql, 
  SiGooglechrome, SiJira, 
  SiGit, SiGithub, SiFigma, SiTestrail 
} from "react-icons/si";

const SiAzuredevops = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <title>Azure DevOps</title>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

import { gsap } from "gsap";

const skillCategories = [
  {
    title: "Manual QA Methods",
    bg: "bg-[#FF2D75]",
    textColor: "text-white",
    skills: [
      { name: "Functional Testing", icon: FaBug },
      { name: "Regression Testing", icon: FaHistory },
      { name: "Smoke Testing", icon: FaFire },
      { name: "Sanity Testing", icon: FaShieldAlt },
      { name: "UI/UX Testing", icon: FaDesktop },
      { name: "UAT Validation", icon: FaUserCheck },
      { name: "Integration Testing", icon: FaPuzzlePiece },
      { name: "Exploratory Testing", icon: FaCompass },
      { name: "Mobile Testing", icon: FaMobileAlt },
      { name: "Test Case Design", icon: FaClipboardList },
    ]
  },
  {
    title: "API & Data Integrity",
    bg: "bg-[#00E5FF]",
    textColor: "text-black",
    skills: [
      { name: "Postman (Manual)", icon: SiPostman },
      { name: "RESTful Web APIs", icon: FaServer },
      { name: "Swagger / OpenAPI", icon: SiSwagger },
      { name: "SQL Query Validation", icon: FaDatabase },
      { name: "MySQL / Databases", icon: SiMysql },
    ]
  },
  {
    title: "Browser & Dev Tools",
    bg: "bg-[#FFD600]",
    textColor: "text-black",
    skills: [
      { name: "Chrome DevTools", icon: SiGooglechrome },
      { name: "Figma (Spec Inspect)", icon: SiFigma },
    ]
  },
  {
    title: "Tracking & Control",
    bg: "bg-[#111111]",
    textColor: "text-white",
    skills: [
      { name: "Jira / Bugzilla", icon: SiJira },
      { name: "Azure DevOps", icon: SiAzuredevops },
      { name: "TestRail Case Mgmt", icon: FaTasks },
      { name: "Git Versioning", icon: SiGit },
      { name: "GitHub Repos", icon: SiGithub },
    ]
  }
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        ".skills-title",
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", y: 30 },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-title",
            start: "top 85%",
          },
        }
      );

      // Category box reveal
      gsap.fromTo(
        ".skills-category-box",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".skills-grid-trigger",
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
      id="skills"
      className="py-24 bg-[#FAFAFA] border-b-4 border-black relative brutal-dots"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-left">
          <p className="font-mono text-sm font-bold uppercase tracking-widest text-[#00E5FF] mb-2">
            [SECTION_03] // TECHNICAL_CAPABILITIES
          </p>
          <h2 className="skills-title text-5xl md:text-7xl font-black font-display uppercase tracking-tight text-black inline-block border-b-8 border-[#FF2D75] pb-2">
            MY SKILLS
          </h2>
        </div>

        {/* Categories Stack */}
        <div className="space-y-12 skills-grid-trigger">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skills-category-box bg-white border-4 border-black shadow-[6px_6px_0px_#000000] p-6 text-left"
            >
              {/* Category Header Banner */}
              <div className={`inline-block border-4 border-black px-4 py-2 font-display font-black text-lg md:text-xl uppercase tracking-wider mb-8 shadow-[3px_3px_0px_#000000] ${category.bg} ${category.textColor}`}>
                {category.title}
              </div>

              {/* Skills Card Items */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {category.skills.map((skill, sIndex) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={sIndex}
                      data-magnetic
                      className="group flex flex-col justify-between items-start bg-white border-4 border-black p-4 shadow-[4px_4px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000000] transition-all hover:bg-yellow-50 hover:border-black cursor-none"
                    >
                      <div className="w-10 h-10 border-2 border-black bg-[#FAFAFA] flex items-center justify-center mb-4 group-hover:bg-[#00E5FF] transition-colors">
                        <Icon className="w-5 h-5 text-black group-hover:rotate-6 transition-transform" />
                      </div>
                      <span className="font-display font-black text-sm uppercase text-black leading-tight">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Continuous Marquee helper at the end */}
        <div className="mt-20 overflow-hidden border-4 border-black bg-[#FFD600] py-4 relative rotate-[-1deg] shadow-[4px_4px_0px_#000000] select-none">
          <div className="flex w-[200%] animate-marquee whitespace-nowrap">
            {Array(4).fill([
              "MANUAL TESTING",
              "EXPLORATORY TESTING",
              "API VALIDATION",
              "REGRESSION CYCLES",
              "TEST CASE DESIGN",
              "BUG REPORTING",
              "UAT SIGN-OFF",
            ]).flat().map((text, i) => (
              <span key={i} className="text-black font-display font-black text-xl md:text-2xl uppercase tracking-wider mx-8 flex items-center gap-2">
                <span>✦</span> {text}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
