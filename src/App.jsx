import { useState, useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import core layout items
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Workflow from "./components/Workflow";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import TestCases from "./components/TestCases";
import BugReports from "./components/BugReports";
import Certifications from "./components/Certifications";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });

    // Synchronize Lenis scrolling with ScrollTrigger updates
    lenis.on("scroll", ScrollTrigger.update);

    // Bind Lenis with GSAP RequestAnimationFrame
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    // Manage overflow based on loader state
    if (isLoading) {
      lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis.start();
      document.body.style.overflow = "unset";
      // Force scrolltrigger recalculations on content load
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  return (
    <>
      {/* Noise filter background overlay */}
      <div className="noise-overlay" />

      {/* Pre-loader terminal screen */}
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      {/* Custom magnetic cursor */}
      <Cursor />

      {/* Top progress indicator bar */}
      <ScrollProgress />

      {/* Sticky header navigation */}
      <Navbar />

      {/* Page Sections */}
      <main className="w-full flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Workflow />
        <Experience />
        <Projects />
        <TestCases />
        <BugReports />
        <Certifications />
        <Resume />
        <Contact />
      </main>


      {/* Footer & Floating widgets */}
      <Footer />
      <BackToTop />
    </>
  );
}
