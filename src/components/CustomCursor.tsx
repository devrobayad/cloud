import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Core coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Soft elastic trail effect
  const springConfig = { damping: 45, stiffness: 450, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if the current device has a touch selector
    const checkMobile = () => {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(isCoarse);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      if (!isVisible) {
        setIsVisible(true);
      }

      // Automatically detect interactive clickable target elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickableElement = 
          target.closest("a") || 
          target.closest("button") || 
          target.closest(".cursor-pointer") || 
          target.closest("input") || 
          target.closest("textarea") || 
          target.closest("select") ||
          target.closest("[role='button']") || 
          window.getComputedStyle(target).cursor === "pointer";
        
        setIsHovered(!!isClickableElement);
      }
    };

    const handleMouseDown = () => {
      setClicked(true);
    };

    const handleMouseUp = () => {
      setClicked(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isMobile || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Universal stylesheet injection for pointer hiding */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (pointer: fine) {
          body, a, button, select, input, textarea, [role="button"], .cursor-pointer {
            cursor: none !important;
          }
        }
      `}} />

      {/* 1. Outer Trail Ring */}
      <motion.div
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 2.5 : clicked ? 0.7 : 1.0,
          backgroundColor: isHovered ? "rgba(99, 102, 241, 0.15)" : "rgba(79, 70, 229, 0.0)",
          borderColor: isHovered ? "rgba(99, 102, 241, 0.9)" : "rgba(79, 70, 229, 0.5)",
          borderWidth: isHovered ? "1.5px" : "1.5px",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
        className="fixed w-7 h-7 rounded-full border border-indigo-600 pointer-events-none z-[99999] hidden sm:block shadow-sm"
      />

      {/* 2. Inner Precise Solid Pointer */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0.5 : clicked ? 0.7 : 1.0,
          backgroundColor: isHovered ? "rgb(99, 102, 241)" : "rgb(79, 70, 229)",
          opacity: isHovered ? 0.8 : 1.0,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
        className="fixed w-2 h-2 rounded-full pointer-events-none z-[100000] hidden sm:block shadow-sm"
      />
    </>
  );
}
