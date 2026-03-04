type SkillBlockProps = {
  title: string;
  items: readonly string[];
  direct: "left" | "right";
};

export default function SkillBlock({ title, items, direct }: SkillBlockProps) {
  return (
    <div>
      <h2 className="text-sm sm:text-base font-semibold text-slate-800 mb-1.5">{title}</h2>
      <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
        {items.map((item) => (
          <li className={`${direct === "right" ? "border-l-2 border-[#388ae775] pl-2" : "border-l-2 pl-2 md:border-r-2 md:border-l-0 md:pl-0 border-[#388ae775] md:pr-2"}`} key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

