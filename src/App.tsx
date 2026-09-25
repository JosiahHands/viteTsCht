import { useRef, useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

export default function App() {
  return <Home />;
}

type Row = {
  id: string;
  title: string;
  detail: string;
  command: string;
};

const CREATE: Row[] = [
  {
    id: "create",
    title: "Scaffold the React TypeScript starter",
    detail:
      "This sheet describes that template only. Bare npm create vite@latest is interactive and can scaffold Vue, Svelte, React JavaScript, RSC, or TanStack Start, where src/App.tsx, tsc -b, and Oxlint do not apply.",
    command: "npm create vite@latest -- --template react-ts",
  },
];

const KEEP_RUNNING: Row[] = [
  {
    id: "dev",
    title: "Start the dev server",
    detail:
      "From the project root, after npm install. Leave this terminal open. Vite transpiles TypeScript on save and refreshes the browser. It does not type-check. Default URL is http://localhost:5173, or the next free port if that one is taken.",
    command: "npm run dev",
  },
];

const TYPECHECK: Row[] = [
  {
    id: "tsc",
    title: "Type-check once",
    detail:
      "From the project root. Checks the whole project. Unused locals and unused parameters fail this command even while npm run dev stays up, because the template sets noUnusedLocals and noUnusedParameters. tsconfig.app.json has noEmit, so this does not emit the JavaScript the browser runs. Use this instead of plain tsc.",
    command: "npx tsc -b",
  },
  {
    id: "watch",
    title: "Type-check in a second terminal",
    detail:
      "Run this beside npm run dev, from the project root. It prints type errors as you save. It does not refresh the browser and it is not a replacement for the dev server. Optional — your editor already shows the errors.",
    command: "npx tsc -b --watch",
  },
];

const SHIP: Row[] = [
  {
    id: "build",
    title: "Production build",
    detail:
      "From the project root. The script is tsc -b && vite build. If tsc -b fails, vite build is skipped and an existing dist/ is left in place. A failed build does not delete the previous bundle.",
    command: "npm run build",
  },
  {
    id: "preview",
    title: "Serve dist/",
    detail:
      "Run npm run build first. This does not build. If dist/ is missing, it fails. If the last build failed, it can serve the stale bundle still in dist/. Open the URL Vite prints. Default is http://localhost:4173 — not the dev server on 5173, and not npm run dev.",
    command: "npm run preview",
  },
];

const LINT: Row[] = [
  {
    id: "lint",
    title: "Lint",
    detail:
      "Default React-TS template: npm run lint runs Oxlint and does not type-check. Type-aware lint stays off until oxlint-tsgolint is added. If you created the app with --eslint, this script is ESLint instead.",
    command: "npm run lint",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Start it once",
    body: "From the project root, after npm install, run npm run dev. One terminal. Leave it running.",
  },
  {
    n: "02",
    title: "Edit and save",
    body: "Edit a file under src/ (including App.tsx) and save. Vite refreshes the page. That save does not type-check.",
  },
  {
    n: "03",
    title: "Open the URL Vite printed",
    body: "Default is http://localhost:5173, or the next free port. The page updates when you save. Closing the terminal stops that.",
  },
];

const JUMPS = [
  { href: "#loop", label: "Daily loop" },
  { href: "#dev", label: "Dev server" },
  { href: "#types", label: "Type-check" },
  { href: "#build", label: "Build and preview" },
  { href: "#lint", label: "Lint" },
  { href: "#dont", label: "Do not run" },
];

function Home() {
  const [copied, setCopied] = useState<string | null>(null);
  const [copyErrorId, setCopyErrorId] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  async function copy(id: string, text: string) {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
    setCopied(null);
    setCopyErrorId(null);

    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      ok = fallbackCopy(text);
    }

    if (!ok) {
      setCopyErrorId(id);
      return;
    }

    setCopied(id);
    timer.current = window.setTimeout(() => {
      setCopied((current) => (current === id ? null : current));
      timer.current = null;
    }, 1600);
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="border-b border-border pb-8">
        <p className="flex items-center gap-2 font-mono text-xs tracking-widest text-primary uppercase">
          <Terminal className="size-3.5" aria-hidden="true" />
          React · Vite · TypeScript
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          After you save a file under src/
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
          Vite transpiles TypeScript and refreshes the page. That refresh is not a type-check.{" "}
          <Code>src/App.tsx</Code> is not special — <Code>src/main.tsx</Code>, any imported component, and CSS
          update the same way. Every command below is run from the project root, after <Code>npm install</Code>.
        </p>
        <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-x-4 gap-y-1">
          {JUMPS.map((jump) => (
            <a
              key={jump.href}
              href={jump.href}
              className="inline-flex min-h-11 items-center text-sm font-medium text-primary underline"
            >
              {jump.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="mt-8" aria-labelledby="loop">
        <SectionHeading id="loop">Daily loop</SectionHeading>
        <ol className="mt-4 grid gap-3">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="grid grid-cols-[auto_1fr] gap-4 rounded-lg border border-border bg-surface px-4 py-4"
            >
              <span className="font-mono text-sm text-primary tabular-nums" aria-hidden="true">
                {step.n}
              </span>
              <div>
                <h3 className="font-semibold text-fg">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <CommandGroup
        id="create"
        title="Create that project"
        rows={CREATE}
        copied={copied}
        copyErrorId={copyErrorId}
        onCopy={copy}
      />
      <CommandGroup
        id="dev"
        title="Dev server"
        rows={KEEP_RUNNING}
        copied={copied}
        copyErrorId={copyErrorId}
        onCopy={copy}
      />
      <CommandGroup
        id="types"
        title="Type-check"
        rows={TYPECHECK}
        copied={copied}
        copyErrorId={copyErrorId}
        onCopy={copy}
      />
      <CommandGroup
        id="build"
        title="Build and preview"
        rows={SHIP}
        copied={copied}
        copyErrorId={copyErrorId}
        onCopy={copy}
      />
      <CommandGroup
        id="lint"
        title="Lint"
        rows={LINT}
        copied={copied}
        copyErrorId={copyErrorId}
        onCopy={copy}
      />
      <p className="mt-3 text-sm leading-relaxed text-muted">
        The template README shows how to turn on type-aware Oxlint. Passing <Code>npm run lint</Code> still does
        not mean the types are clean.{" "}
        <a
          href="https://github.com/vitejs/vite/blob/main/packages/create-vite/template-react-ts/README.md#expanding-the-oxlint-configuration"
          className="text-primary underline"
        >
          Expanding the Oxlint configuration
        </a>
        .
      </p>

      <section className="mt-12" aria-labelledby="dont">
        <SectionHeading id="dont">Do not run</SectionHeading>
        <ul className="mt-4 grid gap-3">
          <li className="rounded-lg border border-border bg-surface px-4 py-4">
            <p className="font-mono text-sm text-muted line-through">tsc</p>
            <p className="mt-2 text-sm leading-relaxed text-fg">
              On the React-TS template with TypeScript 6, plain <Code>tsc</Code> reads a root{" "}
              <Code>tsconfig.json</Code> whose <Code>files</Code> array is empty, then exits 0. It does not report
              a <Code>string</Code> assigned to a <Code>number</Code> in <Code>src/App.tsx</Code>.{" "}
              <Code>npx tsc -b</Code> follows the references to <Code>tsconfig.app.json</Code> and{" "}
              <Code>tsconfig.node.json</Code>, reports that error, and exits 1. <Code>noEmit</Code> is on, so{" "}
              <Code>tsc -b</Code> type-checks and does not emit the JavaScript the browser runs. Do not run plain{" "}
              <Code>tsc</Code> or <Code>tsc --noEmit</Code> in this starter.
            </p>
          </li>
          <li className="rounded-lg border border-border bg-surface px-4 py-4">
            <p className="font-mono text-sm text-muted line-through">tsc instead of the dev server</p>
            <p className="mt-2 text-sm leading-relaxed text-fg">
              Saving does not run the TypeScript compiler. Vite transpiles and refreshes the page.{" "}
              <Code>npx tsc -b --watch</Code> belongs in a second terminal. It prints type errors. It does not
              refresh the browser.
            </p>
          </li>
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="jobs">
        <SectionHeading id="jobs">Two different jobs</SectionHeading>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <article className="rounded-lg border border-border bg-surface p-4">
            <h3 className="font-semibold text-fg">Transpile</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Turn TypeScript into JavaScript the browser can run. <Code>npm run dev</Code> does this on save.
              Type errors do not stop it.
            </p>
          </article>
          <article className="rounded-lg border border-border bg-surface p-4">
            <h3 className="font-semibold text-fg">Type-check</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Prove the types are valid. The editor does it live. <Code>npx tsc -b</Code> does the whole project.{" "}
              <Code>npm run build</Code> does it before bundling, and skips the bundle step if that check fails.
            </p>
          </article>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          A page that loads in dev is not proof the types are clean. Run <Code>npx tsc -b</Code> or{" "}
          <Code>npm run build</Code> when you want that proof. These commands belong in the project you created
          with <Code>npm create vite@latest -- --template react-ts</Code>, not in whatever other starter the
          interactive prompt might have picked.
        </p>
      </section>
    </main>
  );
}

function fallbackCopy(text: string): boolean {
  try {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}

function CommandGroup({
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
                <code className="flex min-h-11 min-w-0 flex-1 items-center overflow-x-auto rounded-lg border border-border bg-inset px-3 font-mono text-sm text-fg">
                  {row.command}
                </code>
                <button
                  type="button"
                  onClick={() => onCopy(row.id, row.command)}
                  aria-label={didCopy ? `Copied ${row.command}` : `Copy ${row.command}`}
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

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="text-sm font-medium tracking-widest text-muted">
      {children}
    </h2>
  );
}

function Code({ children }: { children: string }) {
  return <code className="font-mono text-fg">{children}</code>;
}
