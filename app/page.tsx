import IntroCard from "./components/cards/intro/IntroCard";
import WhatIDoCard from "./components/cards/whatido/WhatIDoCard";
import ScrollToTop from "./components/cards/shared/ScrollToTop";
import { Chatbot } from "./components/cards/shared/ChatBot";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 py-12 gap-12 lg:gap-24">
      <IntroCard />
      <WhatIDoCard />
      <ScrollToTop />
      <Chatbot />
    </main>
  );
}
