import { Link } from "react-router";
import { useCopy } from "../copy.ts";
import { Code, CommandGroup, Frame, JumpNav, Kicker, SectionHeading, type Row } from "../sheet.tsx";

const INSTALL: Row[] = [
  {
    id: "jest-install",
    title: "Install Jest for TypeScript",
    detail:
      "From the Vite React-TS project root. These are devDependencies. The React-TS template pins typescript at ~6.0.2. npm install typescript with no version is 7.0.2. ts-jest 29.4 then fails before any test, because TypeScript 7 does not expose the compiler API it needs. Do not install typescript again, and do not upgrade it on this page. @jest/globals is the Jest 30 type entry. Do not also install @types/jest. Do not install ts-node.",
    command: "npm install --save-dev jest ts-jest @jest/globals",
  },
];

const CONFIG: Row[] = [
  {
    id: "jest-config",
    title: "jest.config.js",
    detail:
      "Save this as jest.config.js in the project root, next to package.json. The template sets type to module, so this .js file is ESM. Do not name it jest.config.ts. A TypeScript Jest config needs ts-node, which this template does not have. tsconfig points at tsconfig.app.json. The root tsconfig.json has files set to [] and no compilerOptions, so ts-jest would not see module esnext from there.",
    command: `import { createDefaultEsmPreset } from "ts-jest";

const preset = createDefaultEsmPreset({
  tsconfig: "tsconfig.app.json",
});

/** @type {import("jest").Config} */
const config = {
  ...preset,
  testEnvironment: "node",
};

export default config;`,
  },
];

const SOURCE: Row[] = [
  {
    id: "jest-sum",
    title: "A function with no JSX",
    detail:
      "Save this as src/sum.ts. Jest does not run Vite. This file is a plain function, not a component, not CSS, and not import.meta.",
    command: `export function sum(a: number, b: number) {
  return a + b;
}`,
  },
];

const TEST: Row[] = [
  {
    id: "jest-test",
    title: "The test file",
    detail:
      "Save this as src/sum.test.ts. describe, expect, and test are imported from @jest/globals. The import of sum uses the .ts extension, same as other files in this template. Because the file is under src, npx tsc -b type-checks it with tsconfig.app.json. That is separate from running the test.",
    command: `import { describe, expect, test } from "@jest/globals";
import { sum } from "./sum.ts";

describe("sum", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});`,
  },
];

const RUN: Row[] = [
  {
    id: "jest-run",
    title: "Run the tests",
    detail:
      "From the project root, after the install. This is not npm run dev and not npx tsc -b. Node still marks this ESM loader experimental, so the command prints ExperimentalWarning. That warning is not a failed test. ts-jest may also print TS151001, asking for esModuleInterop. The test can still pass. Do not add esModuleInterop to tsconfig.app.json for that warning.",
    command: "node --experimental-vm-modules node_modules/jest/bin/jest.js",
  },
];

const JUMPS = [
  { href: "#install", label: "Install" },
  { href: "#config", label: "Config" },
  { href: "#source", label: "Function" },
  { href: "#test", label: "Test" },
  { href: "#run", label: "Run" },
  { href: "#dont", label: "Do not" },
];

export default function JestPage() {
  const { copied, copyErrorId, copy } = useCopy();

  return (
    <Frame title="Jest and TypeScript — Vite TypeScript Cheat Sheet">
      <header className="border-b border-border pb-8">
        <Kicker>React · Vite · TypeScript</Kicker>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          Jest for a TypeScript file
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
          Jest does not run through Vite. The Jest getting-started page says Vite does not support Jest, and{" "}
          <Code>vite-jest</Code> does not work on Vite after 2.4.2. This page tests <Code>src/sum.ts</Code>. It does
          not render a component.{" "}
          <Link to="/" className="text-primary underline">
            The Vite sheet
          </Link>{" "}
          still owns save, <Code>tsc -b</Code>, and the dev server.
        </p>
        <JumpNav jumps={JUMPS} />
      </header>

      <CommandGroup id="install" title="Install" rows={INSTALL} copied={copied} copyErrorId={copyErrorId} onCopy={copy} />
      <CommandGroup id="config" title="Config" rows={CONFIG} copied={copied} copyErrorId={copyErrorId} onCopy={copy} />
      <CommandGroup id="source" title="Function" rows={SOURCE} copied={copied} copyErrorId={copyErrorId} onCopy={copy} />
      <CommandGroup id="test" title="Test" rows={TEST} copied={copied} copyErrorId={copyErrorId} onCopy={copy} />
      <CommandGroup id="run" title="Run" rows={RUN} copied={copied} copyErrorId={copyErrorId} onCopy={copy} />

      <p className="mt-3 text-sm leading-relaxed text-muted">
        Passing this command does not replace <Code>npx tsc -b</Code>. Jest transpiles the test and runs it.{" "}
        <a href="https://jestjs.io/docs/getting-started#using-vite" className="text-primary underline">
          Using Vite
        </a>{" "}
        and{" "}
        <a href="https://jestjs.io/docs/getting-started#using-typescript" className="text-primary underline">
          Using TypeScript
        </a>
        .
      </p>

      <section className="mt-12" aria-labelledby="dont">
        <SectionHeading id="dont">Do not</SectionHeading>
        <ul className="mt-4 grid gap-3">
          <li className="rounded-lg border border-border bg-surface px-4 py-4">
            <p className="font-mono text-sm text-muted line-through">npm run dev</p>
            <p className="mt-2 text-sm leading-relaxed text-fg">
              The dev server does not run Jest. Vite reloads when a module the page already imports changes. Nothing
              imports <Code>src/sum.test.ts</Code>, so saving it does not refresh the page and does not run the test.
            </p>
          </li>
          <li className="rounded-lg border border-border bg-surface px-4 py-4">
            <p className="font-mono text-sm text-muted line-through">a .tsx test</p>
            <p className="mt-2 text-sm leading-relaxed text-fg">
              JSX, CSS, and <Code>import.meta</Code> go through Vite. This Jest config does not load Vite plugins.
              Keep this test on the plain function.
            </p>
          </li>
          <li className="rounded-lg border border-border bg-surface px-4 py-4">
            <p className="font-mono text-sm text-muted line-through">@types/jest</p>
            <p className="mt-2 text-sm leading-relaxed text-fg">
              Jest 30 ships its types. Import them from <Code>@jest/globals</Code>. A second <Code>@types/jest</Code>{" "}
              package fights that.
            </p>
          </li>
        </ul>
      </section>
    </Frame>
  );
}
