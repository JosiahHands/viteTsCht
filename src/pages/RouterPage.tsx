import { Link } from "react-router";
import { useCopy } from "../copy.ts";
import { Code, CommandGroup, Frame, JumpNav, Kicker, type Row } from "../sheet.tsx";

const INSTALL: Row[] = [
  {
    id: "rr-install",
    title: "Install React Router",
    detail:
      "From the Vite React-TS project root. Declarative mode is BrowserRouter, Routes, Route, Link, and useNavigate. Types ship in react-router. Do not install @types/react-router-dom. If npm run dev is already open, stop it and start it again so Vite loads the new dependency.",
    command: "npm install react-router",
  },
];

const MAIN: Row[] = [
  {
    id: "rr-main",
    title: "One BrowserRouter, in src/main.tsx",
    detail:
      "Paste this over src/main.tsx in that Vite app. One router, in this file, around App. Do not add a second BrowserRouter in a page.",
    command: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);`,
  },
];

const ROUTES: Row[] = [
  {
    id: "rr-routes",
    title: "Routes, Route, and Link",
    detail:
      'Paste this over App.tsx in that Vite app. This replaces the starter App.tsx. If that file already has routes, do not paste over it. Render <Hello />, <Greeting name="Ada" />, <Counter />, or <Names /> as the element of a route instead. Route takes element={<Home />}. component={Home} and <Switch> are not in the current API. <Link to="/about"> does not reload the page. <a href="/about"> does. There is no about.html. npm run dev and npm run preview are the Vite SPA server. They serve index.html for /about, then the router picks the element. A static host that 404s unknown paths will not. On Cloudflare Workers static assets, set assets.not_found_handling to "single-page-application", or a refresh of /about is a 404 instead of the About screen. This site does that, so a refresh of /router still opens this page. A fresh Vite template has no 404.html.',
    command: `import { Link, Route, Routes } from "react-router";

export default function App() {
  return (
    <>
      <Link to="/about">About</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

function Home() {
  return <h1>Home</h1>;
}

function About() {
  return <h1>About</h1>;
}`,
  },
];

const CLICK: Row[] = [
  {
    id: "rr-nav",
    title: "Move from a click",
    detail:
      "useNavigate is a hook. Call it in a component rendered under that BrowserRouter. Call navigate from the click handler, not while the component is rendering.",
    command: `import { useNavigate } from "react-router";

function Go() {
  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => navigate("/about")}>
      About
    </button>
  );
}`,
  },
];

const JUMPS = [
  { href: "#install", label: "Install" },
  { href: "#entry", label: "src/main.tsx" },
  { href: "#routes", label: "Routes" },
  { href: "#click", label: "From a click" },
];

export default function RouterPage() {
  const { copied, copyErrorId, copy } = useCopy();

  return (
    <Frame title="React Router — Vite TypeScript Cheat Sheet">
      <header className="border-b border-border pb-8">
        <Kicker>React · Vite · TypeScript</Kicker>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          Add pages without a reload
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
          React Router picks a component from the URL. The Vite dev server still transpiles on save. It still does
          not type-check. Commands and files below belong in the React-TS app, run from the project root after{" "}
          <Code>npm install</Code>. This page is one of those routes: <Link to="/" className="text-primary underline">the Vite sheet</Link>{" "}
          stays at <Code>/</Code>. This replaces the starter <Code>App.tsx</Code>. If that file already has routes,
          do not paste over it. Render <Code>{"<Hello />"}</Code>, <Code>{"<Greeting name=\"Ada\" />"}</Code>,{" "}
          <Code>{"<Counter />"}</Code>, or <Code>{"<Names />"}</Code> as the element of a route instead.
        </p>
        <JumpNav jumps={JUMPS} />
      </header>

      <CommandGroup id="install" title="Install" rows={INSTALL} copied={copied} copyErrorId={copyErrorId} onCopy={copy} />
      <CommandGroup id="entry" title="src/main.tsx" rows={MAIN} copied={copied} copyErrorId={copyErrorId} onCopy={copy} />
      <CommandGroup id="routes" title="Routes" rows={ROUTES} copied={copied} copyErrorId={copyErrorId} onCopy={copy} />
      <CommandGroup id="click" title="From a click" rows={CLICK} copied={copied} copyErrorId={copyErrorId} onCopy={copy} />
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Data mode is the same react-router install, not a second package. <Code>createBrowserRouter</Code> is imported from <Code>react-router</Code>. <Code>RouterProvider</Code> is imported from <Code>react-router/dom</Code>.{" "}
        <a href="https://reactrouter.com/start/data/installation" className="text-primary underline">
          Data mode installation
        </a>
        .
      </p>
    </Frame>
  );
}
