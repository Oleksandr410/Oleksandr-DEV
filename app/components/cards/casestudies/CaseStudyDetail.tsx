"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { KeenSlider } from "@/app/components/ui/KeenSlider";
import { ImageModal } from "@/app/components/ui/ImageModal";
import { createClient } from "@/libs/supabase/client";
import type { CaseStudyRow, ScreenshotItem, VideoItem } from "@/libs/supabase/types";
import { MarkdownBlock } from "@/app/components/ui/MarkdownBlock";

function VideoDisplay({ video }: { video: VideoItem }) {
  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-900">
      <video src={video.url} controls className="w-full h-full object-contain">
        Your browser does not support the video tag.
      </video>
      {video.caption && (
        <p className="mt-2 text-sm text-slate-600">{video.caption}</p>
      )}
    </div>
  );
}

export default function CaseStudyDetail({ slugOrId }: { slugOrId: string }) {
  const [study, setStudy] = useState<CaseStudyRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalScreenshot, setModalScreenshot] = useState<{ screenshot: ScreenshotItem; index: number } | null>(null);

  useEffect(() => {
    async function fetchCaseStudy() {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        setError("Supabase not configured");
        setLoading(false);
        return;
      }
      try {
        const supabase = createClient();
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slugOrId);
        const { data, error: fetchError } = isUuid
          ? await supabase.from("case_studies").select("*").eq("id", slugOrId).single()
          : await supabase.from("case_studies").select("*").eq("slug", slugOrId).single();

        if (fetchError) throw fetchError;
        setStudy(data as CaseStudyRow);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Case study not found");
        setStudy(null);
      } finally {
        setLoading(false);
      }
    }
    fetchCaseStudy();
  }, [slugOrId]);

  if (loading) {
    return (
      <motion.article
        className="w-full lg:w-[960px] xl:w-[1161px] max-w-full rounded-lg border border-slate-200/80 bg-white text-slate-800 flex flex-col relative mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="pt-12 md:pt-20 px-6 md:px-12 pb-12 md:pb-20 animate-pulse">
          <div className="h-64 bg-slate-200 rounded-2xl mb-8" />
          <div className="space-y-4">
            <div className="h-8 bg-slate-200 rounded w-3/4" />
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-5/6" />
          </div>
        </div>
      </motion.article>
    );
  }

  if (error || !study) {
    return (
      <motion.article
        className="w-full lg:w-[960px] xl:w-[1161px] max-w-full rounded-lg border border-slate-200/80 bg-white text-slate-800 flex flex-col relative mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="pt-12 md:pt-20 px-6 md:px-12 pb-12 md:pb-20 text-center">
          <p className="text-slate-600 mb-6">{error ?? "Case study not found."}</p>
          <Link href="/case-studies" className="text-sky-600 font-medium hover:text-sky-700">
            ← Back to Case Studies
          </Link>
        </div>
      </motion.article>
    );
  }

  const hasScreenshots = study.screenshots && study.screenshots.length > 0;

  return (
    <motion.article
      className="w-full lg:w-[960px] xl:w-[1161px] max-w-full rounded-lg border border-slate-200/80 bg-white flex flex-col relative mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Top bar - back link, metadata */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-sm text-slate-600 font-medium hover:text-slate-900 transition-colors"
        >
          ← Back to Case Studies
        </Link>
        <div className="flex items-center gap-4">
          {(study.industries ?? []).filter(Boolean).length > 0 && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {(study.industries ?? []).filter(Boolean).join(", ")}
            </span>
          )} {" | "}
          {study.timeline && (
            <span className="text-xs text-slate-400">{study.timeline}</span>
          )}
        </div>
      </div>

      {/* Hero slider - screenshots */}
      {hasScreenshots ? (
        <div className="relative w-full aspect-[21/9] overflow-hidden bg-slate-100">
          <div
            className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-black/10"
            aria-hidden
          />
          <div className="absolute inset-0 flex flex-col [&>div:first-child]:flex-1 [&>div:first-child]:min-h-0 [&>div:first-child]:overflow-hidden [&_.keen-slider]:h-full [&_.keen-slider__slide]:h-full">
            <KeenSlider
              className="w-full h-full"
              options={{
                loop: true,
                slides: { perView: 1, spacing: 0 },
              }}
              slideClassName="keen-slider__slide min-w-0 shrink-0 outline-none [&:focus]:outline-none h-full"
              showDots
              showPrevNextButtons
              activeDotClassName="w-8 h-2 bg-sky-500 rounded-full"
              dotsClassName="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 z-10"
              autoplay={5000}
            >
              {study.screenshots!.map((screenshot, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setModalScreenshot({ screenshot, index: idx })}
                  className="relative w-full aspect-[21/9] min-h-0 cursor-zoom-in focus:outline-none block"
                  aria-label={`View ${screenshot.alt ?? "screenshot"} in full size`}
                >
                  <Image
                    src={screenshot.url}
                    alt={screenshot.alt ?? ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 896px"
                    priority={idx === 0}
                    unoptimized={screenshot.url?.includes("supabase.co") ?? false}
                  />
                </button>
              ))}
            </KeenSlider>
          </div>
        </div>
      ) : (
        <div className="w-full aspect-[21/9] bg-slate-200" />
      )}

      {/* Main content + sidebar - flex with centered divider for sticky sidebar */}
      <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-0 pb-24 lg:pb-0">
        {/* Content column */}
        <div className="min-w-0 flex-1 px-4 sm:px-6 md:px-10 py-20 space-y-8 lg:pr-6">
          {study.client_info && (
            <p className="text-sm text-slate-500 mb-2">{study.client_info}</p>
          )}

          {study.title && (
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900 leading-tight max-w-xl">
              {study.title}
            </h1>
          )}

          {study.project_overview && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Overview</h2>
              <MarkdownBlock content={study.project_overview} />
            </section>
          )}

          {study.challenge && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Challenge</h2>
              <MarkdownBlock content={study.challenge} />
            </section>
          )}

          {study.solution && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Solution</h2>
              <MarkdownBlock content={study.solution} />
            </section>
          )}

          {study.result && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Result</h2>
              <MarkdownBlock content={study.result} />
            </section>
          )}

          {study.videos && study.videos.length > 0 && (
            <section className="pt-6 border-t border-slate-100">
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-4">Videos</h2>
              <div className="grid gap-6">
                {study.videos.map((video, idx) => (
                  <VideoDisplay key={idx} video={video} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Centered divider - full height, 1px line in the middle of the gap */}
        <div className="hidden lg:flex w-px flex-shrink-0 bg-slate-100 self-stretch" aria-hidden />

        {/* Sidebar - sticky like CaseStudiesCard categories */}
        <aside className="lg:sticky lg:top-14 lg:self-start lg:w-64 lg:min-w-[16rem] lg:pl-6 px-4 sm:px-6 py-6 lg:py-20 space-y-6">
          {(study.live_link || study.github_repo_link) && (
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">Links</h3>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                {study.live_link && (
                  <a
                    href={study.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-slate-700 text-sm font-medium transition-all hover:border-slate-300 hover:bg-slate-50"
                  >
                    <ExternalLink className="h-3.5 w-3 shrink-0" />
                    Live Site
                  </a>
                )}
                {study.github_repo_link && (
                  <a
                    href={study.github_repo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-slate-700 text-sm font-medium transition-all hover:border-slate-300 hover:bg-slate-50"
                  >
                    <Github className="h-3.5 w-3 shrink-0" />
                    Source Code
                  </a>
                )}
              </div>
            </div>
          )}

          {study.skills && study.skills.length > 0 && (
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {study.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Fixed bottom bar - mobile */}
      {(study.live_link || study.github_repo_link) && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white/95 backdrop-blur-sm border-t border-slate-200 flex flex-row flex-nowrap items-center justify-center gap-3">
          {study.live_link && (
            <a
              href={study.live_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-slate-700 text-sm font-medium transition-all hover:border-slate-300 hover:bg-slate-50"
            >
              <ExternalLink className="h-3.5 w-3 shrink-0" />
              Live Site
            </a>
          )}
          {study.github_repo_link && (
            <a
              href={study.github_repo_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-slate-700 text-sm font-medium transition-all hover:border-slate-300 hover:bg-slate-50"
            >
              <Github className="h-3.5 w-3 shrink-0" />
              Source Code
            </a>
          )}
        </div>
      )}

      {modalScreenshot && study?.screenshots && (
        <ImageModal
          screenshots={study.screenshots}
          initialIndex={modalScreenshot.index}
          onClose={() => setModalScreenshot(null)}
        />
      )}
    </motion.article>
  );
}
