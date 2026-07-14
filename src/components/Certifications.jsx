import { useEffect, useRef, useState } from "react";
import { FaCertificate, FaCopy, FaCheck } from "react-icons/fa";
import { gsap } from "gsap";
import certBadge from "../assets/certification.png";

const certifications = [
  {
    name: "ISTQB Certified Tester (CTFL)",
    org: "ISTQB Testing Board",
    date: "Nov 2019",
    credId: "ISTQB-CTFL-99023",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    org: "Amazon Web Services (AWS)",
    date: "Jun 2022",
    credId: "AWS-CCP-109283",
  },
  {
    name: "Jira Software Certified Practitioner",
    org: "Atlassian Certification Program",
    date: "Mar 2023",
    credId: "ATL-JSP-77341",
  }
];

export default function Certifications() {
  const [copiedId, setCopiedId] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        ".certs-title",
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", y: 30 },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".certs-title",
            start: "top 85%",
          },
        }
      );

      // Cards stagger
      gsap.fromTo(
        ".cert-card",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".certs-grid-trigger",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="py-24 bg-[#FAFAFA] border-b-4 border-black relative brutal-dots"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-left">
          <p className="font-mono text-sm font-bold uppercase tracking-widest text-[#FF2D75] mb-2">
            [SECTION_10] // VERIFIED_CREDENTIALS
          </p>
          <h2 className="certs-title text-5xl md:text-7xl font-black font-display uppercase tracking-tight text-black inline-block border-b-8 border-[#FF2D75] pb-2">
            CERTIFICATIONS
          </h2>
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 certs-grid-trigger">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="cert-card bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000000] hover:-translate-y-2 hover:rotate-[-1deg] hover:shadow-[10px_10px_0px_#000000] transition-all flex flex-col justify-between text-left"
            >
              
              <div>
                {/* Badge Image Frame */}
                <div className="border-4 border-black bg-yellow-50 p-6 flex justify-center items-center mb-6 relative overflow-hidden h-44">
                  <img
                    src={certBadge}
                    alt="Certification Badge Graphic"
                    className="w-24 h-24 object-contain"
                  />
                  <div className="absolute top-2 right-2 w-7 h-7 bg-white border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                    <FaCertificate className="text-[#FF2D75] w-3.5 h-3.5 animate-pulse" />
                  </div>
                </div>

                {/* Cert Details */}
                <span className="font-mono text-[10px] font-black uppercase text-[#FF2D75] tracking-widest block mb-1">
                  {cert.org}
                </span>
                
                <h3 className="font-display font-black text-xl uppercase text-black leading-tight mb-4">
                  {cert.name}
                </h3>
              </div>

              {/* Bottom ID copy */}
              <div className="border-t-2 border-dashed border-gray-300 pt-4 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-gray-400">ISSUED: {cert.date}</span>
                  <span className="text-green-600 font-bold uppercase text-[10px]">VERIFIED ✓</span>
                </div>
                
                <div className="flex items-center justify-between bg-gray-50 border-2 border-black p-2 shadow-[2px_2px_0px_rgba(0,0,0,1)] mt-2">
                  <code className="text-xs text-black font-mono font-bold select-all truncate max-w-[170px]" title={cert.credId}>
                    {cert.credId}
                  </code>
                  <button
                    onClick={() => copyToClipboard(cert.credId)}
                    className="p-1.5 border-2 border-black bg-white hover:bg-[#00E5FF] active:bg-white text-black transition-colors"
                    title="Copy Credential ID"
                    aria-label="Copy credential ID to clipboard"
                  >
                    {copiedId === cert.credId ? (
                      <FaCheck className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <FaCopy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
