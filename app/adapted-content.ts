import { marked } from "marked";

const documents = import.meta.glob<string>(
  "../content/site-v3-adapted/**/*.md",
  { eager: true, import: "default", query: "?raw" },
);

function normalizeDocument(source: string) {
  return source
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "")
    .replace(/^# .+\r?\n+/, "")
    .trim();
}

export function getAdaptedMarkdown(path: string) {
  const key = `../content/site-v3-adapted/${path}`;
  const source = documents[key];
  if (!source) throw new Error(`Adapted document not found: ${path}`);
  return normalizeDocument(source);
}

export function getAdaptedHtml(path: string) {
  const html = marked.parse(getAdaptedMarkdown(path), {
    async: false,
    gfm: true,
  });
  return String(html);
}

