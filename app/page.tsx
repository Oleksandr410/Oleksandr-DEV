import IntroCard from "./components/cards/intro/IntroCard";
import WhatIDoCard from "./components/cards/whatido/WhatIDoCard";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 py-12 gap-12 lg:gap-24">
      <IntroCard />
      <WhatIDoCard />
    </main>
  );
}
