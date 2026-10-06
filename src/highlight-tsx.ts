export type TokenKind =
  | "comment"
  | "string"
  | "keyword"
  | "storage"
  | "func"
  | "var"
  | "tag"
  | "html"
  | "attr"
  | "num"
  | "tagpunct"
  | "punct";

export type Token = { text: string; kind: TokenKind };

const STORAGE = new Set([
  "const",
  "let",
  "var",
  "function",
  "class",
  "extends",
  "interface",
  "type",
  "enum",
]);

const KEYWORD = new Set([
  "import",
  "from",
  "export",
  "default",
  "return",
  "if",
  "else",
  "for",
  "while",
  "switch",
  "case",
  "break",
  "continue",
  "new",
  "throw",
  "try",
  "catch",
  "finally",
  "of",
  "in",
  "as",
  "typeof",
  "await",
  "async",
]);

export function highlightTsx(source: string): Token[] {
  const out: Token[] = [];
  let expectFunctionName = false;

  function push(text: string, kind: TokenKind) {
    if (text.length === 0) return;
    const last = out[out.length - 1];
    if (last && last.kind === kind) last.text += text;
    else out.push({ text, kind });
  }

  function readString(i: number): number {
    const quote = source[i];
    let j = i + 1;
    while (j < source.length) {
      if (source[j] === "\\") {
        j += 2;
        continue;
      }
      if (source[j] === quote) return j + 1;
      j++;
    }
    return source.length;
  }

  function matchBrace(open: number): number {
    let depth = 0;
    let i = open;
    while (i < source.length) {
      const c = source[i];
      if (c === '"' || c === "'" || c === "`") {
        i = readString(i);
        continue;
      }
      if (c === "{") depth++;
      else if (c === "}") {
        depth--;
        if (depth === 0) return i;
      }
      i++;
    }
    return source.length - 1;
  }

  function isJsxOpen(i: number): boolean {
    const next = source[i + 1];
    if (next === undefined || next === "=" || next === "<") return false;
    if (next === ">" || next === "/") return true;
    return /[A-Za-z]/.test(next);
  }

  function readTag(i: number): { i: number; text: boolean } {
    const closing = source[i + 1] === "/";
    if (closing) {
      push("</", "tagpunct");
      i += 2;
    } else {
      push("<", "tagpunct");
      i += 1;
    }

    if (/[A-Za-z]/.test(source[i] ?? "")) {
      let j = i + 1;
      while (j < source.length && /[A-Za-z0-9.]/.test(source[j])) j++;
      const name = source.slice(i, j);
      push(name, name[0] !== undefined && name[0] >= "A" && name[0] <= "Z" ? "tag" : "html");
      i = j;
    }

    while (i < source.length) {
      const c = source[i];
      if (c === "/" && source[i + 1] === ">") {
        push("/>", "tagpunct");
        return { i: i + 2, text: false };
      }
      if (c === ">") {
        push(">", "tagpunct");
        return { i: i + 1, text: !closing };
      }
      if (c === "{") {
        const end = matchBrace(i);
        push("{", "punct");
        const inner = highlightTsx(source.slice(i + 1, end));
        for (const token of inner) push(token.text, token.kind);
        push("}", "punct");
        i = end + 1;
        continue;
      }
      if (c === '"' || c === "'" || c === "`") {
        const end = readString(i);
        push(source.slice(i, end), "string");
        i = end;
        continue;
      }
      if (/[A-Za-z_]/.test(c)) {
        let j = i + 1;
        while (j < source.length && /[A-Za-z0-9_-]/.test(source[j])) j++;
        push(source.slice(i, j), "attr");
        i = j;
        continue;
      }
      push(c, "punct");
      i++;
    }
    return { i, text: false };
  }

  let i = 0;
  while (i < source.length) {
    const c = source[i];
    const next = source[i + 1];

    if (c === "/" && next === "/") {
      const end = source.indexOf("\n", i);
      const j = end === -1 ? source.length : end;
      push(source.slice(i, j), "comment");
      expectFunctionName = false;
      i = j;
      continue;
    }
    if (c === "/" && next === "*") {
      const end = source.indexOf("*/", i + 2);
      const j = end === -1 ? source.length : end + 2;
      push(source.slice(i, j), "comment");
      expectFunctionName = false;
      i = j;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      const end = readString(i);
      push(source.slice(i, end), "string");
      expectFunctionName = false;
      i = end;
      continue;
    }
    if (c === "<" && isJsxOpen(i)) {
      const tag = readTag(i);
      i = tag.i;
      expectFunctionName = false;
      if (tag.text) {
        let j = i;
        while (j < source.length && source[j] !== "<" && source[j] !== "{") j++;
        push(source.slice(i, j), "punct");
        i = j;
      }
      continue;
    }
    if (/[0-9]/.test(c) && (i === 0 || /[^A-Za-z0-9_$]/.test(source[i - 1] ?? ""))) {
      let j = i + 1;
      while (j < source.length && /[0-9.]/.test(source[j])) j++;
      push(source.slice(i, j), "num");
      expectFunctionName = false;
      i = j;
      continue;
    }
    if (/[A-Za-z_$]/.test(c)) {
      let j = i + 1;
      while (j < source.length && /[A-Za-z0-9_$]/.test(source[j])) j++;
      const word = source.slice(i, j);
      let k = j;
      while (k < source.length && (source[k] === " " || source[k] === "\n")) k++;
      let kind: TokenKind;
      if (expectFunctionName) kind = "func";
      else if (KEYWORD.has(word)) kind = "keyword";
      else if (STORAGE.has(word)) kind = "storage";
      else if (source[k] === "(") kind = "func";
      else kind = "var";
      push(word, kind);
      expectFunctionName = word === "function";
      i = j;
      continue;
    }

    push(c, "punct");
    if (!/\s/.test(c)) expectFunctionName = false;
    i++;
  }

  return out;
}
