import CaseStudyDetail from "@/app/components/cards/casestudies/CaseStudyDetail";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main className="min-h-screen w-full max-w-7xl mx-auto p-4 py-8 lg:px-8">
      <section className="w-full scroll-mt-24">
        <CaseStudyDetail slugOrId={slug} />
      </section>
    </main>
  );
}

export function generateMetadata({ params }: Props) {
  return {
    title: "Case Study | Randy",
    description: "Case study details",
  };
}
