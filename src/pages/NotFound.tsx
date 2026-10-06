import { Link } from "react-router";
import { Frame } from "../sheet.tsx";

export default function NotFound() {
  return (
    <Frame title="Not found — Vite TypeScript Cheat Sheet">
      <p className="font-mono text-xs tracking-widest text-primary">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fg">This page does not exist</h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
        Nothing is published at this address. The cheat sheet is on the home page.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex min-h-11 items-center self-start text-base font-semibold text-primary underline"
      >
        Back to the cheat sheet
      </Link>
    </Frame>
  );
}
