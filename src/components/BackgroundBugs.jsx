import { useEffect, useRef } from "react";
import { FaBug } from "react-icons/fa";
import { gsap } from "gsap";

export default function BackgroundBugs({ count = 4, onBugClick }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const bugs = containerRef.current.querySelectorAll(".floating-bug");
    const tweens = [];

    bugs.forEach((bug) => {
      let currentX = 0;
      let currentY = 0;

      const wander = () => {
        if (!bug || bug.dataset.killed === "true") return;

        // Choose a random target displacement
        const targetX = (Math.random() - 0.5) * 350;
        const targetY = (Math.random() - 0.5) * 200;

        // Compute movement vector
        const deltaX = targetX - currentX;
        const deltaY = targetY - currentY;
        
        // Calculate rotation angle (+90 to align FaBug pointing upwards)
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;

        // Random crawl duration and pause delay
        const duration = 3.5 + Math.random() * 3.5;
        const pauseDelay = 0.5 + Math.random() * 1.5;

        // Turn towards the destination first
        const rotateTween = gsap.to(bug, {
          rotation: angle,
          duration: 0.5,
          ease: "power1.out",
          onComplete: () => {
            if (bug.dataset.killed === "true") return;
            // Crawl to the destination
            const moveTween = gsap.to(bug, {
              x: targetX,
              y: targetY,
              duration: duration,
              ease: "sine.inOut",
              onComplete: () => {
                currentX = targetX;
                currentY = targetY;
                
                // Pause, then wander again
                if (bug.dataset.killed === "true") return;
                const delayCall = gsap.delayedCall(pauseDelay, wander);
                tweens.push(delayCall);
              }
            });
            tweens.push(moveTween);
          }
        });
        tweens.push(rotateTween);
      };

      // Start wandering with a random initial offset to stagger the movements
      const initDelay = Math.random() * 2;
      const startCall = gsap.delayedCall(initDelay, wander);
      tweens.push(startCall);
    });

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  const handleBugClick = (event) => {
    const bugEl = event.currentTarget;
    if (bugEl.dataset.killed === "true") return;
    bugEl.dataset.killed = "true";

    // Trigger parent squish callback if present
    if (onBugClick) onBugClick();

    // Kill any wandering animations for this bug
    gsap.killTweensOf(bugEl);

    // Get current animated position
    const x = gsap.getProperty(bugEl, "x");
    const y = gsap.getProperty(bugEl, "y");

    // Create a fun neobrutalist splat text element
    const splat = document.createElement("div");
    splat.innerText = "SPLAT!";
    splat.style.position = "absolute";
    splat.style.top = bugEl.style.top;
    splat.style.left = bugEl.style.left;
    splat.style.right = bugEl.style.right;
    splat.style.bottom = bugEl.style.bottom;
    
    // Position the splat exactly over the bug
    gsap.set(splat, {
      x: x,
      y: y,
      scale: 0.5,
      opacity: 0,
      color: "#FF2D75",
      backgroundColor: "#000000",
      border: "2px solid #000000",
      padding: "2px 6px",
      fontWeight: "900",
      fontFamily: "monospace",
      fontSize: "11px",
      boxShadow: "2px 2px 0px #000000",
      pointerEvents: "none",
      zIndex: 100
    });
    
    bugEl.parentElement.appendChild(splat);

    // Animate the splat pop-up
    gsap.to(splat, {
      scale: 1.1,
      opacity: 1,
      y: y - 25,
      rotation: (Math.random() - 0.5) * 20, // slight random tilt
      duration: 0.3,
      ease: "back.out(2)",
      onComplete: () => {
        gsap.to(splat, {
          opacity: 0,
          y: y - 45,
          duration: 0.5,
          delay: 0.4,
          onComplete: () => splat.remove()
        });
      }
    });

    // Squish the bug: rotate sideways, turn bright red, flatten scaleY, expand scaleX
    gsap.to(bugEl, {
      rotation: "+=90", 
      color: "#EF4444", 
      opacity: 0.9,
      scaleX: 1.4,
      scaleY: 0.2, 
      duration: 0.15,
      ease: "power2.out",
      onComplete: () => {
        // Dissolve the squished bug
        gsap.to(bugEl, {
          opacity: 0,
          scaleX: 0,
          scaleY: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.in",
          onComplete: () => {
            bugEl.style.display = "none";
          }
        });
      }
    });
  };

  // Predefined starting coordinates with increased opacity (40-45% / black 20%)
  const positions = [
    { top: "12%", left: "5%", color: "text-[#FF2D75]/40", size: "w-12 h-12" },
    { top: "28%", left: "8%", color: "text-[#00E5FF]/40", size: "w-10 h-10" },
    { bottom: "20%", left: "4%", color: "text-[#FFD600]/45", size: "w-14 h-14" },
    { top: "10%", left: "45%", color: "text-black/20", size: "w-16 h-16", onlyLg: true },
    { top: "48%", left: "52%", color: "text-[#FF2D75]/40", size: "w-12 h-12", onlyLg: true },
    { top: "12%", right: "6%", color: "text-[#FFD600]/45", size: "w-11 h-11" },
    { bottom: "18%", right: "8%", color: "text-[#00E5FF]/40", size: "w-13 h-13" }
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none select-none z-30">
      {positions.slice(0, count).map((pos, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            top: pos.top,
            left: pos.left,
            right: pos.right,
            bottom: pos.bottom,
          }}
          className={`${pos.color} ${pos.onlyLg ? "hidden lg:block" : "hidden md:block"} floating-bug pointer-events-auto cursor-pointer p-4`}
          onClick={handleBugClick}
        >
          <FaBug className={pos.size} />
        </div>
      ))}
    </div>
  );
}
