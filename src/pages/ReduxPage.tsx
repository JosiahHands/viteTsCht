import { Link } from "react-router";
import { useCopy } from "../copy.ts";
import { Code, CommandGroup, Frame, JumpNav, Kicker, SectionHeading, type Row } from "../sheet.tsx";

const INSTALL: Row[] = [
  {
    id: "redux-install",
    title: "Install Redux Toolkit",
    detail:
      "From the Vite React-TS project root. These are runtime dependencies, not devDependencies. @reduxjs/toolkit is the current Redux API. It depends on the redux package. Do not install redux by itself, and do not install @types/react-redux. Types ship in react-redux. If npm run dev is already open, stop it and start it again so Vite loads the new dependency.",
    command: "npm install @reduxjs/toolkit react-redux",
  },
];

const SLICE: Row[] = [
  {
    id: "redux-slice",
    title: "src/counterSlice.ts",
    detail:
      "Save this as src/counterSlice.ts. createSlice builds the actions and the reducer. increment and decrement assign state.value. That is not a React state mutation you write by hand: Redux Toolkit's Immer turns it into the next state object. PayloadAction types the payload. import type is required because the template sets verbatimModuleSyntax.",
    command: `import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store.ts";

export type CounterState = {
  value: number;
};

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;`,
  },
];

const STORE: Row[] = [
  {
    id: "redux-store",
    title: "src/store.ts",
    detail:
      "Save this as src/store.ts. configureStore is the store. Do not call createStore. RootState and AppDispatch are inferred from this object. Do not write those two types by hand.",
    command: `import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice.ts";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`,
  },
];

const HOOKS: Row[] = [
  {
    id: "redux-hooks",
    title: "src/hooks.ts",
    detail:
      "Save this as src/hooks.ts. useAppDispatch and useAppSelector are the hooks to call from components. withTypes attaches AppDispatch and RootState. Plain useDispatch and useSelector do not know those types.",
    command: `import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store.ts";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();`,
  },
];

const MAIN: Row[] = [
  {
    id: "redux-main",
    title: "One Provider, in src/main.tsx",
    detail:
      "Paste this over src/main.tsx. One Provider, in this file, around the tree. Do not add a second Provider in a page. This copy keeps the BrowserRouter from the React Router page. If that router is not in the file yet, delete the react-router import and the BrowserRouter tags, and leave Provider. If BrowserRouter is already there, do not remove it.",
    command: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { store } from "./store.ts";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);`,
  },
];

const COUNTER: Row[] = [
  {
    id: "redux-counter",
    title: "src/ReduxCounter.tsx",
    detail:
      "Save this as src/ReduxCounter.tsx. The React page's Counter is useState. Do not paste this over that file. useAppSelector reads the store. dispatch runs in the click handler, not while the component is rendering. If App.tsx already has routes, do not paste over it. Render <ReduxCounter /> as the element of a route instead.",
    command: `import { decrement, increment, selectCount } from "./counterSlice.ts";
import { useAppDispatch, useAppSelector } from "./hooks.ts";

export default function ReduxCounter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <>
      <button type="button" onClick={() => dispatch(decrement())}>
        -1
      </button>
      <span>{count}</span>
      <button type="button" onClick={() => dispatch(increment())}>
        +1
      </button>
    </>
  );
}`,
  },
];

const JUMPS = [
  { href: "#install", label: "Install" },
  { href: "#slice", label: "Slice" },
  { href: "#store", label: "Store" },
  { href: "#hooks", label: "Hooks" },
  { href: "#main", label: "src/main.tsx" },
  { href: "#counter", label: "Component" },
  { href: "#dont", label: "Do not" },
];

export default function ReduxPage() {
  const { copied, copyErrorId, copy } = useCopy();

  return (
    <Frame title="Redux Toolkit — Vite TypeScript Cheat Sheet">
      <header className="border-b border-border pb-8">
        <Kicker>React · Vite · TypeScript</Kicker>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          A Redux Toolkit store
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
          Redux Toolkit is the current way to write Redux. The files below are for the Vite React-TS app, from the
          project root, after <Code>npm install</Code>. Saving still refreshes the dev server and still does not
          type-check.{" "}
          <Link to="/react" className="text-primary underline">
            The React page
          </Link>{" "}
          is <Code>useState</Code>. This page is the store.{" "}
          <Link to="/router" className="text-primary underline">
            React Router
          </Link>{" "}
          stays the one <Code>BrowserRouter</Code> in <Code>src/main.tsx</Code>.
        </p>
        <JumpNav jumps={JUMPS} />
      </header>

      <CommandGroup id="install" title="Install" rows={INSTALL} copied={copied} copyErrorId={copyErrorId} onCopy={copy} />
      <CommandGroup id="slice" title="Slice" rows={SLICE} copied={copied} copyErrorId={copyErrorId} onCopy={copy} />
      <CommandGroup id="store" title="Store" rows={STORE} copied={copied} copyErrorId={copyErrorId} onCopy={copy} />
      <CommandGroup id="hooks" title="Hooks" rows={HOOKS} copied={copied} copyErrorId={copyErrorId} onCopy={copy} />
      <CommandGroup id="main" title="src/main.tsx" rows={MAIN} copied={copied} copyErrorId={copyErrorId} onCopy={copy} />
      <CommandGroup
        id="counter"
        title="Component"
        rows={COUNTER}
        copied={copied}
        copyErrorId={copyErrorId}
        onCopy={copy}
      />

      <p className="mt-3 text-sm leading-relaxed text-muted">
        <Code>npx tsc -b</Code> still type-checks these files, because they live under <Code>src/</Code>. Passing the
        dev server does not replace that.{" "}
        <a href="https://redux.js.org/tutorials/typescript-quick-start" className="text-primary underline">
          TypeScript Quick Start
        </a>
        .
      </p>

      <section className="mt-12" aria-labelledby="dont">
        <SectionHeading id="dont">Do not</SectionHeading>
        <ul className="mt-4 grid gap-3">
          <li className="rounded-lg border border-border bg-surface px-4 py-4">
            <p className="font-mono text-sm text-muted line-through">createStore</p>
            <p className="mt-2 text-sm leading-relaxed text-fg">
              <Code>createStore</Code> is the old store function. This page uses <Code>configureStore</Code> from{" "}
              <Code>@reduxjs/toolkit</Code>.
            </p>
          </li>
          <li className="rounded-lg border border-border bg-surface px-4 py-4">
            <p className="font-mono text-sm text-muted line-through">dispatch during render</p>
            <p className="mt-2 text-sm leading-relaxed text-fg">
              Calling <Code>dispatch</Code> in the body of the component runs it on every render. The click handler
              is the place that updates the store. The same rule as <Code>setCount</Code> and <Code>navigate</Code>.
            </p>
          </li>
          <li className="rounded-lg border border-border bg-surface px-4 py-4">
            <p className="font-mono text-sm text-muted line-through">a second Provider</p>
            <p className="mt-2 text-sm leading-relaxed text-fg">
              One <Code>Provider</Code>, in <Code>src/main.tsx</Code>. A second one in a page hides the first store.
            </p>
          </li>
        </ul>
      </section>
    </Frame>
  );
}
