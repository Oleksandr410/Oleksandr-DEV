import { Suspense } from "react";
import CaseStudiesCard from "../components/cards/casestudies/CaseStudiesCard";

export const metadata = {
  title: "Case Studies",
  description:
    "Real-world examples of how I've helped businesses overcome technical challenges and achieve their goals through robust software engineering.",
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <section className="scroll-mt-24 w-full pb-24 sm:pb-28">
        <Suspense fallback={<div className="animate-pulse h-96 rounded-2xl bg-slate-100" />}>
          <CaseStudiesCard />
        </Suspense>
      </section>
    </main>
  );
}
