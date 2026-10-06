import { useEffect, type ReactNode } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { NavLink } from "react-router";
import { highlightTsx, type TokenKind } from "./highlight-tsx.ts";

export type Row = {
  id: string;
  title: string;
  detail: string;
  command: string;
};

const PAGES = [
  { to: "/", label: "Vite", end: true },
  { to: "/router", label: "React Router", end: false },
];

export function Frame({ title, children }: { title: string; children: ReactNode }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <nav aria-label="Pages" className="mb-8 flex flex-wrap gap-x-4 gap-y-1">
        {PAGES.map((page) => (
          <NavLink
            key={page.to}
            to={page.to}
            end={page.end}
            className={({ isActive }) =>
              isActive
                ? "inline-flex min-h-11 items-center text-sm font-semibold text-fg"
                : "inline-flex min-h-11 items-center text-sm font-medium text-primary underline"
            }
          >
            {page.label}
          </NavLink>
        ))}
      </nav>
      {children}
    </main>
  );
}

export function Kicker({ children }: { children: string }) {
  return (
    <p className="flex items-center gap-2 font-mono text-xs tracking-widest text-primary uppercase">
      <Terminal className="size-3.5" aria-hidden="true" />
      {children}
    </p>
  );
}

export function JumpNav({ jumps }: { jumps: { href: string; label: string }[] }) {
  return (
    <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-x-4 gap-y-1">
      {jumps.map((jump) => (
        <a
          key={jump.href}
          href={jump.href}
          className="inline-flex min-h-11 items-center text-sm font-medium text-primary underline"
        >
          {jump.label}
        </a>
      ))}
    </nav>
  );
}

export function CommandGroup({
  id,
  title,
  rows,
  copied,
  copyErrorId,
  onCopy,
}: {
  id: string;
  title: string;
  rows: Row[];
  copied: string | null;
  copyErrorId: string | null;
  onCopy: (id: string, text: string) => void;
}) {
  return (
    <section className="mt-12" aria-labelledby={id}>
      <SectionHeading id={id}>{title}</SectionHeading>
      <ul className="mt-4 grid gap-3">
        {rows.map((row) => {
          const failed = copyErrorId === row.id;
          const didCopy = copied === row.id;
          const status = failed ? "Copy failed — select the command" : didCopy ? "Copied" : "";
          return (
            <li key={row.id} className="rounded-lg border border-border bg-surface p-4">
              <h3 className="font-semibold text-fg">{row.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{row.detail}</p>
              <div className="mt-3 flex items-stretch gap-2">
                <code
                  className={
                    row.command.includes("\n")
                      ? "vs-editor block min-h-11 min-w-0 flex-1 overflow-x-auto whitespace-pre rounded-lg border border-border px-3 py-3 font-mono text-sm leading-6"
                      : "flex min-h-11 min-w-0 flex-1 items-center overflow-x-auto rounded-lg border border-border bg-inset px-3 font-mono text-sm text-fg"
                  }
                >
                  {row.command.includes("\n") ? <Highlighted source={row.command} /> : row.command}
                </code>
                <button
                  type="button"
                  onClick={() => onCopy(row.id, row.command)}
                  aria-label={didCopy ? `Copied ${row.title}` : `Copy ${row.title}`}
                  className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-fg transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {didCopy ? (
                    <Check className="size-4" aria-hidden="true" />
                  ) : (
                    <Copy className="size-4" aria-hidden="true" />
                  )}
                  {didCopy ? "Copied" : "Copy"}
                </button>
              </div>
              <p
                role="status"
                aria-live="polite"
                className={failed ? "mt-2 text-sm leading-relaxed text-fg" : "sr-only"}
              >
                {status}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="text-sm font-medium tracking-widest text-muted">
      {children}
    </h2>
  );
}

export function Code({ children }: { children: string }) {
  return <code className="font-mono text-fg">{children}</code>;
}

function Highlighted({ source }: { source: string }) {
  return highlightTsx(source).map((token, index) => (
    <span key={index} className={VS_CLASS[token.kind]}>
      {token.text}
    </span>
  ));
}

const VS_CLASS: Record<TokenKind, string> = {
  comment: "vs-comment",
  string: "vs-string",
  keyword: "vs-keyword",
  storage: "vs-storage",
  func: "vs-func",
  var: "vs-var",
  tag: "vs-tag",
  html: "vs-html",
  attr: "vs-attr",
  num: "vs-num",
  tagpunct: "vs-tagpunct",
  punct: "vs-punct",
};

