import CaseStudiesCard from "../components/cards/casestudies/CaseStudiesCard";

export const metadata = {
  title: "Case Studies | Randy",
  description:
    "Real-world examples of how I've helped businesses overcome technical challenges and achieve their goals through robust software engineering.",
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 py-8 gap-12 lg:gap-24">
      <section className="scroll-mt-24 w-full flex flex-col items-center">
        <CaseStudiesCard />
      </section>
    </main>
  );
}
