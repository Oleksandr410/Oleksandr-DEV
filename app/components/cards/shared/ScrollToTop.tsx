"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const updateScrollProgress = () => {
      const currentScrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollableHeight = documentHeight - windowHeight;

      // Calculate scroll progress (0 to 1)
      const progress =
        scrollableHeight > 0 ? currentScrollY / scrollableHeight : 0;
      setScrollProgress(progress);

      // Show button when scrolled down more than 50px
      // Hide only when at the top (not when scrolling up)
      if (currentScrollY > 50) {
        setIsVisible(true);
      } else if (currentScrollY <= 0) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
      rafId = null;
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateScrollProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Circle circumference: 2 * π * r = 2 * π * 10 ≈ 62.83
  const circleRadius = 11;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - circumference * scrollProgress;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-[140px] right-[35px] sm:bottom-[170px] sm:right-20 z-90 w-12 h-12 sm:w-14 sm:h-14 bg-transparent rounded-full flex items-center justify-center group transition-all duration-300 ease-in-out ${isVisible
        ? "opacity-100 translate-y-0 pointer-events-auto"
        : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      aria-label="Scroll to top"
    >
      <svg
        className="w-full h-full"
        fill="none"
        stroke="#0284c7"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        {/* Progress circle */}
        <circle
          cx="12"
          cy="12"
          r={circleRadius}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 12 12)"
          strokeWidth="1"
          style={{
            transition: "stroke-dashoffset 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        {/* Up arrow icon */}
        <path
          d="M12 15V9M9 12l3-3 3 3"
          stroke="#0284c7"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </button>
  );
}
