import { useRef, useState } from "react";

export function useCopy() {
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

  return { copied, copyErrorId, copy };
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
