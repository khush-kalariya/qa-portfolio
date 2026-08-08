import { useRef } from "react";
import { FaArrowRight, FaMapMarkerAlt, FaDownload, FaBriefcase } from "react-icons/fa";
import BackgroundBugs from "./BackgroundBugs";
import heroPortrait from "../assets/khush_profile.jpg";

export default function Hero() {
  const handleScrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-36 pb-24 flex items-center justify-center brutal-grid overflow-hidden border-b-4 border-black"
    >
      {/* Decorative Floating Bugs in Background */}
      <BackgroundBugs count={7} />
      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">

        {/* ── LEFT COLUMN ── */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">

          {/* Role Badge Pill */}
          <div className="inline-flex self-start items-center gap-2 bg-[#FF2D75] text-white border-2 border-black px-4 py-2 mb-6 font-mono text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_#000000]">
            SOFTWARE QA ENGINEER &bull; MANUAL TESTER
          </div>

          {/* Big Split Name */}
          <div className="font-display font-black leading-none uppercase select-none mb-2">
            {/* First line – plain black */}
            <div className="text-5xl sm:text-6xl md:text-7xl text-black tracking-tight">
              <span className="inline-block hover:text-[#FF2D75] hover:-translate-y-1 transition-all duration-300 cursor-default">
                KHUSH
              </span>
            </div>
            {/* Second line – cyan highlight box */}
            <div className="mt-1">
              <span className="inline-block bg-[#00E5FF] border-4 border-black px-3 shadow-[6px_6px_0px_#000000] text-black text-5xl sm:text-6xl md:text-7xl tracking-tight transition-all duration-300 hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-[12px_12px_0px_#000000] hover:bg-[#FFD600] cursor-default">
                KALARIYA
              </span>
            </div>
          </div>


          {/* Bio Info Card */}
          <div className="bg-white border-4 border-black p-5 shadow-[5px_5px_0px_#000000] max-w-xl mb-8 mt-8 transition-all duration-300 hover:scale-[1.03] hover:shadow-[8px_8px_0px_#000000] cursor-default">
            <p className="font-mono text-xl text-gray-800 leading-relaxed">
              Manual QA Tester at{" "}
              <span className="bg-[#FFD600] px-1 font-black text-black">Peanut Square</span>.
              Based in{" "}
              <span className="bg-[#00E5FF] px-1 font-black text-black border border-black">Ahmedabad, Gujarat, India</span>.
            </p>
            <p className="font-mono text-xs text-gray-500 mt-2 leading-relaxed">
              Detail-obsessed tester dedicated to breaking software before your users do. Specializing in exploratory testing, test case design, and meticulous defect reporting.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-10">
            <button
              onClick={() => handleScrollTo("#contact")}
              className="brutal-btn-primary group flex items-center gap-2"
              data-magnetic
            >
              <span>LET'S TALK</span>
              <FaArrowRight />
            </button>
            <button
              onClick={() => handleScrollTo("#resume")}
              className="brutal-btn-secondary group flex items-center gap-2"
              data-magnetic
            >
              <FaDownload />
              <span>VIEW RESUME</span>
            </button>
          </div>

          {/* Stat Strip */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t-4 border-dashed border-black">
            <div>
              <div className="text-3xl sm:text-4xl font-black font-display text-[#FF2D75]">1+</div>
              <div className="text-xs font-mono uppercase font-bold text-gray-500 mt-0.5">Years Exp.</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black font-display text-[#00E5FF]">1k+</div>
              <div className="text-xs font-mono uppercase font-bold text-gray-500 mt-0.5">Cases Run</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black font-display text-[#FFD600]">100%</div>
              <div className="text-xs font-mono uppercase font-bold text-gray-500 mt-0.5">Bug Reports</div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="lg:col-span-5 flex flex-col gap-5 items-stretch">

          {/* Photo Frame — with small floating brutalist tags */}
          <div className="relative w-full group">

            {/* Floating Pinned Tag: Top-Right (Black - MANUAL QA) */}
            <div className="absolute -top-4 -right-3 z-20 bg-[#111111] text-white border-2 border-black px-3 py-1 text-xs font-mono font-black uppercase shadow-[3px_3px_0px_#000000] rotate-[4deg] pointer-events-none">
              MANUAL QA
            </div>

            {/* The flat shadow element that stays upright and changes to pink */}
            <div className="absolute inset-0 bg-black border-4 border-black translate-x-1.5 translate-y-1.5 transition-colors duration-300 group-hover:bg-[#FF2D75]" />

            {/* The main card that rotates on hover */}
            <div className="relative w-full p-4 bg-[#f0f0f0] border-4 border-black transition-all duration-300 group-hover:rotate-[-2deg] group-hover:-translate-x-1 group-hover:-translate-y-1 cursor-pointer">
              {/* Inner black bordered frame with yellow bg - 1:1 Perfect Square */}
              <div className="relative border-4 border-black overflow-hidden bg-[#FFD600] aspect-square w-full">
                <img
                  src={heroPortrait}
                  alt="Khush Kalariya QA Portrait"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Info Cards — stacked vertically with top margin gap */}
          <div className="flex flex-col gap-4 mt-6">

            {/* Status Card */}
            <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_#000000] text-left">
              <p className="font-mono text-[11px] font-bold uppercase text-gray-400 tracking-widest mb-1.5">STATUS</p>
              <div className="flex items-center gap-2 mb-1.5">
                <p className="font-display font-black text-sm md:text-2xl uppercase text-black leading-tight">WORKING AT</p>
              </div>
              <p className="font-mono text-xs md:text-lg text-gray-500">Peanut Square</p>
            </div>

            {/* Location Card */}
            <div className="bg-[#FFD600] border-4 border-black p-4 shadow-[4px_4px_0px_#000000] text-left">
              <p className="font-mono text-[11px] font-bold uppercase text-gray-700 tracking-widest mb-1.5">LOCATION</p>
              <div className="flex items-center gap-2 mb-1.5">
                <p className="font-display font-black text-sm md:text-2xl uppercase text-black leading-tight">AHMEDABAD, INDIA</p>
              </div>
              <p className="font-mono text-xs md:text-lg text-gray-700">Gujarat</p>
            </div>

          </div>

          {/* Track Record Card */}
          <div className="bg-[#00E5FF] border-4 border-black p-4 shadow-[4px_4px_0px_#000000] text-left">
            <p className="font-mono text-[9px] font-bold uppercase text-gray-700 tracking-widest mb-2">TRACK RECORD</p>
            <div className="flex items-center gap-3">
              <span className="text-4xl font-black font-display text-black">1k+</span>
              <div>
                <p className="font-display font-black text-lg uppercase text-black leading-tight">TEST CASES</p>
                <p className="font-mono text-xs text-gray-700">DESIGNED &amp; EXECUTED</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
