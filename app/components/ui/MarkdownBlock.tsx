import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownBlockProps {
  content: string;
  className?: string;
  /** When true, render links as spans to avoid nested <a> inside another <a> (e.g. in a Link-wrapped card) */
  disableLinks?: boolean;
}

/** Renders Markdown content with prose styling. Use for case study overview, challenge, solution, result, etc. */
export function MarkdownBlock({ content, className = "", disableLinks = false }: MarkdownBlockProps) {
  const components = disableLinks
    ? {
        a: ({ children }: { children?: React.ReactNode }) => (
          <span className="text-sky-600 underline decoration-sky-300">{children}</span>
        ),
      }
    : undefined;

  return (
    <div
      className={`prose prose-slate prose-sm max-w-none text-slate-600 [&_p]:leading-relaxed [&_p]:text-[15px] [&_ul]:text-[15px] [&_ol]:text-[15px] [&_li]:leading-relaxed ${className}`.trim()}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
