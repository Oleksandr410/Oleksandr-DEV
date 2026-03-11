"use client";

import { useKeenSlider, type KeenSliderOptions } from "keen-slider/react";
import {
  motion,
  type TargetAndTransition,
  type Transition,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { ReactNode, Children, isValidElement, useState, useEffect, useRef } from "react";
import "keen-slider/keen-slider.min.css";

interface MotionVariant {
  initial?: TargetAndTransition;
  animate?: TargetAndTransition;
  transition?: Transition;
}

interface KeenSliderProps {
  children: ReactNode;
  options?: KeenSliderOptions;
  className?: string;
  slideClassName?: string;
  motionVariants?: MotionVariant;
  withMotion?: boolean;
  showDots?: boolean;
  dotsClassName?: string;
  activeDotClassName?: string;
  /** Auto-advance slides (ms). Set to 0 or undefined to disable. */
  autoplay?: number;
  /** Show previous/next navigation buttons */
  showPrevNextButtons?: boolean;
  prevButtonClassName?: string;
  nextButtonClassName?: string;
}

export function KeenSlider({
  children,
  options = {
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
  },
  className = "",
  slideClassName = "keen-slider__slide cursor-grab active:cursor-grabbing",
  motionVariants,
  withMotion = false,
  showDots = false,
  dotsClassName = "flex items-center justify-center gap-2 mt-4",
  activeDotClassName = "w-8 h-2 bg-sky-500 rounded-full",
  autoplay,
  showPrevNextButtons = false,
  prevButtonClassName = "absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-md border border-slate-200/60 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500/50",
  nextButtonClassName = "absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-md border border-slate-200/60 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500/50",
}: KeenSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [ref, instanceRef] = useKeenSlider<HTMLDivElement>({
    ...options,
    initial: options?.initial ?? 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
      if (options?.slideChanged) {
        options.slideChanged(slider);
      }
    },
    created(instance) {
      setLoaded(true);
      if (options?.created) {
        options.created(instance);
      }
    },
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !instanceRef.current) return;
    const observer = new ResizeObserver(() => {
      instanceRef.current?.update();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [loaded]);

  // Autoplay: advance to next slide at interval
  useEffect(() => {
    if (!autoplay || autoplay <= 0 || !instanceRef.current) return;
    const slidesLength = instanceRef.current.track.details.slides.length;
    if (slidesLength <= 1) return;
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, autoplay);
    return () => clearInterval(interval);
  }, [autoplay, loaded]);

  const slides = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return (
        <div key={child.key || undefined} className={slideClassName}>
          {child}
        </div>
      );
    }
    return <div className={slideClassName}>{child}</div>;
  });

  const sliderContent = (
    <div ref={containerRef} className="w-full min-w-0 overflow-hidden">
      <div
        ref={ref}
        className={`keen-slider w-full overflow-hidden ${className}`}
        style={{ minWidth: 0 }}
      >
        {slides}
      </div>
    </div>
  );

  const dotsContent =
    showDots &&
      loaded &&
      instanceRef.current &&
      instanceRef.current.track.details.slides.length > 1 ? (
      <div className={dotsClassName}>
        {[...Array(instanceRef.current.track.details.slides.length).keys()].map(
          (idx) => (
            <button
              key={idx}
              onClick={() => {
                instanceRef.current?.moveToIdx(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${currentSlide === idx
                ? activeDotClassName
                : "w-2 bg-white hover:bg-slate-400"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          )
        )}
      </div>
    ) : null;

  const prevNextContent =
    showPrevNextButtons &&
      loaded &&
      instanceRef.current &&
      instanceRef.current.track.details.slides.length > 1 ? (
      <>
        <button
          type="button"
          onClick={() => instanceRef.current?.prev()}
          className={prevButtonClassName}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>
        <button
          type="button"
          onClick={() => instanceRef.current?.next()}
          className={nextButtonClassName}
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-slate-700" />
        </button>
      </>
    ) : null;

  if (withMotion && motionVariants) {
    return (
      <motion.div {...(motionVariants as React.ComponentProps<typeof motion.div>)} className="relative">
        {sliderContent}
        {prevNextContent}
        {dotsContent}
      </motion.div>
    );
  }

  return (
    <div className="relative">
      {sliderContent}
      {prevNextContent}
      {dotsContent}
    </div>
  );
}
