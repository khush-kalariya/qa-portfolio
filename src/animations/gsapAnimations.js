import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Standard Fade Up animation for cards/elements with ScrollTrigger
 */
export const animateFadeUp = (element, delay = 0) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 40,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

/**
 * Editorial Text reveal split animation (words / lines stagger)
 */
export const textReveal = (element, trigger = null) => {
  return gsap.fromTo(
    element,
    {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
      y: 50,
    },
    {
      clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
      y: 0,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: trigger || element,
        start: "top 90%",
      },
    }
  );
};

/**
 * Multi-element stagger animation
 */
export const animateStagger = (elements, startSelector = "top 85%") => {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: elements[0],
        start: startSelector,
      },
    }
  );
};

/**
 * Magnetic element effect
 */
export const applyMagneticEffect = (element, speed = 0.35) => {
  if (!element) return;
  
  const onMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    
    gsap.to(element, {
      x: x * speed,
      y: y * speed,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  
  const onMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };
  
  element.addEventListener("mousemove", onMouseMove);
  element.addEventListener("mouseleave", onMouseLeave);
  
  return () => {
    element.removeEventListener("mousemove", onMouseMove);
    element.removeEventListener("mouseleave", onMouseLeave);
  };
};

/**
 * Parallax profile card effect
 */
export const applyMouseParallax = (container, target, strength = 20) => {
  if (!container || !target) return;
  
  const onMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    
    gsap.to(target, {
      x: x * strength,
      y: y * strength,
      rotationY: x * 15,
      rotationX: -y * 15,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
    });
  };
  
  const onMouseLeave = () => {
    gsap.to(target, {
      x: 0,
      y: 0,
      rotationY: 0,
      rotationX: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  };
  
  container.addEventListener("mousemove", onMouseMove);
  container.addEventListener("mouseleave", onMouseLeave);
  
  return () => {
    container.removeEventListener("mousemove", onMouseMove);
    container.removeEventListener("mouseleave", onMouseLeave);
  };
};
