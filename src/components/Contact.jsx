import { useEffect, useRef, useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaLinkedin, FaGithub, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaTerminal } from "react-icons/fa";
import { gsap } from "gsap";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successLogs, setSuccessLogs] = useState([]);
  
  const sectionRef = useRef(null);
  const successRef = useRef(null);

  const mockSendLogs = [
    "📋 Initializing Jira ticket template: TYPE=INQUIRY...",
    "🔍 Validating sender metadata fields (name, email, subject)...",
    "📝 Assembling message payload as new Jira issue description...",
    "🚀 Dispatching contact request to alex.mercer inbox...",
    "✓ STATUS: 200 OK — Message received successfully (180ms)",
    "🎉 SUCCESS: Message delivered to Khush Kalariya!"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        ".contact-title",
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", y: 30 },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-title",
            start: "top 85%",
          },
        }
      );

      // Contact cards trigger stagger
      gsap.fromTo(
        ".contact-card-item",
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".contact-grid-trigger",
            start: "top 80%",
          },
        }
      );

      // Form card slide-in
      gsap.fromTo(
        ".contact-form-card",
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-form-card",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSuccessLogs([]);

    // 1. Simulate API call with staggered log outputs
    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < mockSendLogs.length) {
        setSuccessLogs((prev) => [...prev, mockSendLogs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setIsSubmitting(false);
        setIsSuccess(true);
        
        // 2. Play a GSAP pop-in animation on the success checkmark
        setTimeout(() => {
          gsap.fromTo(
            successRef.current,
            { scale: 0.6, opacity: 0, rotation: -30 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.45, ease: "back.out(1.7)" }
          );
        }, 100);
      }
    }, 400);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setIsSuccess(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setSuccessLogs([]);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 bg-[#FAFAFA] border-b-4 border-black relative overflow-hidden brutal-grid"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-left">
          <p className="font-mono text-sm font-bold uppercase tracking-widest text-[#FF2D75] mb-2">
            [SECTION_12] // DISPATCH_COMMUNICATION
          </p>
          <h2 className="contact-title text-5xl md:text-7xl font-black font-display uppercase tracking-tight text-black inline-block border-b-8 border-[#00E5FF] pb-2">
            CONTACT ME
          </h2>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6 contact-grid-trigger">
            
            {/* Title / Label */}
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase text-black mb-4">
              DIRECT CHANNELS
            </h3>

            {/* Email Card */}
            <a
              href="mailto:alex.mercer.qa@example.com"
              className="contact-card-item block bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000000] hover:bg-yellow-50 transition-all cursor-none"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border-3 border-black bg-[#FFD600] flex items-center justify-center text-black flex-shrink-0">
                  <FaEnvelope className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-display font-black text-xs uppercase text-gray-500">Email Address</span>
                  <p className="font-mono text-sm sm:text-base font-bold text-black truncate">alex.mercer.qa@example.com</p>
                </div>
              </div>
            </a>

            {/* Phone Card */}
            <a
              href="tel:+15550192831"
              className="contact-card-item block bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000000] hover:bg-[#00E5FF]/10 transition-all cursor-none"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border-3 border-black bg-[#00E5FF] flex items-center justify-center text-black flex-shrink-0">
                  <FaPhoneAlt className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-display font-black text-xs uppercase text-gray-500">Secure Direct Line</span>
                  <p className="font-mono text-sm sm:text-base font-bold text-black">+1 (555) 019-2831</p>
                </div>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="contact-card-item block bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000000] hover:bg-pink-50 transition-all cursor-none"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border-3 border-black bg-[#FF2D75] flex items-center justify-center text-white flex-shrink-0">
                  <FaLinkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-display font-black text-xs uppercase text-gray-500">LinkedIn Profile</span>
                  <p className="font-mono text-sm sm:text-base font-bold text-black">linkedin.com/in/khush-kalariya-qa</p>
                </div>
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="contact-card-item block bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000000] hover:bg-gray-100 transition-all cursor-none"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border-3 border-black bg-black flex items-center justify-center text-white flex-shrink-0">
                  <FaGithub className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-display font-black text-xs uppercase text-gray-500">GitHub Code Repos</span>
                  <p className="font-mono text-sm sm:text-base font-bold text-black">github.com/khush-kalariya-qa</p>
                </div>
              </div>
            </a>

            {/* Location Card */}
            <div className="contact-card-item bg-[#FAFAFA] border-4 border-black p-5 shadow-[4px_4px_0px_#000000]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border-3 border-black bg-white flex items-center justify-center text-black flex-shrink-0">
                  <FaMapMarkerAlt className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-display font-black text-xs uppercase text-gray-500">Base Coordinates</span>
                  <p className="font-mono text-sm sm:text-base font-bold text-black">San Francisco, CA (USA)</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form / Interactive Output */}
          <div className="lg:col-span-7 contact-form-card w-full bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000000] relative min-h-[460px] flex flex-col justify-between">
            
            {/* Pre-submission Form */}
            {!isSuccess && !isSubmitting && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-display font-black text-2xl uppercase text-black mb-6">
                  DISPATCH TEST RUN PAYLOAD
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <label htmlFor="form-name" className="font-mono text-xs font-bold text-black uppercase">Sender Name*</label>
                    <input
                      id="form-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-4 border-black px-4 py-2 font-mono text-sm focus:outline-none focus:bg-yellow-50 focus:shadow-[2px_2px_0px_#000000]"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  {/* Email */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <label htmlFor="form-email" className="font-mono text-xs font-bold text-black uppercase">Sender Email Address*</label>
                    <input
                      id="form-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border-4 border-black px-4 py-2 font-mono text-sm focus:outline-none focus:bg-yellow-50 focus:shadow-[2px_2px_0px_#000000]"
                      placeholder="e.g. john.doe@mail.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="form-subject" className="font-mono text-xs font-bold text-black uppercase">Subject (Option Header)</label>
                  <input
                    id="form-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="border-4 border-black px-4 py-2 font-mono text-sm focus:outline-none focus:bg-yellow-50 focus:shadow-[2px_2px_0px_#000000]"
                    placeholder="e.g. General Inquiry / Project Proposal"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="form-message" className="font-mono text-xs font-bold text-black uppercase">Message / Payload Body*</label>
                  <textarea
                    id="form-message"
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="border-4 border-black px-4 py-2 font-mono text-sm focus:outline-none focus:bg-yellow-50 focus:shadow-[2px_2px_0px_#000000]"
                    placeholder="Wrote details here..."
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  data-magnetic
                  className="brutal-btn-accent py-3 w-full border-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] text-sm flex items-center justify-center gap-2 font-black uppercase text-white hover:bg-black transition-all"
                >
                  <FaPaperPlane />
                  <span>DISPATCH_MESSAGE.EXE</span>
                </button>
              </form>
            )}

            {/* Simulated Live Logging screen */}
            {isSubmitting && (
              <div className="flex-1 flex flex-col justify-between font-mono bg-black text-[#00E5FF] p-6 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <div>
                  <div className="flex items-center gap-2 border-b border-[#00E5FF]/20 pb-2 mb-4">
                    <FaTerminal className="animate-pulse" />
                    <span className="text-[10px] font-black uppercase">LIVE TRANSACTION LOGS // POST RUN</span>
                  </div>
                  <div className="space-y-2 text-xs md:text-sm">
                    {successLogs.map((log, index) => (
                      <div key={index} className="leading-relaxed">
                        <span className={log.includes("✓") ? "text-[#FFD600]" : log.includes("🎉") ? "text-[#FF2D75]" : "text-[#00E5FF]"}>
                          {log}
                        </span>
                      </div>
                    ))}
                    <div className="animate-pulse text-white">▋</div>
                  </div>
                </div>
                <div className="text-[10px] opacity-50 uppercase text-right border-t border-[#00E5FF]/20 pt-2 mt-4">
                  DISPATCHING CONTACT FORM...
                </div>
              </div>
            )}

            {/* Success terminal verification */}
            {isSuccess && (
              <div
                ref={successRef}
                className="flex-1 flex flex-col justify-center items-center text-center p-6 bg-[#FAFAFA] border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]"
              >
                <div className="w-20 h-20 bg-green-500 text-white rounded-none border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,1)] mb-6">
                  <FaCheckCircle className="w-10 h-10" />
                </div>
                
                <h3 className="font-display font-black text-2xl uppercase text-black mb-2">
                  TEST RUN: PASSED!
                </h3>
                
                <div className="bg-black text-[#FFD600] font-mono text-xs p-3 border-2 border-black mb-6 max-w-sm">
                  <code>STATUS: 200 OK // EMAIL_DISPATCH: COMPLETE</code>
                </div>

                <p className="font-mono text-xs sm:text-sm text-gray-600 max-w-md mb-8 leading-relaxed">
                  Thank you! Your message payload has successfully resolved. Khush Kalariya will analyze details and respond within 24 operational hours.
                </p>

                <button
                  onClick={resetForm}
                  className="brutal-btn-primary py-2.5 px-6 border-4 shadow-[3px_3px_0px_rgba(0,0,0,1)] text-xs uppercase font-black"
                >
                  DISPATCH ANOTHER MESSAGE
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
