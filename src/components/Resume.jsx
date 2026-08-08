import { useEffect, useRef } from "react";
import { FaDownload, FaEye, FaFileSignature, FaUserCircle, FaBook, FaBriefcase, FaEnvelope, FaLink } from "react-icons/fa";
import { gsap } from "gsap";
import BackgroundBugs from "./BackgroundBugs";
import resumeFile from "../assets/resume.pdf";

export default function Resume() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        ".resume-title",
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", y: 30 },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".resume-title",
            start: "top 85%",
          },
        }
      );

      // Sheet preview reveal
      gsap.fromTo(
        ".resume-sheet",
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".resume-sheet",
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
      id="resume"
      className="py-24 bg-[#FAFAFA] border-b-4 border-black relative overflow-hidden brutal-grid"
    >
      <BackgroundBugs count={4} />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-left">
          <p className="font-mono text-sm font-bold uppercase tracking-widest text-[#FF2D75] mb-2">
            [SECTION_11] // PROFESSIONAL_DOSSIER
          </p>
          <h2 className="resume-title text-5xl md:text-7xl font-black font-display uppercase tracking-tight text-black inline-block border-b-8 border-[#FFD600] pb-2">
            MY RESUME
          </h2>
        </div>

        {/* Resume Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Editorial Sheet Preview */}
          <div className="lg:col-span-8 resume-sheet bg-white border-4 border-black p-6 sm:p-12 shadow-[8px_8px_0px_#000000] text-left relative overflow-hidden">
            
            {/* Sheet Accent Line */}
            <div className="absolute top-0 left-0 w-full h-4 bg-[#FFD600] border-b-4 border-black" />
            
            {/* Paper Header */}
            <div className="border-b-4 border-black pb-6 mb-8 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <h3 className="font-display font-black text-3xl sm:text-4xl text-black uppercase leading-none">
                  Khush Kalariya
                </h3>
                <p className="font-mono text-sm font-bold text-[#FF2D75] uppercase mt-2">
                  Manual QA Tester // Software Test Engineer
                </p>
              </div>
              <div className="font-mono text-xs text-gray-500 space-y-1 text-left sm:text-right">
                <p className="flex items-center sm:justify-end gap-1.5"><FaEnvelope /> khush.kalariya.qa@example.com</p>
                <p className="flex items-center sm:justify-end gap-1.5"><FaLink /> github.com/khush-kalariya-qa</p>
              </div>
            </div>

            {/* Paper Body */}
            <div className="space-y-8">
              {/* Summary Section */}
              <div>
                <h4 className="font-display font-black text-sm uppercase text-black bg-[#00E5FF] border-2 border-black px-2 py-0.5 inline-block shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-3">
                  Summary
                </h4>
                <p className="font-mono text-xs sm:text-sm text-gray-700 leading-relaxed font-bold">
                  Detail-obsessed Manual QA Tester with 1+ year of experience designing comprehensive test plans, executing functional and exploratory testing cycles, and tracking defect lifecycles through resolution. Proven track record of improving product quality through structured manual testing and API verification.
                </p>
              </div>

              {/* Work Experience Section */}
              <div>
                <h4 className="font-display font-black text-sm uppercase text-black bg-[#FF2D75] text-white border-2 border-black px-2 py-0.5 inline-block shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-4">
                  Experience
                </h4>
                <div className="space-y-6">
                  {/* Job 1 */}
                  <div>
                    <div className="flex justify-between items-start font-display font-black text-base md:text-lg">
                      <span className="uppercase">Manual QA Tester</span>
                      <span className="text-[#FF2D75] text-xs font-mono">2024 - PRESENT</span>
                    </div>
                    <p className="font-mono text-xs font-bold text-gray-500 uppercase leading-none mt-1">ApexFlow Systems</p>
                    <ul className="list-disc pl-4 mt-2.5 font-mono text-xs text-gray-600 space-y-1.5">
                      <li>Designed 400+ manual test cases and regression matrices in TestRail covering all critical user journeys.</li>
                      <li>Verified REST API endpoints manually via Postman; validated schemas, payloads, and error codes against Swagger specs.</li>
                    </ul>
                  </div>

                  {/* Job 2 */}
                  <div>
                    <div className="flex justify-between items-start font-display font-black text-base md:text-lg">
                      <span className="uppercase">QA Test Engineer</span>
                      <span className="text-[#FF2D75] text-xs font-mono">2021 - 2023</span>
                    </div>
                    <p className="font-mono text-xs font-bold text-gray-500 uppercase leading-none mt-1">PixelSecure Inc.</p>
                    <ul className="list-disc pl-4 mt-2.5 font-mono text-xs text-gray-600 space-y-1.5">
                      <li>Executed 600+ manual test cases for secure payment gateway modules across web and mobile platforms.</li>
                      <li>Identified 50+ critical pre-release defects and tracked full lifecycle in Jira and Azure DevOps.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Education & Certs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t-2 border-dashed border-gray-300 pt-6">
                <div>
                  <h4 className="font-display font-black text-sm uppercase text-black bg-[#FFD600] border-2 border-black px-2 py-0.5 inline-block shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-3">
                    Education
                  </h4>
                  <div className="font-mono text-xs text-gray-700">
                    <p className="font-bold text-black uppercase">B.S. in Computer Science</p>
                    <p className="text-gray-500">State Tech University</p>
                    <p className="opacity-70 mt-1">Graduated 2018 // GPA 3.7</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-display font-black text-sm uppercase text-black bg-white border-2 border-black px-2 py-0.5 inline-block shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-3">
                    Certifications
                  </h4>
                  <ul className="font-mono text-xs text-gray-700 space-y-1 font-bold">
                    <li>✓ ISTQB Foundation Level (CTFL)</li>
                    <li>✓ Jira Software Certified Practitioner</li>
                    <li>✓ AWS Cloud Practitioner</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Print Signoff footer */}
            <div className="border-t-4 border-black pt-4 mt-12 flex justify-between items-center font-mono text-[9px] text-gray-400 uppercase">
              <span>DOCUMENT_AUTHENTICITY_VERIFIED</span>
              <span>SIGNED: KHUSH KALARIYA</span>
            </div>

          </div>

          {/* Right Side: CTA Action Card */}
          <div className="lg:col-span-4 bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000000] text-left space-y-6">
            <h4 className="font-display font-black text-xl uppercase text-black">
              WANT A COPY?
            </h4>
            <p className="font-mono text-xs sm:text-sm text-gray-600 leading-relaxed">
              Download the print-ready PDF resume or view it directly in a separate clean view. Both copies are verified with active credentials.
            </p>

            <div className="flex flex-col gap-4">
              <a
                href={resumeFile}
                download="Khush_Kalariya_QA_Resume.pdf"
                className="brutal-btn-primary w-full py-3.5 text-sm uppercase flex items-center justify-center gap-2 border-4 shadow-[4px_4px_0px_#000000]"
                data-magnetic
              >
                <FaDownload className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>
              <a
                href={resumeFile}
                target="_blank"
                rel="noreferrer"
                className="brutal-btn-secondary w-full py-3.5 text-sm uppercase flex items-center justify-center gap-2 border-4 shadow-[4px_4px_0px_#000000]"
                data-magnetic
              >
                <FaEye className="w-4 h-4" />
                <span>View Resume</span>
              </a>
            </div>

            {/* QA Note Box */}
            <div className="border-2 border-black border-dashed p-4 bg-yellow-50/50 font-mono text-xs text-gray-500 leading-relaxed">
              <span className="font-bold text-black uppercase block mb-1">SYSTEM NOTE:</span>
              The PDF copy is formatted to pass Automated ATS resume parsers cleanly without structure layout loss.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
