import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { applyMagneticEffect } from "../animations/gsapAnimations";

export default function Cursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    // Hide mouse cursor on standard desktop viewports
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Follow mouse coordinates
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Make primary cursor follow mouse instantly
      gsap.to(cursor, {
        x: mouse.x,
        y: mouse.y,
        duration: 0,
      });

      // Follower lags slightly
      gsap.to(follower, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Interactive Hover expansion effects
    const onMouseEnterLink = () => {
      // Scale up outer ring, change primary dot color
      gsap.to(cursor, {
        scale: 2.2,
        backgroundColor: "#00E5FF",
        duration: 0.2,
      });
      gsap.to(follower, {
        scale: 1.5,
        borderColor: "#FFD600",
        borderWidth: "4px",
        duration: 0.2,
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "#FF2D75",
        duration: 0.2,
      });
      gsap.to(follower, {
        scale: 1,
        borderColor: "#000000",
        borderWidth: "3px",
        duration: 0.2,
      });
    };

    // Magnetic Bindings: Find all buttons, links and elements marked with data-magnetic
    let cleanups = [];
    const updateMagneticBindings = () => {
      // Clean up previous listeners if any
      cleanups.forEach((cb) => cb());
      cleanups = [];

      const hoverables = document.querySelectorAll(
        "a, button, select, input, textarea, [role='button'], [data-magnetic]"
      );
      
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
        
        cleanups.push(() => {
          el.removeEventListener("mouseenter", onMouseEnterLink);
          el.removeEventListener("mouseleave", onMouseLeaveLink);
        });

        // Apply magnetic effect to elements that have data-magnetic or specific buttons
        if (el.hasAttribute("data-magnetic") || el.tagName === "BUTTON" || el.classList.contains("brutal-btn-primary") || el.classList.contains("brutal-btn-secondary") || el.classList.contains("brutal-btn-accent")) {
          const cleanupMagnetic = applyMagneticEffect(el, 0.3);
          if (cleanupMagnetic) {
            cleanups.push(cleanupMagnetic);
          }
        }
      });
    };

    // Initial binding
    updateMagneticBindings();

    // Re-bind when the DOM updates (since components mount dynamically)
    const observer = new MutationObserver(updateMagneticBindings);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cleanups.forEach((cb) => cb());
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Small active cursor dot */}
      <div
        ref={cursorRef}
        className="custom-cursor pointer-events-none fixed top-0 left-0 hidden md:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      {/* Lagging outer follower ring */}
      <div
        ref={followerRef}
        className="custom-cursor-follower pointer-events-none fixed top-0 left-0 hidden md:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}
