type SkillBlockProps = {
  title: string;
  items: readonly string[];
};

export default function SkillBlock({ title, items }: SkillBlockProps) {
  return (
    <div>
      <h2 className="text-sm sm:text-base font-semibold text-slate-800 mb-1.5">{title}</h2>
      <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

