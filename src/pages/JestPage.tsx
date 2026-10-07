import { Link } from "react-router";
import { useCopy } from "../copy.ts";
import { Code, CommandGroup, Frame, JumpNav, Kicker, SectionHeading, type Row } from "../sheet.tsx";

const INSTALL: Row[] = [
  {
    id: "jest-install",
    title: "Install Jest for TypeScript",
    detail:
      "From the Vite React-TS project root. These are devDependencies. The React-TS template pins typescript at ~6.0.2. npm install typescript with no version is 7.0.2. ts-jest 29.4 then fails before any test, because TypeScript 7 does not expose the compiler API it needs. Do not install typescript again, and do not upgrade it on this page. @jest/globals is the Jest 30 type entry. Do not also install @types/jest. Do not install ts-node. A CommonJS walkthrough that installs typescript and @types/jest in the same command does not fit this template.",
    command: "npm install --save-dev jest ts-jest @jest/globals",
  },
];

const CONFIG: Row[] = [
  {
    id: "jest-config",
    title: "jest.config.js",
    detail:
      "Save this as jest.config.js in the project root, next to package.json. The template sets type to module, so this .js file is ESM. Do not name it jest.config.ts. A TypeScript Jest config needs ts-node, which this template does not have. createDefaultEsmPreset is the ESM form of preset: ts-jest, and testEnvironment stays node. Do not paste module.exports into this file. Do not point tsconfig at the root tsconfig.json: that file has files set to [] and no compilerOptions. Do not replace tsconfig.app.json with a CommonJS config (module: commonjs). That file is what the Vite app type-checks with.",
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

const SUM: Row[] = [
  {
    id: "jest-sum",
    title: "src/sum.ts",
    detail:
      "Save this as src/sum.ts. A TypeScript module: a typed export, no JSX. Jest does not run Vite, so this is not a component, not CSS, and not import.meta.",
    command: `export const sum = (a: number, b: number): number => {
  return a + b;
};`,
  },
  {
    id: "jest-sum-test",
    title: "src/sum.test.ts",
    detail:
      "Save this as src/sum.test.ts. describe groups tests. test is one case. toBe checks a number. Import describe, expect, and test from @jest/globals. This template's tsconfig.app.json sets types to vite/client only, so those names are not globals here. The import uses the .ts extension.",
    command: `import { describe, expect, test } from "@jest/globals";
import { sum } from "./sum.ts";

describe("sum", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});`,
  },
];

const FILTER: Row[] = [
  {
    id: "jest-filter",
    title: "src/filterByTerm.ts",
    detail:
      "Save this as src/filterByTerm.ts. Another TypeScript module. Entry is the element type. An empty searchTerm throws. The function returns the matches. A JavaScript original of this example used module.exports. This file uses export.",
    command: `export type Entry = {
  id: number;
  url: string;
};

export function filterByTerm(input: Entry[], searchTerm: string): Entry[] {
  if (!searchTerm) {
    throw new Error("searchTerm cannot be empty");
  }
  const regex = new RegExp(searchTerm, "i");
  return input.filter((item) => item.url.match(regex));
}`,
  },
  {
    id: "jest-filter-test",
    title: "src/filterByTerm.test.ts",
    detail:
      "Save this as src/filterByTerm.test.ts. toEqual compares the array. toThrow checks the empty-term error. import type { Entry } is required: verbatimModuleSyntax is on, so a type-only name cannot use a value import.",
    command: `import { describe, expect, test } from "@jest/globals";
import { filterByTerm, type Entry } from "./filterByTerm.ts";

const input: Entry[] = [
  { id: 1, url: "https://www.url1.dev" },
  { id: 2, url: "https://www.url2.dev" },
  { id: 3, url: "https://www.link3.dev" },
];

describe("filterByTerm", () => {
  test("it should filter by a search term (link)", () => {
    const output = [{ id: 3, url: "https://www.link3.dev" }];
    expect(filterByTerm(input, "link")).toEqual(output);
  });

  test("it rejects an empty search term", () => {
    expect(() => filterByTerm(input, "")).toThrow("searchTerm cannot be empty");
  });
});`,
  },
];

const ASYNC: Row[] = [
  {
    id: "jest-fetch",
    title: "src/fetchData.ts",
    detail:
      "Save this as src/fetchData.ts. Three exports from one module: a callback, a Promise that resolves, and a Promise that rejects. The callback type is (data: string) => void.",
    command: `export const fetchData = (callback: (data: string) => void): void => {
  setTimeout(() => {
    callback("peanut butter");
  }, 10);
};

export const fetchDataPromise = (): Promise<string> => {
  return Promise.resolve("peanut butter");
};

export const failFetch = (): Promise<string> => {
  return Promise.reject(new Error("Failed to fetch data"));
};`,
  },
  {
    id: "jest-fetch-test",
    title: "src/fetchData.test.ts",
    detail:
      "Save this as src/fetchData.test.ts. jest.fn builds the mock callback. toHaveBeenCalledWith checks what it received. Call done() when the timer finishes, or the test ends before the callback runs. resolves and rejects cover the two Promises. await the expect.",
    command: `import { describe, expect, jest, test } from "@jest/globals";
import { failFetch, fetchData, fetchDataPromise } from "./fetchData.ts";

describe("fetchData", () => {
  test("calls the callback with the data", (done) => {
    const callback = jest.fn();
    fetchData(callback);
    setTimeout(() => {
      expect(callback).toHaveBeenCalledWith("peanut butter");
      done();
    }, 20);
  });

  test("resolves the data", async () => {
    await expect(fetchDataPromise()).resolves.toBe("peanut butter");
  });

  test("rejects with an error", async () => {
    await expect(failFetch()).rejects.toThrow("Failed to fetch data");
  });
});`,
  },
];

const HELLO: Row[] = [
  {
    id: "jest-hello",
    title: "src/Hello.tsx",
    detail:
      "Save this as src/Hello.tsx only when that file is not already in the project. The React page uses this same component. If it is already there, do not paste over it. Add the test only.",
    command: `export default function Hello() {
  return <h1>Hello</h1>;
}`,
  },
  {
    id: "jest-hello-test",
    title: "src/Hello.test.tsx",
    detail:
      "Save this as src/Hello.test.tsx. react-dom is already a dependency. renderToStaticMarkup checks the markup string. It does not open a browser. Do not install @testing-library/react or jest-environment-jsdom. testEnvironment stays node.",
    command: `import { expect, test } from "@jest/globals";
import { renderToStaticMarkup } from "react-dom/server";
import Hello from "./Hello.tsx";

test("renders a heading", () => {
  expect(renderToStaticMarkup(<Hello />)).toBe("<h1>Hello</h1>");
});`,
  },
];

const RUN: Row[] = [
  {
    id: "jest-script",
    title: "One line inside scripts",
    detail:
      "Put this one line inside the scripts object in that project's package.json. Do not replace the whole file. The value is the command that already works. Do not set the script to jest. Bare \"test\": \"jest\" and npx jest do not turn on Node's ESM loader.",
    command: `"test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"`,
  },
  {
    id: "jest-run",
    title: "Run the tests",
    detail:
      "From the project root, after the install and the script line. This is not npm run dev and not npx tsc -b. Node still prints ExperimentalWarning. That warning is not a failed test. ts-jest may also print TS151001, asking for esModuleInterop. The tests can still pass. Do not add esModuleInterop to tsconfig.app.json for that warning.",
    command: "npm test",
  },
];

const JUMPS = [
  { href: "#install", label: "Install" },
  { href: "#config", label: "Config" },
  { href: "#sum", label: "Sum" },
  { href: "#filter", label: "Filter" },
  { href: "#async", label: "Mock and async" },
  { href: "#hello", label: "React" },
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
          Jest for TypeScript and React
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
          These files are TypeScript in the React-TS app: <Code>.ts</Code> modules and a <Code>.tsx</Code> component.
          The cases match a plain TypeScript Jest walkthrough (a typed <Code>sum</Code>, a mock, a resolved Promise, a
          rejected Promise) and a filter module checked with <Code>toEqual</Code>. JSX compiles because{" "}
          <Code>tsconfig.app.json</Code> sets <Code>jsx</Code> to <Code>react-jsx</Code>, and this Jest config points
          ts-jest at that file. Jest does not run through Vite. <Code>vite-jest</Code> does not work on Vite after
          2.4.2.{" "}
          <Link to="/" className="text-primary underline">
            The Vite sheet
          </Link>{" "}
          still owns save, <Code>tsc -b</Code>, and the dev server.
        </p>
        <JumpNav jumps={JUMPS} />
      </header>

      <CommandGroup id="install" title="Install" rows={INSTALL} copied={copied} copyErrorId={copyErrorId} onCopy={copy} />
      <CommandGroup id="config" title="Config" rows={CONFIG} copied={copied} copyErrorId={copyErrorId} onCopy={copy} />
      <CommandGroup id="sum" title="Sum" rows={SUM} copied={copied} copyErrorId={copyErrorId} onCopy={copy} />
      <CommandGroup id="filter" title="Filter" rows={FILTER} copied={copied} copyErrorId={copyErrorId} onCopy={copy} />
      <CommandGroup
        id="async"
        title="Mock and async"
        rows={ASYNC}
        copied={copied}
        copyErrorId={copyErrorId}
        onCopy={copy}
      />
      <CommandGroup
        id="hello"
        title="React"
        rows={HELLO}
        copied={copied}
        copyErrorId={copyErrorId}
        onCopy={copy}
      />
      <CommandGroup id="run" title="Run" rows={RUN} copied={copied} copyErrorId={copyErrorId} onCopy={copy} />

      <p className="mt-3 text-sm leading-relaxed text-muted">
        Passing this command does not replace <Code>npx tsc -b</Code>. An unused local fails <Code>tsc -b</Code> and
        this Jest command still passes. A <Code>string</Code> returned from <Code>sum</Code> fails <Code>tsc</Code>{" "}
        and the test still runs, then fails at <Code>toBe</Code> because the value is wrong.{" "}
        <a href="https://www.geeksforgeeks.org/typescript/how-to-test-typescript-with-jest/" className="text-primary underline">
          Testing TypeScript with Jest
        </a>
        ,{" "}
        <a href="https://www.valentinog.com/blog/jest/" className="text-primary underline">
          Jest tutorial
        </a>
        ,{" "}
        <a href="https://jestjs.io/docs/getting-started#using-vite" className="text-primary underline">
          Using Vite
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
              imports a file whose name ends in <Code>.test.ts</Code>, so saving one does not refresh the page and
              does not run the test.
            </p>
          </li>
          <li className="rounded-lg border border-border bg-surface px-4 py-4">
            <p className="font-mono text-sm text-muted line-through">a .css import</p>
            <p className="mt-2 text-sm leading-relaxed text-fg">
              CSS and <Code>import.meta</Code> go through Vite. This config does not load Vite plugins, so a test that
              imports a <Code>.css</Code> file or reads <Code>import.meta</Code> is still out. A <Code>.tsx</Code>{" "}
              component with no CSS is in scope. <Code>renderToStaticMarkup</Code> only checks the markup string.
            </p>
          </li>
          <li className="rounded-lg border border-border bg-surface px-4 py-4">
            <p className="font-mono text-sm text-muted line-through">module.exports</p>
            <p className="mt-2 text-sm leading-relaxed text-fg">
              The React-TS template is <Code>type: module</Code>. Export with <Code>export</Code>.{" "}
              <Code>module.exports</Code> and a Jest config that assigns <Code>module.exports</Code> are the CommonJS
              shape. They do not load as this app's config.
            </p>
          </li>
        </ul>
      </section>
    </Frame>
  );
}
