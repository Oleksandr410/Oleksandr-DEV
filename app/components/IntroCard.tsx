import Image from "next/image";
import CodeStackIcon from "../components/CodeStackIcon";
import SkillBlock from "../components/SkillBlock";
import CardSkillsDiagram from "../components/CardSkillsDiagram";

const SKILLS = {
  fullStack: {
    title: "Full-Stack",
    items: [
      "End-to-end web apps",
      "Custom frontends & backends",
      "REST / GraphQL APIs",
      "Scalable data models",
    ],
  },
  cms: {
    title: "CMS",
    items: [
      "Custom CMS themes",
      "Reusable content components",
      "Headless CMS setups",
      "SEO & performance tuning",
    ],
  },
  devops: {
    title: "DevOps",
    items: [
      "Cloud environments (AWS / GCP / Azure)",
      "CI/CD pipelines",
      "Monitoring & alerting",
    ],
  },
  experience: {
    title: "Experience",
    items: [
      "20+ production apps shipped",
      "Fintech, e‑commerce, SaaS, healthcare",
    ],
  },
} as const;

export default function IntroCard() {
  return (
    <article className="intro-card w-full max-w-6xl rounded-3xl border-8 border-white bg-white shadow-2xl overflow-hidden flex flex-col sm:flex-row">
      {/* Left: content */}
      <div className="flex-1 py-12 pl-12 z-50">
        <div className="flex flex-col justify-around h-full">
          <div>
            {/* Who I Am */}
            <div className="flex items-center mb-2.5 sm:mb-3">
              <span className="flex h-10 w-10 items-center p-[10px] mr-2 justify-center rounded-full bg-sky-100" aria-hidden>
                <Image
                  src="/logo.png"
                  alt=""
                  width={22}
                  height={22}
                  className="h-6 w-6 object-contain"
                />
              </span>
              <span className="intro-card-label text-xs sm:text-sm font-medium text-sky-600">
                Randy - r@andi
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-2.5 sm:mb-3">
              Senior Full Stack & CMS Developer
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base mb-5 max-w-2xl">
              Full-stack and CMS developer with 10+ years of experience building and maintaining scalable web applications from architecture to deployment.
            </p>
          </div>

          {/* 4 sections around central icon */}
          <div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-between text-black">
            {/* Left column: Full-Stack / DevOps */}
            <div className="flex flex-col justify-between gap-6 lg:gap-10 max-w-xs w-full">
              <SkillBlock title={SKILLS.fullStack.title} items={SKILLS.fullStack.items} />
              <SkillBlock title={SKILLS.devops.title} items={SKILLS.devops.items} />
            </div>

            {/* Center: circular skills diagram */}
            <div className="flex items-center justify-center px-0 lg:px-4 w-full">
              <CardSkillsDiagram />
            </div>

            {/* Right column: CMS / Experience */}
            <div className="flex flex-col justify-between gap-6 lg:gap-10 max-w-xs w-full">
              <SkillBlock title={SKILLS.cms.title} items={SKILLS.cms.items} />
              <SkillBlock title={SKILLS.experience.title} items={SKILLS.experience.items} />
            </div>
          </div>
        </div>
      </div>

      {/* Right: photo */}
      <div className="intro-card-photo relative w-full sm:w-80 sm:min-w-[20rem] lg:w-66 lg:min-w-[20rem] h-64 sm:h-auto sm:min-h-[480px] bg-slate-200">
        <Image
          src="/me.png"
          alt="Randy"
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 100vw, 24rem"
          priority
          draggable={false}
        />
        <svg
          className="intro-card-curve"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <mask id="intro-card-mask" maskContentUnits="objectBoundingBox">
              <rect width="1" height="1" fill="black" />
              <ellipse cx="-1.03" cy="0.5" ry="1" rx="1.2" fill="white" />
            </mask>
          </defs>
          <rect width="1" height="1" fill="white" mask="url(#intro-card-mask)" />
        </svg>
      </div>
    </article>
  );
}

