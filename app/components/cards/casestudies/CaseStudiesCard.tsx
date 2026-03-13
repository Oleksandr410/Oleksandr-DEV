"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X } from "lucide-react";
import { createClient } from "@/libs/supabase/client";
import type { CaseStudyRow } from "@/libs/supabase/types";
import CaseStudyPreviewCard from "./CaseStudyPreviewCard";

const CATEGORY_PARAM = "category";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function CaseStudiesCard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [caseStudies, setCaseStudies] = useState<CaseStudyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setDrawerOpen(false);
      };
      const onResize = () => {
        if (window.matchMedia("(min-width: 1024px)").matches) setDrawerOpen(false);
      };
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("resize", onResize);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("resize", onResize);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [drawerOpen]);

  useEffect(() => {
    async function fetchCaseStudies() {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        setError("Supabase not configured");
        setLoading(false);
        return;
      }
      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from("case_studies")
          .select("*")
          .order("sort_order", { ascending: true });

        if (fetchError) throw fetchError;
        setCaseStudies((data ?? []) as CaseStudyRow[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load case studies");
        setCaseStudies([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCaseStudies();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    caseStudies.forEach((s) => s.industries?.forEach((i) => set.add(i)));
    return Array.from(set).sort();
  }, [caseStudies]);

  // Sync URL -> selectedCategory on load (and when categories become available)
  useEffect(() => {
    const categoryFromUrl = searchParams.get(CATEGORY_PARAM);
    if (!categoryFromUrl) {
      setSelectedCategory(null);
      return;
    }
    const decoded = decodeURIComponent(categoryFromUrl);
    // Apply if valid, or if categories not yet loaded (avoid flash of "All")
    if (categories.length === 0 || categories.includes(decoded)) {
      setSelectedCategory(decoded);
    } else {
      setSelectedCategory(null);
    }
  }, [searchParams, categories]);

  const updateCategory = (category: string | null) => {
    setSelectedCategory(category);
    const url = new URL(window.location.href);
    if (category) {
      url.searchParams.set(CATEGORY_PARAM, encodeURIComponent(category));
    } else {
      url.searchParams.delete(CATEGORY_PARAM);
    }
    router.replace(url.pathname + url.search, { scroll: false });
  };

  const filteredStudies = useMemo(() => {
    if (!selectedCategory) return caseStudies;
    return caseStudies.filter((s) => s.industries?.includes(selectedCategory));
  }, [caseStudies, selectedCategory]);

  if (loading) {
    return (
      <motion.article
        className="w-full lg:w-[960px] xl:w-[1161px] max-w-full rounded-2xl sm:rounded-3xl border-4 sm:border-6 lg:border-8 border-white bg-white shadow-2xl text-slate-800 flex flex-col relative mx-auto"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="pt-8 sm:pt-10 md:pt-12 lg:pt-20 px-4 sm:px-6 md:px-12 pb-12 sm:pb-16 md:pb-20 animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/3 mb-4" />
          <div className="flex gap-8 mt-8">
            <div className="flex-[7] space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[16/10] bg-slate-100 rounded-2xl" />
              ))}
            </div>
            <div className="flex-[3] hidden lg:block">
              <div className="h-6 bg-slate-200 rounded w-1/2 mb-4" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 bg-slate-100 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      className="w-full lg:w-[960px] xl:w-[1161px] max-w-full rounded-2xl sm:rounded-3xl border-4 sm:border-6 lg:border-8 border-white bg-white shadow-2xl text-slate-800 flex flex-col relative mx-auto"
      variants={cardVariants}
      initial="hidden"
      animate={hasBeenInView ? "visible" : "hidden"}
      onViewportEnter={() => setHasBeenInView(true)}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Header Section - WhatIDoCard style */}
      <motion.div
        className="pt-8 sm:pt-10 md:pt-12 lg:pt-20 px-4 sm:px-6 md:px-12 md:text-left text-center max-w-3xl md:max-w-none relative z-10 bg-white"
        variants={itemVariants}
      >
        <div className="flex items-center justify-center md:justify-start mb-4">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 mr-3"
            aria-hidden
          >
            <svg className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </span>
          <span className="text-xs sm:text-sm font-medium text-sky-600 tracking-wide">
            Proven Results
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-2.5 sm:mb-3">
          Case Studies
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto md:mx-0">
          Real-world examples of how I&apos;ve helped businesses overcome technical challenges and achieve their goals through robust software engineering.
        </p>
      </motion.div>

      {/* Content - grid like CaseStudyDetail: 7:3 split, sticky on right column */}
      <div className="px-4 sm:px-6 md:px-12 pt-4 sm:pt-6 md:pt-6 pb-12 sm:pb-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-8 sm:gap-10 lg:gap-12">
          {/* Left column (7) - Case studies */}
          <div className="min-w-0">
            {/* Mobile only: Categories button */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <span className="text-sm text-slate-500">
                {filteredStudies.length} {filteredStudies.length === 1 ? "case study" : "case studies"}
              </span>
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${selectedCategory
                    ? "bg-sky-100 text-sky-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                  }`}
                aria-expanded={drawerOpen}
                aria-haspopup="dialog"
                aria-label="Filter by category"
              >
                <Filter className="h-4 w-4 shrink-0" />
                {selectedCategory ?? "Categories"}
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
                {error} — Add your Supabase credentials to .env.local and run the migration.
              </div>
            )}
            {filteredStudies.length === 0 && !error ? (
              <div className="py-12 text-slate-500">
                <p>No case studies yet. Add some in your Supabase database.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-6 sm:gap-8">
                {filteredStudies.map((study) => (
                  <CaseStudyPreviewCard key={study.id} study={study} variants={itemVariants} />
                ))}
              </div>
            )}
          </div>

          {/* Right column (3) - Categories (sticky, like CaseStudyDetail) */}
          <aside className="hidden lg:block lg:pt-0 lg:sticky lg:top-36 lg:self-start">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">
              Categories
            </h3>
            <nav className="flex flex-col gap-3">
              <button
                onClick={() => updateCategory(null)}
                className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${selectedCategory === null
                    ? "bg-sky-100 text-sky-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                  }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => updateCategory(cat)}
                  className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${selectedCategory === cat
                      ? "bg-sky-100 text-sky-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </aside>
        </div>
      </div>

      {/* Categories drawer - mobile only */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              role="presentation"
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Filter by category"
              className="fixed left-0 right-0 bottom-0 z-50 w-full max-h-[85vh] bg-white shadow-2xl border-t border-slate-200 rounded-t-2xl flex flex-col overflow-hidden lg:hidden pb-[env(safe-area-inset-bottom)]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                  Categories
                </h3>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                  aria-label="Close categories"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 p-4 overflow-y-auto">
                <button
                  onClick={() => {
                    updateCategory(null);
                    setDrawerOpen(false);
                  }}
                  className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${selectedCategory === null
                      ? "bg-sky-100 text-sky-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                    }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      updateCategory(cat);
                      setDrawerOpen(false);
                    }}
                    className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${selectedCategory === cat
                        ? "bg-sky-100 text-sky-700"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
