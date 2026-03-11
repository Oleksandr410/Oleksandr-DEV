import IntroCard from "./components/cards/intro/IntroCard";
import WhatIDoCard from "./components/cards/whatido/WhatIDoCard";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 py-8 gap-12 lg:gap-24">
      <section id="intro" className="scroll-mt-24">
        <IntroCard />
      </section>
      <section id="what-i-do" className="scroll-mt-24">
        <WhatIDoCard />
      </section>
    </main>
  );
}
