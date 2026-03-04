export default function CodeStackIcon() {
  return (
    <div className="flex items-center justify-center w-16 h-16 shrink-0">
      <div className="relative flex flex-col items-center justify-end gap-1">
        <div className="h-3 w-14 rounded bg-sky-700/80" />
        <div className="h-3 w-12 rounded bg-sky-500/90" />
        <div className="h-11 w-16 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shadow-md">
          <span className="text-white font-mono text-base font-bold">&lt;/&gt;</span>
        </div>
      </div>
    </div>
  );
}

