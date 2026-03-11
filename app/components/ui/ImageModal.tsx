"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";

interface ScreenshotItem {
  url: string;
  alt?: string;
}

interface ImageModalProps {
  screenshots: ScreenshotItem[];
  initialIndex: number;
  onClose: () => void;
}

const MIN_SCALE = 0.5;
const MAX_SCALE = 5;
const SCALE_STEP = 0.25;

export function ImageModal({ screenshots, initialIndex, onClose }: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [panBounds, setPanBounds] = useState({ maxX: 0, maxY: 0 });
  const dragStart = useRef({ x: 0, y: 0, translateX: 0, translateY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  const current = screenshots[currentIndex];
  const hasMultiple = screenshots.length > 1;

  const resetTransform = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    resetTransform();
  }, [initialIndex, resetTransform]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        setCurrentIndex((i) => (i <= 0 ? screenshots.length - 1 : i - 1));
        resetTransform();
      }
      if (e.key === "ArrowRight") {
        setCurrentIndex((i) => (i >= screenshots.length - 1 ? 0 : i + 1));
        resetTransform();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, screenshots.length, resetTransform]);

  const goPrev = () => {
    setCurrentIndex((i) => (i <= 0 ? screenshots.length - 1 : i - 1));
    resetTransform();
  };

  const goNext = () => {
    setCurrentIndex((i) => (i >= screenshots.length - 1 ? 0 : i + 1));
    resetTransform();
  };

  const zoomIn = () => setScale((s) => Math.min(s + SCALE_STEP, MAX_SCALE));
  const zoomOut = () => setScale((s) => Math.max(s - SCALE_STEP, MIN_SCALE));

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) setScale((s) => Math.min(s + SCALE_STEP, MAX_SCALE));
      else setScale((s) => Math.max(s - SCALE_STEP, MIN_SCALE));
    },
    []
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  const startDrag = useCallback(
    (clientX: number, clientY: number) => {
      if (scale <= 1) return;
      setIsDragging(true);
      dragStart.current = {
        x: clientX,
        y: clientY,
        translateX: translate.x,
        translateY: translate.y,
      };
    },
    [scale, translate]
  );

  const updateDrag = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging) return;
      const maxX = panBounds.maxX;
      const maxY = panBounds.maxY;
      const rawX = dragStart.current.translateX + clientX - dragStart.current.x;
      const rawY = dragStart.current.translateY + clientY - dragStart.current.y;
      setTranslate({
        x: Math.max(-maxX, Math.min(maxX, rawX)),
        y: Math.max(-maxY, Math.min(maxY, rawY)),
      });
    },
    [isDragging, panBounds]
  );

  const endDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handlePointerMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0]?.clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0]?.clientY : e.clientY;
      if (clientX !== undefined && clientY !== undefined) {
        updateDrag(clientX, clientY);
      }
    },
    [updateDrag]
  );

  const handlePointerEnd = useCallback(() => {
    endDrag();
  }, [endDrag]);

  useEffect(() => {
    if (isDragging) {
      const handleMove = (e: MouseEvent | TouchEvent) => {
        if ("touches" in e) {
          e.preventDefault();
        }
        handlePointerMove(e);
      };
      const handleEnd = () => handlePointerEnd();
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleMove, { passive: false });
      window.addEventListener("touchend", handleEnd);
      window.addEventListener("touchcancel", handleEnd);
      return () => {
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseup", handleEnd);
        window.removeEventListener("touchmove", handleMove);
        window.removeEventListener("touchend", handleEnd);
        window.removeEventListener("touchcancel", handleEnd);
      };
    }
  }, [isDragging, handlePointerMove, handlePointerEnd]);

  // Compute pan bounds from container and image dimensions
  useEffect(() => {
    const container = containerRef.current;
    const wrapper = imageWrapperRef.current;
    if (!container || !wrapper || scale <= 1) {
      setPanBounds({ maxX: 0, maxY: 0 });
      return;
    }
    const updateBounds = () => {
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      const iw = wrapper.clientWidth;
      const ih = wrapper.clientHeight;
      const scaledW = iw * scale;
      const scaledH = ih * scale;
      const maxX = Math.max(0, (scaledW - cw) / 2);
      const maxY = Math.max(0, (scaledH - ch) / 2);
      setPanBounds({ maxX, maxY });
    };
    updateBounds();
    const observer = new ResizeObserver(updateBounds);
    observer.observe(container);
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [scale, current?.url]);

  useEffect(() => {
    if (scale <= 1) {
      setTranslate({ x: 0, y: 0 });
    } else {
      setTranslate((t) => ({
        x: Math.max(-panBounds.maxX, Math.min(panBounds.maxX, t.x)),
        y: Math.max(-panBounds.maxY, Math.min(panBounds.maxY, t.y)),
      }));
    }
  }, [scale, panBounds]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-6 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-20 cursor-pointer rounded-full p-2 text-white/90 transition-colors hover:bg-white/20 hover:text-white focus:outline-none"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Zoom controls */}
      <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-lg bg-white/10 p-1.5 backdrop-blur-sm">
        <button
          type="button"
          onClick={zoomOut}
          disabled={scale <= MIN_SCALE}
          className="rounded-md p-2 text-white/90 transition-colors hover:bg-white/20 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Zoom out"
        >
          <ZoomOut className="h-5 w-5" />
        </button>
        <span className="min-w-[3rem] text-center text-sm font-medium text-white/90">
          {Math.round(scale * 100)}%
        </span>
        <button
          type="button"
          onClick={zoomIn}
          disabled={scale >= MAX_SCALE}
          className="rounded-md p-2 text-white/90 transition-colors hover:bg-white/20 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Zoom in"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
      </div>

      {/* Prev/Next */}
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full p-2 text-white/90 transition-colors hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full p-2 text-white/90 transition-colors hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </>
      )}

      {/* Image - full viewport, no scrollbars, drag + wheel */}
      <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col items-center justify-center overflow-hidden">
        <div
          ref={containerRef}
          className="relative flex h-[80vh] min-h-[400px] w-full max-w-6xl touch-none items-center justify-center overflow-hidden"
          style={{ cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
        >
          {current && (
            <div
              ref={imageWrapperRef}
              className="flex items-center justify-center select-none"
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                transformOrigin: "center center",
                transition: isDragging ? "none" : "transform 0.2s ease-out",
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              <Image
                src={current.url}
                alt={current.alt ?? "Project screenshot"}
                width={1920}
                height={1080}
                className="pointer-events-none max-h-[80vh] w-auto max-w-full object-contain"
                sizes="90vw"
                quality={95}
                unoptimized={current.url?.includes("supabase.co") ?? false}
                draggable={false}
              />
            </div>
          )}
        </div>

        {/* Dots */}
        {hasMultiple && (
          <div className="mt-4 flex shrink-0 items-center justify-center gap-2">
            {screenshots.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  resetTransform();
                }}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${currentIndex === idx ? "w-8 bg-sky-500" : "w-2 bg-slate-400 hover:bg-slate-300"
                  }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
