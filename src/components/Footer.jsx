import { FaGithub, FaLinkedin, FaTwitter, FaArrowUp, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-white border-t-8 border-black text-black select-none text-left relative z-10">
      {/* Top Footer Segment */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 border-b-4 border-black">

        {/* Large Typography Brand Column */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl sm:text-5xl font-black font-display uppercase tracking-tighter leading-none mb-4">
              KHUSH_KALARIYA<span className="w-4 h-4 bg-[#FF2D75] border-2 border-black inline-block ml-2 animate-ping"></span>
            </h2>
            <p className="font-mono text-xs sm:text-sm text-gray-500 max-w-sm leading-relaxed">
              Detail-obsessed Manual QA Engineer designing comprehensive test plans, executing exploratory testing cycles, and ensuring product quality through rigorous defect reporting.
            </p>
          </div>

          <div className="mt-8 font-mono text-[10px] text-gray-400 uppercase">
            STATUS: TEST CYCLES VERIFIED // ZERO BUG POLICY
          </div>
        </div>

        {/* Navigation Quick Links Column */}
        <div className="lg:col-span-3">
          <h4 className="font-display font-black text-sm uppercase text-black border-b-2 border-black pb-1 mb-4">
            SECTIONS
          </h4>
          <ul className="grid grid-cols-2 gap-2 font-mono text-xs font-bold uppercase">
            <li><a href="#home" className="hover:text-[#FF2D75] transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-[#FF2D75] transition-colors">About</a></li>
            <li><a href="#skills" className="hover:text-[#FF2D75] transition-colors">Skills</a></li>
            <li><a href="#experience" className="hover:text-[#FF2D75] transition-colors">Experience</a></li>
            <li><a href="#projects" className="hover:text-[#FF2D75] transition-colors">Projects</a></li>
            <li><a href="#testing" className="hover:text-[#FF2D75] transition-colors">Testing</a></li>
            <li><a href="#resume" className="hover:text-[#FF2D75] transition-colors">Resume</a></li>
            <li><a href="#contact" className="hover:text-[#FF2D75] transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Social / Copy Columns */}
        <div className="lg:col-span-3 flex flex-col justify-between items-start">
          <div>
            <h4 className="font-display font-black text-sm uppercase text-black border-b-2 border-black pb-1 mb-4">
              CHANNELS
            </h4>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                data-magnetic
                className="w-10 h-10 border-2 border-black bg-white hover:bg-[#FFD600] flex items-center justify-center text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_rgba(0,0,0,1)] transition-all"
                aria-label="GitHub Profile"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                data-magnetic
                className="w-10 h-10 border-2 border-black bg-white hover:bg-[#00E5FF] flex items-center justify-center text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_rgba(0,0,0,1)] transition-all"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                data-magnetic
                className="w-10 h-10 border-2 border-black bg-white hover:bg-[#FF2D75] hover:text-white flex items-center justify-center text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_rgba(0,0,0,1)] transition-all"
                aria-label="Twitter Profile"
              >
                <FaTwitter />
              </a>
              <a
                href="mailto:khush.kalariya.qa@example.com"
                data-magnetic
                className="w-10 h-10 border-2 border-black bg-white hover:bg-[#00E5FF] flex items-center justify-center text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_rgba(0,0,0,1)] transition-all"
                aria-label="Email Khush"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            data-magnetic
            className="mt-8 brutal-btn-primary py-2 px-4 text-xs font-black uppercase flex items-center gap-1.5 border-2 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] cursor-none"
          >
            <FaArrowUp />
            <span>BACK TO TOP</span>
          </button>
        </div>

      </div>

      {/* Large visual brand ticker */}
      <div className="overflow-hidden bg-[#111111] text-white py-3 border-b-4 border-black select-none">
        <div className="flex w-[200%] animate-marquee whitespace-nowrap">
          {Array(3).fill([
            "MANUAL_TESTING",
            "EXPLORATORY_QA",
            "BUG_TRACKING",
            "ZERO_BUG_POLICY",
            "TEST_PLAN_DESIGN",
            "UAT_SIGN_OFF",
          ]).flat().map((text, i) => (
            <span key={i} className="font-display font-black text-xs md:text-sm uppercase tracking-wider mx-10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#FF2D75] rounded-none rotate-45 inline-block"></span>
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="bg-[#FAFAFA] py-6 px-6 md:px-12 text-center flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-gray-500">
        <p>© {new Date().getFullYear()} KHUSH KALARIYA. HANDCRAFTED IN VITE + REACT. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-4">
          <span className="hover:text-[#FF2D75] cursor-none">ENVIRONMENT: PRODUCTION</span>
          <span>//</span>
          <span className="hover:text-[#00E5FF] cursor-none">SYSTEM_READY</span>
        </div>
      </div>

    </footer>
  );
}
