import { Link } from "react-router";
import { useCopy } from "../copy.ts";
import { Code, CommandGroup, Frame, JumpNav, Kicker, SectionHeading, type Row } from "../sheet.tsx";

const COMPONENT: Row[] = [
  {
    id: "hello",
    title: "A component file",
    detail:
      "Save this as src/Hello.tsx. A .tsx file is TypeScript that may contain JSX. The template sets jsx to react-jsx, so this file does not import React. export default is what App.tsx imports.",
    command: `export default function Hello() {
  return <h1>Hello</h1>;
}`,
  },
  {
    id: "use-hello",
    title: "Render it from App.tsx",
    detail:
      "Paste this over src/App.tsx in that Vite app. The import path includes .tsx because the template allows importing TypeScript extensions. Saving either file refreshes the dev server. That save does not type-check.",
    command: `import Hello from "./Hello.tsx";

export default function App() {
  return <Hello />;
}`,
  },
];

const PROPS: Row[] = [
  {
    id: "greeting",
    title: "Props are a type",
    detail:
      "Save this as src/Greeting.tsx. name is required. Omit it at the call site and npx tsc -b reports the error. npm run dev still serves the page, because the dev server does not type-check.",
    command: `type GreetingProps = {
  name: string;
};

export default function Greeting({ name }: GreetingProps) {
  return <p>Hello, {name}</p>;
}`,
  },
];

const STATE: Row[] = [
  {
    id: "counter",
    title: "State changes on a click",
    detail:
      "Save this as src/Counter.tsx. useState is a hook. Call it at the top of the component, not inside onClick and not inside a condition. useState(0) means count is a number. Call setCount from the click handler, not while the component is rendering.",
    command: `import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}`,
  },
];

const LIST: Row[] = [
  {
    id: "names",
    title: "A list needs a key",
    detail:
      "Save this as src/Names.tsx. key goes on the element returned from map. It is not a prop Names reads. Use a stable value. The array index is a poor key when the list is reordered or filtered.",
    command: `const names = ["Ada", "Lin"];

export default function Names() {
  return (
    <ul>
      {names.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
}`,
  },
];

const JUMPS = [
  { href: "#component", label: "Component" },
  { href: "#props", label: "Props" },
  { href: "#state", label: "State" },
  { href: "#list", label: "List" },
  { href: "#dont", label: "Do not write" },
];

export default function ReactPage() {
  const { copied, copyErrorId, copy } = useCopy();

  return (
    <Frame title="React and TSX — Vite TypeScript Cheat Sheet">
      <header className="border-b border-border pb-8">
        <Kicker>React · Vite · TypeScript</Kicker>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          A .tsx file in the Vite starter
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
          React and the TypeScript JSX setting are already in{" "}
          <Code>npm create vite@latest -- --template react-ts</Code>. Nothing else to install. Paste the files
          below into that project, under <Code>src/</Code>.{" "}
          <Link to="/" className="text-primary underline">
            The Vite sheet
          </Link>{" "}
          covers save, <Code>tsc -b</Code>, and the dev server.{" "}
          <Link to="/router" className="text-primary underline">
            React Router
          </Link>{" "}
          is a separate page.
        </p>
        <JumpNav jumps={JUMPS} />
      </header>

      <CommandGroup
        id="component"
        title="Component"
        rows={COMPONENT}
        copied={copied}
        copyErrorId={copyErrorId}
        onCopy={copy}
      />
      <CommandGroup id="props" title="Props" rows={PROPS} copied={copied} copyErrorId={copyErrorId} onCopy={copy} />
      <CommandGroup id="state" title="State" rows={STATE} copied={copied} copyErrorId={copyErrorId} onCopy={copy} />
      <CommandGroup id="list" title="List" rows={LIST} copied={copied} copyErrorId={copyErrorId} onCopy={copy} />

      <section className="mt-12" aria-labelledby="dont">
        <SectionHeading id="dont">Do not write</SectionHeading>
        <ul className="mt-4 grid gap-3">
          <li className="rounded-lg border border-border bg-surface px-4 py-4">
            <p className="font-mono text-sm text-muted line-through">class="card"</p>
            <p className="mt-2 text-sm leading-relaxed text-fg">
              JSX uses <Code>className</Code>. <Code>class</Code> is not the DOM attribute name React accepts, and
              the label on a form control is <Code>htmlFor</Code>, not <Code>for</Code>.
            </p>
          </li>
          <li className="rounded-lg border border-border bg-surface px-4 py-4">
            <p className="font-mono text-sm text-muted line-through">setCount during render</p>
            <p className="mt-2 text-sm leading-relaxed text-fg">
              Calling <Code>setCount</Code> in the body of the component runs it every render and loops. The click
              handler is the place that updates state. The same rule as <Code>navigate</Code> on the router page.
            </p>
          </li>
          <li className="rounded-lg border border-border bg-surface px-4 py-4">
            <p className="font-mono text-sm text-muted line-through">JSX inside a .ts file</p>
            <p className="mt-2 text-sm leading-relaxed text-fg">
              A file that contains JSX uses the <Code>.tsx</Code> extension. <Code>src/main.tsx</Code> and{" "}
              <Code>src/App.tsx</Code> already do. A <Code>.ts</Code> file is for TypeScript with no JSX.
            </p>
          </li>
        </ul>
      </section>
    </Frame>
  );
}
