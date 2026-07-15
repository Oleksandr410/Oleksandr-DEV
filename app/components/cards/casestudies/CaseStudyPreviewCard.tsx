"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import type { CaseStudyRow, ScreenshotItem } from "@/libs/supabase/types";

function stripMarkdown(md: string): string {
  return md
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .replace(/^#+\s*/gm, "")
    .replace(/^[-*]\s+/gm, "")
    .replace(/\n+/g, " ")
    .trim();
}

function getCoverImageUrl(screenshots: ScreenshotItem[] | null): string | null {
  if (!screenshots?.length) return null;
  return screenshots[0]?.url ?? null;
}

function getDetailHref(study: CaseStudyRow): string {
  if (study.slug) return `/case-studies/${study.slug}`;
  return `/case-studies/${study.id}`;
}

function getScrollAxis(
  imageWidth: number,
  imageHeight: number,
  containerWidth: number,
  containerHeight: number,
): "y" | "none" {
  const containerAspect = containerWidth / containerHeight;
  const imageAspect = imageWidth / imageHeight;

  // Only scroll vertically if the image is noticeably taller than the container
  // e.g. a full page screenshot
  if (imageAspect < containerAspect * 0.95) {
    return "y";
  }

  return "none";
}

export default function CaseStudyPreviewCard({
  study,
  variants,
}: {
  study: CaseStudyRow;
  variants?: Variants;
}) {
  const screenshots = study.screenshots || [];
  const hasMultiple = screenshots.length > 1;
  const hasOverview = !!study.project_overview?.trim();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollAxis, setScrollAxis] = useState<"y" | "none">("none");

  const updateScrollAxis = useCallback((imageWidth: number, imageHeight: number) => {
    const container = containerRef.current;
    if (!container || !imageWidth || !imageHeight) return;

    setScrollAxis(
      getScrollAxis(
        imageWidth,
        imageHeight,
        container.offsetWidth,
        container.offsetHeight,
      ),
    );
  }, []);

  const handleImageReady = useCallback(
    (imageWidth: number, imageHeight: number) => {
      updateScrollAxis(imageWidth, imageHeight);
    },
    [updateScrollAxis],
  );

  useEffect(() => {
    setScrollAxis("none");

    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      const img = container.querySelector("img");
      if (img?.naturalWidth && img.naturalHeight) {
        updateScrollAxis(img.naturalWidth, img.naturalHeight);
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [screenshots, updateScrollAxis]);

  return (
    <motion.div variants={variants}>
      <Link
        href={getDetailHref(study)}
        className="group flex flex-col sm:flex-row rounded-lg border border-slate-200/80 bg-white overflow-hidden transition-all duration-200 hover:border-slate-300 hover:shadow-sm"
      >
        {/* Image - compact, left on desktop */}
        <div
          ref={containerRef}
          className="relative w-full sm:w-56 sm:min-w-[14rem] aspect-[3/1] sm:aspect-square overflow-hidden bg-slate-100"
        >
          {screenshots.length > 0 ? (
            <div
              className={`absolute top-0 left-0 w-full flex flex-col ${hasMultiple ? "case-track-scroll" : ""}`}
              style={
                hasMultiple
                  ? ({
                      "--num-imgs": screenshots.length,
                      "--scroll-duration": `${Math.max(4, screenshots.length * 1.5)}s`,
                    } as React.CSSProperties)
                  : undefined
              }
            >
              {screenshots.map((s, idx) => (
                <div key={idx} className="relative w-full aspect-[3/1] sm:aspect-square shrink-0 bg-slate-100 overflow-hidden">
                  <Image
                    src={s.url}
                    alt={s.alt || ""}
                    fill
                    className={`object-cover ${!hasMultiple && scrollAxis === "y" ? "case-image-scroll" : "object-top"}`}
                    sizes="(max-width: 640px) 100vw, 14rem"
                    unoptimized={s.url.includes("supabase.co")}
                    onLoad={(e) => {
                      if (idx === 0) {
                        const img = e.currentTarget;
                        handleImageReady(img.naturalWidth, img.naturalHeight);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="absolute inset-0 bg-slate-200" />
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 min-w-0 flex-col justify-center p-4 sm:p-5">
          <div className="flex items-center gap-3 mb-1.5">
            {(study.industries ?? []).filter(Boolean).length > 0 && (
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {(study.industries ?? []).filter(Boolean)[0]}
              </span>
            )}
            {study.timeline && (
              <span className="text-[11px] text-slate-400">{study.timeline}</span>
            )}
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug mb-1 group-hover:text-slate-700 transition-colors">
            {study.title}
          </h3>
          {study.client_info && (
            <p className="text-xs text-slate-500 mb-1.5 truncate">{study.client_info}</p>
          )}
          {hasOverview && (
            <div className="overflow-hidden min-w-0">
              <div className="flex gap-20 group/excerpt w-0">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <p
                      key={i}
                      className="text-sm whitespace-nowrap animate-marquee-text"
                    >
                      {stripMarkdown(study.project_overview!)}
                    </p>
                  ))}
              </div>
            </div>
          )}
          {(study.skills ?? []).filter(Boolean).length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {(study.skills ?? []).filter(Boolean).map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
