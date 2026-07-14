import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import BackgroundBugs from "./BackgroundBugs";

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const barRef = useRef(null);
  const logContainerRef = useRef(null);
  const progressTextRef = useRef(null);
  const [squashCount, setSquashCount] = useState(0);

  const handleSquash = () => {
    setSquashCount((prev) => prev + 1);
  };

  const mockLogs = [
    "🚀 Starting QA Portfolio Engine...",
    "📦 Loading test planning suite & templates...",
    "🔍 Scanning code directory for defects...",
    "🐛 WARNING: 5 critical bugs detected in UI layout!",
    "🛠️ Launching auto-debugger...",
    "🔨 Squashing overlapping text bug... FIXED! (0ms)",
    "🔨 Resolving unresponsive navigation link... FIXED! (15ms)",
    "🐛 WARNING: 2 test execution scripts failed!",
    "🛠️ Restoring fallback mock services...",
    "✓ API Response validation (Postman): PASS (200 OK)",
    "✓ Cross-browser responsive checks: PASS",
    "🎉 All manual verification test runs passed!",
    "🔒 Environment stabilized and ready!"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Stagger logs display
      const logLines = logContainerRef.current.children;
      gsap.fromTo(
        logLines,
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.15,
          stagger: 0.15,
          ease: "power1.out",
        }
      );

      // 2. Animate the progress bar width and update percentage text
      gsap.to(barRef.current, {
        width: "100%",
        duration: 2.2,
        ease: "power2.inOut",
        onUpdate: function() {
          const progress = Math.round(this.progress() * 100);
          if (progressTextRef.current) {
            progressTextRef.current.innerText = `SYSTEM READY ${progress}%`;
          }
        }
      });

      // 3. Scale and rotate letters of "QA TESTER"
      const titleLetters = textRef.current.children;
      gsap.fromTo(
        titleLetters,
        { opacity: 0, y: 50, rotate: -20 },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.7)",
        }
      );

      // 4. Slide up out of view
      const tl = gsap.timeline({
        delay: 2.5,
        onComplete: onComplete,
      });

      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#FAFAFA] text-black z-[99999] flex flex-col justify-between p-6 md:p-12 border-b-8 border-black font-mono select-none overflow-hidden brutal-grid"
    >
      {/* Interactive bugs on the loading screen! */}
      <BackgroundBugs count={4} onBugClick={handleSquash} />

      {/* Top Header */}
      <div className="flex justify-between items-center border-b-4 border-black pb-4 relative z-10">
        <span className="font-bold text-lg md:text-xl uppercase tracking-wider flex items-center gap-2">
          <span className="w-4 h-4 bg-[#FF2D75] border-2 border-black inline-block animate-pulse"></span>
          QA_SYSTEM_VERIFICATION.exe
        </span>
        <div className="flex items-center gap-3">
          {squashCount > 0 && (
            <span className="text-xs font-bold bg-[#FF2D75] text-white px-2 py-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] animate-bounce">
              💥 BUGS SQUASHED: {squashCount}
            </span>
          )}
          <span className="text-xs md:text-sm font-semibold opacity-70 bg-[#00E5FF] px-2 py-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            V1.0.0-PROD
          </span>
        </div>
      </div>

      {/* Main Terminal Screen */}
      <div className="flex-1 my-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side: Huge Title */}
        <div className="flex flex-col justify-center">
          <h1
            ref={textRef}
            className="text-6xl sm:text-7xl lg:text-9xl font-black font-display uppercase tracking-tight flex flex-wrap"
          >
            {"QA TESTER".split("").map((char, index) => (
              <span key={index} className="inline-block hover:text-[#FF2D75]">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          <p className="text-[#FF2D75] font-bold text-lg md:text-2xl mt-4 flex items-center gap-2">
            <span>[+]</span> Loading Portfolio...
          </p>
        </div>

        {/* Right Side: Mock test runner outputs */}
        <div
          ref={logContainerRef}
          className="bg-black text-[#00E5FF] border-4 border-black p-4 rounded-none h-64 md:h-80 overflow-y-auto shadow-[8px_8px_0px_#000000] text-xs sm:text-sm"
        >
          {mockLogs.map((log, i) => (
            <div key={i} className="mb-2 leading-relaxed font-mono">
              <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span>{" "}
              <span className={log.includes("🐛") ? "text-[#FF2D75] font-bold" : log.includes("✓") || log.includes("🎉") ? "text-[#FFD600]" : "text-[#00E5FF]"}>
                {log}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="border-t-4 border-black pt-6 flex flex-col gap-2 relative z-10">
        <div className="flex justify-between font-bold text-sm md:text-base">
          <span>PROGRESS</span>
          <span ref={progressTextRef}>SYSTEM READY 0%</span>
        </div>
        <div className="w-full bg-gray-200 border-4 border-black h-8 relative flex items-center overflow-hidden">
          <div
            ref={barRef}
            className="h-full bg-[#FFD600] w-0 border-r-4 border-black"
          ></div>
          <span className="absolute left-1/2 -translate-x-1/2 font-black text-black z-10 select-none mix-blend-difference text-sm sm:text-base">
            STABILIZING ENVIRONMENT
          </span>
        </div>
      </div>
    </div>
  );
}
